const holdings = (state = {}, action) => {
  switch (action.type) {
  case 'SET_HOLDINGS':
    return action.holdings;
  default:
    return state;
  }
};

export default holdings;
