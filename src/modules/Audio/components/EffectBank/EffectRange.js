import React from 'react';
import PropTypes from 'prop-types';
import RangeControl from '../../../components/RangeControl';

const EffectRange = ({change, defaults, property, settings, title}) => {
  const control = settings[property].control;
  return (
    <RangeControl
      assign={{
        id: settings.id,
        channel: control ? control.split(':')[0] : null,
        control: control ? control.split(':')[1] : null,
        effect: defaults.name,
        property: defaults[property].name,
        propertyId: property
      }}
      title={title || defaults[property].name}
      min={defaults[property].min}
      max={defaults[property].max}
      onSet={e => change(property, e)}
      value={settings[property].value}
      />
  );
};

EffectRange.propTypes = {
  change: PropTypes.func.isRequired,
  defaults: PropTypes.object.isRequired,
  property: PropTypes.string.isRequired,
  settings: PropTypes.object.isRequired,
  title: PropTypes.string
};

export default EffectRange;
