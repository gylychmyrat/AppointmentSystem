

const setTimer = (timer) => {
    return {
        type: "SET_TIMER",
        payload:timer
    }
}

const clearTimer = () => {
    return {
        type: "CLEAR_TIMER"
    }
}

export  {
   
    setTimer,
    clearTimer
}