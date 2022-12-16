const inital = {
  timer: null,
  isTimerSet: false
};
const appointment = (state = inital, action) => {
  switch (action.type) {
    case "SET_TIMER":
      return {
        ...state,
        timer: action.payload,
        isTimerSet: true
      };
    case "CLEAR_TIMER":
      return {
        ...state,
        isTimerSet: false
      };
    default:
      return state;
  }
};

export default appointment;
