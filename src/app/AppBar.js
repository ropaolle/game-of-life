import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import AccountCircleIcon from 'material-ui-icons/AccountCircle';
import MenuIcon from 'material-ui-icons/Menu';

const styles = theme => ({
  root: {
    marginTop: theme.spacing.unit * 0,
  },
  flex: {
    flex: 1,
  },
  icon: {
    color: '#fff',
  },
});

class ButtonAppBar extends Component {
  render() {
    const { classes } = this.props;
    return (
      <header className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            {/* Menu */}
            <IconButton color="contrast" ><MenuIcon /></IconButton>
            {/* Title */}
            <Typography type="title" color="inherit" className={classes.flex}>
              Game of Life with React
            </Typography>
            {/* User menu */}
            <IconButton>
              <AccountCircleIcon className={classes.icon} />
            </IconButton>
          </Toolbar>
        </AppBar>
      </header>
    );
  }
}

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ButtonAppBar);
