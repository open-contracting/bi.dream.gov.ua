import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOut } from "@fortawesome/free-solid-svg-icons";

import UserProfile from "../UserProfile";

export default function UserLogoutLink({ user }) {
  const { UserDirectory, User, Attributes } = user;
  const userId = user.getFullUserId();
  // Redirect excludes search ?params (to exclude qlikTicket)
  const redirect = `${window.location.origin}${window.location.pathname}${window.location.hash}`;
  const photo  = Attributes && Attributes.length > 0 
    ? Attributes[0].photo
    : null;

  return (
    <>
      <li className="nav-item">
        <a
          className="nav-link"
          href={`${process.env.REACT_APP_API_SERVICE}/api/auth/logout/${UserDirectory}/${userId}?redirect=${redirect}`}
          role="button"
        >
          <UserProfile UserDirectory={UserDirectory} User={User} photo={photo} />          
          {/* <i className="lui-icon lui-icon--log-out" /> */}
          <FontAwesomeIcon icon={faSignOut} size="lg" />
        </a>
      </li>
    </>
  );
}