import { useState, useRef, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { FiSearch, FiHeart, FiShoppingBag, FiChevronDown, FiMenu, FiX, FiMapPin, FiPhone } from "react-icons/fi"
import { FaLeaf } from "react-icons/fa"
import "./Navbar.css"


function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [search,   setSearch]   = useState("")
  const [mobileOpen, setMobile] = useState(false)
  const [pagesOpen,  setPages]  = useState(false)
  const pagesRef = useRef()

  // close pages dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (pagesRef.current && !pagesRef.current.contains(e.target))
        setPages(false)
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [])

  const handleSearch = (e) => {
    e.preventDefault()
    if (search.trim()) { navigate(`/shop?search=${search}`); setSearch("") }
  }

  const handleLogout = () => { logout(); navigate("/login") }

  return (
    <header className="hdr">

      {/* ── Top Bar ── */}
      <div className="hdr-top">
        <div className="container hdr-top__inner">
          <div className="hdr-top__left">
            <FiMapPin size={13}/>
            <span>Store Location: Lincoln- 344, Illinois, Chicago, USA</span>
          </div>
          <div className="hdr-top__right">
            <span className="hdr-top__lang">Eng <FiChevronDown size={12}/></span>
            <span className="hdr-top__sep">|</span>
            <span className="hdr-top__lang">USD <FiChevronDown size={12}/></span>
            <span className="hdr-top__sep">|</span>
            {user ? (
              <>
                <Link to="/profile">{user.name}</Link>
                <span className="hdr-top__sep">/</span>
                <button className="hdr-top__btn" onClick={handleLogout}>Sign out</button>
              </>
            ) : (
              <>
                <Link to="/login">Sign in</Link>
                <span className="hdr-top__sep">/</span>
                <Link to="/register">Sign up</Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* ── Main Bar ── */}
      <div className="hdr-main">
        <div className="container hdr-main__inner">

          {/* Logo */}
          <Link to="/" className="hdr-logo">
            <FaLeaf size={24} />
            <span>Ecobazar</span>
          </Link>


          {/* Search */}
          <form className="hdr-search" onSubmit={handleSearch}>
            <FiSearch size={16} className="hdr-search__icon"/>
            <input
              type="text"
              placeholder="Search"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            <button type="submit">Search</button>
          </form>

          {/* Icons */}
          <div className="hdr-icons">
            <button className="hdr-icon">
              <FiHeart size={22}/>
            </button>
            <button className="hdr-icon hdr-icon--cart" onClick={() => navigate("/shop")}>
              <FiShoppingBag size={22}/>
              <span className="hdr-cart-badge">2</span>
              <div className="hdr-cart-info">
                <span>Shopping cart:</span>
                <strong>$57.00</strong>
              </div>
            </button>
            <button
              className="hdr-hamburger"
              onClick={() => setMobile(o => !o)}
            >
              {mobileOpen ? <FiX size={24}/> : <FiMenu size={24}/>}
            </button>
          </div>

        </div>
      </div>

      {/* ── Nav Bar ── */}
      <nav className={`hdr-nav ${mobileOpen ? "hdr-nav--open" : ""}`}>
        <div className="container hdr-nav__inner">

          {/* Links */}
          <div className="hdr-nav__links">

            {/* Home */}
            <Link to="/" className="hdr-nav__link" onClick={() => setMobile(false)}>
              Home
            </Link>

            {/* Shop */}
            <Link to="/shop" className="hdr-nav__link" onClick={() => setMobile(false)}>
              Shop
            </Link>

            {/* Pages dropdown */}
            <div className="hdr-nav__dropdown" ref={pagesRef}>
              <button
                className="hdr-nav__link hdr-nav__link--drop"
                onClick={() => setPages(o => !o)}
              >
                Pages <FiChevronDown size={14}/>
              </button>
              {pagesOpen && (
                <div className="hdr-dropdown__menu">
                  <Link to="/login" onClick={() => { setPages(false); setMobile(false) }}>Sign In</Link>
                  <Link to="/register" onClick={() => { setPages(false); setMobile(false) }}>Sign Up</Link>
                  <Link to="/profile" onClick={() => { setPages(false); setMobile(false) }}>My Profile</Link>
                </div>
              )}
            </div>

          </div>

          {/* Phone */}
          <div className="hdr-nav__phone">
            <FiPhone size={16}/>
            <span>(219) 555-0114</span>
          </div>

        </div>
      </nav>

    </header>
  )
}

export default Navbar