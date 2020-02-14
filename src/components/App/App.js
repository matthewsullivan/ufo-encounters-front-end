import React from 'react';

import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Switch from '@material-ui/core/Switch';

import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import MenuIcon from '@material-ui/icons/Menu';
import PublicIcon from '@material-ui/icons/Public';

import {withStyles} from '@material-ui/core/styles';

import EncounterMap from '../EncounterMap/EncounterMap';

import './App.css';

import PropTypes from 'prop-types';

const styles = (theme) => ({
  drawer: {
    flexShrink: 0,
    width: 304,
  },
  drawerPaper: {
    width: 304,
  },
  drawerHeader: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'flex-start',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },

  menuButton: {
    color: '#fff',
    height: 48,
    width: 48,
    position: 'absolute',
    right: 16,
    top: 0,
    zIndex: 1,
  },
});

class App extends React.Component {
  state = {
    open: false,
    mapType: 'streets',
  };

  render() {
    const {classes} = this.props;
    const {open, mapType} = this.state;

    return (
      <>
        <IconButton
          aria-label="Open drawer"
          className={classes.menuButton}
          color="inherit"
          onClick={this.handleDrawerOpen}
        >
          <MenuIcon />
        </IconButton>

        <Drawer
          anchor="right"
          className={classes.drawer}
          variant="persistent"
          open={open}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={this.handleDrawerClose}>
              <ChevronRightIcon />
            </IconButton>
          </div>
          <Divider />
          <List>
            <ListItem>
              <ListItemIcon> 
                <PublicIcon/> 
              </ListItemIcon>
              <ListItemText primary="Satellite" />
              <Switch
                checked={this.state.checkedA}
                onChange={this.handleChange()}
                value="satellite"
              />
            </ListItem>
          </List>
        </Drawer>

        <EncounterMap basemap={mapType}/>;
      </>
    );
  }


  /**
   * Handle Change
   */
  handleChange = () => event => {
    this.setState({ mapType: event.target.checked ? 'satellite' : 'streets'});
  };

  /**
   * Handle Drawer Close
   */
  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  /**
   * Handle Drawer Open
   */
  handleDrawerOpen = () => {
    this.setState({ open: true });
  };
  
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(App);