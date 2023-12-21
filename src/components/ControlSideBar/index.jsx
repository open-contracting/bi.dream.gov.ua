import "./index.css";

export default function ControlSideBar({opened, children }) {
  return (
    <div
      className={
        opened ? "control-sidebar-slide-open" : "ctrl-sidebar-closed"
      }
    >
      <aside
        className="control-sidebar control-sidebar-light"
        style={opened ? { right: 0 } : { right: "-500px" }}
      >
        {children}
      </aside>
    </div>
  );
}
