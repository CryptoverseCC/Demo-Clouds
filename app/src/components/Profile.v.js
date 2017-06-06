import React, { PropTypes } from 'react';

import Identicon from 'App/components/Identicon';

const Profile = ({ profile }) => <Identicon seed={profile || "empty"} size={8} scale={3} grayscale={!profile}/>;

Profile.propTypes = {
  profile: PropTypes.string.isRequired,
};

export default Profile;
