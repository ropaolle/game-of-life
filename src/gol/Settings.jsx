import React from 'react';
import PropTypes from 'prop-types';
import Switch from 'material-ui/Switch';
import { FormControlLabel, FormControl, FormGroup } from 'material-ui/Form';
import Select from 'material-ui/Select';

const Settings = (props) => {
  const { delay, run, size, handleDelay, handleSize } = props;

  return (
    <FormGroup row className="form-group">
      <FormControl>
        <FormControlLabel
          control={
            <Switch
              color="primary"
              checked={delay}
              onChange={(event, checked) => handleDelay(checked)}
            />
              }
          label="Use delay"
        />
      </FormControl>

      <FormControl>
        <Select native disabled={run} value={size} onChange={handleSize}>
          <option value={1}>10 x 10</option>
          <option value={2}>20 x 20</option>
          <option value={5}>50 x 50</option>
          <option value={10}>100 x 100</option>
          <option value={20}>200 x 200</option>
        </Select>
      </FormControl>
    </FormGroup>
  );
};

Settings.propTypes = {
  handleDelay: PropTypes.func.isRequired,
  handleSize: PropTypes.func.isRequired,
  delay: PropTypes.bool.isRequired,
  run: PropTypes.bool.isRequired,
  size: PropTypes.number.isRequired,
};

export default Settings;
