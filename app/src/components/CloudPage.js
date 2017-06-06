import { connect } from 'react-redux';
import CloudPageView from 'App/components/CloudPage.v';
import { getCloudAlgorithms, getCloudContent, submitTarget, endorseTarget } from 'App/actions';

const mapStateToProps = (state) => ({
  cloud: state.cloud,
});

const mapDispatchToProps = (dispatch) => {
  return {
    load: (id) => {
      dispatch(getCloudAlgorithms(id));
    },
    getContent: (id, algorithm) => {
      dispatch(getCloudContent(id, algorithm));
    },
    submit: (context, target, transport) => {
      dispatch(submitTarget(context, target, transport));
    },
    endorse: (context, target, label, transport) => {
      dispatch(endorseTarget(context, target, label, transport));
    }
  }
}


const CloudPage = connect(mapStateToProps, mapDispatchToProps)(CloudPageView);

export default CloudPage;
