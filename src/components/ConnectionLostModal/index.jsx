import "./index.css";

export default function ConnectionLostModal({
  title,
  text,
  refreshText = "Refresh",
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
              <i className="lui-icon lui-icon--large lui-icon--disconnect" />
              {' '}
              {title}
            </h4>
          </div>
          <div className="modal-body">
            <p>{text}</p>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-primary btn-success btn-connectionlost-reload"
              onClick={() => window.location.reload()}
            >
              {refreshText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
