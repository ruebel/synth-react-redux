import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import RangeControl from '../../../components/RangeControl';
import { setTranspose } from '../../actions';
import { getTranspose } from '../../selectors';

const Transpose = ({ amount, setTranspose }) => {
  return (
    <RangeControl
      title="Transpose (half steps)"
      value={amount}
      onSet={setTranspose}
      min={-36}
      max={36}
      step={1}
    />
  );
};

Transpose.propTypes = {
  amount: PropTypes.number.isRequired,
  setTranspose: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    amount: getTranspose(state)
  };
};

export default connect(mapStateToProps, { setTranspose })(Transpose);
