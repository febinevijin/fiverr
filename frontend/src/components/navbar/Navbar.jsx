import React, { useEffect, useState } from 'react'
// import {Link} from "react-router-dom"
import "./Navbar.scss"

const Navbar = () => {

    const [active, setActive] = useState(false)
    const [open, setOpen] = useState(false)

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
    <div className={active ? "navbar active" : "navbar"}>
      <div className="container">
        <div className="logo">
          {/* <Link to="/">     */}
          <span className="text">fiverr</span>
          {/* </Link> */}
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
              <div className="user" onClick={()=>setOpen(!open)}>
                <img
                  src="https://pbs.twimg.com/media/FjU2lkcWYAgNG6d.jpg"
                  alt=""
                />
                <span>{currentUser?.name}</span>
               {open &&  <div className="options">
                  {currentUser.isSeller && (
                    <>
                      <span>Gigs</span>
                      <span>Add new gig</span>
                    </>
                  )}
                  <span>Oreders</span>
                  <span>Messages</span>
                  <span>Logout</span>
                </div>}
              </div>
            </>
          )}
        </div>
      </div>

      {active && (
        <>
          <hr />
          <div className="menu">
            <span>test</span>
            <span>test2</span>
          </div>
        </>
      )}
    </div>
  );
}

export default Navbar
