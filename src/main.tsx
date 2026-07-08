import { StrictMode, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  Bell,
  ChevronRight,
  CreditCard,
  Heart,
  Menu,
  Minus,
  PackageCheck,
  Plus,
  Search,
  ShieldCheck,
  ShoppingCart,
  Smartphone,
  Sparkles,
  Star,
  Truck,
  User,
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
};

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
    stock: 18
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
    stock: 9
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
    stock: 12
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
    stock: 34
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
    stock: 26
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
    stock: 21
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
    stock: 15
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
    stock: 40
  }
];

const banners = [
  "Mega Clearance Week",
  "Brand New Arrivals",
  "Mobile Deals Under NPR 10,000"
];

const money = (value: number) =>
  new Intl.NumberFormat("en-NP", {
    style: "currency",
    currency: "NPR",
    maximumFractionDigits: 0
  }).format(value);

function ProductCard({
  product,
  onAdd
}: {
  product: Product;
  onAdd: (product: Product) => void;
}) {
  const discount = Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100);

  return (
    <article className="product-card">
      <div className="product-media">
        <img src={product.image} alt={product.name} loading="lazy" />
        <span className="badge">{product.badge}</span>
        <button className="icon-button wishlist" aria-label={`Add ${product.name} to wishlist`}>
          <Heart size={18} />
        </button>
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
        <button className="add-button" onClick={() => onAdd(product)}>
          <ShoppingCart size={17} />
          Add to Cart
        </button>
      </div>
    </article>
  );
}

function ProductRail({
  title,
  subtitle,
  items,
  onAdd
}: {
  title: string;
  subtitle: string;
  items: Product[];
  onAdd: (product: Product) => void;
}) {
  return (
    <section className="section">
      <div className="section-heading">
        <div>
          <p>{subtitle}</p>
          <h2>{title}</h2>
        </div>
        <button className="text-button">
          View all
          <ChevronRight size={17} />
        </button>
      </div>
      <div className="product-grid">
        {items.map((product) => (
          <ProductCard key={`${title}-${product.id}`} product={product} onAdd={onAdd} />
        ))}
      </div>
    </section>
  );
}

function App() {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [cartCount, setCartCount] = useState(0);
  const [heroIndex, setHeroIndex] = useState(0);

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

  const visibleProducts = useMemo(() => {
    if (selectedCategory === "All") return products;
    return products.filter((product) => product.category === selectedCategory);
  }, [selectedCategory]);

  const activeBanner = banners[heroIndex % banners.length];

  return (
    <div className="site-shell">
      <header className="top-header">
        <div className="header-main">
          <button className="icon-button menu-button" aria-label="Open menu">
            <Menu />
          </button>
          <a className="brand" href="#">
            <span className="brand-mark">SK</span>
            <span>
              <strong>SmartKinmelHub</strong>
              <small>Smart Shopping for Every Nepali</small>
            </span>
          </a>
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
                  <button key={item.id} onClick={() => setQuery(item.name)}>
                    <img src={item.image} alt="" />
                    <span>{item.name}</span>
                    <small>{money(item.price)}</small>
                  </button>
                ))}
              </div>
            )}
          </div>
          <nav className="header-actions" aria-label="Account and cart">
            <button>
              <User size={19} />
              Account
            </button>
            <button>
              <Bell size={19} />
              Alerts
            </button>
            <button className="cart-button">
              <ShoppingCart size={20} />
              Cart
              <span>{cartCount}</span>
            </button>
          </nav>
        </div>
        <div className="category-bar">
          <button
            className={selectedCategory === "All" ? "active" : ""}
            onClick={() => setSelectedCategory("All")}
          >
            All
          </button>
          {categories.slice(0, 9).map((category) => (
            <button
              key={category}
              className={selectedCategory === category ? "active" : ""}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </header>

      <main>
        <section className="hero">
          <aside className="category-panel">
            <h2>Categories</h2>
            {categories.slice(0, 12).map((category) => (
              <button key={category} onClick={() => setSelectedCategory(category)}>
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
                Brand new products, clearance offers, overstock deals and seasonal discounts
                delivered across Nepal.
              </p>
              <div className="hero-actions">
                <button className="primary-button">Shop Deals</button>
                <button className="secondary-button">Explore Categories</button>
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
            <div>
              <Zap size={22} />
              <strong>Flash Deals</strong>
              <span>Up to 45% off</span>
            </div>
            <div>
              <PackageCheck size={22} />
              <strong>Clearance Sale</strong>
              <span>Limited stock</span>
            </div>
            <div>
              <Truck size={22} />
              <strong>Fast Delivery</strong>
              <span>Kathmandu priority</span>
            </div>
          </aside>
        </section>

        <section className="trust-strip" aria-label="Store benefits">
          <div>
            <ShieldCheck />
            <span>Secure payments</span>
          </div>
          <div>
            <CreditCard />
            <span>eSewa, Khalti, Fonepay, COD</span>
          </div>
          <div>
            <PackageCheck />
            <span>Warranty and returns</span>
          </div>
          <div>
            <Smartphone />
            <span>Mobile-first shopping</span>
          </div>
        </section>

        <section className="promo-banners">
          <div>
            <p>Overstock Inventory</p>
            <h2>Premium products at smarter prices</h2>
          </div>
          <div>
            <p>Seasonal Discounts</p>
            <h2>Fresh campaigns every week</h2>
          </div>
          <div>
            <p>Promotional Products</p>
            <h2>Handpicked offers for Nepal</h2>
          </div>
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
              <button key={category} onClick={() => setSelectedCategory(category)}>
                <Sparkles size={20} />
                <span>{category}</span>
              </button>
            ))}
          </div>
        </section>

        <ProductRail
          title={selectedCategory === "All" ? "Flash Deals" : selectedCategory}
          subtitle="Limited time"
          items={visibleProducts}
          onAdd={() => setCartCount((count) => count + 1)}
        />
        <ProductRail
          title="Clearance Sale Products"
          subtitle="Owner-managed stock"
          items={[...products].reverse().slice(0, 4)}
          onAdd={() => setCartCount((count) => count + 1)}
        />
        <ProductRail
          title="Daily Deals"
          subtitle="Updated for today"
          items={products.slice(2, 6)}
          onAdd={() => setCartCount((count) => count + 1)}
        />
        <ProductRail
          title="Best Sellers"
          subtitle="Loved by shoppers"
          items={products.slice(0, 4)}
          onAdd={() => setCartCount((count) => count + 1)}
        />
        <ProductRail
          title="New Arrivals"
          subtitle="Fresh inventory"
          items={products.slice(4, 8)}
          onAdd={() => setCartCount((count) => count + 1)}
        />

        <section className="brand-showcase">
          <div>
            <p>Brand Showcase</p>
            <h2>Trusted names, clear pricing, fast checkout.</h2>
          </div>
          <div className="brand-list">
            {["Samsung", "Lenovo", "JBL", "Prestige", "Whirlpool", "Noise"].map((brand) => (
              <span key={brand}>{brand}</span>
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
            <form>
              <input placeholder="Enter email or mobile number" aria-label="Newsletter contact" />
              <button type="button">Subscribe</button>
            </form>
          </div>
          <div className="app-promo">
            <p>Mobile App</p>
            <h2>Smart shopping in your pocket.</h2>
            <button>Get App Updates</button>
          </div>
        </section>
      </main>

      <footer>
        <div>
          <strong>SmartKinmelHub</strong>
          <p>Smart Shopping for Every Nepali</p>
        </div>
        <nav>
          <a href="#">About</a>
          <a href="#">Orders</a>
          <a href="#">Returns</a>
          <a href="#">Payments</a>
          <a href="#">Contact</a>
        </nav>
        <div className="footer-controls">
          <button>
            <Minus size={16} />
          </button>
          <span>NPR</span>
          <button>
            <Plus size={16} />
          </button>
        </div>
      </footer>
    </div>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);

