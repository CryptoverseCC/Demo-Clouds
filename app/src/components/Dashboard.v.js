import React, { PropTypes } from 'react';
import { Route, Switch } from 'react-router';
import { ConnectedRouter } from 'react-router-redux';

import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import AppBar from 'material-ui/AppBar';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import MenuItem from 'material-ui/MenuItem';

import Profile from 'App/components/Profile';

import CloudsList from 'App/components/CloudsList';
import CloudPage from 'App/components/CloudPage';
import Pairing from 'App/components/Pairing';
import Export from 'App/components/Export';


class App extends React.Component {
  render () {
    const Menu = (props) => (
      <IconMenu
        {...props}
        iconButtonElement={
          <IconButton><Profile profile={this.props.profile || ""} /></IconButton>
        }
        targetOrigin={{horizontal: 'right', vertical: 'top'}}
        anchorOrigin={{horizontal: 'right', vertical: 'top'}}
      >
        <MenuItem primaryText="Pair Local and Blockchain Id" onClick={this.props.pairingClick}/>
        <MenuItem primaryText="Import/Export Local Id" onClick={this.props.exportClick}/>
        <MenuItem primaryText="Help" />
      </IconMenu>
    );

    Menu.muiName = 'IconMenu';

    return <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
      <div>
        <AppBar
          title="Clouds"
          showMenuIconButton={false}
          onTitleTouchTap={this.props.titleClick}
          iconElementRight={<Menu />}
        />
        <ConnectedRouter history={this.props.history}>
          <Switch>
            <Route exact path="/apps/clouds/" component={CloudsList}/>
            <Route exact path="/apps/clouds/pair" component={Pairing}/>
            <Route exact path="/apps/clouds/export" component={Export}/>
            <Route exact path="/apps/clouds/:id" component={CloudPage}/>
          </Switch>
        </ConnectedRouter>
      </div>
    </MuiThemeProvider>;
  }
}


App.propTypes = {
  history: PropTypes.object,
  profile: PropTypes.string,
  pairingClick: PropTypes.func,
  exportClick: PropTypes.func,
  titleClick: PropTypes.func
}

export default App
