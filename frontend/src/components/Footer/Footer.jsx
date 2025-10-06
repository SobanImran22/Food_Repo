import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'
import Payment from './../../assets/63.png'

const Footer = () => {
  return (
    <footer className='footer' id='footer'>
      <div className="footer-content">
        <div className="footer-content-left">
          <p className="footer-quote">“Sizzle, Spice, and Everything Nice! 🍢
Experience the authentic taste of Lahore with every kabab, curry, and tandoori delight at Lahori Kababish – where flavor meets tradition.”</p>

          <div className="footer-social-icons">
            <img src={assets.facebook_icon} alt="facebook" />
            <img src={assets.twitter_icon} alt="twitter" />
            <img src={assets.linkedin_icon} alt="linkedin" />
          </div>

          <img src={Payment} alt="payment methods" className="footer-payment" />
        </div>

        <div className="footer-content-center">
          <h2>COMPANY</h2>
          <ul>
            <li>Home</li>
            <li>About Us</li>
            <li>Delivery</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        <div className="footer-content-right">
          <h2>GET IN TOUCH</h2>
          <ul>
            <li>01615664907</li>
            <li>353 Hollinwood Avenue Manchester M40 OJX</li>
            <li>Open 7 Days a week</li>
            <li>4:00PM to 11:30PM</li>
          </ul>
        </div>
      </div>

      <hr />
      <p className="footer-copyright">Copyright 2025 @ Lahorikababish.co.uk - All Rights Reserved</p>
    </footer>
  )
}

export default Footer
