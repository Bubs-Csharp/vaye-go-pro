import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, SPACING, FONT_SIZE, FONT_WEIGHT, BORDER_RADIUS, SHADOWS } from '../constants/theme';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'outline' | 'ghost';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  icon?: React.ReactNode;
  style?: ViewStyle;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  fullWidth = false,
  icon,
  style,
}) => {
  const isOutline = variant === 'outline';
  const isGhost = variant === 'ghost';

  const getButtonColors = () => {
    if (disabled) return [COLORS.textMuted, COLORS.textMuted];

    switch (variant) {
      case 'primary':
        return [COLORS.primary, COLORS.primaryDark];
      case 'secondary':
        return [COLORS.secondary, COLORS.secondaryLight];
      case 'success':
        return [COLORS.success, COLORS.success];
      case 'danger':
        return [COLORS.danger, COLORS.danger];
      case 'outline':
      case 'ghost':
        return ['transparent', 'transparent'];
      default:
        return [COLORS.primary, COLORS.primaryDark];
    }
  };

  const getTextColor = () => {
    if (disabled) return COLORS.textLight;
    if (isOutline || isGhost) {
      switch (variant) {
        case 'outline':
          return COLORS.primary;
        case 'ghost':
          return COLORS.textPrimary;
        default:
          return COLORS.textLight;
      }
    }
    return variant === 'primary' ? COLORS.secondary : COLORS.textLight;
  };

  const buttonSizes = {
    small: { paddingVertical: SPACING.sm, paddingHorizontal: SPACING.md },
    medium: { paddingVertical: SPACING.md, paddingHorizontal: SPACING.lg },
    large: { paddingVertical: SPACING.lg, paddingHorizontal: SPACING.xl },
  };

  const textSizes = {
    small: FONT_SIZE.sm,
    medium: FONT_SIZE.base,
    large: FONT_SIZE.lg,
  };

  const colors = getButtonColors();

  const buttonContent = (
    <>
      {loading && <ActivityIndicator color={getTextColor()} style={styles.loader} />}
      {icon && !loading && icon}
      <Text
        style={[
          styles.text,
          { color: getTextColor(), fontSize: textSizes[size] },
          icon && { marginLeft: SPACING.sm },
        ]}
      >
        {title}
      </Text>
    </>
  );

  if (isOutline || isGhost) {
    return (
      <TouchableOpacity
        style={[
          styles.button,
          buttonSizes[size],
          fullWidth && styles.fullWidth,
          isOutline && styles.outline,
          disabled && styles.disabled,
          style,
        ]}
        onPress={onPress}
        disabled={disabled || loading}
        activeOpacity={0.7}
      >
        {buttonContent}
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      style={[fullWidth && styles.fullWidth, disabled && styles.disabled, style]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      <LinearGradient
        colors={colors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.button, styles.gradient, buttonSizes[size], !disabled && SHADOWS.md]}
      >
        {buttonContent}
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: BORDER_RADIUS.lg,
  },
  gradient: {
    // Gradient-specific styles
  },
  text: {
    fontWeight: FONT_WEIGHT.semibold,
    textAlign: 'center',
  },
  fullWidth: {
    width: '100%',
  },
  outline: {
    borderWidth: 2,
    borderColor: COLORS.primary,
    backgroundColor: 'transparent',
  },
  disabled: {
    opacity: 0.5,
  },
  loader: {
    marginRight: SPACING.sm,
  },
});
