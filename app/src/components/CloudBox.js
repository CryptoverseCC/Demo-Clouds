import { connect } from 'react-redux';
import CloudBoxView from 'App/components/CloudBox.v';
import { push } from 'react-router-redux';

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch) => {
  return {
    cloudBoxClick: (key) => {
      dispatch(push('/apps/clouds/'+key));
    }
  }
}

const CloudBox = connect(mapStateToProps, mapDispatchToProps)(CloudBoxView);

export default CloudBox;
