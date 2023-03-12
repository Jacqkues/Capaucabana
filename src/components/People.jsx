import { motion } from "framer-motion"
import { defautTransition } from "@/utils"
import styles from "@/styles/ImageLink.module.css"
import { useRouter } from "next/router"
export default function People({ element, index , over}) {
    const router = useRouter()
    const easteregg = (url) => {
        if(url){
            router.push(url)
        }
        
    }
    return (
        
            <motion.div className={styles.contt} onClick={() => easteregg(element?.easteregg)}>
                <motion.img src={element.cover}
                    initial={{
                        opacity: 0,
                        filter: 'blur(20px)',
                    }}
                    whileInView={{
                        opacity: 1,
                        filter: 'blur(0px)',
                    }}
                    transition={{ ...defautTransition }}
                    viewport={{ once: true }}
                    className={styles.gridItemMedia + " " + styles.gridItemMedia2}
                    exit={{
                        filter: 'blur(20px)',
                        opacity: 0,
                        transition: { ...defautTransition, delay: index / 10 },
                        zIndex: 0,
                    }}
                />

               {over && <motion.div className={styles.overlay}
                initial={{
                    opacity: 0,
                }}
                whileHover={{
                    opacity: 0.8,
                }}
                whileTap={{
                    opacity: 0.8,
                }}

                style={{backgroundColor:element.color}}
                transition={{ ...defautTransition }}
                >
                    <p>{element.nom}</p>
                    <p className={styles.overlayTxt}>{element.text}</p>
                </motion.div>}
            </motion.div>

    
    )
}