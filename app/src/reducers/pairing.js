const defaultState = {
  target: "",
  error: "",
  complete: false
}


const pairing = (state = defaultState, action) => {
  switch (action.type) {
  case 'PAIRING_TARGET_CHANGE':
    return {
      target: action.target,
      error: "",
      complete: false,
    };
  case 'PAIRING_SCAN_ERROR':
    return {
      target: state.target,
      error: action.error,
      complete: false,
    };
  case 'PAIRING_ERROR':
    return {
      target: state.target,
      error: action.error,
      complete: false,
    };
  case 'PAIRING_SUCCESS':
    return {
      target: state.target,
      error: "",
      complete: true
    };
  default:
    return state;
  }
};

export default pairing;
