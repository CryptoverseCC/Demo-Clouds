const defaultState = {}


const keys = (state = defaultState, action) => {
  switch (action.type) {
  case 'SET_KEYS':
    return {
      public: action.publicKey,
      private: action.privateKey,
    };
  default:
    return state;
  }
};

export default keys;
