import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { COLORS, SPACING, BORDER_RADIUS, SHADOWS } from '../constants/theme';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  padding?: number;
  glass?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  style,
  padding = SPACING.md,
  glass = false,
}) => {
  return (
    <View
      style={[
        styles.card,
        { padding },
        glass && styles.glass,
        !glass && SHADOWS.md,
        style,
      ]}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.backgroundCard,
    borderRadius: BORDER_RADIUS.lg,
  },
  glass: {
    backgroundColor: COLORS.glass,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
  },
});
