import { useState } from "react";

export default function AddBookmarkModal({
  createBookmarkText = "Create bookmark",
  bookmarkNameText = "Bookmark name",
  descriptionText = "Description",
  cancelText = "Cancel",
  optionalFieldText = "(Optional)",
  bookmarkNameRequiredText = "Bookmark name is required",
  symbolsLeftText = "Symbols left: {0}",
  display = "block",
  onClose,
  onCreateBookmark,
}) {
  const bmNameMaxSymbols = 100;
  const bmDescriptionMaxSymbols = 500;
  const [bookmarkName, setBookmarkName] = useState("");
  const [bookmarkDesc, setBookmarkDesc] = useState("");
  const handleChange = (e) => {
    if (e.target.name === "bookmarkName") {
      setBookmarkName(e.target.value);
    } else if (e.target.name === "bookmarkDescription") {
      setBookmarkDesc(e.target.value);
    }
  };
  const createBookmarkHandler = async (e) => {
    if(bookmarkName.length === 0) {
      return;
    }

    onCreateBookmark(e, {bookmarkName, bookmarkDesc});
  };

  const nameLeftSymbols = Math.max(0, bmNameMaxSymbols - bookmarkName.length);
  const descLeftSymbols = Math.max(0, bmDescriptionMaxSymbols - bookmarkDesc.length);

  return (
    <div className="modal" tabIndex="-1" role="dialog" style={{ display }}>
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header pt-2 pb-2">
            <h5 className="modal-title overflow-hidden">{createBookmarkText}</h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
              onClick={onClose}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <div className="form-group">
              <label htmlFor="bookmarkName">{bookmarkNameText}</label>
              <input
                type="text"
                autoFocus
                className={`form-control ${bookmarkName.length === 0 ? 'is-invalid' : ''}`}
                id="bookmarkName"
                name="bookmarkName"
                maxLength={bmNameMaxSymbols}
                placeholder={bookmarkNameText}
                value={bookmarkName}
                onChange={handleChange}
              />
              <div className="invalid-feedback">
                {bookmarkNameRequiredText}
              </div>
              {(nameLeftSymbols < 30) &&
                <div className={`bm-info-feedback ${nameLeftSymbols === 0 ? 'text-danger' : ''}`}>
                  {symbolsLeftText.replace('{0}', nameLeftSymbols)}
                </div>
              }
            </div>
            <div className="form-group">
              <label htmlFor="bookmarkDescription">{descriptionText}&nbsp;<span className="text-secondary">{optionalFieldText}</span></label>
              <textarea
                className="form-control"
                id="bookmarkDescription"
                name="bookmarkDescription"
                rows="3"
                placeholder={descriptionText}
                value={bookmarkDesc}
                onChange={handleChange}
                maxLength={bmDescriptionMaxSymbols}
              />
              {(descLeftSymbols < 50) &&
                <div className={`bm-info-feedback ${descLeftSymbols === 0 ? 'text-danger' : ''}`}>
                  {symbolsLeftText.replace('{0}', descLeftSymbols)}
                </div>
              }              
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className={`btn btn-success ${bookmarkName ? "" : "disabled"}`}
              onClick={createBookmarkHandler}
              ${...(bookmarkName.length === 0 ? {disabled: true} : {})}
            >
              {createBookmarkText}
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
