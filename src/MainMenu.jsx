import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

//import ExpandableNavItem from "components/ExpandableNavItem";
import NavItem from "components/NavItem";

export default function MainMenu({ menuLayout, closeMenuHandler }) {
  let location = useLocation();
  useEffect(() => {
    closeMenuHandler && closeMenuHandler();
  }, [location, closeMenuHandler]);

  return (
    <>
      {/* <li className="nav-item">
        <a
          className="nav-link jumpapp"
          href="https://war-bi.qnalytics.com/"
          target="_blank"
          rel="noreferrer"
        >
          <i className="lui-icon  lui-icon--log-in"></i>
          <p>{menuLayout.MenuItem27}</p>
        </a>
      </li> */}
      <NavItem
        to="/"
        text={menuLayout.MenuItem1}
        icon={<FontAwesomeIcon icon="home" />}
        //icon="nav-icon fas fa-home"
      />
      <NavItem
        to="/projects"
        text={menuLayout.MenuItem2}
        icon={<FontAwesomeIcon icon="layer-group" />} //"nav-icon fas fa-money-check"
      />
      <NavItem
        to="/projectDetails"
        text={menuLayout.MenuItem3}
        icon={<FontAwesomeIcon icon="list" />}
      />
      <NavItem
        to="/financing"
        text={menuLayout.MenuItem4}
        icon={<FontAwesomeIcon icon="hand-holding-dollar" />}
      />
      <NavItem
        to="/financingDetails"
        text={menuLayout.MenuItem5}
        //icon="nav-icon fas fa-industry"
        icon={<FontAwesomeIcon icon="receipt" />}
      />
      <NavItem
        to="/budget"
        text={menuLayout.MenuItem7}
        //icon="nav-icon fas fa-industry"
        icon={<FontAwesomeIcon icon="sack-dollar" />}
      />
      <NavItem
        to="/dataAvailability"
        text={menuLayout.MenuItem6}
        //icon="nav-icon fas fa-industry"
        icon={<FontAwesomeIcon icon="database" />}
      />
      {/* <div className="col-12 as-of-date-disclaimer">
        <p>
        {menuLayout.KPIsAsOfDate}
        </p>
      </div> */}
    </>
  );
}
