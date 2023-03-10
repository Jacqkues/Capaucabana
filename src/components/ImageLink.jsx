import styles from '@/styles/ImageLink.module.css'
import { motion } from 'framer-motion'
import { defautTransition } from '@/utils'
import { useRouter } from 'next/router'
import { useEffect, useState, useRef } from 'react'

function useWindowSize() {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });
  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    // Add event listener
    window.addEventListener("resize", handleResize);
    // Call handler right away so state gets updated with initial window size
    handleResize();
    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty array ensures that effect is only run on mount
  return windowSize;
}

export default function ImageLink({ element, index }) {
  const router = useRouter()
  const ref = useRef(null);
  const click = () => {
    router.push(`/${element.page}`)
  }
  const windowSizes = useWindowSize()
  const [coordinates, setCoordinates] = useState({ x: 0, y: 0 })
  useEffect(() => {
    const xPos = () => {
      if (!ref.current) return 0
      const rect = ref.current.getBoundingClientRect()
      return windowSizes.width / 2 - rect.left - rect.width / 2
    }
    const yPos = () => {
      if (!ref.current) return 0
      const rect = ref.current.getBoundingClientRect()
      return windowSizes.height / 2 - rect.top - rect.height / 2
    }

    setCoordinates({ x: xPos(), y: yPos() })
  }, [])
  const delay = index / 10 + 0.5
  return (




      <motion.img onClick={() => click()} className={styles.gridItemMedia} src={element.cover} alt=""
        layoutId={`container-${index}`}
        transition={defautTransition}
        exit={{ 
          filter: 'blur(20px)',
          opacity: 0,
          transition:{...defautTransition,delay:delay},
          zIndex: 0,
         }}
        whileHover={{
          scale: 1.05,
          zIndex: 25,
        }}

      />

  )
}