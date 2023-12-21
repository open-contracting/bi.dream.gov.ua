import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function usePageViews() {
  let location = useLocation();
  useEffect(() => {
    // console.log("page_view", document.title, location.pathname);
    window.gtag("event", "page_view", {
      page_path: location.pathname,
      page_title: document.title,
    });
  }, [location]);
}
