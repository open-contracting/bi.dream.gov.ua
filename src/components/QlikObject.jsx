import { useEffect, useContext, useRef, memo } from "react";
import GlobalContext from "GlobalContext";
import Overlayer from "components/Overlayer";
import Loader from "components/Loader";

export default memo(function QlikObject({
  id,
  height = "250px",
  showLoader = true,
  showDataView = false,
  noInteraction = false,
  noSelections = false,
  disableInteractivity = false,
  onTapEvent = null,
  maximized = false,
}) {
  const { app, qlik } = useContext(GlobalContext);
  const el = useRef(null);
  const qViz = useRef(null);
  console.log("Qlik object", id);

  useEffect(() => {
    console.log("Mount", id, el);

    if (id === "CurrentSelections") {
      app.getObject(el.current, id).then((qmodel) => {
        qViz.current = qmodel;
      });
    } else {
      app.visualization.get(id).then((qmodel) => {
        qmodel.show(el.current, { noInteraction, noSelections });
        qViz.current = qmodel;
      });
    }

    return () => {
      console.log("Unmount ", id); //, el, qViz.current);
      // mc.destroy();
      if (qViz.current) {
        qViz.current.close();
        qViz.current = null;
      }
    };
  }, [app, id, noInteraction, noSelections, el]);

  useEffect(() => {
    if (qViz.current) qlik.resize(id);
  }, [qlik, id, height, maximized]);

  useEffect(() => {
    if (qViz.current) qViz.current.toggleDataView();
  }, [showDataView]);

  // className={showDataView ? 'qdataview' : 'qchart'}
  return (
    <>
      {disableInteractivity && <Overlayer height={height} onTapEvent={onTapEvent} /> }
      <div
        id={id}
        ref={el}
        className={`qchart ${maximized ? 'maximized': ''}`}
        style={maximized ? {} : { height }}
      >
        {showLoader && <Loader />}
      </div>
    </>
  );
});
