const profile = (state = '', action) => {
  switch (action.type) {
  case 'SET_PROFILE':
    return action.profile;
  default:
    return state;
  }
};

export default profile;
