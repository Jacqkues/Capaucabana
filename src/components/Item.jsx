import animate from "@/animate"
import styles from "@/styles/Item.module.css"
import { useReducer, useRef } from "react"
import { useRouter } from "next/router"
const initialState = {
    opacity: 0,
    parallaxPos: { x: 0, y: -20 },
    scale: 0.8,
    rotationPosition: 0
}

function reducer(state, action) {
    switch (action.type) {
        case "CHANGE_OPACITY": {
            return {
                ...state,
                opacity: action.payload
            }

        }
        case "CHANGE_COORDINATES": {
            return {
                ...state,
                parallaxPos: action.payload
            }

        }

        case "CHANGE_SCALE": {
            return {
                ...state,
                scale: action.payload
            }
        }
        case "CHANGE_ROTATION": {
            return {
                ...state,
                rotationPosition: action.payload
            }
        }
        default:
            throw new Error("Action type not found")
    }
}

export default function Item({ title, itemIndex, url}) {

    const [state, dispatch] = useReducer(reducer, initialState)
    const listItem = useRef(null)
    const easeMethod = "easeInOutCubic"
    const speed = -5
    const router = useRouter()
    const parallax = (event) => {
        /*    const {x,y} = state.parallaxPos
            const {offsetWidth,offsetHeight} = listItem.current
            const {clientX,clientY} = event
            const xParallax = (clientX - offsetWidth/2)/20
            const yParallax = (clientY - offsetHeight/2)/20
            dispatch({type:"CHANGE_COORDINATES",payload:{x:xParallax,y:yParallax}})*/

        const x = (window.innerWidth - event.pageX * speed) / 100;
        const y = (window.innerHeight - event.pageY * speed) / 100;

        dispatch({ type: "CHANGE_COORDINATES", payload: { x: x, y: y } })



    }



    const handleOpacity = (init, newOp, duration) => {
        animate({
            fromValue: init,
            toValue: newOp,
            duration: duration,
            onUpdate: (value, callback) => {
                dispatch({ type: "CHANGE_OPACITY", payload: value })
                callback()
            },
            onComplete: () => {

            },
            easing: easeMethod,
            duration: duration

        })
    }

    const handleScale = (init, newOp, duration) => {
        animate({
            fromValue: init,
            toValue: newOp,
            duration: duration,
            onUpdate: (value, callback) => {
                dispatch({ type: "CHANGE_SCALE", payload: value })
                callback()
            },
            onComplete: () => {

            },
            easing: easeMethod,
            duration: duration

        })
    }

    const handleRotation = (init, duration) => {

        const newRotation = Math.random() * 15 * Math.round(Math.random()? 1 : -1)
        animate({
            fromValue: init,
            toValue: newRotation,
            duration: duration,
            onUpdate: (value, callback) => {
                dispatch({ type: "CHANGE_ROTATION", payload: value })
                callback()
            },
            onComplete: () => {

            },
            easing: easeMethod,
            duration: duration

        })
    }



    const handleMouseEnter = () => {
        handleOpacity(0, 1, 500)
        handleScale(0.8, 1, 500)
        handleRotation(state.rotationPosition, 500)
        listItem.current.addEventListener("mousemove", parallax)
    }

    const handleMouseLeave = () => {
        handleOpacity(1, 0, 800)
        handleScale(1, initialState.scale, 500)
        handleRotation(state.rotationPosition, 500)
        listItem.current.removeEventListener("mousemove", parallax)
        dispatch({ type: "CHANGE_COORDINATES", payload: initialState.parallaxPos })
    }

    return (
        <li className={styles.projectItemContainer} ref={listItem}>
            <div className={styles.titleItem}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >

                <h1 className={styles.menuTitle}>{title}</h1>
                <h1 className={styles.menuTitle + " " + styles.clone}>{title}</h1>


            </div>

            <img loading="lazy" className={styles.titleImage} src={url} alt="" style={{
                opacity: state.opacity,
                transform: `translate(${state.parallaxPos.x}px,${state.parallaxPos.y}px) scale(${state.scale}) rotate(${state.rotationPosition}deg)`
            }} />
        </li>)
}