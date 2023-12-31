const EasingFunctions = {
    linear: (t) => t,
    easeInQuad: (t) => t*t,
    easeOutQuad: (t) => t*(2-t),
    easeInOutQuad: (t) => t<.5 ? 2*t*t : -1+(4-2*t)*t,
    easeInCubic: (t) => t*t*t,
    easeOutCubic: (t) => (--t)*t*t+1,
    easeInOutCubic: (t) => t<.5 ? 4*t*t*t : (t-1)*(2*t-2)*(2*t-2)+1,
    easeInQuart: (t) => t*t*t*t,
    easeOutQuart: (t) => 1-(--t)*t*t*t,
    easeInOutQuart: (t) => t<.5 ? 8*t*t*t*t : 1-8*(--t)*t*t*t,
    easeInQuint: (t) => t*t*t*t*t,
    easeOutQuint: (t) => 1+(--t)*t*t*t*t,
    easeInOutQuint: (t) => t<.5 ? 16*t*t*t*t*t : 1+16*(--t)*t*t*t*t
}

function getValue(fromValue,toValue,elapsed,duration,easing) {
    if(elapsed >= duration) return toValue;

    return fromValue + (toValue - fromValue) * EasingFunctions[easing](elapsed/duration);

}

export default function animate({
    fromValue,
    toValue,
    onUpdate,
    onComplete,
    duration=600,
    easing="linear"
}){
const startTime = performance.now();

const tick = () => {
    const elapsed = performance.now() - startTime;

    window.requestAnimationFrame(() => {
        return onUpdate(
            getValue(fromValue,toValue,elapsed,duration,easing),

            elapsed <= duration ? tick : onComplete
        )
    })
}

tick();
}