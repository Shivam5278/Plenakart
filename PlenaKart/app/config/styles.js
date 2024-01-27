import {Platform} from 'react-native';
import colors from './colors';
export default {
  colors,
  text: {
    fontSize: 18,
    fontFamily: Platform.OS === 'android' ? 'Manrope' : 'Avenir',
    color: colors.black,
  },
};
