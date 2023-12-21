import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import "./index.css";

export default function UserProfile({ UserDirectory, User, photo }) {
  let Icon; 
  if(UserDirectory === 'FACEBOOK') 
    Icon = <FontAwesomeIcon icon={faFacebook} color="#1b74e4"/>;
  else if (UserDirectory === 'GOOGLE')
    Icon = <FontAwesomeIcon icon={faGoogle} color="#146ebe"/>;
  else Icon = <span></span>;

  return (
      <div 
        className="profile-container"
        title={`${User}`}
      >
        {Icon}
        {photo ?
          <img className="nav-link profile-photo" alt="user profile" src={photo} />
          :
          <FontAwesomeIcon icon={faUser} className="nophoto" />
        }
      </div>
  );
}