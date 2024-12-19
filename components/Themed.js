import { Text as DefaultText, View as DefaultView } from 'react-native';
import { useColorScheme } from 'react-native';

export function useThemeColor(props, colorName) {
  const theme = useColorScheme() ?? 'light';
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  }
  
  const Colors = {
    light: {
      text: '#000',
      background: '#fff',
      tint: '#2f95dc',
      tabIconDefault: '#ccc',
      tabIconSelected: '#2f95dc',
    },
    dark: {
      text: '#fff',
      background: '#000',
      tint: '#fff',
      tabIconDefault: '#ccc',
      tabIconSelected: '#fff',
    },
  };

  return Colors[theme][colorName];
}

export function Text(props) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  return <DefaultText style={[{ color }, style]} {...otherProps} />;
}

export function View(props) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');

  return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />;
}
