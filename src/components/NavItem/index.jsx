import { Link, useLocation } from "react-router-dom";
import "./index.css";

export default function NavItem({ to, icon, text }) {
  const loc = useLocation();
  // inhcolor
  return (
    <li className="nav-item">
      <Link
        className={`nav-link ${loc.pathname === to ? "active" : ""}`}
        to={to}
      >
        {icon &&
          (typeof icon === "string" ? (
            <i className={icon}></i>
          ) : (
            <span className="nav-icon">{icon}</span>
          ))}
        <p>{text}</p>
      </Link>
    </li>
  );
}
