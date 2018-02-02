import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';

const styles = () => ({
  text: {
    display: 'inline-box',
    float: 'right',
    paddingTop: 17,
  },
});

function Footer(props) {
  const { classes } = props;
  return (
    <footer>
      <img className={classes.icon} src="./favicon-32x32.png" alt="logo" />
      <Typography type="body1" className={classes.text}>RopaOlle 2017 (<a href="https://github.com/ropaolle/game-of-life">Github.com</a>)</Typography>
    </footer>
  );
}

Footer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Footer);
