import { connect } from 'react-redux';
import CloudsListView from 'App/components/CloudsList.v';

const mapStateToProps = (state) => ({
  clouds: state.clouds,
  sponsored: state.sponsored,
  holdings: state.holdings,
});

const CloudsList = connect(mapStateToProps)(CloudsListView);

export default CloudsList;
