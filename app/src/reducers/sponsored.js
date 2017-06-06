const sponsored = (state = [], action) => {
  switch (action.type) {
  case 'SET_SPONSORED':
    return action.sponsored;
  default:
    return state;
  }
};

export default sponsored;
