export default function RemoveBookmarkModal({
  headerText,
  removeBookmarkText = "Are you sure?",
  removeButtonText = "Remove",
  cancelText = "Cancel",
  display = "block",
  onClose,
  onRemoveBookmarkHandler,
}) {
  return (
    <div className="modal" tabIndex="-1" role="dialog" style={{ display }}>
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">            
            <h5 className="modal-title overflow-hidden">
              <i className="lui-icon lui-icon--bookmark" />
              {' '}
              {headerText}
            </h5>
          </div>
          <div className="modal-body">
            <h5 className="text-danger">{removeBookmarkText}</h5>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-danger"
              onClick={onRemoveBookmarkHandler}
            >
              {removeButtonText}
            </button>
            <button
              type="button"
              className="btn btn-light"
              data-dismiss="modal"
              onClick={onClose}
            >
              {cancelText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
