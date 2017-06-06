import { connect } from 'react-redux';
import ProfileView from 'App/components/Profile.v';

const mapStateToProps = (state) => ({
  profile: state.profile,
});

const Profile = connect(mapStateToProps)(ProfileView);

export default Profile;
