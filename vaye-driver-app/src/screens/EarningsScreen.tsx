import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Header } from '../components/Header';
import { Card } from '../components/Card';
import { useDriver } from '../contexts/DriverContext';
import { COLORS, SPACING, FONT_SIZE, FONT_WEIGHT, BORDER_RADIUS } from '../constants/theme';

const { width } = Dimensions.get('window');

export const EarningsScreen = () => {
  const { earnings, refreshEarnings } = useDriver();
  const [selectedTab, setSelectedTab] = useState<'today' | 'week' | 'month'>('today');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadEarnings();
  }, []);

  const loadEarnings = async () => {
    setLoading(true);
    try {
      await refreshEarnings();
    } catch (error) {
      console.error('Failed to load earnings:', error);
    } finally {
      setLoading(false);
    }
  };

  const getCurrentEarnings = () => {
    switch (selectedTab) {
      case 'today':
        return earnings?.today;
      case 'week':
        return earnings?.week;
      case 'month':
        return earnings?.month;
      default:
        return earnings?.today;
    }
  };

  const currentData = getCurrentEarnings();

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Header title="Earnings" showBack={false} showNotification={false} showLogo={false} />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Tabs */}
        <View style={styles.tabsContainer}>
          <TouchableOpacity
            style={[styles.tab, selectedTab === 'today' && styles.tabActive]}
            onPress={() => setSelectedTab('today')}
          >
            <Text style={[styles.tabText, selectedTab === 'today' && styles.tabTextActive]}>
              Today
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tab, selectedTab === 'week' && styles.tabActive]}
            onPress={() => setSelectedTab('week')}
          >
            <Text style={[styles.tabText, selectedTab === 'week' && styles.tabTextActive]}>
              This Week
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tab, selectedTab === 'month' && styles.tabActive]}
            onPress={() => setSelectedTab('month')}
          >
            <Text style={[styles.tabText, selectedTab === 'month' && styles.tabTextActive]}>
              This Month
            </Text>
          </TouchableOpacity>
        </View>

        {/* Total Earnings Card */}
        <Card style={styles.totalCard}>
          <Text style={styles.totalLabel}>Total Earnings</Text>
          <Text style={styles.totalAmount}>R{currentData?.total.toFixed(2) || '0.00'}</Text>
          <View style={styles.statsRow}>
            <View style={styles.stat}>
              <Text style={styles.statLabel}>Rides</Text>
              <Text style={styles.statValue}>{currentData?.rides || 0}</Text>
            </View>
            <View style={styles.stat}>
              <Text style={styles.statLabel}>Hours</Text>
              <Text style={styles.statValue}>{currentData?.hours || 0}</Text>
            </View>
            <View style={styles.stat}>
              <Text style={styles.statLabel}>Avg Fare</Text>
              <Text style={styles.statValue}>
                R{currentData?.averageFare?.toFixed(2) || '0.00'}
              </Text>
            </View>
          </View>
        </Card>

        {/* Daily Breakdown (for week view) */}
        {selectedTab === 'week' && earnings?.week.dailyBreakdown && (
          <Card style={styles.breakdownCard}>
            <Text style={styles.breakdownTitle}>Daily Breakdown</Text>
            {earnings.week.dailyBreakdown.map((day, index) => (
              <View key={index} style={styles.breakdownRow}>
                <Text style={styles.breakdownDay}>{day.day}</Text>
                <View style={styles.breakdownRight}>
                  <Text style={styles.breakdownRides}>{day.rides} rides</Text>
                  <Text style={styles.breakdownAmount}>R{day.amount.toFixed(2)}</Text>
                </View>
              </View>
            ))}
          </Card>
        )}

        {/* Performance Card */}
        <Card style={styles.performanceCard}>
          <View style={styles.performanceHeader}>
            <Ionicons name="trending-up" size={24} color={COLORS.success} />
            <Text style={styles.performanceTitle}>Performance Metrics</Text>
          </View>

          <View style={styles.metricRow}>
            <Text style={styles.metricLabel}>Acceptance Rate</Text>
            <Text style={styles.metricValue}>95%</Text>
          </View>

          <View style={styles.metricRow}>
            <Text style={styles.metricLabel}>Completion Rate</Text>
            <Text style={styles.metricValue}>98%</Text>
          </View>

          <View style={styles.metricRow}>
            <Text style={styles.metricLabel}>Average Rating</Text>
            <View style={styles.ratingValue}>
              <Ionicons name="star" size={16} color={COLORS.primary} />
              <Text style={styles.metricValue}>4.9</Text>
            </View>
          </View>
        </Card>

        <View style={{ height: SPACING.xxl }} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    flex: 1,
    paddingHorizontal: SPACING.lg,
  },
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: COLORS.backgroundCard,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.xs,
    marginTop: SPACING.lg,
    marginBottom: SPACING.lg,
  },
  tab: {
    flex: 1,
    paddingVertical: SPACING.sm,
    alignItems: 'center',
    borderRadius: BORDER_RADIUS.md,
  },
  tabActive: {
    backgroundColor: COLORS.primary,
  },
  tabText: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.textSecondary,
    fontWeight: FONT_WEIGHT.medium,
  },
  tabTextActive: {
    color: COLORS.secondary,
    fontWeight: FONT_WEIGHT.bold,
  },
  totalCard: {
    alignItems: 'center',
    paddingVertical: SPACING.xl,
    marginBottom: SPACING.lg,
  },
  totalLabel: {
    fontSize: FONT_SIZE.base,
    color: COLORS.textSecondary,
    marginBottom: SPACING.sm,
  },
  totalAmount: {
    fontSize: FONT_SIZE.huge,
    fontWeight: FONT_WEIGHT.extrabold,
    color: COLORS.success,
    marginBottom: SPACING.lg,
  },
  statsRow: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
  },
  stat: {
    alignItems: 'center',
  },
  statLabel: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.textSecondary,
    marginBottom: SPACING.xs,
  },
  statValue: {
    fontSize: FONT_SIZE.lg,
    fontWeight: FONT_WEIGHT.bold,
    color: COLORS.textPrimary,
  },
  breakdownCard: {
    marginBottom: SPACING.lg,
  },
  breakdownTitle: {
    fontSize: FONT_SIZE.lg,
    fontWeight: FONT_WEIGHT.bold,
    color: COLORS.textPrimary,
    marginBottom: SPACING.md,
  },
  breakdownRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: SPACING.sm,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  breakdownDay: {
    fontSize: FONT_SIZE.base,
    color: COLORS.textPrimary,
    fontWeight: FONT_WEIGHT.medium,
  },
  breakdownRight: {
    alignItems: 'flex-end',
  },
  breakdownRides: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.textSecondary,
  },
  breakdownAmount: {
    fontSize: FONT_SIZE.base,
    fontWeight: FONT_WEIGHT.semibold,
    color: COLORS.success,
  },
  performanceCard: {
    marginBottom: SPACING.lg,
  },
  performanceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  performanceTitle: {
    fontSize: FONT_SIZE.lg,
    fontWeight: FONT_WEIGHT.bold,
    color: COLORS.textPrimary,
    marginLeft: SPACING.sm,
  },
  metricRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  metricLabel: {
    fontSize: FONT_SIZE.base,
    color: COLORS.textSecondary,
  },
  metricValue: {
    fontSize: FONT_SIZE.base,
    fontWeight: FONT_WEIGHT.semibold,
    color: COLORS.textPrimary,
  },
  ratingValue: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
  },
});
