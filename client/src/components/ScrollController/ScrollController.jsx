import { useEffect, useRef } from "react";
import { useLocation } from "react-router";

function ScrollController() {
  const location = useLocation();
  const lastHash = useRef("");

  useEffect(() => {
    if (location.hash) {
      lastHash.current = location.hash.slice(1); // store the id
    }

    if (lastHash.current && document.getElementById(lastHash.current)) {
      setTimeout(() => {
        const el = document.getElementById(lastHash.current);
        if (el) {
          const navbarHeight = 80; 
          const y =
            el.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
          window.scrollTo({ top: y, behavior: "smooth" });
        }
        lastHash.current = "";
      }, 100);
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);

  return null;
}

export default ScrollController;
