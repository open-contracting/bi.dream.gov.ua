import { useEffect, useContext, useRef } from "react";
import GlobalContext from "GlobalContext";

export default function useQlikObject({
  id,
  height = "250px",
  showLoader = true,
}) {
  const { app, qlik } = useContext(GlobalContext);
  const el = useRef(null);
  const qViz = useRef(null);

  useEffect(() => {
    // console.log("Mount", id, el);

    if (id === "CurrentSelections") {
      app.getObject(el.current, id).then((qmodel) => {
        qViz.current = qmodel;
      });
    } else {
      app.visualization.get(id).then((qmodel) => {
        // console.log(qmodel);
        qmodel.show(el.current);
        qViz.current = qmodel;
      });
    }

    return () => {
      // console.log("Unmount ", id); //, el, qViz.current);
      if (qViz.current) {
        qViz.current.close();
        qViz.current = null;
      }
    };
  }, [app, id]);

  useEffect(() => {
    if (qViz.current) qlik.resize(id);
  }, [qlik, id, height]);

  return {
    id,
    height,
    showLoader,
    elementRef: el,
    modelRef: qViz,
  };
}
