import React, { useContext, useState } from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../context/StoreContext';

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("home");
  const [mobileMenu, setMobileMenu] = useState(false); // mobile toggle state

  const { getTotalCartAmount, token, setToken, food_list } = useContext(StoreContext);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  }

  const cartAmount = food_list && food_list.length > 0 ? getTotalCartAmount() : 0;

  return (
    <div className='navbar'>
      {/* LOGO */}
      <Link to='/'><h3><b>Lahori Kababish</b></h3></Link>

      {/* DESKTOP MENU */}
      <ul className="navbar-menu">
        <Link to='/' onClick={() => setMenu("home")} className={menu === 'home' ? 'active' : ''}>Home</Link>
        <a href='#explore-menu' onClick={() => setMenu("menu")} className={menu === 'menu' ? 'active' : ''}>Menu</a>
        <a href='#footer' onClick={() => setMenu("contact-us")} className={menu === 'contact-us' ? 'active' : ''}>Contact Us</a>
      </ul>

      {/* RIGHT SIDE ICONS */}
      <div className="navbar-right">
        <div className="navbar-search-icon">
          <Link to='/cart'>
            <img src={assets.basket_icon} alt="cart" />
          </Link>
          <div className={cartAmount === 0 ? "" : "dot"}></div>
        </div>

        {!token ? (
          <button onClick={() => setShowLogin(true)}>Sign In</button>
        ) : (
          <div className='navbar-profile'>
            <img src={assets.profile_icon} alt="profile" />
            <ul className='nav-profile-dropdown'>
              <li onClick={() => navigate('/myorders')}>
                <img src={assets.bag_icon} alt="orders" />
                <p>Orders</p>
              </li>
              <hr />
              <li>
                <img src={assets.logout_icon} alt="logout" />
                <p onClick={logout}>Logout</p>
              </li>
            </ul>
          </div>
        )}
      </div>

      {/* MOBILE TOGGLE ICON */}
      <div
        className={`navbar-toggle ${mobileMenu ? "active" : ""}`}
        onClick={() => setMobileMenu(!mobileMenu)}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>

      {/* MOBILE DROPDOWN MENU */}
      {mobileMenu && (
        <div className="navbar-menu-mobile">
          <Link
            to='/'
            onClick={() => {
              setMenu("home");
              setMobileMenu(false);
            }}
            className={menu === 'home' ? 'active' : ''}
          >
            Home
          </Link>

          <a
            href='#explore-menu'
            onClick={() => {
              setMenu("menu");
              setMobileMenu(false);
            }}
            className={menu === 'menu' ? 'active' : ''}
          >
            Menu
          </a>

          <a
            href='#footer'
            onClick={() => {
              setMenu("contact-us");
              setMobileMenu(false);
            }}
            className={menu === 'contact-us' ? 'active' : ''}
          >
            Contact Us
          </a>
        </div>
      )}
    </div>
  )
}

export default Navbar;
