import React, { PropTypes } from 'react';
import { GridTile } from 'material-ui/GridList';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import ArrowDropRight from 'material-ui/svg-icons/navigation-arrow-drop-right';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';


class CloudBox extends React.Component {
  render () {
    const subtitle = <span>{this.props.holdings} {this.props.cloud.symbol}</span>;
    const logo = <img
      alt=""
      onClick={() => {this.props.cloudBoxClick(this.props.id)}}
      style={{width: '100%', height: '100%'}}
      src={`https://beta.userfeeds.io/api/contexts${this.props.cloud.images.avatar}`}
    />;


    return <GridTile
      key={this.props.id}
      title={this.props.cloud.name}
      titlePosition="top"
      titleBackground="linear-gradient(to bottom, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)"
      titleStyle={{paddingTop: 10}}
      style={{cursor: 'pointer'}}
      subtitle={subtitle}>
      {logo}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        position: 'absolute',
        bottom: 0,
        right: 0
      }}>
        <IconMenu iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}>
          <MenuItem
            primaryText="Promote to:"
            rightIcon={<ArrowDropRight />}
            menuItems={[
              <MenuItem primaryText="1st place" />,
              <MenuItem primaryText="2nd place" />,
              <MenuItem primaryText="3rd place" />,
              <MenuItem primaryText="4th place" />,
            ]}
          />
        </IconMenu>
      </div>
    </GridTile>;
  }
}


CloudBox.propTypes = {
  id: PropTypes.string.isRequired,
  holdings: PropTypes.number,
  cloud: PropTypes.object.isRequired,
  cloudBoxClick: PropTypes.func
}


export default CloudBox;
