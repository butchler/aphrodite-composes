import { StyleSheet as StyleSheet_original, css as css_original } from 'aphrodite';

export const StyleSheet = {
  create: (definitions) => {
    const classNames = Object.keys(definitions);

    // Extract each composes: property from the definitions.
    const classNameToComposes = {};
    classNames.forEach((className) => {
      let composes = definitions[className].composes;

      if (composes !== undefined) {
        // Allow user to specify just one composed class without using an array.
        // e.g. `composes: button` instead of `composes: [button]`
        if (!Array.isArray(composes)) {
          composes = [composes];
        }

        // Save composes list in a separate object and delete it from the
        // definitions so we can pass the definitions to Aphrodite.
        classNameToComposes[className] = composes;
        delete definitions[className].composes;
      }
    });

    // Call Aphrodite's StyleSheet.create on the definitions.
    const aphroditeStyles = StyleSheet_original.create(definitions);

    // Create our own styles object that contains information about the composes list.
    const styles = {};
    classNames.forEach((className) => {
      styles[className] = {
        _composesList: classNameToComposes[className] || [],
        _aphroditeStyle: aphroditeStyles[className],
      };
    });

    classNames.forEach((className) => {
      const style = styles[className];

      // Convert strings to references so that you can compose classes within the same stylesheet.
      // e.g. { red: { color: 'red' }, redOnBlack: { composes: 'red', backgroundColor: 'black' } }
      style._composesList = styles[className]._composesList.map((composesStyle) => {
        if (typeof composesStyle === 'string' || composesStyle instanceof String) {
          return styles[composesStyle];
        } else {
          return composesStyle;
        }
      });

      // Walk through the composition hierarchy and make a flattened list of
      // Aphrodite style definition objects that can be passed directly to
      // Aphrodite's css() function.
      const getComposedAphroditeStyles = (result, style) => {
        return [...result, style._aphroditeStyle, ...style._composesList.reduce(getComposedAphroditeStyles, [])];
      };

      // TODO: Check for CSS property conflicts and disallow shorthand properties.

      style._composesAphroditeStyles = getComposedAphroditeStyles([], style);
    });

    console.log(styles);

    return styles;
  },
  // TODO: Implement rehydrate.
};

export function css(style) {
  return style._composesAphroditeStyles.map((style) => css_original(style)).join(' ');
};
