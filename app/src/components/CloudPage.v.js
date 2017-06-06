import React, { PropTypes } from 'react';
import Paper from 'material-ui/Paper';
import {List, ListItem} from 'material-ui/List';
import {Tabs, Tab} from 'material-ui/Tabs';
import Divider from 'material-ui/Divider';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';


class Content extends React.Component {

  format (value) {
    switch (value.split(':', 1)[0]) {
    case "http":
      return <a href={value}>{value}</a>;
    case "https":
      return <a href={value}>{value}</a>;
    default:
      return value;
    }
  }

  endorse (target, label, transport) {
    return () => {
      this.props.endorse(this.props.cloud.id, target, label, transport);
    }
  }

  render () {
    var content;

    if (!this.props.cloud.items) {
      content = <span>Nothing here yet. Be first to post.</span>;
    } else {
      var items = this.props.cloud.items.map((item) => {
        let labelButtons = [
          <ListItem key={1}><RaisedButton onClick={this.endorse(item.value, "positive", "http")}        label={'Positive (HTTP)'}/></ListItem>,
          <ListItem key={2}><RaisedButton onClick={this.endorse(item.value, "negative", "http")}        label={'Negative (HTTP)'}/></ListItem>,
          <ListItem key={3}><RaisedButton onClick={this.endorse(item.value, "positive", "shh-public")}  label={'Positive (Whisper public)'}/></ListItem>,
          <ListItem key={4}><RaisedButton onClick={this.endorse(item.value, "negative", "shh-public")}  label={'Negative (Whisper public)'}/></ListItem>,
          <ListItem key={5}><RaisedButton onClick={this.endorse(item.value, "positive", "shh-private")} label={'Positive (Whisper private)'}/></ListItem>,
          <ListItem key={6}><RaisedButton onClick={this.endorse(item.value, "negative", "shh-private")} label={'Negative (Whisper private)'}/></ListItem>,
          <ListItem key={7}><RaisedButton onClick={this.endorse(item.value, "positive", "transaction")} label={'Positive (Transaction)'}/></ListItem>,
          <ListItem key={8}><RaisedButton onClick={this.endorse(item.value, "negative", "transaction")} label={'Negative (Transaction)'}/></ListItem>,
        ];
        return <div key={item.value}>
          <ListItem
            primaryText={this.format(item.value)}
            secondaryText={`Score: ${item.score}`}
            nestedItems={labelButtons}
          />
          <Divider/>
        </div>
      });

      content = <List>
        {items}
      </List>;
    }

    return content;
  }
}

Content.propTypes = {
  cloud: PropTypes.object.isRequired,
  endorse: PropTypes.func.isRequired,
}


class CloudPage extends React.Component {
  constructor () {
    super();
    this.state = {
      target: ""
    };
  }

  componentDidMount () {
    this.props.load(this.props.match.params.id);
  }

  handleTabChange (value) {
    this.props.getContent(this.props.match.params.id, value);
  }

  submit (transport) {
    return () => {
      this.props.submit(this.props.cloud.id, this.state.target, transport);
      this.setState({
        target: ""
      });
    }
  }

  render () {
    var content;

    if (this.props.cloud.loading) {
      content = <span>Loading...</span>;
    } else {
      let tabs = this.props.cloud.algorithms.map(algorithm => (
        <Tab key={algorithm.identifier} label={algorithm.identifier} value={algorithm.identifier}>
          <Content cloud={this.props.cloud} endorse={this.props.endorse}/>
        </Tab>
      ))
      content = <Tabs value={this.props.cloud.algorithm} onChange={this.handleTabChange.bind(this)}>{tabs}</Tabs>
    }

    return <div>
      <h3>{this.props.cloud.id.toUpperCase()}</h3>

      <Card>
        <CardHeader
          title="New post"
          subtitle="Submit URL/Text/Other"
          actAsExpander={true}
          showExpandableButton={true}
        />
        <CardActions>
          <TextField hintText="URL/Text/Target" value={this.state.target} onChange={(e, target) => { this.setState({target}); }}/>
          <RaisedButton
            label="HTTP"
            primary={true}
            onClick={this.submit('http')}/>
          <RaisedButton
            label="Whisper (public)"
            primary={true}
            onClick={this.submit('shh-public')}/>
          <RaisedButton
            label="Whisper (private)"
            primary={true}
            onClick={this.submit('shh-private')}/>
          <RaisedButton
            label="Transaction"
            primary={true}
            onClick={this.submit('transaction')}/>
        </CardActions>
        <CardText expandable={true}>
          <p>HTTP - the claim will be signed by identity (TODO - paste it here) generated inside your browser
            and will be sent through HTTPS protocol to Userfeeds Gateway server that will verify its signature
            and send it further to processing and storage inside Userfeeds Platform and on external claim storages
            like IPDB (Public BigchainDB Node). The claim will not be visible before Userfeeds Platform sends it to
            external storages</p>
          <p>Whisper (private) - the claim will be sent via whisper protocol using topic `claim` and everyone
            listening to this topic will be able to read your claim before it reaches Userfeeds Platform</p>
          <p>Whisper (public) - the claim will be sent via whisper protocol using encrypted direct message (`to` param)
            this way your claim will not be visible (during transport) before it reaches Userfeeds Platform
            (or other claims processing system), Userfeeds Platform after registering the message will store it
            on external storages so the message will become public.</p>
          <p>Transaction - the claim will be submited to storage contract on given network (currently only ropsten is supported).
            The claim will be publicly visible before Userfeeds Platform or any other claim processing system register it.</p>
        </CardText>
      </Card>

      <br/>

      <Paper>
        {content}
      </Paper>
    </div>;
  }
}


CloudPage.propTypes = {
  cloud: PropTypes.object.isRequired,
  load: PropTypes.func.isRequired,
  getContent: PropTypes.func.isRequired,
  submit: PropTypes.func.isRequired,
  endorse: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
}


export default CloudPage;
