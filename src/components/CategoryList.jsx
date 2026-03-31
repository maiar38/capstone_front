import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import api from "../api/axios"
import "./CategoryList.css"

function CategoryList() {
  const [categories, setCategories] = useState([])
  const [active, setActive] = useState("all")
  const navigate = useNavigate()

  useEffect(() => {
    api.get("/categories").then(res => setCategories(res.data))
  }, [])

  const handleClick = (slug) => {
    setActive(slug)
    if (slug === "all") navigate("/shop")
    else navigate(`/shop?category_id=${slug}`)
  }

  return (
    <div className="catlist">
      <button
        className={`catlist__pill ${active === "all" ? "catlist__pill--active" : ""}`}
        onClick={() => handleClick("all")}
      >
        All
      </button>
      {categories.map(cat => (
        <button
          key={cat._id}
          className={`catlist__pill ${active === cat.slug ? "catlist__pill--active" : ""}`}
          onClick={() => handleClick(cat.slug)}
        >
          <img src={cat.image} alt={cat.name} className="catlist__icon" />
          {cat.name}
        </button>
      ))}
    </div>
  )
}

export default CategoryList