import React, { PropTypes } from 'react';

import { GridList } from 'material-ui/GridList';
import Subheader from 'material-ui/Subheader';
import CloudBox from 'App/components/CloudBox';


function toAscii (hex) {
  // Find termination
  var str = "";
  var i = 0, l = hex.length;
  if (hex.substring(0, 2) === '0x') {
    i = 2;
  }
  for (; i < l; i+=2) {
    var code = parseInt(hex.substr(i, 2), 16);
    str += String.fromCharCode(code);
  }

  return str;
}


class CloudsList extends React.Component {
  render () {
    const sponsored = [];

    for (let item of this.props.sponsored) {
      let identifier = toAscii(item.value);
      if (this.props.clouds[identifier]){
        sponsored.push(<CloudBox id={identifier} cloud={this.props.clouds[identifier]} holdings={this.props.holdings[identifier]} key={identifier}/>);
      }
    }

    const clouds = [];

    for (let key in this.props.clouds) {
      clouds.push(<CloudBox id={key} cloud={this.props.clouds[key]} holdings={this.props.holdings[key]} key={key}/>);
    }


    return <div>
      <GridList cols={4}>
        <Subheader>Sponsored Clouds</Subheader>
        {sponsored}
      </GridList>
      <GridList cols={4}>
        <Subheader>All Clouds</Subheader>
        {clouds}
      </GridList>
    </div>;
  }
}

CloudsList.propTypes = {
  clouds: PropTypes.object.isRequired,
  sponsored: PropTypes.array.isRequired,
  holdings: PropTypes.object.isRequired,
  cloudBoxClick: PropTypes.func
};

export default CloudsList;
