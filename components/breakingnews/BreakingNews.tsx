import { View, Text, useWindowDimensions, ViewToken } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Colors } from '@/constants/Colors';
import { NewsDataType } from '@/types';
import SliderItem from '../SliderItem';
import Animated, { 
  useAnimatedRef, 
  useAnimatedScrollHandler, 
  useSharedValue, 
  useDerivedValue,
  scrollTo
} from 'react-native-reanimated';
import Pagination from '../Pagination';

type Props = {
  newsList: Array<NewsDataType>;
};

const BreakingNews = ({ newsList = [] }: Props) => {
  const [data, setData] = useState(newsList);
  const scrollX = useSharedValue(0);
  const ref = useAnimatedRef<Animated.FlatList<NewsDataType>>();

  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const interval = useRef<NodeJS.Timeout>();
  const offset = useSharedValue(0);
  const { width } = useWindowDimensions();

  const onScrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollX.value = event.contentOffset.x;
    },
    onMomentumEnd: (e) => {
      offset.value = e.contentOffset.x;
    },
  });

  useEffect(() => {
    if (isAutoPlay && data.length > 0) {
      interval.current = setInterval(() => {
        if (offset.value < (data.length - 1) * width) {
          offset.value += width;
        } else {
          offset.value = 0;
        }
      }, 5000);
    } else {
      clearInterval(interval.current);
    }
    return () => {
      clearInterval(interval.current);
    };
  }, [isAutoPlay, offset, width, data.length]);

  useDerivedValue(() => {
    scrollTo(ref, offset.value, 0, true);
  }, [offset]);

  const viewabilityConfig = useRef({ itemVisiblePercentThreshold: 50 });
  const onViewableItemsChanged = useRef(({ viewableItems }: { viewableItems: ViewToken[] }) => {
    if (viewableItems[0]?.index !== undefined && viewableItems[0].index !== null) {
      // You can use this to update any state if needed
    }
  });

  const renderItem = ({ item, index }: { item: NewsDataType; index: number }) => (
    <SliderItem slideItem={item} index={index} scrollX={scrollX} />
  );

  if (data.length === 0) {
    return <Text style={styles.noDataText}>No Breaking News Available</Text>;
  }

  return (
    <View style={styles.container}>
      <Animated.FlatList
        data={data}
        renderItem={renderItem}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        onScroll={onScrollHandler}
        scrollEventThrottle={16}
        onEndReached={() => setData((prevData) => [...prevData, ...newsList])}
        viewabilityConfig={viewabilityConfig.current}
        onViewableItemsChanged={onViewableItemsChanged.current}
        ref={ref}
        keyExtractor={(item) => item.article_id.toString()}
      />
      <Pagination items={data} scrollX={scrollX} />
    </View>
  );
};

export default BreakingNews;

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  noDataText: {
    fontSize: 16,
    color: Colors.darkGrey,
    textAlign: 'center',
    marginTop: 20,
  },
});


