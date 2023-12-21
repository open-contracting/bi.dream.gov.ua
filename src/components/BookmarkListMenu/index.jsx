import { useEffect, useState, useCallback, useContext } from "react";
import { useHistory, useLocation } from "react-router-dom";
import GlobalContext from "GlobalContext";
import NavBarDropDownMenu from "components/NavBarDropDownMenu";
import Loader from "components/Loader";
import {
  ApplyBookmark,
  CreateBookmark,
  RemoveBookmark,
  GetBookmark,
  PublishBookmark,
  UnpublishBookmark,
  GetBookmarks
} from "qlik-api/qlikUtils";
import AddBookmarkModal from "./AddBookmarkModal";
import RemoveBookmarkModal from "./RemoveBookmarkModal";
import { ShareBookmark } from "./ShareBookmarkModal";
import CreateBookmarkItem from "./CreateBookmarkItem";
import { sortByDate, sortByDateReverse, sortAtoZ, sortZtoA, GASendEvent } from "./bookmarkUtils";
import { 
  SortByTextButton, SortByDateButton, ShowDetailsButton, 
  PublishButton, DeleteButton, UnpublishButton, ShareBookmarkButton
 } from "./ToolButtons";
import "./index.css";


function BookmarkItem({
  item,
  user,
  opsApplying,
  removeBookmarkText,
  publishBookmarkText,
  unpublishBookmarkText,
  shareBookmarkText,
  copyToClipboardText,
  shareFacebookText,
  sendGMailText,
  applyBookmarkHandler,
  removeBookmarkHandler,
  publishBookmarkHandler,
  unpublishBookmarkHandler,
  shareBookmarkHandler,
  showDetails = false,
  shareBookmarkVisible = false
}) {
  const qId = item.qInfo.qId;
  const { title, description, createdDate, publishTime } = item.qMeta;
  const hasDeletePrivileges = item.qMeta.privileges.indexOf("delete") !== -1;
  const hasPublishPrivileges = item.qMeta.privileges.indexOf("publish") !== -1;
  const isPublished = item.qMeta.published;
  const isApproved = item.qMeta.approved;

  const Operations = opsApplying === qId 
    ? ( <Loader small/> )
    : (
      <>
      {hasPublishPrivileges && !isPublished &&
        <PublishButton
          title={publishBookmarkText}
          clickHandler={(e) => publishBookmarkHandler(e, qId)}
        />
      }
      {hasDeletePrivileges &&
        <DeleteButton 
          title={removeBookmarkText}
          clickHandler={(e) => removeBookmarkHandler(e, qId, title)}
        />
      }
      {hasPublishPrivileges && isPublished &&
        <>
          <UnpublishButton 
            title={unpublishBookmarkText}
            clickHandler={(e) => unpublishBookmarkHandler(e, qId)}
          />

          <ShareBookmarkButton 
            title={shareBookmarkText}
            isPressed={shareBookmarkVisible}
            clickHandler={(e) => shareBookmarkHandler(e, qId)}
          />
        </>
      }
      </>      
    );

  return (
      <>
        {showDetails &&
        <div className="dropdown-divider" />
        }
        <a
          className="dropdown-item bm-item"
          title={`${title}\n${description}`}
          href="#/"
          role="button"
          onClick={(e) => applyBookmarkHandler(e, qId)}
        >
          {/* <h3 className="dropdown-item-title"> */}
            <div className="d-inline-flex flex-row align-items-center w-100 bm-item-row">
              <div className="mr-auto p-1 mw-100 bm-title">  
                <i className={`lui-icon lui-icon--bookmark mr-2 ${isPublished ? 'bm-published' :''}`}></i>
                {isPublished && !isApproved &&
                  <i className="lui-icon lui-icon--small lui-icon--group bm-published bm-badge" ></i>
                }
                {title}
              </div>
              {Operations}
            </div>                 
          {/* </h3> */}
          <div className={`bm-share-item ${shareBookmarkVisible ? 'pl-2 pr-3 pt-2 show' : ''}`}>
          {shareBookmarkVisible &&
            <ShareBookmark 
              bookmarkId={qId} 
              user={user} 
              copyClipboard={copyToClipboardText} 
              shareFacebookText={shareFacebookText}
              sendGMailText={sendGMailText}
            />
          }
          </div>
          
          <div className={`pl-2 pr-2 text-sm text-muted bm-details ${showDetails ? 'show' : ''}`}>
            {/* {showDetails && ( */}
              <>
                <p>
                  {description}
                </p>
                <div className="tags">
                  <i className="lui-icon lui-icon--small lui-icon--calendar"></i>{" "}
                  {new Date(createdDate).toLocaleDateString()}
                  {isPublished &&
                  <>
                    <i className="lui-icon lui-icon--small lui-icon--forward ml-2"></i>
                    <i className="lui-icon lui-icon lui-icon--group mr-1" />
                    {new Date(publishTime).toLocaleDateString()}
                  </>
                  }
                </div>
              </>
            {/* )} */}
          </div>
        </a>
      </>
  );
}

function BookmarkList({
  items,
  user,
  opsApplying,
  shareBookmark,
  noBookmarksText,
  removeBookmarkText,
  publishBookmarkText,
  unpublishBookmarkText,
  shareBookmarkText,
  copyToClipboardText,
  shareFacebookText,
  sendGMailText,
  applyBookmarkHandler,
  removeBookmarkHandler,
  publishBookmarkHandler,
  unpublishBookmarkHandler,
  shareBookmarkHandler,
  showDetails = false
}) {
  return (
    <div className="bookmark-list">
      {items && items.length > 0 ? (
        items.map((item) => (
          <BookmarkItem 
            key={item.qInfo.qId} 
            item={item}
            user={user}            
            opsApplying={opsApplying}
            shareBookmarkVisible={shareBookmark === item.qInfo.qId}
            copyToClipboardText={copyToClipboardText}
            shareFacebookText={shareFacebookText}
            sendGMailText={sendGMailText}
            removeBookmarkText={removeBookmarkText}
            publishBookmarkText={publishBookmarkText}
            unpublishBookmarkText={unpublishBookmarkText}
            shareBookmarkText={shareBookmarkText}
            applyBookmarkHandler={applyBookmarkHandler}
            removeBookmarkHandler={removeBookmarkHandler}
            publishBookmarkHandler={publishBookmarkHandler}
            unpublishBookmarkHandler={unpublishBookmarkHandler}
            shareBookmarkHandler={shareBookmarkHandler}
            showDetails={showDetails}            
          />
        ))
      ) : (
        <a
          className="dropdown-item"
          href="#/"
          onClick={(e) => e.preventDefault()}
        >
          {noBookmarksText}
        </a>
      )}
    </div>
  );
}

export default function BookmarkListMenu({
  app,
  showBookmarkDetails = false,
  user = null,
}) {
  const { translations } = useContext(GlobalContext);
  const history = useHistory();
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [opsApplying, setOpsApplying] = useState(null);
  const [showAddBookmarkModal, setShowAddBookmarkModal] = useState(false);
  const [showRemoveBookmarkModal, setShowRemoveBookmarkModal] = useState(false);
  const [shareBookmark, setShareBookmark] = useState(null);
  const [showDetails, setShowDetails] = useState(showBookmarkDetails);
  const [currentBookmark, setCurrentBookmark] = useState(null);
  const [sortByFunc, setSortByFunc] = useState(() => sortAtoZ); // sortByDate, sortAtoZ

  const loadBookmarks = useCallback(async () => {
    const bookmarks = await GetBookmarks(app, user);
    setLoading(false);

    // Sort by latest modifications
    if(bookmarks.length > 0)
      bookmarks.sort(sortByFunc);

    setItems(bookmarks);
  }, [app, user, sortByFunc]);

  useEffect(() => {
    loadBookmarks();
  }, [loadBookmarks]);

  const clearShareBookmark = () => {
    if(shareBookmark)
      setShareBookmark(null);
  }

  const applyBookmarkHandler = async (e, qId) => {
    // See removeBookmarkHandler
    if (!e.defaultPrevented) {
      e.preventDefault();
      if(await ApplyBookmark(app, qId)) {
        const b = await GetBookmark(app, qId);
        const props = await b.getProperties();
        if(props.page)
          history.push(props.page);
      }
    }
  };

  const closeRemoveBookmarkModal = () => {
    setShowRemoveBookmarkModal(false);
  };

  // const closeShareBookmarkModal = () => {
  //   setShareBookmarkUrl(null);
  // };

  const AreYouSureToRemoveBookmark = (e, qId, title) => {
    e.preventDefault();
    setShowRemoveBookmarkModal(true);
    setCurrentBookmark({ qId, title });
  };

  const removeBookmarkHandler = async (e) => {
    e.preventDefault();
    if (currentBookmark && currentBookmark.qId) {
      try {
        await RemoveBookmark(app, currentBookmark.qId);
      } finally {
        setCurrentBookmark(null);
        closeRemoveBookmarkModal();
        loadBookmarks();
      }
    }
  };

  const closeAddBookmarkModal = () => {
    setShowAddBookmarkModal(false);
  };

  const createBookmarkHandler = async (e, { bookmarkName, bookmarkDesc }) => {
    try {
      await CreateBookmark(app, bookmarkName, bookmarkDesc, location.pathname);
      // GA
      GASendEvent('Bookmarks', 'Create Bookmark');
      // const props = await b.getProperties();
      // props.page = `${window.location.pathname}${window.location.hash}`;
      // await b.setProperties(props);
    } finally {
      closeAddBookmarkModal();
      loadBookmarks();
    }
  };

  const publishBookmarkHandler = async (e, qId) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      setOpsApplying(qId);
      await PublishBookmark(app, qId, user);
      GASendEvent('Bookmarks', 'Publish Bookmark');
    } finally {
      loadBookmarks();
      setOpsApplying(null);
    }
  };

  const unpublishBookmarkHandler = async (e, qId) => {
    e.preventDefault();
    e.stopPropagation();    
    try {
      setOpsApplying(qId);
      await UnpublishBookmark(app, qId);
      if(shareBookmark === qId)
        setShareBookmark(null);
    } finally {
      loadBookmarks();
      setOpsApplying(null);
    }
  };
  
  const shareBookmarkHandler = async (e, qId) => {
    e.preventDefault();
    e.stopPropagation();
    if(shareBookmark === qId) {
      setShareBookmark(null);
    } else {
      setShareBookmark(qId);
    }
  };  

  const showBookmarkDetailsHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowDetails(!showDetails);
  };

  return (
    <>
      <NavBarDropDownMenu
        icon="lui-icon lui-icon--bookmark"
        dropDownToggle={false}
        badgeText={items.length > 0 ? items.length : ""}
        badgeClass="badge-success"
        dropDownClass="dropdown-menu-xl menu-bm"
        stateHandler={isOpen => {
          if(!isOpen)
            clearShareBookmark();
        }}
        right
      >
        {loading ? (
          <Loader />
        ) : (
          <>
            {user && (
              <CreateBookmarkItem
                createBookmarkText={translations.get('client', 'Bookmarks.Dialog.Create')}
                onClick={(e) => {
                  e.preventDefault();
                  setShowAddBookmarkModal(true);
                }}
              />
            )}

            <div className="d-inline-flex flex-row align-items-center w-100 bm-item-row">
                <h3 className="dropdown-item-title mr-auto">
                  <ShowDetailsButton 
                    title={translations.get('client', 'Bookmarks.ContextMenu.ViewDetails')}
                    isPressed={showDetails}
                    clickHandler={showBookmarkDetailsHandler}
                  />
                </h3>

                <span className="bm-text--small text-muted pr-1">{translations.get('common', 'Common.SortOptions')}</span>

                <SortByTextButton 
                  title={translations.get('common', 'Common.SortByAlphabetical')}
                  clickHandler={(e) => {
                    e.stopPropagation();
                    setSortByFunc(() => sortByFunc === sortAtoZ ? sortZtoA : sortAtoZ);
                  }}
                  isPressed={sortByFunc === sortAtoZ || sortByFunc === sortZtoA}
                  isAscSorted={sortByFunc === sortAtoZ}
                />

                <SortByDateButton 
                  title={translations.get('common', 'Common.SortByPublishedDate')}
                  clickHandler={(e) => {
                    e.stopPropagation();
                    setSortByFunc(() => sortByFunc === sortByDate ? sortByDateReverse : sortByDate);
                  }}
                  isPressed={sortByFunc === sortByDate || sortByFunc === sortByDateReverse}
                  isAscSorted={sortByFunc === sortByDateReverse}
                />
            </div>

            {/* <div className="dropdown-divider"></div> */}

            <BookmarkList
              items={items}
              user={user}
              opsApplying={opsApplying}
              shareBookmark={shareBookmark}
              noBookmarksText={translations.get('client', 'Bookmarks.NoBookmarks')}
              removeBookmarkText={translations.get('common', 'Common.Delete')}
              publishBookmarkText={translations.get('client', 'contextMenu.publish')}
              unpublishBookmarkText={translations.get('client', 'contextMenu.unpublish')}
              shareBookmarkText={translations.get('client', 'Share.ShareAs')}
              copyToClipboardText={translations.get('client', 'contextMenu.copyLink')}
              shareFacebookText={'Facebook'}
              sendGMailText={'Email'}
              applyBookmarkHandler={applyBookmarkHandler}
              removeBookmarkHandler={AreYouSureToRemoveBookmark}
              publishBookmarkHandler={publishBookmarkHandler}
              unpublishBookmarkHandler={unpublishBookmarkHandler}
              shareBookmarkHandler={shareBookmarkHandler}
              showDetails={showDetails}
            />
          </>
        )}
      </NavBarDropDownMenu>
      {showAddBookmarkModal && (
        <AddBookmarkModal
          onCreateBookmark={createBookmarkHandler}
          onClose={closeAddBookmarkModal}
          createBookmarkText = {translations.get('client', 'Bookmarks.Dialog.Create')}
          bookmarkNameText = {translations.get('client', 'Bookmarks.Dialog.Title')}
          descriptionText = {translations.get('client', 'Bookmarks.Dialog.Description')}
          optionalFieldText={translations.get('client', 'Bookmarks.Dialog.Optional')}
          bookmarkNameRequiredText={translations.get('client', 'Bookmarks.EmptyTitle')}
          symbolsLeftText={translations.get('client', 'Sharing.Dialog.MessageInputHint')}
          cancelText = {translations.get('common', 'Common.Cancel')}
        />
      )}
      {showRemoveBookmarkModal && (
        <RemoveBookmarkModal
          headerText={currentBookmark && currentBookmark.title}
          removeBookmarkText={translations.get('client', 'Bookmarks.Delete.Title')}
          removeButtonText={translations.get('common', 'Common.Delete')}
          cancelText={translations.get('common', 'Common.Cancel')}
          onRemoveBookmarkHandler={removeBookmarkHandler}
          onClose={closeRemoveBookmarkModal}
        />
      )}      
    </>
  );
}
