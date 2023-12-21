import { useState } from "react";
import "./index.css";

export default function ExpandableNavItem({ text, icon, isOpen, children }) {
  const [isMenuOpen, SetMenuOpen] = useState(isOpen);
  const handleOpen = (e) => {
    e.preventDefault();
    // if(!e.target.classList.contains("nav-link"))
    SetMenuOpen(!isMenuOpen);
  };
  return (
    <li
      className={`nav-item ${isMenuOpen ? "menu-open" : ""}`}
      
    >
      <a className="nav-link" href="#/" onClick={handleOpen}>
        <i className={icon}></i>
        <p>
          {text}
          <i className="right lui-icon lui-icon--arrow-left"></i>
        </p>
      </a>
      <ul
        className="nav nav-treeview"
        style={{ display: isMenuOpen ? "block" : "none" }}
      >
        {children}
      </ul>
    </li>
  );
}
