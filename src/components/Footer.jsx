import { Link } from "react-router-dom"
import { FiFacebook, FiTwitter, FiInstagram, FiYoutube } from "react-icons/fi"
import "./Footer.css"

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__grid">

        {/* Logo + desc */}
        <div className="footer__col">
          <h3 className="footer__logo">Ecobazar</h3>
          <p className="footer__desc">
            Morbi cursus porttitor enim lobortis molestie. Duis gravida turpis dui,
            eget bibendum magna congue nec.
          </p>
          <p className="footer__contact">
            <b>(219) 555-0114</b>  or  <b>proxy@gmail.com</b>
          </p>
          <div className="footer__social">
            <a href="#"><FiFacebook size={18}/></a>
            <a href="#"><FiTwitter  size={18}/></a>
            <a href="#"><FiInstagram size={18}/></a>
            <a href="#"><FiYoutube  size={18}/></a>
          </div>
        </div>

        {/* My Account */}
        <div className="footer__col">
          <h4>My Account</h4>
          <ul>
            <li><Link to="/profile">My Account</Link></li>
            <li><Link to="/shop">Order History</Link></li>
            <li><Link to="/shop">Shopping Cart</Link></li>
            <li><Link to="/shop">Wishlist</Link></li>
          </ul>
        </div>

        {/* Helps */}
        <div className="footer__col">
          <h4>Helps</h4>
          <ul>
            <li><Link to="#">Contact</Link></li>
            <li><Link to="#">FAQ</Link></li>
            <li><Link to="#">Terms & Condition</Link></li>
            <li><Link to="#">Privacy Policy</Link></li>
          </ul>
        </div>

        {/* Proxy */}
        <div className="footer__col">
          <h4>Categories</h4>
          <ul>
            <li><Link to="/shop?category_id=fresh-fruit">Fruit & Vegetables</Link></li>
            <li><Link to="/shop?category_id=fresh-fruit">Meat & Fish</Link></li>
            <li><Link to="/shop?category_id=fresh-fruit">Bread & Bakery</Link></li>
            <li><Link to="/shop?category_id=fresh-fruit">Beauty & Health</Link></li>
            <li><Link to="/shop?category_id=fresh-fruit">Beverages</Link></li>
          </ul>
        </div>

      </div>

      {/* Bottom */}
      <div className="footer__bottom">
        <div className="container footer__bottom-inner">
          <p>Ecobazar eCommerce © {new Date().getFullYear()}. All Rights Reserved</p>
          <div className="footer__payments">
            <img src="https://shopery.netlify.app/main/src/images/brand-icon/img-01.png" alt=""/>
            <img src="https://shopery.netlify.app/main/src/images/brand-icon/img-02.png" alt=""/>
            <img src="https://shopery.netlify.app/main/src/images/brand-icon/img-03.png" alt=""/>
            <img src="https://shopery.netlify.app/main/src/images/brand-icon/img-04.png" alt=""/>
            <img src="https://shopery.netlify.app/main/src/images/brand-icon/img-05.png" alt=""/>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer