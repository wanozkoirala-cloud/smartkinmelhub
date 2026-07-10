import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const ncmBaseUrl = process.env.NCM_API_BASE_URL || "https://demo.nepalcanmove.com";
const ncmToken =
  process.env.NCM_API_TOKEN || "0c593255a1805c938fd006ab01db5465fa680d8c";

const readJsonBody = (req) =>
  new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
    });
    req.on("end", () => {
      if (!body) {
        resolve({});
        return;
      }
      try {
        resolve(JSON.parse(body));
      } catch (error) {
        reject(error);
      }
    });
    req.on("error", reject);
  });

const sendJson = (res, statusCode, data) => {
  res.statusCode = statusCode;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(data));
};

const requestNcm = async (path, options = {}) => {
  const response = await fetch(`${ncmBaseUrl}${path}`, {
    ...options,
    headers: {
      Authorization: `Token ${ncmToken}`,
      "Content-Type": "application/json",
      ...(options.headers || {})
    }
  });
  const text = await response.text();
  let data = text;

  try {
    data = text ? JSON.parse(text) : {};
  } catch {
    data = { raw: text };
  }

  return {
    ok: response.ok,
    status: response.status,
    data
  };
};

const ncmMiddleware = async (req, res, next) => {
  try {
    const url = new URL(req.url || "", "http://localhost");

    if (req.method === "GET" && url.pathname === "/api/ncm/branches") {
      const result = await requestNcm("/api/v2/branches");
      sendJson(res, result.status, result.data);
      return;
    }

    if (req.method === "GET" && url.pathname === "/api/ncm/shipping-rate") {
      const query = url.search || "";
      const result = await requestNcm(`/api/v1/shipping-rate${query}`);
      sendJson(res, result.status, result.data);
      return;
    }

    if (req.method === "POST" && url.pathname === "/api/ncm/create-order") {
      const payload = await readJsonBody(req);
      const result = await requestNcm("/api/v1/order/create", {
        method: "POST",
        body: JSON.stringify(payload)
      });
      sendJson(res, result.status, result.data);
      return;
    }
  } catch (error) {
    sendJson(res, 500, {
      error: "NCM proxy failed",
      detail: error instanceof Error ? error.message : String(error)
    });
    return;
  }

  next();
};

export default defineConfig({
  plugins: [
    react(),
    {
      name: "smartkinmelhub-ncm-proxy",
      configureServer(server) {
        server.middlewares.use(ncmMiddleware);
      },
      configurePreviewServer(server) {
        server.middlewares.use(ncmMiddleware);
      }
    }
  ],
  server: {
    port: 5173
  }
});
