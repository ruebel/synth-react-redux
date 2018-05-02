import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import InputGroup from '../../../components/InputGroup';
import NumberInput from '../../../components/NumberInput';

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;

  & > div {
    flex: 1;
  }

  & > span {
    font-size: 5em;
    margin: 0 20px -14px 20px;
  }
`;

const TimeSigEdit = ({ change, timeSig }) => {
  return (
    <InputGroup label="Time Signature">
      <Wrapper>
        <InputGroup label="Number Of Beats" required require={timeSig.num}>
          <NumberInput
            change={e =>
              change(
                {
                  num: Number.parseInt(e.target.value || 0, 10),
                  den: timeSig.den
                },
                'timeSig'
              )
            }
            placeholder="Number Of Beats"
            required
            value={timeSig.num}
          />
        </InputGroup>
        <span>/</span>
        <InputGroup label="Note Value" required require={timeSig.den}>
          <NumberInput
            change={e =>
              change(
                {
                  num: timeSig.num,
                  den: Number.parseInt(e.target.value || 0, 10)
                },
                'timeSig'
              )
            }
            placeholder="Note Value"
            required
            value={timeSig.den}
          />
        </InputGroup>
      </Wrapper>
    </InputGroup>
  );
};

TimeSigEdit.propTypes = {
  change: PropTypes.func.isRequired,
  timeSig: PropTypes.shape({
    num: PropTypes.number.isRequired,
    den: PropTypes.number.isRequired
  }).isRequired
};

export default TimeSigEdit;
