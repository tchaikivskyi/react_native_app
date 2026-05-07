import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
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

export const RoomList: React.FC<Props> = ({
  data,
  loading,
  HeaderComponent,
  onReset,
  onRoomPress,
}) => {
  return (
    <FlatList
      data={data}
      keyExtractor={item => item.id}
      numColumns={2}
      columnWrapperStyle={styles.row}
      ListHeaderComponent={HeaderComponent}
      ListEmptyComponent={!loading ? <EmptyState onReset={onReset} /> : null}
      renderItem={({ item }) => (
        <RoomCard room={item} onPress={() => onRoomPress(item.id)} />
      )}
      contentContainerStyle={styles.listContainer}
      showsVerticalScrollIndicator={false}
    />
  );
};

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
