import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import "./Navbar.scss";
import { AuthContext } from "../../context/Context";

const Navbar = () => {
  const {
    logout,
    authState: { user, isLogged },
  } = AuthContext();

  const [active, setActive] = useState(false);
  const [open, setOpen] = useState(false);

  const { pathname } = useLocation();

  const logoutSession = () => {
    logout();
  };

  const isActive = () => {
    window.scrollY > 0 ? setActive(true) : setActive(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", isActive);

    return () => {
      window.removeEventListener("scroll", isActive);
    };
  }, []);

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
          {!isLogged && (
            <span>
              <Link to="/login" className="link">
                login
              </Link>
            </span>
          )}

          {!user.isSeller && <span>Become A Seller</span>}
          {!isLogged && <button>Join</button>}
          {isLogged && (
            <>
              <div className="user" onClick={() => setOpen(!open)}>
                <img src={user.img} alt="" />
                <span>{user?.name}</span>
                {open && (
                  <div className="options">
                    {user.isSeller && (
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
                    <Link to="" className="link" onClick={logoutSession}>
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
          <hr />
        </>
      )}
    </div>
  );
};

export default Navbar;
