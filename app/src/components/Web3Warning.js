/*global web3 */

import React from 'react';

import Chip from 'material-ui/Chip';

const styles = {
  warning: {
    backgroundColor: "#F55540",
    margin: "20px auto"
  }
}

export default class Warning extends React.Component {
  render () {
    if (typeof web3 === 'undefined') {
      return <Chip style={styles.warning}>
        You need to use <a href="https://metamask.io/">MetaMask</a>,
        <a href="https://github.com/ethereum/mist/releases">Mist Browser</a> or
        <a href="https://ethcore.io/parity.html">Parity</a> to use full functionality.
      </Chip>
    }

    return null;
  }
}
