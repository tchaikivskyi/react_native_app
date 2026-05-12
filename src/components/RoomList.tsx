import React, { memo, useCallback } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import type { ListRenderItem } from 'react-native';
import { RoomCard } from './RoomCard';
import { EmptyState } from './EmptyState';
import { Room } from '../types/room';

type Props = {
  data: Room[];
  loading: boolean;
  HeaderComponent: React.ReactElement;
  onReset: () => void;
  onRoomPress: (roomId: string) => void;
};

const RoomListComponent: React.FC<Props> = ({
  data,
  loading,
  HeaderComponent,
  onReset,
  onRoomPress,
}) => {
  const renderRoom: ListRenderItem<Room> = useCallback(
    ({ item }) => <RoomCard room={item} onPress={onRoomPress} />,
    [onRoomPress],
  );

  return (
    <FlatList
      data={data}
      keyExtractor={item => item.id}
      numColumns={2}
      columnWrapperStyle={styles.row}
      ListHeaderComponent={HeaderComponent}
      ListEmptyComponent={!loading ? <EmptyState onReset={onReset} /> : null}
      renderItem={renderRoom}
      contentContainerStyle={styles.listContainer}
      showsVerticalScrollIndicator={false}
      removeClippedSubviews
      initialNumToRender={6}
      windowSize={5}
    />
  );
};

export const RoomList = memo(RoomListComponent);

const styles = StyleSheet.create({
  listContainer: {
    paddingBottom: 40,
    flexGrow: 1,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 16,
  },
});
