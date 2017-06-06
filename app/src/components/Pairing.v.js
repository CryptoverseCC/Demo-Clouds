/*global web3 */
import React, { PropTypes } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Profile from 'App/components/Profile';
import Identicon from 'App/components/Identicon';
import Web3Warning from 'App/components/Web3Warning';


class Pairing extends React.Component {
  render () {
    return <div>
      {typeof web3 === 'undefined' ? <Web3Warning /> : ""}

      <h2>Blockchain Profile</h2>
      <Profile/>
      <p style={{wordBreak: "break-all"}}>{this.props.profile}</p>

      <h2>Local Identity</h2>
      <Identicon seed={this.props.keys.public} size={16} scale={4}/>
      <p style={{wordBreak: "break-all"}}>{this.props.keys.public}</p>

      {typeof web3 === 'undefined' ? "" : <RaisedButton primary={true} onClick={() => {this.props.pairingSubmit(this.props.keys.public);}} label={"Pair"} />}
    </div>;
  }
}


Pairing.propTypes = {
  profile: PropTypes.string,
  keys: PropTypes.object,
  pairingSubmit: PropTypes.func,
}


export default Pairing
