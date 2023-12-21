import NavBarDropDownMenu from "components/NavBarDropDownMenu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { faSignIn } from "@fortawesome/free-solid-svg-icons";
import "./index.css";
import ReactGA from "react-ga4";

function SocialLoginClickHandler(social) {  
  ReactGA.event({
    category: "login",
    action: `login_${social}`,
    // label: "your label", // optional
    // value: 99, // optional, must be a number
    // nonInteraction: true, // optional, true/false
    // transport: "xhr", // optional, beacon/xhr/image
  });
  
  // window.ga && 
  //   window.ga('send', 'pageview',  `/login/${social}`);
    //window.ga('send', 'social', social, 'login');
}

export default function UserLoginLink({loginText = ""}) {
  return (
      // <NavBarDropDownMenu
      //   text={loginText}
      //   textClass="login-txt"
      //   icon={<FontAwesomeIcon icon={faSignIn} size="lg" />}
      //   //"lui-icon lui-icon--log-in"
      //   dropDownToggle={false}
      //   preventDefault={false}
      //   // badgeText={items.length > 0 ? items.length : ""}
      //   // badgeClass="badge-success"
      //   dropDownClass="login-menu"
      //   right
      // >
      <li className="nav-item">
        {/* { */}
        <a
          className="nav-item btn-auth google"
          href={`${process.env.REACT_APP_API_SERVICE}/api/auth/login/google?redirect=${window.location.href}`}
          role="button"
          onClick={() => SocialLoginClickHandler('Google')}
        >
          {/* <FontAwesomeIcon icon={faGoogle} color="#ffffff"/>
          <span className="ml-1">Google</span> */}
          <span className="pr-1 login-txt">{loginText}</span>
          <FontAwesomeIcon icon={faSignIn} size="lg"/>
        </a>
      </li>
        // <a
        //   className="btn btn-primary btn-lg facebook"
        //   href={`${process.env.REACT_APP_API_SERVICE}/api/auth/login/facebook?redirect=${window.location.href}`}
        //   role="button"
        //   onClick={() => SocialLoginClickHandler('Facebook')}
        // >
        //   <FontAwesomeIcon icon={faFacebook} color="#ffffff"/>          
        //   <span className="ml-1">Facebook</span>
        // </a>}

      // </NavBarDropDownMenu>
  );
}