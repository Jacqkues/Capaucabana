import styles from '@/styles/Loader.module.css'
import { defautTransition } from '@/utils'
import {motion} from 'framer-motion'
export default function Loader({title , loaderControls}) {
    const variants = {
        initial: {
            opacity: 0,
            y: 50

        },
        animate: {
            opacity: 1,
            y: 0,
        },    
    }
    return (
        <motion.div className={styles.fullLoader} animate={loaderControls}>
            <motion.h1
            variants={variants}
            initial={"initial"}
            animate={"animate"}
            transition={defautTransition}
            className={styles.title}
            >
                {title}
            </motion.h1>
        </motion.div>
    )
}