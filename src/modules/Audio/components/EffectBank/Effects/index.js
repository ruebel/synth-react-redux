import BitCrusher, { defaultSettings as bitCrusherDefaultSettings } from './BitCrusher';
import Compression, { defaultSettings as compDefaultSettings } from './Compression';
import Delay, { defaultSettings as delayDefaultSettings } from './Delay';
import Distortion, { defaultSettings as distortionDefaultSettings } from './Distortion';
import Filter, { defaultSettings as filterDefaultSettings } from './Filter';
import ResonanceFilter, { defaultSettings as resFilterDefaultSettings } from './ResonanceFilter';
import Reverb, { defaultSettings as reverbDefaultSettings } from './Reverb';
import Tremolo, { defaultSettings as tremoloDefaultSettings } from './Tremolo';

export const defaultSettings = {
  BitCrusher: bitCrusherDefaultSettings,
  Compression: compDefaultSettings,
  Delay: delayDefaultSettings,
  Distortion: distortionDefaultSettings,
  Filter: filterDefaultSettings,
  ResonanceFilter: resFilterDefaultSettings,
  Reverb: reverbDefaultSettings,
  Tremolo: tremoloDefaultSettings
};

export default {
  BitCrusher,
  Compression,
  Delay,
  Distortion,
  Filter,
  ResonanceFilter,
  Reverb,
  Tremolo
};
