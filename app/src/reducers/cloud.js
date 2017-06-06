const defaultState = {
  loading: true,
  items: [],
  id: '',
  algorithm: 'simple',
  algorithms: []
}

const clouds = (state = defaultState, action) => {
  switch (action.type) {
  case 'SET_CLOUD_ALGORITHMS':
    return {
      loading: false,
      id: action.id,
      items: [],
      algorithm: state.algorithm,
      algorithms: action.algorithms
    }
  case 'SET_CLOUD_CONTENT':
    return {
      loading: false,
      id: action.id,
      items: action.items,
      algorithm: action.algorithm,
      algorithms: state.algorithms
    }
  default:
    return state;
  }
};

export default clouds;
