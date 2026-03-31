import { useNavigate } from "react-router-dom"
import { FiHeart, FiShoppingCart, FiEye } from "react-icons/fi"
import "./ProductCard.css"
import { FiStar } from "react-icons/fi"
import { FaStar } from "react-icons/fa"


function ProductCard({ product }) {
  const navigate = useNavigate()
  const img = product.image || product.thumbnail || product.images?.[0] || ""

  return (
    <div className="pcard" onClick={() => navigate(`/product/${product._id}`)}>
      <div className="pcard__badges">
        {product.on_sale && (
          <span className="pcard__badge pcard__badge--sale">-{product.sale_label}</span>
        )}
        {product.is_hot_deal && (
          <span className="pcard__badge pcard__badge--hot">Hot</span>
        )}
      </div>
      <div className="pcard__actions">
        <button onClick={e => e.stopPropagation()}><FiHeart size={16}/></button>
        <button onClick={e => { e.stopPropagation(); navigate(`/product/${product._id}`) }}>
          <FiEye size={16}/>
        </button>
        <button onClick={e => e.stopPropagation()}><FiShoppingCart size={16}/></button>
      </div>
      <div className="pcard__img-wrap">
        <img src={img} alt={product.name}/>
      </div>
      <div className="pcard__info">
        <h4 className="pcard__name">{product.name}</h4>
        <div className="pcard__price">
          {product.on_sale ? (
            <>
              <span className="pcard__price--old">${product.regular_price}</span>
              <span className="pcard__price--sale">${product.sale_price}</span>
            </>
          ) : (
            <span className="pcard__price--current">${product.regular_price}</span>
          )}
        </div>
        <div className="pcard__stars">
          {[...Array(5)].map((_, i) => (
            i < Math.round(product.rating || 4)
              ? <FaStar key={i} size={14} />
              : <FiStar key={i} size={14} />
          ))}
          <span>({product.review_count})</span>
        </div>

      </div>
    </div>
  )
}

export default ProductCard