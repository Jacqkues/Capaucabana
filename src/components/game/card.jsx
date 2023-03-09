import styles from "@/styles/Game.module.css"
import { motion ,useMotionValue} from "framer-motion"
import { useEffect, useState } from "react"
export default function Card({ onClick, card, index, isFlipped}){
    
    const handleClick = () => {
        onClick(index)
      };

    return(
        <div className={styles.card} onClick={handleClick}>
            <motion.img className={styles.CardImg} src={card} alt="img" exit={{opacity:0}}/>
          {!isFlipped &&  <motion.div className={styles.CardOverlay}
          exit={{ opacity: 0 }}
          >
                <img src="/images/logo_normal_small.svg" alt="" />
            </motion.div>}
        </div>
    )
}