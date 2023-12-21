import "./loader.css";

// See more loaders at https://loading.io/
const Loader = (small = false) => (
  <div className="d-flex h-100">
    <div className="mx-auto my-auto">
      {/* Paste it here. instead of div.lds-ellipsis */}
      <div className={`lds-ellipsis ${small ? 'small' : ''}`}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  </div>
);

export default Loader;