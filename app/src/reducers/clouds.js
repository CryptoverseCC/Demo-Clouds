const clouds = (state = {}, action) => {
  switch (action.type) {
  case 'SET_CLOUDS':
    return action.clouds;
  default:
    return state;
  }
};

export default clouds;
