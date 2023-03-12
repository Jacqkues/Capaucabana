import styles from "@/styles/Menu.module.css"
import Item from "./Item"
import { defautTransition } from '@/utils'
import { motion } from 'framer-motion'


export default function Menu({ toggle }) {

    const variants = {
        initial: {
            opacity: 0,


        },
        animate: {
            opacity: 1,

        },
    }
    return (
        <motion.div className={styles.main_container}
            key={"menu"}
            initial={{ opacity: 1 }}
            whileInView={{ opacity: 1 }}
            transition={defautTransition}
            exit={{
                opacity: 0,
            }}
        >
            <div className={styles.headCtn}>
                <button className={styles.btn} onClick={() => toggle({ view: false, linkurl: "/crt" })}>
                    Close
                </button>
            </div>

            <ul>
                <Item title={"Repas"} itemIndex={0} url={"/images/menu/repas.webp"} />
                <Item title={"Allos"} itemIndex={1} url={"/images/menu/allo.webp"} />
                <Item title={"Soirée"} itemIndex={2} url={"/images/menu/soiree.webp"} LinkUrl={"/soireee"} />
                <Item title={"Events"} itemIndex={3} url={"/images/menu/events.webp"} />
                <div onClick={() => toggle({ view: false, linkurl: "/game" })}>
                    <Item title={"Jeu"} itemIndex={4} url={"/images/menu/jeu.webp"} />
                </div>

            </ul>

        </motion.div>

    )
}