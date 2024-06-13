import React from "react";
import "./Navbar.css";
import { assets } from "../../admin_assets/assets";
import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <div className="navbar">
      <Link className="link" to="./">
        <img className="logo" src={assets.logo} alt="logo" />
      </Link>
      <img className="profile" src={assets.profile_image} alt="" />
    </div>
  );
};

export default Navbar;
