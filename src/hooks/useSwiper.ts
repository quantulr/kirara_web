import { SwiperOptions } from "swiper/types";
import { RefObject, useEffect } from "react";
// import Swiper bundle with all modules installed
import Swiper from "swiper/bundle";

// import styles bundle
import "swiper/css/bundle";

const useSwiper = (ref: RefObject<HTMLElement>, option: SwiperOptions) => {
  useEffect(() => {
    console.log(ref);
    let swiper: Swiper | null;
    if (ref.current) {
      swiper = new Swiper(ref.current, option);
    }
    return () => {
      swiper?.destroy();
      swiper = null;
    };
  }, [ref, option]);
};

export default useSwiper;
