import "./Navbar.css";
import React, { useContext, useState, useEffect } from "react";
import { AiOutlineShopping, AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { Badge } from "@mui/material";
import CartContext from "../../context/Context";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../AuthProvider";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { AiOutlineUser } from "react-icons/ai";


const Navbar = () => {
  const [shadow, setShadow] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const cartContext = useContext(CartContext);
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  let numberOfItems = cartContext.items.reduce((currentNumber, item) => {
    return currentNumber + item.amount;
  }, 0);

  useEffect(() => {
    const scrollListener = () => {
      setShadow(window.scrollY > 10);
    };
    window.addEventListener("scroll", scrollListener);
    return () => window.removeEventListener("scroll", scrollListener);
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <header className={`header ${shadow ? "header__shadow" : ""}`}>
      <div className="header__content">
        <Link to="/" className="header__title">
          GeeksForKicks
        </Link>

        {/* Hamburger Icon for Mobile */}
        <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <AiOutlineClose size={24} color="white" /> : <AiOutlineMenu size={24} color="white" />}
        </div>

        {/* Links - toggle visibility based on screen size */}
        <div className={`nav-links ${menuOpen ? "nav-links--open" : ""}`}>
          <Link to="/AboutUs" className="nav-link" onClick={() => setMenuOpen(false)}>
            About Us
          </Link>
          <Link to="/ContactUs" className="nav-link" onClick={() => setMenuOpen(false)}>
            Contact Us
          </Link>
          <Link to="/products" className="nav-link" onClick={() => setMenuOpen(false)}>
            Products
          </Link>
          <Link to="/joblist" className="nav-link" onClick={() => setMenuOpen(false)}>
            Jobs
          </Link>
          {currentUser ? (
            <>
              <span
                className="nav-link"
                onClick={() => {
                  setMenuOpen(false);
                  navigate("/profile");
                }}
                style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: "6px" }}
              >
                <AiOutlineUser size={18} />
                {currentUser.displayName || currentUser.email}
              </span>


              <span className="nav-link" onClick={handleLogout} style={{ cursor: "pointer" }}>
                Logout
              </span>
            </>
          ) : (
            <Link to="/login" className="nav-link" onClick={() => setMenuOpen(false)}>
              Login/SignUp
            </Link>
          )}
        </div>

        {/* Cart */}
        <Link to="/cart">
          <Badge badgeContent={numberOfItems} color="primary">
            <AiOutlineShopping
              color="white"
              style={{ fontSize: "24px", cursor: "pointer" }}
              className="header__icon"
            />
          </Badge>
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
