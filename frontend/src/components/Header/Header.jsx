import React from 'react'
import './Header.css'
import Tandori from "./../../assets/tandori.jpeg"
import Fastfoodburger from "./../../assets/fastfoodburgur.jpeg"
import Mix from "./../../assets/3.png"


const Header = () => {
  return (
    <div className='header'>
      <div id="carouselExample" className="carousel slide">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src={Tandori} className="d-block w-100" alt="slide1" />
          </div>
          <div className="carousel-item">
            <img src={Fastfoodburger} className="d-block w-100" alt="slide2" />
          </div>
          <div className="carousel-item">
            <img src={Mix} className="d-block w-100" alt="slide3" />
          </div>
        </div>

        {/* controls */}
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
        </button>

        {/* button overlay */}
        {/* <div className="carousel-caption d-flex justify-content-center">
          <button className="btn btn-light">View Menu</button>
        </div> */}
      </div>
    </div>
  )
}

export default Header
