import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faGoogle, faTelegram, faViber } from "@fortawesome/free-brands-svg-icons";
import { GASendEvent } from './bookmarkUtils';


export function SortByTextButton({
  title,
  isPressed,
  clickHandler,
  isAscSorted
}) {
  return (
    <button
      type="button"
      className={`btn btn-sm bm-toolbtn mr-1 ${isPressed ? 'active' : ''}`}
      title={title}
      aria-pressed={isPressed}
      onClick={clickHandler}
    >
      <i className="lui-icon lui-icon--text" />
      {isPressed &&
        <i className={`lui-icon lui-icon--small ${isAscSorted ? 'lui-icon--triangle-top' : 'lui-icon--triangle-bottom'}`} />
      }
    </button>    
  );
}

export function SortByDateButton({
  title,
  isPressed,
  clickHandler,
  isAscSorted
}) {
  return (
    <button
      type="button"
      className={`btn btn-sm bm-toolbtn mr-1 ${isPressed ? 'active' : ''} `}
      title={title}
      aria-pressed={isPressed}
      onClick={clickHandler}
    >
      <i className="lui-icon lui-icon--calendar mr-1" />
      {isPressed &&
        <i className={`lui-icon lui-icon--small ${isAscSorted ? 'lui-icon--triangle-top' : 'lui-icon--triangle-bottom'}`} />
      }                  
    </button>
  );
}

export function ShowDetailsButton({
  title,
  isPressed,
  clickHandler
}) {
  return (
    <button
      type="button"
      className={`btn btn-sm bm-toolbtn ${ isPressed ? "btn-light active" : ""}`}
      title={title}
      aria-pressed={isPressed}
      onClick={clickHandler}
    >
      <i className="lui-icon lui-icon--info" />
    </button>    
  );
}

export function PublishButton({
  title,
  clickHandler
}) {
  return (
    <button 
      type="button"
      className="btn bm-ops bm-publish mr-1"
      title={title}
      onClick={clickHandler}
    >
      <i className="lui-icon lui-icon lui-icon--small lui-icon--forward" />
      <i className="lui-icon lui-icon lui-icon--group" />
    </button>    
  );
}

export function UnpublishButton({
  title,
  clickHandler
}) {
  return (
    <button 
      type="button"
      className="btn bm-ops bm-unpublish mr-1"
      title={title}
      onClick={clickHandler}
    >
      <i className="lui-icon lui-icon lui-icon--small lui-icon--back" />
      <i className="lui-icon lui-icon lui-icon--group" />
    </button>
  );
}

export function DeleteButton({
  title,
  clickHandler
}) {
  return (
    <button
      type="button"
      className="btn bm-ops bm-remove mr-1"
      title={title}
      onClick={clickHandler}
    >
      <i className="lui-icon lui-icon--remove" />
    </button>
  );
}

export function ShareBookmarkButton({
  title,
  isPressed,
  clickHandler
}) {
  return (
    <div className={`btn-share ${isPressed ? 'dropup' : ''}`}>
      <button 
        type="button"
        onClick={clickHandler}
        title={title}
        className="btn dropdown-toggle bm-ops bm-share mr-1"
        aria-haspopup="true" 
        aria-expanded={isPressed ? "true" : "false"}
      >
        <i className="lui-icon lui-icon lui-icon--share" /> 
        {/* <span className="caret"></span> */}
      </button>
    </div>
  );
}

export function ShareFacebookButton({
  url,
  title="Share Facebook"
}) {
  const urlEncoded = encodeURIComponent(url);
  return (
    <button 
      className="btn fb-share-button"
      title={title}
      data-href={urlEncoded}
      data-layout="button" 
      data-size="small"
      onClick={e => {
        e.preventDefault();
        e.stopPropagation()
        GASendEvent('Bookmarks', 'Share Bookmark', 'Facebook');
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${urlEncoded}`, '_blank');
      }}
    >
      {/* <span className="lui-icon lui-icon--small lui-icon--forward pr-1 text-white" aria-hidden="true" /> */}
      <FontAwesomeIcon icon={faFacebook} color="#ffffff" className="pr-1"/>          
      {/* <span className="ml-1">Share</span> */}
    </button>
  );
}

export function ShareGMailButton({
  url,
  subject,
  title="Send GMAIL"
}) {
  // const urlEncoded = encodeURIComponent(url);
  return (
    <button 
      className="btn goog-share-button"
      title={title}
      onClick={e => {
        e.preventDefault();
        e.stopPropagation()
        GASendEvent('Bookmarks', 'Share Bookmark', 'GMAIL');
        window.open(`https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=&su=${subject}&body=${url}&ui=2&tf=1&pli=1`, '_blank');
      }}
    >
      {/* <span className="lui-icon lui-icon--small lui-icon--forward pr-1 text-white" aria-hidden="true" /> */}
      <FontAwesomeIcon icon={faGoogle} color="#ffffff" className="pr-1"/>          
    </button>
  );
}

export function ShareTelegramButton({url, title = "Telegram"}) {
  return (
    <button 
      className="btn telegram-share-button"
      title={title}
      onClick={e => {
        e.preventDefault();
        e.stopPropagation()
        GASendEvent('Bookmarks', 'Share Bookmark', 'Telegram');
        window.open(`https://t.me/share/url?url=${url}`, '_blank'); // &text={text}
      }}
    >
      <FontAwesomeIcon icon={faTelegram} color="#ffffff" className="pr-1"/>          
    </button>
  );
}

export function ShareViberButton({url, title = "Viber"}) {
  return (
    <button 
      className="btn viber-share-button"
      title={title}
      onClick={e => {
        e.preventDefault();
        e.stopPropagation();
        GASendEvent('Bookmarks', 'Share Bookmark', 'Viber');
        window.open(`viber://forward?text=${url}`, '_blank');
      }}
    >
      <FontAwesomeIcon icon={faViber} color="#ffffff" className="pr-1"/>          
    </button>
  );
}