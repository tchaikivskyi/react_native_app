import React, { memo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { COLORS } from '../constants/style';
import { useTheme } from '../context/ThemeContext';
import { RoomReview } from '../types/review';

type Props = {
  review: RoomReview;
};

const ReviewCardComponent: React.FC<Props> = ({ review }) => {
  const { colors } = useTheme();

  return (
    <View
      style={[
        styles.card,
        { backgroundColor: colors.card, borderColor: colors.border },
      ]}
    >
      <View style={styles.headerRow}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{review.author[0]?.toUpperCase()}</Text>
        </View>
        <View style={styles.authorBox}>
          <Text style={[styles.author, { color: colors.text }]} numberOfLines={1}>
            {review.author}
          </Text>
          <Text
            style={[styles.email, { color: colors.mutedText }]}
            numberOfLines={1}
          >
            {review.email}
          </Text>
        </View>
      </View>

      <Text style={[styles.body, { color: colors.mutedText }]}>
        {review.body}
      </Text>
    </View>
  );
};

export const ReviewCard = memo(ReviewCardComponent);

const styles = StyleSheet.create({
  card: {
    borderRadius: 14,
    borderWidth: 1,
    padding: 14,
    marginBottom: 10,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  avatar: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  avatarText: {
    color: '#FFFFFF',
    fontWeight: '800',
  },
  authorBox: {
    flex: 1,
  },
  author: {
    fontSize: 13,
    fontWeight: '800',
  },
  email: {
    fontSize: 11,
    marginTop: 2,
  },
  body: {
    fontSize: 13,
    lineHeight: 19,
  },
});
