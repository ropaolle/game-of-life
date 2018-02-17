import React from 'react';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';

const styles = theme => ({
  root: {
    marginTop: theme.spacing.unit * 0,
  },
  flex: {
    flex: 1,
    marginLeft: theme.spacing.unit * 1,
  },
});

const ButtonAppBar = () => {
  const { classes } = this.props;
  return (
    <header className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <img src="./favicon-32x32.png" alt="logo" />
          <Typography variant="title" color="inherit" className={classes.flex}>
              Game of Life with React
          </Typography>
        </Toolbar>
      </AppBar>
    </header>
  );
};

export default withStyles(styles)(ButtonAppBar);
