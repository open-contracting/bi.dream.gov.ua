import { Manager as HammerManager, Tap } from "hammerjs";
import { useEffect, useRef } from "react";
import "./index.css";

export default function Overlayer({ height, id, onTapEvent }) {
  const el = useRef(null);

  useEffect(() => {
    const mc = new HammerManager(el.current, {
      recognizers: [[Tap]],
    });
    mc.set({ enable: true });
    mc.on("tap", (evt) => {
      // console.log("Tap event", evt);
      onTapEvent && onTapEvent(evt);
    });
    return () => mc.destroy();
  }, [onTapEvent]);

  return <div ref={el} id={id} className="chart-overlayer" style={{ height }}></div>;
}
