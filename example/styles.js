import { StyleSheet, css } from '../aphrodite-composes';

const mediumPaddingSize = '30px';
const smallPaddingSize = '5px';

export default StyleSheet.create({
  baseContainer: {
    composes: ['centered', 'wide', 'mediumPadding'],
  },
  baseButton: {
    composes: ['smallPadding', 'secondaryDarkBackground', 'secondaryDarkBackgroundHover', 'secondaryLightColor'],
  },
  primaryDarkBackground: { backgroundColor: '#333' },
  primaryLightColor: { color: '#eee' },
  secondaryDarkBackground: { backgroundColor: '#833' },
  secondaryDarkBackgroundHover: {
    ':hover': {
      backgroundColor: '#a55',
    },
  },
  secondaryLightColor: { color: '#fdd' },
  centered: { marginLeft: 'auto', marginRight: 'auto' },
  wide: { width: '600px' },
  mediumPadding: { paddingLeft: mediumPaddingSize, paddingRight: mediumPaddingSize, paddingTop: mediumPaddingSize, paddingBottom: mediumPaddingSize },
  smallPadding: { paddingLeft: smallPaddingSize, paddingRight: smallPaddingSize, paddingTop: smallPaddingSize, paddingBottom: smallPaddingSize },
  largeTopMargin: { marginTop: '60px' },
});
