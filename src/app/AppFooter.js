import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';

const styles = () => ({
  left: {
    display: 'inline-box',
  },
  right: {
    display: 'inline-box',
    float: 'right',
  },
  text: {
    lineHeight: '35px',
    marginRight: 6,
  },
});

function Footer(props) {
  const { classes } = props;
  return (
    <footer>
      <Typography type="body1" className={classes.left}>By <b>RopaOlle</b><br /><a href="https://github.com/ropaolle/game-of-life">Github.com</a></Typography>
      <div className={classes.right}>
        <Typography className={classes.text} type="body1" >Game of Life 2018</Typography>
        <img src="./favicon-32x32.png" alt="logo" />
      </div>
    </footer>
  );
}

Footer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Footer);
