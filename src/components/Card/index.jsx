import { useCallback, useState } from "react";
import "./card.css";

const Card = ({
  title,
  titleIcon,
  actions,
  children,
  addClasses = "",
  showMaximize = true,
  showHeader = true,
}) => {
  const [maximized, setMaximized] = useState(false);

  const maximizeHandler = useCallback(
    () => setMaximized(!maximized),
    [maximized]
  );

  return (
    <div
      className={
        (maximized ? "content-wrapper card card-maximized " : "card ") +
        addClasses
      }
    >
      {showHeader && (
        <div className="card-header">
          <h3 className="card-title">
            {titleIcon && <i className={titleIcon}></i>} {title}
          </h3>
          <div className="card-tools">
            {actions &&
              actions.map((item) => (
                <button
                  key={`${item.title}_${item.icon}`}
                  type="button"
                  className={`lui-fade-button btn btn-tool ${
                    typeof item.btnClasses === "function"
                      ? item.btnClasses({ maximized })
                      : item.btnClasses
                      ? item.btnClasses
                      : ""
                  }`}
                  title={item.title}
                  onClick={item.action}
                >
                  <span className={item.icon} />
                  {item.title && (
                    <span className="lui-fade-button__text">{item.title}</span>
                  )}
                </button>
              ))}

            {showMaximize && (
              <button
                type="button"
                className="lui-fade-button btn btn-tool"
                onClick={maximizeHandler}
              >
                {maximized ? (
                  <i className="lui-fade-button__icon lui-icon lui-icon--collapse"></i>
                ) : (
                  <i className="lui-fade-button__icon lui-icon lui-icon--expand"></i>
                )}
              </button>
            )}
          </div>
        </div>
      )}
      <div className="card-body p-1">
        {typeof children === "function"
          ? children({
              maximized,
              // bodyHeight: "100%", //"calc(100vh - 150px)", //"calc(100% - 54px)",
            })
          : children}
      </div>
    </div>
  );
};

export default Card;
