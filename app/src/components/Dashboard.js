import { connect } from 'react-redux';
import DashboardView from 'App/components/Dashboard.v';
import { push } from 'react-router-redux';

const mapStateToProps = (state) => ({
  profile: state.profile
});

const mapDispatchToProps = (dispatch) => {
  return {
    pairingClick: () => {
      dispatch(push('/apps/clouds/pair'));
    },
    exportClick: () => {
      dispatch(push('/apps/clouds/export'));
    },
    titleClick: () => {
      dispatch(push('/apps/clouds/'));
    }
  }
}

const Dashboard = connect(mapStateToProps, mapDispatchToProps)(DashboardView);

export default Dashboard;
