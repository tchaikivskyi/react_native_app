import React from 'react';
import {
  TouchableOpacity,
  Text,
  ViewStyle,
  TextStyle,
  StyleSheet,
} from 'react-native';
import { COLORS } from '../constants/style';

type ButtonVariant = 'primary' | 'outline';

type Props = {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  style?: ViewStyle;
  textStyle?: TextStyle;
};

export const CustomButton: React.FC<Props> = ({
  title,
  onPress,
  variant = 'primary',
  style,
  textStyle,
}) => {
  const isOutline = variant === 'outline';

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.button,
        isOutline ? styles.buttonOutline : styles.buttonPrimary,
        style,
      ]}
      activeOpacity={0.7}
    >
      <Text
        style={[
          styles.text,
          isOutline ? styles.textOutline : styles.textPrimary,
          textStyle,
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    minWidth: 120,
  },
  buttonPrimary: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  buttonOutline: {
    backgroundColor: 'transparent',
    borderColor: COLORS.primary,
  },
  text: {
    fontWeight: '600',
    fontSize: 16,
  },
  textPrimary: {
    color: '#ffffff',
  },
  textOutline: {
    color: COLORS.primary,
  },
});