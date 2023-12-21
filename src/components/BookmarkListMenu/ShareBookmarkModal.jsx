import { CopyAndNotify, GASendEvent } from "./bookmarkUtils";
import { ShareFacebookButton, ShareGMailButton, ShareTelegramButton, ShareViberButton } from "./ToolButtons";


export function ShareBookmark({
  copyClipboard = "Copy to clipboard",
  shareFacebookText = "Share Facebook",
  sendGMailText = "Send Email",
  bookmarkId,
  user
}) {
  const { origin, pathname } = window.location;
  const bookmarkURL = `${origin}${pathname}?bookmark=${bookmarkId}`;

  const copyToClipboardHandler = (e) => {
    e.stopPropagation();
    e.preventDefault();
    CopyAndNotify(e, bookmarkURL);
    GASendEvent('Bookmarks', 'Share Bookmark', 'Clipboard');
  }

  return (
    <div className="form-group">
      <label htmlFor="bookmarkURL">URL</label>
      <div className="input-group">
        <input
          type="text"
          autoFocus
          className="form-control"
          id="bookmarkURL"
          name="bookmarkURL"
          defaultValue={bookmarkURL}
          onClick={copyToClipboardHandler}
          // readOnly                  
        />
        <span className="input-group-btn input-group-append">
          <button 
            className="btn btn-success" 
            type="button" 
            title={copyClipboard}
            onClick={copyToClipboardHandler}
          >
            <i className="lui-icon lui-icon--copy" />
          </button>
        </span>

        {user && user.UserDirectory === 'FACEBOOK' &&
          <span className="input-group-btn input-group-append">
            <ShareFacebookButton
              url={bookmarkURL}
              title={shareFacebookText}
            />
          </span>
        }

        {user && user.UserDirectory === 'GOOGLE' &&
          <span className="input-group-btn input-group-append">
            <ShareGMailButton
              url={bookmarkURL}
              subject="Subject"
              title={sendGMailText}
            />
          </span>
        } 

        <span className="input-group-btn input-group-append">
          <ShareTelegramButton 
            url={bookmarkURL}
          />
        </span>

        <span className="input-group-btn input-group-append">
          <ShareViberButton 
            url={bookmarkURL}
          />
        </span>

      </div>
    </div>
  );
}

// export function ShareBookmarkPopup({
//   copyClipboard = "Copy to clipboard",
//   bookmarkURL,
//   position=[0, 0]
// }) {
//   const [right, top] = position;
//   const copyToClipboardHandler = (e) => {
//     CopyAndNotify(e, bookmarkURL);
//   }
//   //   
//   // left: `${left}px`
//   // dropdown-menu-right
//   return (
//     <div 
//       className={`dropdown-menu dropdown-menu-xl  p-2 show`}
//       style={{position: "absolute", 
//       top: `${top + 3}px`, right: `10px`, left: "auto"}}
//     >
//       <div className="form-group">
//         <label htmlFor="bookmarkURL">URL</label>
//         <div className="input-group">
//           <input
//             type="text"
//             autoFocus
//             className="form-control"
//             id="bookmarkURL"
//             name="bookmarkURL"
//             value={bookmarkURL}
//             readOnly                  
//           />
//           <span className="input-group-btn input-group-append">
//             <button 
//               className="btn btn-success" 
//               type="button" 
//               title={copyClipboard}
//               onClick={copyToClipboardHandler}
//             >
//               <i className="lui-icon lui-icon--copy" />
//             </button>
//           </span>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default function ShareBookmarkModal({
//   bookmarkURL,
//   title = "Share bookmark",
//   copyClipboard = "Copy to clipboard",
//   display = "block",
//   closeText = "Close",
//   onClose,
// }) {
//   const copyToClipboardHandler = (e) => {
//     CopyAndNotify(e, bookmarkURL);
//   }
//   return (
//     <div className="modal" tabIndex="-1" role="dialog" style={{ display }}>
//       <div className="modal-dialog modal-dialog-centered" role="document">
//         <div className="modal-content">
//           <div className="modal-header pt-2 pb-2">
//             <h5 className="modal-title">{title}</h5>
//             <button
//               type="button"
//               className="close"
//               data-dismiss="modal"
//               aria-label={closeText}
//               onClick={onClose}
//             >
//               <span aria-hidden="true">&times;</span>
//             </button>
//           </div>
//           <div className="modal-body">
//             <div className="form-group">
//               <label htmlFor="bookmarkURL">URL</label>
//               <div class="input-group">
//                 <input
//                   type="text"
//                   autoFocus
//                   className="form-control"
//                   id="bookmarkURL"
//                   name="bookmarkURL"
//                   value={bookmarkURL}
//                   readOnly                  
//                 />
//                 <span class="input-group-btn input-group-append">
//                   <button 
//                     className="btn btn-success" 
//                     type="button" 
//                     title={copyClipboard}
//                     onClick={copyToClipboardHandler}
//                   >
//                     <i className="lui-icon lui-icon--copy" />
//                   </button>
//                 </span>
//               </div>
//             </div>
//           </div>
//           <div className="modal-footer">
//             <button
//               type="button"
//               className="btn btn-light"
//               data-dismiss="modal"
//               onClick={onClose}
//             >
//               {closeText}
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>    
//   );
// }