import { renderHook, act } from '@testing-library/react-hooks';
import { Text, ViewProps } from 'react-native';
import React from 'react';
import { useOptimizedList } from '../useOptimizedList';

interface MockItem {
  id: string;
  title: string;
}

describe('useOptimizedList', () => {
  const mockData: { item: MockItem }[] = [
    { item: { id: '1', title: 'Item 1' } },
    { item: { id: '2', title: 'Item 2' } },
    { item: { id: '3', title: 'Item 3' } },
  ];

  const mockRenderItem = jest.fn(({ item }: { item: MockItem }) => React.createElement(Text, null, item.title));

  it('should return list component and utilities', () => {
    const { result } = renderHook(() =>
      useOptimizedList({
        data: mockData,
        renderItem: mockRenderItem,
      })
    );

    expect(result.current.ListComponent).toBeDefined();
    expect(result.current.refresh).toBeDefined();
    expect(result.current.isLoading).toBeDefined();
  });

  it('should handle refresh', () => {
    const { result } = renderHook(() =>
      useOptimizedList({
        data: mockData,
        renderItem: mockRenderItem,
      })
    );

    act(() => {
      result.current.refresh();
    });

    expect(result.current.isLoading).toBe(false);
  });

  it('should handle end reached', async () => {
    const mockOnEndReached = jest.fn();
    const { result, waitForNextUpdate } = renderHook(() =>
      useOptimizedList({
        data: mockData,
        renderItem: mockRenderItem,
        onEndReached: mockOnEndReached,
      })
    );

    act(() => {
      const component = result.current.ListComponent({ style: {} });
      const virtualizedList = (component as any).props.children;
      virtualizedList.props.onEndReached();
    });

    expect(mockOnEndReached).toHaveBeenCalled();
    expect(result.current.isLoading).toBe(true);

    await waitForNextUpdate();

    expect(result.current.isLoading).toBe(false);
  });

  it('should memoize render item', () => {
    const { result, rerender } = renderHook(() =>
      useOptimizedList({
        data: mockData,
        renderItem: mockRenderItem,
      })
    );

    const component = result.current.ListComponent({ style: {} });
    expect(component).toBeTruthy();
    const firstRenderItem = (component as any).props.renderItem;

    rerender();

    const nextComponent = result.current.ListComponent({ style: {} });
    const secondRenderItem = (nextComponent as any).props.renderItem;

    expect(firstRenderItem).toBe(secondRenderItem);
  });
}); 