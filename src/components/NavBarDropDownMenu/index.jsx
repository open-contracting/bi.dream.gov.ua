import { useState } from "react";
import "./index.css";

export default function NavBarDropDownMenu({
  text,
  icon,
  badgeText,
  children,
  right = false,
  badgeClass = "badge-info",
  textClass="",
  dropDownToggle = true,
  dropDownClass="",
  preventDefault = true,
  stateHandler,
}) {
  const [isMenuOpen, SetMenuOpen] = useState(false);
  const handleOpen = (e) => {
    preventDefault && e.preventDefault();
    const newState = !isMenuOpen;
    SetMenuOpen(newState);
    stateHandler && stateHandler(newState);
  };
  const stateClasses = isMenuOpen ? "show" : "";
  return (
    <>
      <li className={`nav-item dropdown ${stateClasses}`}>
        <div
          className={`nav-link ${isMenuOpen ? 'active bg-light' : ''} ${dropDownToggle ? "dropdown-toggle" : ""}`}
          onClick={handleOpen}
          // href="#/"
          // id="navbarDropdown"
          // data-toggle="dropdown"
          role="button"
          aria-haspopup="true"
          aria-expanded={isMenuOpen ? true : false}
        >
          {text &&
          <span className={`pr-1 ${textClass}`}>{text}</span>
          }
          {icon && (typeof(icon) == 'string' ?
            <i className={icon} />
            :
            icon
          )}
          {badgeText && (
            <span className={`badge ${badgeClass} navbar-badge`}>
              {badgeText}
            </span>
          )}
        </div>
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
