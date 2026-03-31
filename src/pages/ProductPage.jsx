import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { FiShoppingCart, FiHeart, FiArrowLeft, FiShare2, FiStar } from "react-icons/fi"
import api from "../api/axios"
import ProductCard from "../components/ProductCard"
import "./ProductPage.css"

function ProductPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [product, setProduct] = useState(null)
  const [related, setRelated] = useState([])
  const [mainImg, setMainImg] = useState("")
  const [qty, setQty] = useState(1)
  const [loading, setLoading] = useState(true)
  const [tab, setTab] = useState("description")
  const [imgIdx, setImgIdx] = useState(0)

  useEffect(() => {
    window.scrollTo(0, 0)
    setLoading(true)
    api.get(`/products/${id}`)
      .then(res => {
        const p = res.data
        setProduct(p)
        setMainImg(p.image || p.thumbnail || p.images?.[0] || "")
        setImgIdx(0)
        setLoading(false)
        if (p.category_id) {
          api.get(`/products?category_id=${p.category_id}&limit=6`)
            .then(r => setRelated(r.data.products.filter(x => x._id !== id).slice(0, 4)))
        }
      })
      .catch(() => setLoading(false))
  }, [id])

  const allImgs = product ? [product.image || product.thumbnail, ...(product.images || [])].filter(Boolean).filter((v, i, a) => a.indexOf(v) === i) : []

  const prevImg = () => {
    const idx = (imgIdx - 1 + allImgs.length) % allImgs.length
    setImgIdx(idx); setMainImg(allImgs[idx])
  }
  const nextImg = () => {
    const idx = (imgIdx + 1) % allImgs.length
    setImgIdx(idx); setMainImg(allImgs[idx])
  }

  if (loading) return <div className="pd-loading"><div className="pd-spinner"/></div>
  if (!product) return <div className="pd-loading">Product not found</div>

  const discount = product.on_sale
    ? Math.round((1 - product.sale_price / product.regular_price) * 100)
    : 0

  return (
    <div className="pd-page">

      {/* Breadcrumb */}
      <div className="pd-breadcrumb">
        <div className="container pd-breadcrumb__inner">
          <button onClick={() => navigate(-1)}>
            <FiArrowLeft size={14}/> Back
          </button>
          <span>Home</span>
          <span>Shop</span>
          <span>{product.categoryId?.name || "Category"}</span>
          <span className="pd-breadcrumb__current">{product.name}</span>
        </div>
      </div>

      <div className="container pd-main">

        {/* ── Gallery ── */}
        <div className="pd-gallery">

          {/* Thumbnails — left side */}
          <div className="pd-thumbs">
            <button className="pd-thumb-nav" onClick={prevImg}>▲</button>
            {allImgs.map((img, i) => (
              <div
                key={i}
                className={`pd-thumb ${imgIdx === i ? "pd-thumb--active" : ""}`}
                onClick={() => { setMainImg(img); setImgIdx(i) }}
              >
                <img src={img} alt=""/>
              </div>
            ))}
            <button className="pd-thumb-nav" onClick={nextImg}>▼</button>
          </div>

          {/* Main image */}
          <div className="pd-gallery__main">
            {product.on_sale && (
              <span className="pd-badge pd-badge--sale">-{discount}%</span>
            )}
            <img src={mainImg} alt={product.name}/>
          </div>
        </div>

        {/* ── Info ── */}
        <div className="pd-info">

          {/* Title + rating */}
          <h1 className="pd-title">{product.name}</h1>

          <div className="pd-rating">
            {[1,2,3,4,5].map(s => (
              <FiStar
                key={s}
                size={16}
                fill={s <= Math.round(product.rating) ? "#F9A825" : "none"}
                stroke={s <= Math.round(product.rating) ? "#F9A825" : "#ccc"}
              />
            ))}
            <span className="pd-rating__count">
              ({product.review_count} reviews)
            </span>
            <span className={`pd-stock ${product.in_stock ? "in" : "out"}`}>
              {product.in_stock ? "In Stock" : "Out of Stock"}
            </span>
          </div>

          {/* SKU */}
          {product.sku && (
            <p className="pd-sku">SKU: <span>{product.sku}</span></p>
          )}

          {/* Price */}
          <div className="pd-price">
            {product.on_sale ? (
              <>
                <span className="pd-price--old">${product.regular_price}</span>
                <span className="pd-price--sale">${product.sale_price}</span>
                <span className="pd-price--off">{discount}% Off</span>
              </>
            ) : (
              <span className="pd-price--current">${product.regular_price}</span>
            )}
          </div>

          {/* Brand */}
          {product.brand && (
            <div className="pd-brand">
              <span>Brand:</span>
              <strong>{product.brand}</strong>
            </div>
          )}

          {/* Description */}
          <p className="pd-desc">{product.description || "Fresh organic product, carefully selected for quality."}</p>

          {/* Extra info */}
          <div className="pd-meta-grid">
            {product.weight && (
              <div className="pd-meta-item">
                <span>Weight</span>
                <strong>{product.weight}</strong>
              </div>
            )}
            {product.type && (
              <div className="pd-meta-item">
                <span>Type</span>
                <strong>{product.type}</strong>
              </div>
            )}
            <div className="pd-meta-item">
              <span>Category</span>
              <strong>{product.categoryId?.name || product.category_id}</strong>
            </div>
            {product.stock_quantity && (
              <div className="pd-meta-item">
                <span>Stock</span>
                <strong>{product.stock_quantity.toLocaleString()}</strong>
              </div>
            )}
          </div>

          {/* Tags */}
          {product.tags?.length > 0 && (
            <div className="pd-tags">
              <span>Tags:</span>
              {product.tags.map(t => (
                <button key={t} className="pd-tag" onClick={() => navigate(`/shop?search=${t}`)}>
                  {t}
                </button>
              ))}
            </div>
          )}

          {/* Qty + Actions */}
          <div className="pd-actions">
            <div className="pd-qty">
              <button onClick={() => setQty(q => Math.max(1, q - 1))}>−</button>
              <span>{qty}</span>
              <button onClick={() => setQty(q => q + 1)}>+</button>
            </div>
            <button className="pd-btn-cart">
              <FiShoppingCart size={18}/> Add to Cart
            </button>
            <button className="pd-btn-wish">
              <FiHeart size={18}/>
            </button>
            <button className="pd-btn-share">
              <FiShare2 size={18}/>
            </button>
          </div>

          {/* Delivery info */}
          <div className="pd-delivery">
            <div className="pd-delivery__item">
             <span>Free delivery on orders over <b>$100</b></span>
            </div>
            <div className="pd-delivery__item">
              <span>30 days <b>money-back</b> guarantee</span>
            </div>
            <div className="pd-delivery__item">
               <span><b>100% secure</b> payment</span>
            </div>
          </div>

        </div>
      </div>

      {/* ── Tabs ── */}
      <div className="container pd-tabs-wrap">
        <div className="pd-tabs-nav">
          {["description", "additional", "reviews"].map(t => (
            <button
              key={t}
              className={tab === t ? "pd-tab--active" : ""}
              onClick={() => setTab(t)}
            >
              {t === "description" ? "Description" :
               t === "additional"  ? "Additional Info" : "Reviews"}
            </button>
          ))}
        </div>

        <div className="pd-tabs-content">
          {tab === "description" && (
            <div className="pd-tab-desc">
              <p>{product.description || "No description available."}</p>
              <ul>
                <li>100g of fresh leaves provides essential vitamins and minerals.</li>
                <li>Rich in fiber, vitamins C and K.</li>
                <li>Organically grown without pesticides.</li>
                <li>Fresh daily delivery from local farms.</li>
              </ul>
            </div>
          )}

          {tab === "additional" && (
            <table className="pd-info-table">
              <tbody>
                <tr><td>Name</td><td>{product.name}</td></tr>
                <tr><td>SKU</td><td>{product.sku || "—"}</td></tr>
                <tr><td>Brand</td><td>{product.brand || "—"}</td></tr>
                <tr><td>Weight</td><td>{product.weight || "—"}</td></tr>
                <tr><td>Type</td><td>{product.type || "—"}</td></tr>
                <tr><td>Category</td><td>{product.categoryId?.name || product.category_id}</td></tr>
                <tr><td>In Stock</td><td>{product.in_stock ? "Available" : "Out of stock"}</td></tr>
                {product.stock_quantity && <tr><td>Quantity</td><td>{product.stock_quantity.toLocaleString()}</td></tr>}
                <tr><td>Tags</td><td>{product.tags?.join(", ") || "—"}</td></tr>
              </tbody>
            </table>
          )}

          {tab === "reviews" && (
            <div className="pd-reviews">
              <div className="pd-reviews__summary">
                <div className="pd-reviews__score">
                  <span>{product.rating?.toFixed(1)}</span>
                  <div className="pd-reviews__stars">
                    {[1,2,3,4,5].map(s => (
                      <FiStar key={s} size={20}
                        fill={s <= Math.round(product.rating) ? "#F9A825" : "none"}
                        stroke={s <= Math.round(product.rating) ? "#F9A825" : "#ccc"}
                      />
                    ))}
                  </div>
                  <p>{product.review_count} reviews</p>
                </div>
              </div>
              <p style={{ color:"var(--gray)", fontSize:"14px" }}>
                No written reviews yet. Be the first to review this product.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* ── Related Products ── */}
      {related.length > 0 && (
        <div className="container pd-related">
          <h2 className="section-title">Related Products</h2>
          <div className="pd-related__grid">
            {related.map(p => (
              <ProductCard key={p._id} product={p}/>
            ))}
          </div>
        </div>
      )}

    </div>
  )
}

export default ProductPage