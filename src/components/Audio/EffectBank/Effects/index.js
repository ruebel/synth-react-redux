import Compression, {defaultSettings as compDefaultSettings} from './Compression';
import Delay, {defaultSettings as delayDefaultSettings} from './Delay';
import Distortion, {defaultSettings as distortionDefaultSettings} from './Distortion';
import Filter, {defaultSettings as filterDefaultSettings} from './Filter';
import Reverb, {defaultSettings as reverbDefaultSettings} from './Reverb';
import Tremolo, {defaultSettings as tremoloDefaultSettings} from './Tremolo';

export const defaultSettings = {
  Compression: compDefaultSettings,
  Delay: delayDefaultSettings,
  Distortion: distortionDefaultSettings,
  Filter: filterDefaultSettings,
  Reverb: reverbDefaultSettings,
  Tremolo: tremoloDefaultSettings
};

export default {
  Compression,
  Delay,
  Distortion,
  Filter,
  Reverb,
  Tremolo
};
