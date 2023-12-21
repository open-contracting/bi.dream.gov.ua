import { useState } from "react";
import "./index.css";

export default function DropDownMenu({
  text,
  icon,
  badgeText,
  children,
  right = false,
  badgeClass = "badge-info",
  dropDownToggle = true,
  dropDownClass="",
}) {
  const [isMenuOpen, SetMenuOpen] = useState(false);
  const handleOpen = (e) => {
    e.preventDefault();
    SetMenuOpen(!isMenuOpen);
  };
  const stateClasses = isMenuOpen ? "show" : "";
  return (
    <>
      <li className={`nav-item dropdown ${stateClasses}`}>
        <a
          className={`nav-link ${isMenuOpen ? 'active bg-light' : ''} ${dropDownToggle ? "dropdown-toggle" : ""}`}
          onClick={handleOpen}
          href="#/"
          // id="navbarDropdown"
          // data-toggle="dropdown"
          role="button"
          aria-haspopup="true"
          aria-expanded={isMenuOpen ? true : false}
        >
          {text}
          {icon && <i className={icon} />}
          {badgeText && (
            <span className={`badge ${badgeClass} navbar-badge`}>
              {badgeText}
            </span>
          )}
        </a>
        <div
          className={`dropdown-menu dropdown-menu-lg ${dropDownClass} ${
            right ? "dropdown-menu-right" : ""
          } ${stateClasses}`}
          aria-labelledby="navbarDropdown"
          onClick={handleOpen}
        >
          {typeof children === 'function' ? children({isMenuOpen, handleOpen}) : children}
        </div>
      </li>
      {isMenuOpen &&
        <div className="menu-overlay" onClick={handleOpen} />
      }
    </>
  );
}
