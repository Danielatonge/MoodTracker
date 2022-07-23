import { Text, TextProps } from 'react-native';
import React from 'react';
import { theme } from '../theme';

type AppTextProp = TextProps & {
  fontFamily: 'bold' | 'regular' | 'light';
  size: 8 | 16 | 24 | 32;
};

const AppText: React.FC<AppTextProp> = ({
  children,
  fontFamily,
  style,
  ...props
}) => {
  const fontStyle = React.useMemo(() => {
    if (fontFamily === 'bold') {
      return theme.fontFamilyBold;
    } else if (fontFamily === 'regular') {
      return theme.fontFamilyRegular;
    } else if (fontFamily === 'light') {
      return theme.fontFamilyLight;
    }
  }, [fontFamily]);

  return (
    <Text {...props} style={[style, { fontFamily: fontStyle }]}>
      {children}
    </Text>
  );
};

export { AppText };
