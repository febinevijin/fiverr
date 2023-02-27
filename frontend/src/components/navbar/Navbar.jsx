import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

import "./Navbar.scss"

const Navbar = () => {

    const [active, setActive] = useState(false)
  const [open, setOpen] = useState(false)
  
  const {pathname} = useLocation()

    const isActive = () => {
       window.scrollY > 0 ? setActive(true) : setActive(false) 
    }

    useEffect(() => {
      window.addEventListener("scroll",isActive)
    
      return () => {
        window.removeEventListener("scroll",isActive)
      }
    }, [])
  
  const currentUser = {
    id: 1,
    name: "febin",
    isSeller: true,
  }
    
  return (
    <div className={active || pathname !== "/" ? "navbar active" : "navbar"}>
      <div className="container">
        <div className="logo">
          <Link to="/" className="link">
            <span className="text">fiverr</span>
          </Link>
          <span className="dot">.</span>
        </div>
        <div className="links">
          <span>Fiverr Buisness</span>
          <span>Explorer</span>
          <span>English</span>
          <span>Sign In</span>
          {!currentUser.isSeller && <span>Become A Seller</span>}
          {!currentUser && <button>Join</button>}
          {currentUser && (
            <>
              <div className="user" onClick={() => setOpen(!open)}>
                <img
                  src="https://pbs.twimg.com/media/FjU2lkcWYAgNG6d.jpg"
                  alt=""
                />
                <span>{currentUser?.name}</span>
                {open && (
                  <div className="options">
                    {currentUser.isSeller && (
                      <>
                        <Link to="/mygigs" className="link">
                          Gigs
                        </Link>
                        <Link to="/add" className="link">
                          Add new gig
                        </Link>
                      </>
                    )}
                    <Link to="/orders" className="link">
                      Oreders
                    </Link>
                    <Link to="/messages" className="link">
                      Messages
                    </Link>
                    <Link to="/" className="link">
                      Logout
                    </Link>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>

      {(active || pathname !== "/") && (
        <>
          <hr />
          <div className="menu">
            <Link className="link menuLink" to="/">
              Graphics & Design
            </Link>
            <Link className="link menuLink" to="/">
              Video & Animation
            </Link>
            <Link className="link menuLink" to="/">
              Writing & Translation
            </Link>
            <Link className="link menuLink" to="/">
              AI Services
            </Link>
            <Link className="link menuLink" to="/">
              Digital Marketing
            </Link>
            <Link className="link menuLink" to="/">
              Music & Audio
            </Link>
            <Link className="link menuLink" to="/">
              Programming & Tech
            </Link>
            <Link className="link menuLink" to="/">
              Business
            </Link>
            <Link className="link menuLink" to="/">
              Lifestyle
            </Link>
          </div>
        </>
      )}
    </div>
  );
}

export default Navbar
