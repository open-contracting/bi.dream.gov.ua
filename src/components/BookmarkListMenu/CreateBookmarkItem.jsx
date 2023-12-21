export default function CreateBookmarkItem({ createBookmarkText, onClick }) {
  return (
    <a className="dropdown-item" href="#/" onClick={onClick}>
      <span className="dropdown-header bm-create">
        <i className="lui-icon lui-icon--small lui-icon--add" />{" "}
        {createBookmarkText}
      </span>
    </a>
  );
}