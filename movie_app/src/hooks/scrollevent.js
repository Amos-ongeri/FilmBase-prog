import { useEffect, useRef, useState } from "react"

export const useScrollDirection = () => {
    const [show, setShow] = useState(false);
    let lastScroll = useRef(0);

    useEffect(() => {

        const handleScroll = () => {
            const currentScroll = window.scrollY;
            // always show at top
      if (currentScroll < 50) {
        setShow(true);
        lastScroll.current = currentScroll;
        return;
      }

      // ignore tiny scrolls (prevents jitter)
      if (Math.abs(currentScroll - lastScroll.current) < 10) {
        return;
      }

      console.log("Scrolled",currentScroll);
      
            if(currentScroll > lastScroll.current){
                setShow(false);
            } else {
                setShow(true);
            }

            lastScroll.current = currentScroll;
        }

        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    },[])

    return show
}