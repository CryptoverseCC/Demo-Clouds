import React, { PropTypes } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import Identicon from 'App/components/Identicon';
import QRCode from 'qrcode.react';


class Export extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      keys: [props.keys.public,props.keys.private].join(":")
    }
  }

  clear () {
    this.setState({
      keys: ""
    });
  }

  import () {
    this.props.import(this.state.keys);
  }

  change (event) {
    this.setState({keys: event.target.value});
  }

  render () {
    return <div>
      <h2>Local Identity</h2>

      <Paper>
        <Identicon seed={this.props.keys.public} size={16} scale={4}/>
        <p>
          Keys:<br/>
          <textarea cols="40" rows="8" value={this.state.keys} onChange={this.change.bind(this)}></textarea>
        </p>
        <p>
          <QRCode value={JSON.stringify(this.props.keys)} />
        </p>
        <RaisedButton primary={true} onClick={this.clear.bind(this)} label={"Clear"} />
        <RaisedButton primary={true} onClick={this.import.bind(this)} label={"Import"} />
      </Paper>
    </div>;
  }
}


Export.propTypes = {
  keys: PropTypes.object,
  import: PropTypes.func,
}


export default Export
