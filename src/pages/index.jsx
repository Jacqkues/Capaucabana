import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import jsonData from '@/data.json'
import { useState, useEffect, useRef } from 'react'
import ImageLink from '@/components/ImageLink'
import Header from '@/components/Header'
import Loader from '@/components/Loader'
import { AnimatePresence, motionValue, useAnimation, useMotionValue, useSpring } from 'framer-motion'
import { defautTransition } from '@/utils'
import { motion } from 'framer-motion'

const inter = Inter({ subsets: ['latin'] })



export default function Home() {

  const [gridVisible, setGridVisible] = useState(true)
  const [mBlend, setMBlend] = useState('difference');
  // const txtColor = useMotionValue('#abff19');
  const txtColor = useMotionValue('blue');
  const gridUtils = [900, 800, 700]
  const animation = useAnimation()
  const gridRef = useRef(null);
  const mapData = Array.from(jsonData)
  const loaderControls = useAnimation()
  const bgColor = useMotionValue('white')
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const [play, setPlay] = useState(true)

  const after = (count, f) => {
    let noOfCalls = 0;
    return function (...rest) {
      noOfCalls = noOfCalls + 1;
      if (count === noOfCalls) {
        f(...rest);
      }
    };
  }



  useEffect(() => {

    const info = localStorage.getItem('info')
    if (info === 'alreadyPlayed') {
      setGridVisible(false)
      setPlay(false)
      //localStorage.removeItem('info')
      setGridVisible(true)
      setTimeout(() => {
        localStorage.removeItem('info')
      }, 2000)
    } else {

      async function sequence() {
        await animation.set((index) => ({
          y: gridUtils[index % 3],
          scale: 1.1
        }))

        await animation.start(() => ({
          y: 0,
          transition: defautTransition
        }))
        bgColor.set('white')


        await animation.start(() => ({
          scale: 1,
          transition: defautTransition
        }))
        setGridVisible(false)
      }
      bgColor.set("green")

      setTimeout(() => {
        loaderControls.start({
          opacity: 0,
          transition: { defautTransition }
        })
        sequence();

      }, 2000)

    }


  }, [])


  const handleGrid = (event) => {

    if (gridRef.current) {
      const speed = 25;
      const { width, height } = gridRef.current.getBoundingClientRect()
      const offsetX = event.clientX - width / 2
      const offsetY = event.clientY - height / 2

      const newTransformX = (offsetX * speed) / 100 * (-1);
      const newTransformY = (offsetY * speed) / 100 * (-1);

      x.set(newTransformX)
      y.set(newTransformY)
    }

  }

  const xMotion = useSpring(x, { stiffness: 400, damping: 90 })
  const yMotion = useSpring(y, { stiffness: 400, damping: 90 })

  return (
    <>
      <Head>
        <title>CAPAUCABANA</title>
        <meta name="description" content="Liste BDE Capaucaban " />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="author" content="Jacques Dumora" />

        <meta name="copyright" content="Jacques Dumora" />
        <link rel="icon" href="/images/logo_normal_small.svg" />
      </Head>
      {play && <Loader title={"CAPAUCABANA"} loaderControls={loaderControls} />}
      <Header view={gridVisible} gridTogle={true} toggleView={(value) => setGridVisible(value)}></Header>
      { /* <motion.div className={styles.mainTitle}
      initial={{
        transition:{...defautTransition,delay:1.5},
      }}
      style={{
        mixBlendMode:mBlend,
        color:txtColor
      }}
      exit={{
        opacity:0,
      transition:{...defautTransition,delay:1.5},
      }}
      >
        CAPAUCABANA
    </motion.div>*/}
      <motion.div className={styles.content}
        style={{
          backgroundColor: bgColor,
          transition: 'background-color 1.25s ease-in-out'
        }}
      >

        {gridVisible && <div className={styles.gridContainer}>
          <motion.div
            drag
            whileDrag={{ scale: 0.9 }}
            dragConstraints={{
              top: -100,
              right: 100,
              bottom: 100,
              left: -100,
            }}
            onMouseMove={handleGrid}
            ref={gridRef}
            className={styles.gridElement}
            transition={defautTransition}
            style={{
              x: xMotion,
              y: yMotion,
            }}
          >

            {mapData.map((element, index) => (
              <motion.div className={styles.element}
                key={element.cover}
                animate={animation}
                custom={index}
              >
                <div className={styles.thumbnailWrapper}>
                  <ImageLink element={element} index={index} />
                </div>
              </motion.div>
            ))}

          </motion.div>
        </div>}

        {!gridVisible && <motion.div className={styles.listElement} >
          {mapData.map((element, index) => (
            <motion.div key={index} className={styles.elementL}>
              <div className={styles.thumbnailWrapper}>
                <ImageLink element={element} index={index} />
              </div>
            </motion.div>
          ))}
        </motion.div>}

      </motion.div>




    </>
  )
}
