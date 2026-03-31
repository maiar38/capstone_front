import { useState, useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"
import api from "../api/axios"
import ProductCard from "../components/ProductCard"
import "./HomePage.css"

const FEATURES = [
  { icon: "fa-solid fa-truck", title: "Free Shipping", desc: "On orders over $100" },
  { icon: "fa-solid fa-headset", title: "Customer Support 24/7", desc: "Instant access to support" },
  { icon: "fa-solid fa-lock", title: "100% Secure Payment", desc: "We ensure your money is safe" },
  { icon: "fa-solid fa-rotate-left", title: "Money-Back Guarantee", desc: "30 days money-back guarantee" },
]

const TESTIMONIALS = [
  { name: "Robert Fox", role: "Customer", avatar: "https://shopery.netlify.app/main/src/images/user/img-01.png", text: "Pellentesque eu nibh eget mauris congue mattis nec tellus. Phasellus imperdiet elit eu magna dictum, bibendum cursus velit sodales. Donec sed neque eget." },
  { name: "Dianne Russell", role: "Customer", avatar: "https://shopery.netlify.app/main/src/images/user/img-02.png", text: "Pellentesque eu nibh eget mauris congue mattis nec tellus. Phasellus imperdiet elit eu magna dictum, bibendum cursus velit sodales. Donec sed neque eget." },
  { name: "Jane Cooper", role: "Customer", avatar: "https://shopery.netlify.app/main/src/images/user/img-03.png", text: "Pellentesque eu nibh eget mauris congue mattis nec tellus. Phasellus imperdiet elit eu magna dictum, bibendum cursus velit sodales. Donec sed neque eget." },
  { name: "Robert Fox", role: "Customer", avatar: "https://shopery.netlify.app/main/src/images/user/img-01.png", text: "Pellentesque eu nibh eget mauris congue mattis nec tellus. Phasellus imperdiet elit eu magna dictum, bibendum cursus velit sodales. Donec sed neque eget." },
  { name: "Dianne Russell", role: "Customer", avatar: "https://shopery.netlify.app/main/src/images/user/img-02.png", text: "Pellentesque eu nibh eget mauris congue mattis nec tellus. Phasellus imperdiet elit eu magna dictum, bibendum cursus velit sodales. Donec sed neque eget." },
  { name: "Jane Cooper", role: "Customer", avatar: "https://shopery.netlify.app/main/src/images/user/img-03.png", text: "Pellentesque eu nibh eget mauris congue mattis nec tellus. Phasellus imperdiet elit eu magna dictum, bibendum cursus velit sodales. Donec sed neque eget." },
]

const BLOGS = [
  { date: "18", month: "NOV", cat: "Food", title: "Curabitur porttitor orci eget neque accumsan venenatis. Nunc fermentum.", img: "https://shopery.netlify.app/main/src/images/blogs/blog-01.png" },
  { date: "18", month: "NOV", cat: "Food", title: "Curabitur porttitor orci eget neque accumsan venenatis. Nunc fermentum.", img: "https://shopery.netlify.app/main/src/images/blogs/blog-02.png" },
  { date: "18", month: "NOV", cat: "Food", title: "Curabitur porttitor orci eget neque accumsan venenatis. Nunc fermentum.", img: "https://shopery.netlify.app/main/src/images/blogs/blog-03.png" },
]

const INSTAGRAM = [
  "https://shopery.netlify.app/main/src/images/instagram/img-01.jpg",
  "https://shopery.netlify.app/main/src/images/instagram/img-02.png",
  "https://shopery.netlify.app/main/src/images/instagram/img-03.png",
  "https://shopery.netlify.app/main/src/images/instagram/img-04.png",
  "https://shopery.netlify.app/main/src/images/instagram/img-05.png",
  "https://shopery.netlify.app/main/src/images/instagram/img-06.png",
]

const CATEGORIES = [
  { name: "Fresh Fruit", slug: "fresh-fruit", img: "https://shopery.netlify.app/main/src/images/categories/image-fruits.png" },
  { name: "Fresh Vegetables", slug: "fresh-vegetables", img: "https://shopery.netlify.app/main/src/images/categories/image-icon-vegitables.png" },
  { name: "Meat & Fish", slug: "meat-fish", img: "https://shopery.netlify.app/main/src/images/categories/image-meat.png" },
  { name: "Snacks", slug: "snacks", img: "https://shopery.netlify.app/main/src/images/categories/image-icon-snaks.png" },
  { name: "Beverages", slug: "beverages", img: "https://shopery.netlify.app/main/src/images/categories/img-12.png" },
  { name: "Beauty & Health", slug: "beauty-health", img: "https://shopery.netlify.app/main/src/images/categories/image-icon-beauty.png" },
  { name: "Bread & Bakery", slug: "bread-bakery", img: "https://shopery.netlify.app/main/src/images/categories/image-icon-snaks2.png" },
  { name: "Baking Needs", slug: "baking-needs", img: "https://shopery.netlify.app/main/src/images/categories/img-06.png" },
  { name: "Cooking", slug: "cooking", img: "https://shopery.netlify.app/main/src/images/categories/img-07.png" },
  { name: "Diabetic Food", slug: "diabetic-food", img: "https://shopery.netlify.app/main/src/images/categories/img-08.png" },
  { name: "Dish Detergents", slug: "dish-detergents", img: "https://shopery.netlify.app/main/src/images/categories/image-soda.png" },
  { name: "Oil", slug: "oil", img: "https://shopery.netlify.app/main/src/images/categories/image-oil.png" },
]

// ── Drag Carousel ─────────────────────────────────────────
function DragCarousel({ children, title, onViewAll, auto = false }) {
  const ref = useRef()
  const [dragging, setDragging] = useState(false)
  const [startX, setStartX]     = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)

  useEffect(() => {
    if (!auto || !ref.current) return
    const id = setInterval(() => {
      const el = ref.current
      if (!el) return
      if (el.scrollLeft + el.clientWidth >= el.scrollWidth - 2) {
        el.scrollTo({ left: 0, behavior: "smooth" })
      } else {
        el.scrollBy({ left: 220, behavior: "smooth" })
      }
    }, 3000)
    return () => clearInterval(id)
  }, [auto])

  const onDown = (e) => {
    setDragging(true)
    setStartX(e.pageX - ref.current.offsetLeft)
    setScrollLeft(ref.current.scrollLeft)
    ref.current.style.cursor = "grabbing"
  }
  const onUp = () => { setDragging(false); if (ref.current) ref.current.style.cursor = "grab" }
  const onMove = (e) => {
    if (!dragging) return
    e.preventDefault()
    const x = e.pageX - ref.current.offsetLeft
    ref.current.scrollLeft = scrollLeft - (x - startX) * 1.5
  }

  return (
    <div className="carousel-wrap">
      <div className="carousel-head">
        <h2 className="section-title">{title}</h2>
        {onViewAll && <button className="see-all" onClick={onViewAll}>View All →</button>}
      </div>
      <div
        className="carousel-track"
        ref={ref}
        onMouseDown={onDown}
        onMouseUp={onUp}
        onMouseLeave={onUp}
        onMouseMove={onMove}
      >
        {children}
      </div>
    </div>
  )
}

// ── HomePage ──────────────────────────────────────────────
function HomePage() {
  const [products, setProducts] = useState([])
  const [hotDeals, setHotDeals] = useState([])
  const [loading,  setLoading]  = useState(true)

  // testimonials drag
  const testiRef = useRef()
  const [tDrag,   setTDrag]   = useState(false)
  const [tStartX, setTStartX] = useState(0)
  const [tScroll, setTScroll] = useState(0)

  const navigate = useNavigate()

  useEffect(() => {
    api.get("/products?limit=10")
      .then(res => { setProducts(res.data.products); setLoading(false) })
      .catch(() => setLoading(false))

    api.get("/products/hot-deals")
      .then(res => setHotDeals(res.data))
      .catch(err => console.log(err))
  }, [])

  return (
    <div className="home">

      {/* ── Hero ── */}
<section className="hero-section">
  <div className="container">
    <div className="hero-banner">
      <div className="hero-banner__content">
        <p className="hero-banner__welcome">WELCOME TO SHOPERY</p>
        <h1 className="hero-banner__title">Fresh &amp; Healthy<br />Organic Food</h1>
        <p className="hero-banner__sub">Sale up to <span className="hero-banner__off">30% OFF</span></p>
        <p className="hero-banner__desc">Free shipping on all your order, we deliver, you enjoy</p>
        <button className="hero-banner__btn" onClick={() => navigate("/shop")}>
          Shop now <i className="fa-solid fa-arrow-right ms-1"></i>
        </button>
      </div>
      <div className="hero-banner__img-wrap">
        <img
          src="https://shopery.netlify.app/main/src/images/banner/banner-lg-03.jpg"
          alt="Fresh Organic Food"
          className="hero-banner__img"
        />
      </div>
    </div>
    <div className="hero-dots">
      <span className="hero-dot"></span>
      <span className="hero-dot hero-dot--active"></span>
      <span className="hero-dot"></span>
    </div>
  </div>
</section>
      {/* ── Features strip ── */}
      {/* CHANGED: moved into .container for proper edge spacing */}
      <section className="features">
        <div className="container features__grid">
          {FEATURES.map((f, i) => (
            <div key={i} className="feature__item">
              <span className="feature__icon">
                <i className={f.icon}></i>
              </span>
              <div>
                <h4>{f.title}</h4>
                <p>{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Popular Categories ── */}
      <section className="section">
        <div className="container">
          <div className="section__head">
            <h2 className="section-title">Popular Categories</h2>
            <button className="see-all" onClick={() => navigate("/shop")}>View All →</button>
          </div>
          {/* CHANGED: 6-column grid to match design (was unspecified) */}
          <div className="cat-grid">
            {CATEGORIES.map(cat => (
              <div
                key={cat.slug}
                className="cat-card"
                onClick={() => navigate(`/shop?category_id=${cat.slug}`)}
              >
                <div className="cat-card__img">
                  <img src={cat.img} alt={cat.name} />
                </div>
                <p>{cat.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Popular Products ── */}
      <section className="section" style={{ background: "var(--gray-light)" }}>
        <div className="container">
          <div className="section__head">
            <h2 className="section-title">Popular Products</h2>
            <button className="see-all" onClick={() => navigate("/shop")}>View All →</button>
          </div>
          {loading
            ? <p style={{ padding: "20px", color: "var(--gray)" }}>Loading...</p>
            : (
              <div className="pop-grid">
                {products.map(p => <ProductCard key={p._id} product={p} />)}
              </div>
            )
          }
        </div>
      </section>

      {/* ── Promo 3-Column Banners ── */}
      {/* CHANGED: replaced inline styles with semantic class names, added countdown timer pill */}
      <section className="promos3">
        <div className="container promos3__grid">
          <div className="promo3__card promo3__card--blue" onClick={() => navigate("/shop")}>
            <div className="promo3__text">
              <span>BEST DEALS</span>
              <h3>Sale Of The Month</h3>
              <button>Shop Now →</button>
            </div>
            <img src="https://shopery.netlify.app/main/src/images/banner/banner-sm-03.png" alt="" />
          </div>
          <div className="promo3__card promo3__card--dark" onClick={() => navigate("/shop")}>
            <div className="promo3__text">
              <span>85% FAT FREE</span>
              <h3>Low-Fat Meat</h3>
              <p>Started at <b>$79.99</b></p>
              <button>Shop Now →</button>
            </div>
            <img src="https://shopery.netlify.app/main/src/images/banner/banner-sm-01.png" alt="" />
          </div>
          <div className="promo3__card promo3__card--yellow" onClick={() => navigate("/shop")}>
            <div className="promo3__text">
              <span>SUMMER SALE</span>
              <h3>100% Fresh Fruit</h3>
              <p>Up to <b className="badge">64% OFF</b></p>
              <button>Shop Now →</button>
            </div>
            <img src="https://shopery.netlify.app/main/src/images/banner/banner-sm-02.png" alt="" />
          </div>
        </div>
      </section>

      {/* ── Hot Deals carousel ── */}
      {hotDeals.length > 0 && (
        <section className="section">
          <div className="container">
            <DragCarousel title="Hot Deals" onViewAll={() => navigate("/shop")}>
              {hotDeals.map(p => (
                <div key={p._id} className="carousel-item">
                  <ProductCard product={p} />
                </div>
              ))}
            </DragCarousel>
          </div>
        </section>
      )}

      {/* ── Featured Products — auto + drag carousel ── */}
      <section className="section" style={{ background: "var(--gray-light)" }}>
        <div className="container">
          <DragCarousel title="Featured Products" onViewAll={() => navigate("/shop")} auto={true}>
            {[...products, ...products].map((p, i) => (
              <div key={`feat-${i}`} className="carousel-item">
                <ProductCard product={p} />
              </div>
            ))}
          </DragCarousel>
        </div>
      </section>

      {/* ── Latest News / Blog ── */}
      {/* CHANGED: moved before testimonials to match Figma order */}
      <section className="section">
        <div className="container">
          <div className="section__head">
            <h2 className="section-title">Latest News</h2>
            <button className="see-all">View All →</button>
          </div>
          <div className="blog-grid">
            {BLOGS.map((b, i) => (
              <div key={i} className="blog-card">
                <div className="blog-img">
                  <img src={b.img} alt={b.title} />
                  <div className="blog-date">
                    <span>{b.date}</span>
                    <span>{b.month}</span>
                  </div>
                </div>
                <div className="blog-body">
                  <div className="blog-meta">
                    <span>{b.cat}</span>
                    <span>By Admin</span>
                    <span>65 Comments</span>
                  </div>
                  <p>{b.title}</p>
                  <button className="blog-read">Read More →</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      {/* CHANGED: reordered after blog to match Figma; bg applied via class */}
      <section className="section testi-section">
        <div className="container">
          <div className="section__head">
            <h2 className="section-title">Client Testimonials</h2>
          </div>
          <div
            className="carousel-track"
            ref={testiRef}
            onMouseDown={e => {
              setTDrag(true)
              setTStartX(e.pageX - testiRef.current.offsetLeft)
              setTScroll(testiRef.current.scrollLeft)
              testiRef.current.style.cursor = "grabbing"
            }}
            onMouseUp={() => { setTDrag(false); if (testiRef.current) testiRef.current.style.cursor = "grab" }}
            onMouseLeave={() => { setTDrag(false); if (testiRef.current) testiRef.current.style.cursor = "grab" }}
            onMouseMove={e => {
              if (!tDrag) return
              e.preventDefault()
              const x = e.pageX - testiRef.current.offsetLeft
              testiRef.current.scrollLeft = tScroll - (x - tStartX) * 1.5
            }}
          >
            {[...TESTIMONIALS, ...TESTIMONIALS].map((t, i) => (
              <div key={i} className="carousel-item testi-item">
                <div className="testi-card">
                  <div className="testi-quote">"</div>
                  <p>{t.text}</p>
                  <div className="testi-user">
                    <img src={t.avatar} alt={t.name} />
                    <div>
                      <h4>{t.name}</h4>
                      <span>{t.role}</span>
                    </div>
                    <div className="testi-stars">★★★★★</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Instagram ── */}
      <section className="section" style={{ paddingBottom: 0 }}>
        <div className="container">
          <h2 className="section-title" style={{ textAlign: "center", marginBottom: "20px" }}>
            Follow Us On Instagram
          </h2>
        </div>
        <div className="instagram-grid">
          {INSTAGRAM.map((img, i) => (
            <div key={i} className="instagram-item">
              <img src={img} alt="" />
              <div className="instagram-overlay"><span>+</span></div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Newsletter ── */}
      <section className="newsletter">
        <div className="container newsletter__inner">
          <div>
            <h3>Subscribe to Our Newsletter</h3>
            <p>Get weekly updates on new products and deals.</p>
          </div>
          <div className="newsletter__form">
            <input type="email" placeholder="Enter your email address" />
            <button>Subscribe</button>
          </div>
        </div>
      </section>

    </div>
  )
}

export default HomePage
