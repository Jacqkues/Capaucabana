import styles from "@/styles/Menu.module.css"
import Item from "./Item"
import { defautTransition } from '@/utils'
import { motion } from 'framer-motion'
import Link from "next/link"

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
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={defautTransition}
            exit={{
                opacity: 0,
            }}
        >
            <div className={styles.headCtn}>
                <button className={styles.btn} onClick={() => toggle(false)}>
                    Close
                </button>
            </div>

            <ul>
              <Link href={"/images/menu.png"}>  <Item title={"Repas"} itemIndex={0} url={"/images/menu/repas.webp"} LinkUrl={"/repas"} /></Link>
                <Link href={"/images/Allo.png"}> <Item title={"Allos"} itemIndex={1} url={"/images/menu/allo.webp"} /></Link>
                <Link href={"/images/sc.png"}>  <Item title={"Soirée"} itemIndex={2} url={"/images/menu/soiree.webp"} LinkUrl={"/soireee"} /></Link>
                <Link href={"/images/g.png"}> <Item title={"Events"} itemIndex={3} url={"/images/menu/events.webp"} /></Link>
                <Link href="/game">   <Item title={"Jeu"} itemIndex={4} url={"/images/menu/jeu.webp"} LinkUrl={"/game"} /></Link>
            </ul>

        </motion.div>

    )
}