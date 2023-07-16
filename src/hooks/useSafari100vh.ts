import { useEffect, useState } from "react";
import { throttle } from "lodash-es";

const useSafari100vh = () => {
  const [height, setHeight] = useState(window.innerHeight);

  useEffect(() => {
    const isIos = /iPad|iPhone|iPod/.test(navigator.userAgent);
    if (!isIos) return;
    const setHeightProperty = throttle(() => {
      const visualViewportHeight =
        window?.visualViewport?.height ?? window.innerHeight;
      setHeight(visualViewportHeight);
    }, 200);

    window.addEventListener("resize", setHeightProperty);
    return () => {
      window.removeEventListener("resize", setHeightProperty);
    };
  }, []);
  return height;
};

export default useSafari100vh;
