// import "./index.css";
import Loader from "components/Loader";

export default function ExportDataModal({
  title,
  text = "Exporting...",
  exportCompletedText="Export Completed.",
  exportError,
  link,
  closeBtnText = "Close",
  onCloseHandler = null
}) {
  return (
    <div
      className="modal fade show modal-black-back"
      style={{ display: "block" }}
      aria-modal="true"
      role="dialog"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title">
              <i className="lui-icon lui-icon--large lui-icon--download" />
              {' '}
              {title}
            </h4>
          </div>
          <div className="modal-body">
            {!link &&
              <div style={{display: "flex", gap: "5px", alignItems: "center"}}>
                <Loader />
                <span>{text}</span>
              </div>
            }

            {exportError && 
              <div className="text-danger">{exportError}</div>
            }
           
            {link &&
              <div>
                <a 
                  href={link} 
                  onClick={(e) => {
                    e.preventDefault();
                    window.open(link, "_blank");
                  }}>
                    {exportCompletedText}
                </a>
              </div>
            }
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-primary btn-success"
              onClick={onCloseHandler}
            >
              {closeBtnText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
