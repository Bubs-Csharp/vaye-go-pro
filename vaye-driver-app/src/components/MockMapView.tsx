import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, FONT_SIZE, BORDER_RADIUS } from '../constants/theme';

// Mock Map Component for Expo Go testing
export const MockMapView = ({ children, style }: any) => {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.content}>
        <Ionicons name="map" size={64} color={COLORS.textMuted} />
        <Text style={styles.title}>Map View</Text>
        <Text style={styles.subtitle}>
          Maps require a development build to display.
        </Text>
        <Text style={styles.info}>
          Run: npx expo run:android or npx expo run:ios
        </Text>
      </View>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
    padding: SPACING.xl,
  },
  title: {
    fontSize: FONT_SIZE.xl,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginTop: SPACING.md,
  },
  subtitle: {
    fontSize: FONT_SIZE.base,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginTop: SPACING.sm,
  },
  info: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.textMuted,
    textAlign: 'center',
    marginTop: SPACING.lg,
    paddingHorizontal: SPACING.xl,
    backgroundColor: COLORS.backgroundCard,
    paddingVertical: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
  },
});
