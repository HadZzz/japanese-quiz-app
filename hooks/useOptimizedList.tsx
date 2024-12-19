import React, { useCallback, useState, useRef } from 'react';
import {
  VirtualizedList,
  ViewStyle,
  StyleSheet,
  View,
  ActivityIndicator,
} from 'react-native';

interface UseOptimizedListProps<T> {
  data: T[];
  renderItem: (item: T) => React.ReactElement;
  keyExtractor?: (item: T) => string;
  itemHeight?: number;
  onEndReached?: () => void;
  style?: ViewStyle;
}

interface UseOptimizedListReturn<T> {
  ListComponent: React.FC;
  refresh: () => void;
  isLoading: boolean;
}

export function useOptimizedList<T>({
  data,
  renderItem,
  keyExtractor = (item: any) => item.id?.toString(),
  itemHeight = 80,
  onEndReached,
  style,
}: UseOptimizedListProps<T>): UseOptimizedListReturn<T> {
  const [isLoading, setIsLoading] = useState(false);
  const listRef = useRef<VirtualizedList<T>>(null);

  const getItem = useCallback(
    (data: T[], index: number) => data[index],
    []
  );

  const getItemCount = useCallback(
    (data: T[]) => data.length,
    []
  );

  const getItemLayout = useCallback(
    (_: T[] | null, index: number) => ({
      length: itemHeight,
      offset: itemHeight * index,
      index,
    }),
    [itemHeight]
  );

  const memoizedRenderItem = useCallback(
    ({ item }: { item: T }) => renderItem(item),
    [renderItem]
  );

  const handleEndReached = useCallback(() => {
    if (onEndReached && !isLoading) {
      setIsLoading(true);
      Promise.resolve(onEndReached()).finally(() => {
        setIsLoading(false);
      });
    }
  }, [onEndReached, isLoading]);

  const refresh = useCallback(() => {
    listRef.current?.scrollToOffset({ offset: 0, animated: true });
  }, []);

  const ListComponent: React.FC = useCallback(() => (
    <View style={[styles.container, style]}>
      <VirtualizedList
        ref={listRef}
        data={data}
        renderItem={memoizedRenderItem}
        keyExtractor={keyExtractor}
        getItem={getItem}
        getItemCount={getItemCount}
        getItemLayout={getItemLayout}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.5}
        maxToRenderPerBatch={10}
        windowSize={5}
        updateCellsBatchingPeriod={50}
        removeClippedSubviews={true}
        initialNumToRender={10}
        ListFooterComponent={
          isLoading ? (
            <ActivityIndicator
              style={styles.loader}
              size="small"
              color="#FF1493"
            />
          ) : null
        }
      />
    </View>
  ), [
    data,
    memoizedRenderItem,
    keyExtractor,
    getItem,
    getItemCount,
    getItemLayout,
    handleEndReached,
    style,
    isLoading,
  ]);

  return {
    ListComponent,
    refresh,
    isLoading,
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loader: {
    padding: 10,
  },
}); 