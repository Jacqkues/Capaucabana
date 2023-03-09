import Header from "@/components/Header"
import Head from "next/head"
import styles from "@/styles/Game.module.css"
import Card from "@/components/game/card"
import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { useRouter } from "next/router"
export default function Game() {
    const [cards, setCards] = useState([])
    const [flippedCount, setFlippedCount] = useState(0)
    const [flipped, setFlipped] = useState([])
    const [matchedCards, setMatchedCards] = useState([])
    const [nbClick, setNbClick] = useState(0)
    const [win, setWin] = useState(false)
    const mapData = [
        "images/memories/1.webp",
        "images/memories/2.webp",
        "images/memories/3.webp",
        "images/memories/4.webp",
        "images/memories/5.webp",
        "images/memories/6.webp",
        "images/memories/7.webp",
        "images/memories/8.webp",
        "images/memories/9.webp",
        "images/memories/10.webp",
        "images/memories/11.webp",
        "images/memories/12.webp",
        "images/memories/13.webp",
        "images/memories/14.webp",
        "images/memories/15.webp",
        "images/memories/16.webp",
        "images/memories/17.webp",
        "images/memories/18.webp",
        "images/memories/19.webp",
        "images/memories/20.webp",
        "images/memories/21.webp",
        "images/memories/22.webp",
        "images/memories/23.webp",
        "images/memories/24.webp",
        "images/memories/25.webp",
        "images/memories/26.webp",
        "images/memories/27.webp",
        "images/memories/28.webp",
        "images/memories/29.webp",
        "images/memories/30.webp",
        "images/memories/31.webp",
    ]

    const shuffledData = mapData.sort(() => Math.random() - 0.5)

    const nineCards = shuffledData.slice(0, 9)

    const allCards = [...nineCards, ...nineCards].sort(() => Math.random() - 0.5)


    const router = useRouter()
    const handleClick = (index) => {
        setFlippedCount(flippedCount + 1)
        setFlipped([...flipped, index])
        setNbClick(nbClick + 1)

    }
    useEffect(() => {
        setCards(allCards)
    }, [])

    useEffect(() => {
        if (flippedCount === 2) {
            if (cards[flipped[0]] !== cards[flipped[1]]) {
                setTimeout(() => {
                    setFlipped([])
                    setFlippedCount(0)
                }, 600);
            } else {
                setFlipped([])
                setFlippedCount(0)
                setMatchedCards([...matchedCards, flipped[0], flipped[1]])
            }
        }
    }, [flippedCount])

    useEffect(() => {
        if (matchedCards.length === allCards.length) {
            const bestScore = localStorage.getItem("bestScore")
            if (bestScore === null || nbClick < bestScore) {
                localStorage.setItem("bestScore", nbClick)
            }
            setWin(true)
        }
    }, [matchedCards])


    return (
        <>
            {win && <motion.div className={styles.win}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 0.7 }}
            >

                <motion.div className={styles.modalWin}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                >
                    <div style={{
                        width: "50%",
                    }}>
                        <h1>Bravo !</h1><h1> tu as gagnés en {nbClick} coups !</h1>
                        <h2>Meilleur score : {localStorage.getItem("bestScore")}</h2>
                        <div className={styles.btnCont}>
                            <button onClick={() => router.reload(window.location.pathname)}>Rejouer</button>
                            <button onClick={() => router.push("/")}>Quitter</button>
                        </div>
                    </div>

                </motion.div>

            </motion.div>}
            <Head>
                <title>CAPAUCABANA</title>
                <meta name="description" content="Jeu de mémoire de la liste bde capaucabana pour cytech pau" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/images/logo_normal_small.svg" />
            </Head>
            <Header gridTogle={false} />
            <div className={styles.mainContainer}>

                <div className={styles.container}

                >

                    {cards.map((img, index) => {
                        return (
                            <Card key={index} card={img} index={index} onClick={handleClick} isFlipped={flipped.includes(index) || matchedCards.includes(index)} />
                        )
                    })}
                </div>

            </div>
        </>

    )
}