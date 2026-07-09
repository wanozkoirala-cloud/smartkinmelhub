import { StrictMode, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { createRoot } from "react-dom/client";
import {
  ArrowLeft,
  BadgeCheck,
  Bell,
  CheckCircle2,
  ChevronRight,
  CreditCard,
  Heart,
  Home,
  Info,
  Landmark,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Minus,
  PackageCheck,
  Phone,
  Plus,
  QrCode,
  Receipt,
  Search,
  ShieldCheck,
  ShoppingCart,
  Smartphone,
  Sparkles,
  Star,
  Trash2,
  Truck,
  Wallet,
  X,
  Zap
} from "lucide-react";
import "./styles.css";

type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  oldPrice: number;
  rating: number;
  reviews: number;
  badge: string;
  image: string;
  stock: number;
  description: string;
  highlights: string[];
  warranty: string;
};

type CartItem = {
  product: Product;
  quantity: number;
};

type CheckoutDetails = {
  fullName: string;
  mobile: string;
  city: string;
  address: string;
};

type OrderNotice = {
  message: string;
  whatsappUrl: string;
  emailUrl: string;
};

type Route =
  | { name: "home" }
  | { name: "about" }
  | { name: "orders" }
  | { name: "returns" }
  | { name: "payments" }
  | { name: "contact" }
  | { name: "cart" }
  | { name: "checkout" }
  | { name: "success" }
  | { name: "category"; category: string }
  | { name: "product"; id: number };

const categories = [
  "Electronics",
  "Mobile Phones",
  "Computers",
  "Home Appliances",
  "Fashion",
  "Beauty",
  "Health",
  "Home and Living",
  "Kitchen",
  "Grocery",
  "Baby Products",
  "Sports",
  "Automotive",
  "Books",
  "Office Supplies",
  "Gaming",
  "Accessories",
  "Clearance Sale"
];

const products: Product[] = [
  {
    id: 1,
    name: "Samsung Galaxy A55 5G",
    category: "Mobile Phones",
    price: 58999,
    oldPrice: 64999,
    rating: 4.8,
    reviews: 326,
    badge: "Flash Deal",
    image:
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=700&q=80",
    stock: 18,
    description:
      "A slim 5G smartphone with a bright display, dependable battery life, and a camera setup made for everyday photos, reels, and video calls.",
    highlights: ["6.6 inch Super AMOLED display", "50MP main camera", "5000mAh battery", "128GB storage"],
    warranty: "1 year brand warranty"
  },
  {
    id: 2,
    name: "Lenovo IdeaPad Slim Laptop",
    category: "Computers",
    price: 84999,
    oldPrice: 96999,
    rating: 4.7,
    reviews: 214,
    badge: "Clearance",
    image:
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=700&q=80",
    stock: 9,
    description:
      "A lightweight laptop for office work, online classes, browsing, and daily productivity with fast storage and a comfortable keyboard.",
    highlights: ["Intel Core performance", "15.6 inch Full HD display", "Fast SSD storage", "Slim carry-friendly body"],
    warranty: "1 year service warranty"
  },
  {
    id: 3,
    name: "Whirlpool Double Door Refrigerator",
    category: "Home Appliances",
    price: 72490,
    oldPrice: 81200,
    rating: 4.5,
    reviews: 88,
    badge: "Seasonal",
    image:
      "https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?auto=format&fit=crop&w=700&q=80",
    stock: 12,
    description:
      "A family-sized refrigerator with efficient cooling, organized storage, and a polished design for modern kitchens.",
    highlights: ["Double door layout", "Energy efficient cooling", "Large vegetable tray", "Low-noise operation"],
    warranty: "10 years compressor warranty"
  },
  {
    id: 4,
    name: "NoiseFit Smart Watch",
    category: "Accessories",
    price: 5999,
    oldPrice: 8999,
    rating: 4.6,
    reviews: 502,
    badge: "Best Seller",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=700&q=80",
    stock: 34,
    description:
      "A fitness-first smartwatch for calls, workouts, heart-rate tracking, notifications, and everyday activity goals.",
    highlights: ["Bluetooth calling", "Health tracking", "Multiple sport modes", "Long battery life"],
    warranty: "6 months replacement support"
  },
  {
    id: 5,
    name: "Prestige Induction Cooktop",
    category: "Kitchen",
    price: 4890,
    oldPrice: 6500,
    rating: 4.4,
    reviews: 146,
    badge: "Daily Deal",
    image:
      "https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=700&q=80",
    stock: 26,
    description:
      "A compact induction cooktop with smart presets for quick cooking, easy cleaning, and safer daily use.",
    highlights: ["Preset cooking menus", "Energy-saving heat control", "Portable design", "Easy-touch controls"],
    warranty: "1 year kitchen appliance warranty"
  },
  {
    id: 6,
    name: "JBL Wireless Headphones",
    category: "Electronics",
    price: 7499,
    oldPrice: 9999,
    rating: 4.9,
    reviews: 671,
    badge: "Trending",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=700&q=80",
    stock: 21,
    description:
      "Comfortable wireless headphones with rich bass, clear calls, and all-day listening for music, travel, and work.",
    highlights: ["Deep bass sound", "Wireless Bluetooth", "Soft ear cushions", "Fast charging"],
    warranty: "1 year audio warranty"
  },
  {
    id: 7,
    name: "Gaming Mechanical Keyboard",
    category: "Gaming",
    price: 4199,
    oldPrice: 5999,
    rating: 4.5,
    reviews: 109,
    badge: "New Arrival",
    image:
      "https://images.unsplash.com/photo-1541140532154-b024d705b90a?auto=format&fit=crop&w=700&q=80",
    stock: 15,
    description:
      "A responsive mechanical keyboard with tactile keys, lighting modes, and a durable build for gaming and typing.",
    highlights: ["Mechanical switches", "RGB lighting", "Anti-ghosting keys", "Durable braided cable"],
    warranty: "6 months store support"
  },
  {
    id: 8,
    name: "Premium Skin Care Set",
    category: "Beauty",
    price: 2390,
    oldPrice: 3400,
    rating: 4.3,
    reviews: 77,
    badge: "Promotional",
    image:
      "https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?auto=format&fit=crop&w=700&q=80",
    stock: 40,
    description:
      "A gentle daily skincare set for cleansing, hydration, and a fresh routine with gift-ready packaging.",
    highlights: ["Daily routine set", "Hydrating formula", "Travel-friendly pack", "Suitable for gifting"],
    warranty: "7 days unopened return"
  }
];

const banners = ["Mega Clearance Week", "Brand New Arrivals", "Mobile Deals Under NPR 10,000"];

const categoryOverviews: Record<string, { summary: string; highlights: string[] }> = {
  All: {
    summary: "Browse every owner-managed SmartKinmelHub product in one place.",
    highlights: ["Verified stock", "Clear prices", "Fast support"]
  },
  Electronics: {
    summary: "Audio, gadgets, accessories, and useful tech products for daily life.",
    highlights: ["Trending devices", "Warranty support", "Digital payment ready"]
  },
  "Mobile Phones": {
    summary: "Smartphones selected for battery, camera, storage, and Nepal network use.",
    highlights: ["5G and 4G options", "Brand warranty", "Easy checkout"]
  },
  Computers: {
    summary: "Laptops and computer products for students, offices, creators, and home users.",
    highlights: ["Productivity picks", "Reliable specs", "Support after purchase"]
  },
  "Home Appliances": {
    summary: "Appliances for daily household comfort, storage, cooking, and cleaning.",
    highlights: ["Delivery coordination", "Warranty details", "Seasonal offers"]
  },
  Fashion: {
    summary: "Seasonal style products and practical essentials for everyday shopping.",
    highlights: ["Fresh campaigns", "Limited stock", "Easy returns check"]
  },
  Beauty: {
    summary: "Personal care and gift-ready beauty products with clear product details.",
    highlights: ["Promotional packs", "Sealed products", "Customer support"]
  },
  Health: {
    summary: "Helpful wellness and health-related daily-use products.",
    highlights: ["Practical picks", "Support confirmation", "Trusted checkout"]
  },
  "Home and Living": {
    summary: "Useful home products for comfort, organization, and everyday living.",
    highlights: ["Home essentials", "Smart pricing", "Delivery support"]
  },
  Kitchen: {
    summary: "Kitchen appliances, cooking helpers, and practical household tools.",
    highlights: ["Daily deals", "Warranty support", "Easy cleaning picks"]
  },
  Grocery: {
    summary: "A ready section for grocery and daily household inventory.",
    highlights: ["Daily essentials", "Fast updates", "Local delivery planning"]
  },
  "Baby Products": {
    summary: "A prepared area for baby care and family products.",
    highlights: ["Family-focused", "Clear stock", "Support before dispatch"]
  },
  Sports: {
    summary: "Fitness, sports, and activity products for active shoppers.",
    highlights: ["Workout gear", "Outdoor picks", "Seasonal stock"]
  },
  Automotive: {
    summary: "A category area for vehicle accessories and useful automotive products.",
    highlights: ["Practical accessories", "Stock confirmation", "Support by phone"]
  },
  Books: {
    summary: "A prepared section for books, learning, and reading products.",
    highlights: ["Learning picks", "Simple browsing", "Order confirmation"]
  },
  "Office Supplies": {
    summary: "Office and study supplies for businesses, students, and home workspaces.",
    highlights: ["Bulk-friendly", "Useful essentials", "Fast reorder flow"]
  },
  Gaming: {
    summary: "Gaming accessories and gear for better play, typing, and setup comfort.",
    highlights: ["New arrivals", "Performance gear", "Clear specs"]
  },
  Accessories: {
    summary: "Smart watches, add-ons, and useful extras for phones, laptops, and daily carry.",
    highlights: ["Best sellers", "Gift-ready", "Affordable picks"]
  },
  "Clearance Sale": {
    summary: "Limited-stock clearance, overstock, and promotional products at smarter prices.",
    highlights: ["Limited quantity", "Owner-managed stock", "Fast checkout"]
  }
};

const routeFromHash = (): Route => {
  const hash = window.location.hash.replace(/^#\/?/, "");
  const [page, ...rest] = hash.split("/");
  const value = decodeURIComponent(rest.join("/"));

  if (!page) return { name: "home" };
  if (page === "category") return { name: "category", category: value || "All" };
  if (page === "product") return { name: "product", id: Number(rest[0]) };
  if (page === "about") return { name: "about" };
  if (page === "orders") return { name: "orders" };
  if (page === "returns") return { name: "returns" };
  if (page === "payments") return { name: "payments" };
  if (page === "contact") return { name: "contact" };
  if (page === "cart") return { name: "cart" };
  if (page === "checkout") return { name: "checkout" };
  if (page === "success") return { name: "success" };
  return { name: "home" };
};

const pathForRoute = (route: Route) => {
  if (route.name === "home") return "#/";
  if (route.name === "category") return `#/category/${encodeURIComponent(route.category)}`;
  if (route.name === "product") return `#/product/${route.id}`;
  return `#/${route.name}`;
};

const money = (value: number) =>
  new Intl.NumberFormat("en-NP", {
    style: "currency",
    currency: "NPR",
    maximumFractionDigits: 0
  }).format(value);

function ProductCard({
  product,
  onAdd,
  onOpen
}: {
  product: Product;
  onAdd: (product: Product) => void;
  onOpen: (product: Product) => void;
}) {
  const discount = Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100);

  return (
    <article className="product-card">
      <button className="product-open" onClick={() => onOpen(product)} aria-label={`View ${product.name}`}>
        <div className="product-media">
          <img src={product.image} alt={product.name} loading="lazy" />
          <span className="badge">{product.badge}</span>
        </div>
        <div className="product-info">
          <p className="product-category">{product.category}</p>
          <h3>{product.name}</h3>
          <div className="rating">
            <Star size={16} fill="currentColor" />
            <span>{product.rating}</span>
            <small>({product.reviews})</small>
          </div>
          <div className="price-row">
            <strong>{money(product.price)}</strong>
            <span>{money(product.oldPrice)}</span>
          </div>
          <div className="stock-row">
            <small>{discount}% off</small>
            <small>{product.stock} in stock</small>
          </div>
        </div>
      </button>
      <button className="icon-button wishlist" aria-label={`Add ${product.name} to wishlist`}>
        <Heart size={18} />
      </button>
      <button className="add-button" onClick={() => onAdd(product)}>
        <ShoppingCart size={17} />
        Add to Cart
      </button>
    </article>
  );
}

function ProductRail({
  title,
  subtitle,
  items,
  onAdd,
  onOpen,
  onViewAll
}: {
  title: string;
  subtitle: string;
  items: Product[];
  onAdd: (product: Product) => void;
  onOpen: (product: Product) => void;
  onViewAll: () => void;
}) {
  return (
    <section className="section">
      <div className="section-heading">
        <div>
          <p>{subtitle}</p>
          <h2>{title}</h2>
        </div>
        <button className="text-button" onClick={onViewAll}>
          View all
          <ChevronRight size={17} />
        </button>
      </div>
      <div className="product-grid">
        {items.map((product) => (
          <ProductCard key={`${title}-${product.id}`} product={product} onAdd={onAdd} onOpen={onOpen} />
        ))}
      </div>
    </section>
  );
}

function InfoPage({
  title,
  eyebrow,
  children,
  icon
}: {
  title: string;
  eyebrow: string;
  children: ReactNode;
  icon: ReactNode;
}) {
  return (
    <section className="page-panel">
      <div className="page-hero">
        <span>{icon}</span>
        <p>{eyebrow}</p>
        <h1>{title}</h1>
      </div>
      <div className="content-grid">{children}</div>
    </section>
  );
}

function App() {
  const [route, setRoute] = useState<Route>(routeFromHash);
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [heroIndex, setHeroIndex] = useState(0);
  const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("eSewa");
  const [checkoutDetails, setCheckoutDetails] = useState<CheckoutDetails>({
    fullName: "",
    mobile: "",
    city: "",
    address: ""
  });
  const [orderNotice, setOrderNotice] = useState<OrderNotice | null>(null);

  useEffect(() => {
    const onHashChange = () => setRoute(routeFromHash());
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  const navigate = (nextRoute: Route) => {
    window.location.hash = pathForRoute(nextRoute);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const suggestions = useMemo(() => {
    if (!query.trim()) return [];
    const text = query.toLowerCase();
    return products
      .filter(
        (product) =>
          product.name.toLowerCase().includes(text) ||
          product.category.toLowerCase().includes(text)
      )
      .slice(0, 5);
  }, [query]);

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const subtotal = cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
  const cartSavings = cart.reduce(
    (total, item) => total + (item.product.oldPrice - item.product.price) * item.quantity,
    0
  );
  const deliveryFee = subtotal > 0 && subtotal < 10000 ? 250 : 0;
  const grandTotal = subtotal + deliveryFee;
  const routeCategory = route.name === "category" ? route.category : selectedCategory;
  const visibleProducts = routeCategory === "All" ? products : products.filter((product) => product.category === routeCategory);
  const activeBanner = banners[heroIndex % banners.length];
  const activeProduct = route.name === "product" ? products.find((product) => product.id === route.id) : undefined;
  const categoryOverview = categoryOverviews[routeCategory] ?? categoryOverviews.All;
  const selectedPaymentQr = paymentMethod === "Khalti" || paymentMethod === "Fonepay" ? "/payments/payment-qr-2.jpeg" : "/payments/payment-qr-1.jpeg";
  const requiresDigitalPayment = paymentMethod !== "Cash on Delivery";
  const canPlaceOrder = Boolean(
    cart.length > 0 &&
      checkoutDetails.fullName.trim() &&
      checkoutDetails.mobile.trim() &&
      checkoutDetails.city.trim() &&
      checkoutDetails.address.trim()
  );

  const addToCart = (product: Product) => {
    setCart((current) => {
      const existing = current.find((item) => item.product.id === product.id);
      if (existing) {
        return current.map((item) =>
          item.product.id === product.id ? { ...item, quantity: Math.min(item.quantity + 1, product.stock) } : item
        );
      }
      return [...current, { product, quantity: 1 }];
    });
  };

  const updateQuantity = (productId: number, quantity: number) => {
    setCart((current) =>
      current
        .map((item) => (item.product.id === productId ? { ...item, quantity } : item))
        .filter((item) => item.quantity > 0)
    );
  };

  const openCategory = (category: string) => {
    setSelectedCategory(category);
    setIsCategoryMenuOpen(false);
    navigate({ name: "category", category });
  };

  const openProduct = (product: Product) => navigate({ name: "product", id: product.id });

  const updateCheckoutDetail = (field: keyof CheckoutDetails, value: string) => {
    setCheckoutDetails((current) => ({ ...current, [field]: value }));
  };

  const buildOrderMessage = () => {
    const items = cart
      .map(
        (item) =>
          `- ${item.product.name} x ${item.quantity} = ${money(item.product.price * item.quantity)}`
      )
      .join("\n");

    return [
      "New SmartKinmelHub order",
      "",
      `Customer: ${checkoutDetails.fullName}`,
      `Mobile: ${checkoutDetails.mobile}`,
      `City/District: ${checkoutDetails.city}`,
      `Address: ${checkoutDetails.address}`,
      `Payment: ${paymentMethod}`,
      "",
      "Items:",
      items,
      "",
      `Subtotal: ${money(subtotal)}`,
      `Delivery: ${deliveryFee === 0 ? "Free" : money(deliveryFee)}`,
      `Total: ${money(grandTotal)}`,
      "",
      "Please call or message the buyer to confirm stock, payment and delivery."
    ].join("\n");
  };

  const handlePlaceOrder = () => {
    const message = buildOrderMessage();
    const whatsappUrl = `https://wa.me/9779851223170?text=${encodeURIComponent(message)}`;
    const emailUrl = `mailto:wanozkoirala@gmail.com?subject=${encodeURIComponent(
      "New SmartKinmelHub order"
    )}&body=${encodeURIComponent(message)}`;

    setOrderNotice({ message, whatsappUrl, emailUrl });
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    window.open(emailUrl, "_blank", "noopener,noreferrer");
    setCart([]);
    navigate({ name: "success" });
  };

  const navLink = (label: string, target: Route) => (
    <button className={route.name === target.name ? "active-link" : ""} onClick={() => navigate(target)}>
      {label}
    </button>
  );

  const renderHome = () => (
    <>
      <section className="hero">
        <aside className="category-panel">
          <h2>Categories</h2>
          {categories.slice(0, 12).map((category) => (
            <button key={category} onClick={() => openCategory(category)}>
              {category}
              <ChevronRight size={16} />
            </button>
          ))}
        </aside>

        <div className="hero-slider">
          <img
            src="https://images.unsplash.com/photo-1607083206968-13611e3d76db?auto=format&fit=crop&w=1400&q=80"
            alt="Online shopping sale with products"
          />
          <div className="hero-content">
            <span>Official Nepal Store</span>
            <h1>{activeBanner}</h1>
            <p>
              Brand new products, clearance offers, overstock deals and seasonal discounts delivered
              across Nepal.
            </p>
            <div className="hero-actions">
              <button className="primary-button" onClick={() => openCategory("Clearance Sale")}>
                Shop Deals
              </button>
              <button className="secondary-button" onClick={() => openCategory("All")}>
                Explore Categories
              </button>
            </div>
          </div>
          <div className="hero-dots" aria-label="Hero slides">
            {banners.map((banner, index) => (
              <button
                key={banner}
                className={index === heroIndex ? "active" : ""}
                onClick={() => setHeroIndex(index)}
                aria-label={`Show ${banner}`}
              />
            ))}
          </div>
        </div>

        <aside className="promo-stack">
          <button onClick={() => openCategory("Electronics")}>
            <Zap size={22} />
            <strong>Flash Deals</strong>
            <span>Up to 45% off</span>
          </button>
          <button onClick={() => openCategory("Clearance Sale")}>
            <PackageCheck size={22} />
            <strong>Clearance Sale</strong>
            <span>Limited stock</span>
          </button>
          <button onClick={() => navigate({ name: "orders" })}>
            <Truck size={22} />
            <strong>Fast Delivery</strong>
            <span>Kathmandu priority</span>
          </button>
        </aside>
      </section>

      <section className="trust-strip" aria-label="Store benefits">
        <button onClick={() => navigate({ name: "payments" })}>
          <ShieldCheck />
          <span>Secure payments</span>
        </button>
        <button onClick={() => navigate({ name: "payments" })}>
          <CreditCard />
          <span>eSewa, Khalti, Fonepay, COD</span>
        </button>
        <button onClick={() => navigate({ name: "returns" })}>
          <PackageCheck />
          <span>Warranty and returns</span>
        </button>
        <button onClick={() => navigate({ name: "contact" })}>
          <Smartphone />
          <span>Mobile-first shopping</span>
        </button>
      </section>

      <section className="promo-banners">
        <button onClick={() => openCategory("Clearance Sale")}>
          <p>Overstock Inventory</p>
          <h2>Premium products at smarter prices</h2>
        </button>
        <button onClick={() => openCategory("Fashion")}>
          <p>Seasonal Discounts</p>
          <h2>Fresh campaigns every week</h2>
        </button>
        <button onClick={() => openCategory("Beauty")}>
          <p>Promotional Products</p>
          <h2>Handpicked offers for Nepal</h2>
        </button>
      </section>

      <section className="section category-icons">
        <div className="section-heading">
          <div>
            <p>Shop faster</p>
            <h2>Popular Categories</h2>
          </div>
        </div>
        <div className="category-grid">
          {categories.map((category) => (
            <button key={category} onClick={() => openCategory(category)}>
              <Sparkles size={20} />
              <span>{category}</span>
            </button>
          ))}
        </div>
      </section>

      <ProductRail
        title={selectedCategory === "All" ? "Flash Deals" : selectedCategory}
        subtitle="Limited time"
        items={selectedCategory === "All" ? products : products.filter((product) => product.category === selectedCategory)}
        onAdd={addToCart}
        onOpen={openProduct}
        onViewAll={() => openCategory(selectedCategory)}
      />
      <ProductRail
        title="Clearance Sale Products"
        subtitle="Owner-managed stock"
        items={[...products].reverse().slice(0, 4)}
        onAdd={addToCart}
        onOpen={openProduct}
        onViewAll={() => openCategory("Clearance Sale")}
      />
      <ProductRail
        title="Daily Deals"
        subtitle="Updated for today"
        items={products.slice(2, 6)}
        onAdd={addToCart}
        onOpen={openProduct}
        onViewAll={() => openCategory("All")}
      />

      <section className="brand-showcase">
        <div>
          <p>Brand Showcase</p>
          <h2>Trusted names, clear pricing, fast checkout.</h2>
        </div>
        <div className="brand-list">
          {["Samsung", "Lenovo", "JBL", "Prestige", "Whirlpool", "Noise"].map((brand) => (
            <button key={brand} onClick={() => setQuery(brand)}>
              {brand}
            </button>
          ))}
        </div>
      </section>

      <section className="lower-grid">
        <div className="testimonial">
          <p>Customer Testimonials</p>
          <h2>"Fast delivery, clear pricing, and the checkout felt simple."</h2>
          <span>- A shopper from Lalitpur</span>
        </div>
        <div className="newsletter">
          <p>Newsletter</p>
          <h2>Get the best SmartKinmelHub deals first.</h2>
          <form onSubmit={(event) => event.preventDefault()}>
            <input placeholder="Enter email or mobile number" aria-label="Newsletter contact" />
            <button type="submit">Subscribe</button>
          </form>
        </div>
        <div className="app-promo">
          <p>Mobile App</p>
          <h2>Smart shopping in your pocket.</h2>
          <button onClick={() => navigate({ name: "contact" })}>Get App Updates</button>
        </div>
      </section>
    </>
  );

  const renderCategory = () => (
    <section className="section">
      <div className="page-title-row">
        <button className="back-button" onClick={() => navigate({ name: "home" })}>
          <ArrowLeft size={18} />
          Home
        </button>
        <div>
          <p>Browse collection</p>
          <h1>{routeCategory}</h1>
        </div>
      </div>
      <div className="category-overview">
        <div>
          <p>{categoryOverview.summary}</p>
          <div className="overview-tags">
            {categoryOverview.highlights.map((highlight) => (
              <span key={highlight}>{highlight}</span>
            ))}
          </div>
        </div>
        <button className="secondary-dark-button" onClick={() => navigate({ name: "cart" })}>
          <ShoppingCart size={18} />
          View Cart
        </button>
      </div>
      <div className="product-grid">
        {visibleProducts.length > 0 ? (
          visibleProducts.map((product) => (
            <ProductCard key={product.id} product={product} onAdd={addToCart} onOpen={openProduct} />
          ))
        ) : (
          <div className="empty-state">
            <h2>No products listed yet</h2>
            <p>This category page is ready. Add products to show them here.</p>
          </div>
        )}
      </div>
    </section>
  );

  const renderProduct = () => {
    if (!activeProduct) {
      return (
        <section className="page-panel">
          <div className="empty-state">
            <h1>Product not found</h1>
            <button className="primary-button" onClick={() => navigate({ name: "home" })}>
              Go to homepage
            </button>
          </div>
        </section>
      );
    }

    return (
      <section className="product-detail">
        <button className="back-button" onClick={() => navigate({ name: "home" })}>
          <ArrowLeft size={18} />
          Continue shopping
        </button>
        <div className="detail-grid">
          <div className="detail-image">
            <img src={activeProduct.image} alt={activeProduct.name} />
          </div>
          <div className="detail-info">
            <p className="product-category">{activeProduct.category}</p>
            <h1>{activeProduct.name}</h1>
            <div className="rating">
              <Star size={18} fill="currentColor" />
              <span>{activeProduct.rating}</span>
              <small>{activeProduct.reviews} customer reviews</small>
            </div>
            <p>{activeProduct.description}</p>
            <div className="detail-price">
              <strong>{money(activeProduct.price)}</strong>
              <span>{money(activeProduct.oldPrice)}</span>
            </div>
            <ul>
              {activeProduct.highlights.map((item) => (
                <li key={item}>
                  <BadgeCheck size={18} />
                  {item}
                </li>
              ))}
            </ul>
            <div className="purchase-box">
              <span>{activeProduct.stock} pieces available</span>
              <span>{activeProduct.warranty}</span>
              <button className="primary-button" onClick={() => addToCart(activeProduct)}>
                <ShoppingCart size={18} />
                Add to Cart
              </button>
              <button
                className="secondary-dark-button"
                onClick={() => {
                  addToCart(activeProduct);
                  navigate({ name: "checkout" });
                }}
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  };

  const renderCart = () => (
    <section className="cart-page">
      <div className="page-title-row">
        <button className="back-button" onClick={() => navigate({ name: "home" })}>
          <ArrowLeft size={18} />
          Shopping
        </button>
        <div>
          <p>Review basket</p>
          <h1>Your Cart</h1>
        </div>
      </div>
      <div className="cart-layout">
        <div className="cart-list">
          {cart.length === 0 ? (
            <div className="empty-state">
              <h2>Your cart is empty</h2>
              <p>Open any product and add it to cart to start checkout.</p>
            </div>
          ) : (
            cart.map((item) => (
              <div className="cart-item" key={item.product.id}>
                <img src={item.product.image} alt={item.product.name} />
                <div>
                  <h3>{item.product.name}</h3>
                  <p>{item.product.category}</p>
                  <strong>{money(item.product.price)}</strong>
                  <small>{money(item.product.price * item.quantity)} item total</small>
                </div>
                <div className="quantity-control">
                  <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)}>
                    <Minus size={15} />
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    disabled={item.quantity >= item.product.stock}
                    onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                  >
                    <Plus size={15} />
                  </button>
                </div>
                <button className="remove-button" onClick={() => updateQuantity(item.product.id, 0)}>
                  <Trash2 size={17} />
                </button>
              </div>
            ))
          )}
          {cart.length > 0 && (
            <div className="cart-support">
              <div>
                <Truck size={20} />
                <span>Delivery confirmation before dispatch</span>
              </div>
              <div>
                <ShieldCheck size={20} />
                <span>Manual stock and warranty check</span>
              </div>
              <div>
                <MessageCircle size={20} />
                <span>WhatsApp follow-up after order</span>
              </div>
            </div>
          )}
        </div>
        <OrderSummary subtotal={subtotal} deliveryFee={deliveryFee} grandTotal={grandTotal} savings={cartSavings}>
          {subtotal > 0 && subtotal < 10000 && (
            <p className="summary-note">Add {money(10000 - subtotal)} more for free delivery.</p>
          )}
          <button className="primary-button" disabled={cart.length === 0} onClick={() => navigate({ name: "checkout" })}>
            Proceed to Checkout
          </button>
          <button className="secondary-dark-button" onClick={() => navigate({ name: "home" })}>
            Continue Shopping
          </button>
        </OrderSummary>
      </div>
    </section>
  );

  const renderCheckout = () => (
    <section className="checkout-page">
      <div className="page-title-row">
        <button className="back-button" onClick={() => navigate({ name: "cart" })}>
          <ArrowLeft size={18} />
          Cart
        </button>
        <div>
          <p>Secure checkout</p>
          <h1>Delivery and Payment</h1>
        </div>
      </div>
      <div className="checkout-layout">
        <div className="checkout-forms">
          <section>
            <h2>
              <MapPin size={20} />
              Delivery Details
            </h2>
            <div className="form-grid">
              <input
                value={checkoutDetails.fullName}
                onChange={(event) => updateCheckoutDetail("fullName", event.target.value)}
                placeholder="Full name"
              />
              <input
                value={checkoutDetails.mobile}
                onChange={(event) => updateCheckoutDetail("mobile", event.target.value)}
                placeholder="Mobile number"
              />
              <input
                value={checkoutDetails.city}
                onChange={(event) => updateCheckoutDetail("city", event.target.value)}
                placeholder="City or district"
              />
              <input
                value={checkoutDetails.address}
                onChange={(event) => updateCheckoutDetail("address", event.target.value)}
                placeholder="Area, street, landmark"
              />
            </div>
          </section>
          <section>
            <h2>
              <Wallet size={20} />
              Payment Method
            </h2>
            <div className="payment-options">
              {["eSewa", "Khalti", "Fonepay", "Card", "Cash on Delivery"].map((method) => (
                <button
                  key={method}
                  className={paymentMethod === method ? "selected" : ""}
                  onClick={() => setPaymentMethod(method)}
                >
                  {method === "Card" ? <CreditCard size={19} /> : <Landmark size={19} />}
                  {method}
                </button>
              ))}
            </div>
            {requiresDigitalPayment && (
              <div className="qr-payment">
                <div>
                  <h3>
                    <QrCode size={19} />
                    Scan and Pay
                  </h3>
                  <p>Use this QR for {paymentMethod}. Keep the payment screenshot for order confirmation.</p>
                </div>
                <div className="qr-grid">
                  <img src={selectedPaymentQr} alt={`${paymentMethod} payment QR`} />
                  <img src={selectedPaymentQr === "/payments/payment-qr-1.jpeg" ? "/payments/payment-qr-2.jpeg" : "/payments/payment-qr-1.jpeg"} alt="Alternative digital payment QR" />
                </div>
              </div>
            )}
          </section>
          <section>
            <h2>
              <Truck size={20} />
              Delivery Promise
            </h2>
            <p>Kathmandu Valley delivery starts from 24 hours. Outside valley delivery is confirmed by phone.</p>
          </section>
          <section>
            <h2>
              <Mail size={20} />
              Order Notification
            </h2>
            <p>
              After Place Order, a prepared WhatsApp message to +977 9851223170 and email draft to
              wanozkoirala@gmail.com will open with the buyer and cart details.
            </p>
          </section>
        </div>
        <OrderSummary subtotal={subtotal} deliveryFee={deliveryFee} grandTotal={grandTotal} savings={cartSavings}>
          <button
            className="primary-button"
            disabled={!canPlaceOrder}
            onClick={handlePlaceOrder}
          >
            Place Order
          </button>
          {!canPlaceOrder && cart.length > 0 && (
            <p className="summary-note">Fill all delivery fields before placing the order.</p>
          )}
        </OrderSummary>
      </div>
    </section>
  );

  const renderPage = () => {
    if (route.name === "home") return renderHome();
    if (route.name === "category") return renderCategory();
    if (route.name === "product") return renderProduct();
    if (route.name === "cart") return renderCart();
    if (route.name === "checkout") return renderCheckout();
    if (route.name === "success") {
      return (
        <section className="page-panel success-panel">
          <CheckCircle2 size={72} />
          <h1>Order request received</h1>
          <p>
            SmartKinmelHub will call or message to confirm stock, delivery address, and payment before
            dispatch.
          </p>
          {orderNotice && (
            <div className="notice-actions">
              <a className="primary-button" href={orderNotice.whatsappUrl} target="_blank" rel="noreferrer">
                <MessageCircle size={18} />
                Send WhatsApp Again
              </a>
              <a className="secondary-dark-button" href={orderNotice.emailUrl}>
                <Mail size={18} />
                Email Order Again
              </a>
            </div>
          )}
          <button className="primary-button" onClick={() => navigate({ name: "home" })}>
            Continue Shopping
          </button>
        </section>
      );
    }
    if (route.name === "about") {
      return (
        <InfoPage title="About SmartKinmelHub" eyebrow="Nepal ecommerce" icon={<Info />}>
          <article>
            <h2>Who we are</h2>
            <p>SmartKinmelHub is an owner-managed online store for brand new products, clearance stock, seasonal offers, and promotional inventory.</p>
          </article>
          <article>
            <h2>What we sell</h2>
            <p>Mobiles, electronics, appliances, beauty, kitchen, gaming, accessories, and daily-use products with clear pricing and direct support.</p>
          </article>
        </InfoPage>
      );
    }
    if (route.name === "orders") {
      return (
        <InfoPage title="Orders and Delivery" eyebrow="Track your purchase" icon={<Truck />}>
          <article>
            <h2>Order process</h2>
            <p>Customers place an order, the store confirms availability, and delivery is scheduled by phone or message.</p>
          </article>
          <article>
            <h2>Delivery coverage</h2>
            <p>Kathmandu Valley receives priority delivery. Other districts can be supported through courier confirmation.</p>
          </article>
        </InfoPage>
      );
    }
    if (route.name === "returns") {
      return (
        <InfoPage title="Returns and Warranty" eyebrow="Customer support" icon={<PackageCheck />}>
          <article>
            <h2>Returns</h2>
            <p>Eligible unopened products can be returned after store confirmation. Damaged or incorrect items are handled quickly.</p>
          </article>
          <article>
            <h2>Warranty</h2>
            <p>Warranty support follows each product detail page and brand or store support terms.</p>
          </article>
        </InfoPage>
      );
    }
    if (route.name === "payments") {
      return (
        <InfoPage title="Payment Options" eyebrow="Secure checkout" icon={<CreditCard />}>
          <article>
            <h2>Digital payment</h2>
            <p>Checkout supports eSewa, Khalti, Fonepay, card payment, and manual confirmation flows.</p>
          </article>
          <article>
            <h2>Cash on delivery</h2>
            <p>Cash on delivery can be confirmed for selected products and locations before dispatch.</p>
          </article>
        </InfoPage>
      );
    }
    return (
      <InfoPage title="Contact SmartKinmelHub" eyebrow="We are here to help" icon={<Phone />}>
        <article>
          <h2>Customer care</h2>
          <p>Use the contact page for product questions, order confirmation, delivery support, app updates, and partnership requests.</p>
        </article>
        <article>
          <h2>Business hours</h2>
          <p>Support is designed for fast Nepal-focused response during regular shopping hours.</p>
        </article>
      </InfoPage>
    );
  };

  return (
    <div className="site-shell">
      <header className="top-header">
        <div className="header-main">
          <button
            className="icon-button menu-button"
            aria-label="Open category menu"
            onClick={() => setIsCategoryMenuOpen(true)}
          >
            <Menu />
          </button>
          <button className="brand" onClick={() => navigate({ name: "home" })}>
            <span className="brand-mark">SK</span>
            <span>
              <strong>SmartKinmelHub</strong>
              <small>Smart Shopping for Every Nepali</small>
            </span>
          </button>
          <div className="search-wrap">
            <Search className="search-icon" size={20} />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search mobiles, laptops, appliances and more"
              aria-label="Search products"
            />
            {suggestions.length > 0 && (
              <div className="suggestions">
                {suggestions.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setQuery("");
                      openProduct(item);
                    }}
                  >
                    <img src={item.image} alt="" />
                    <span>{item.name}</span>
                    <small>{money(item.price)}</small>
                  </button>
                ))}
              </div>
            )}
          </div>
          <nav className="header-actions" aria-label="Alerts and cart">
            <button onClick={() => navigate({ name: "contact" })}>
              <Bell size={19} />
              Alerts
            </button>
            <button className="cart-button" onClick={() => navigate({ name: "cart" })}>
              <ShoppingCart size={20} />
              Cart
              <span>{cartCount}</span>
            </button>
          </nav>
        </div>
        <div className="category-bar">
          <button className={route.name === "home" ? "active" : ""} onClick={() => navigate({ name: "home" })}>
            <Home size={15} />
            Home
          </button>
          {categories.slice(0, 9).map((category) => (
            <button
              key={category}
              className={route.name === "category" && route.category === category ? "active" : ""}
              onClick={() => openCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </header>

      {isCategoryMenuOpen && (
        <div className="drawer-backdrop" onClick={() => setIsCategoryMenuOpen(false)}>
          <aside className="category-drawer" onClick={(event) => event.stopPropagation()}>
            <div className="drawer-head">
              <div>
                <p>Shop by category</p>
                <h2>All Categories</h2>
              </div>
              <button className="icon-button drawer-close" onClick={() => setIsCategoryMenuOpen(false)}>
                <X size={20} />
              </button>
            </div>
            <div className="drawer-category-list">
              <button onClick={() => openCategory("All")}>
                <Sparkles size={18} />
                <span>All Products</span>
                <ChevronRight size={16} />
              </button>
              {categories.map((category) => (
                <button key={category} onClick={() => openCategory(category)}>
                  <Sparkles size={18} />
                  <span>{category}</span>
                  <ChevronRight size={16} />
                </button>
              ))}
            </div>
          </aside>
        </div>
      )}

      <main>{renderPage()}</main>

      <footer>
        <div>
          <strong>SmartKinmelHub</strong>
          <p>Smart Shopping for Every Nepali</p>
        </div>
        <nav>
          {navLink("About", { name: "about" })}
          {navLink("Orders", { name: "orders" })}
          {navLink("Returns", { name: "returns" })}
          {navLink("Payments", { name: "payments" })}
          {navLink("Contact", { name: "contact" })}
        </nav>
        <div className="footer-controls">
          <button aria-label="Decrease currency display">
            <Minus size={16} />
          </button>
          <span>NPR</span>
          <button aria-label="Increase currency display">
            <Plus size={16} />
          </button>
        </div>
      </footer>
    </div>
  );
}

function OrderSummary({
  subtotal,
  deliveryFee,
  grandTotal,
  savings = 0,
  children
}: {
  subtotal: number;
  deliveryFee: number;
  grandTotal: number;
  savings?: number;
  children: ReactNode;
}) {
  return (
    <aside className="order-summary">
      <h2>
        <Receipt size={20} />
        Order Summary
      </h2>
      <div>
        <span>Subtotal</span>
        <strong>{money(subtotal)}</strong>
      </div>
      <div>
        <span>Delivery</span>
        <strong>{deliveryFee === 0 ? "Free" : money(deliveryFee)}</strong>
      </div>
      {savings > 0 && (
        <div className="summary-saving">
          <span>You save</span>
          <strong>{money(savings)}</strong>
        </div>
      )}
      <div className="summary-total">
        <span>Total</span>
        <strong>{money(grandTotal)}</strong>
      </div>
      {children}
    </aside>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
