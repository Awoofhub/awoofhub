import Loading from '@/components/loading/Loading';
import { useCategory } from '@/features/category/useCategory';
import { useRef } from 'react';
import { FlatList, LayoutChangeEvent, View } from 'react-native';
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';
import ExpiringOffers from '../ExpiringOffers';
import TrendingOffers from '../TrendingOffers';
import SectionItem from './SectionItem';
import TabBar from './TabBar';

export default function ScrollSyncTabBar() {
  const { data: categories = [], isFetching } = useCategory();

  const tabs = categories.map(item => item.name);

  const heightRef = useRef<number[]>([]);
  const sectionYSv = useSharedValue<number[]>([]);
  const activeIndexSv = useSharedValue(0);
  const sectionListRef = useRef<FlatList>(null);
  const userDragged = useSharedValue(false);

  const onLayoutHandler = (event: LayoutChangeEvent, index: number) => {
    const { height } = event.nativeEvent.layout;

    heightRef.current[index] = height;

    const measuredCount = heightRef.current.filter(h => h !== undefined).length;

    if (measuredCount === categories.length) {
      let ySum = 0;
      const sectionYs: number[] = [0];

      for (let i = 0; i < categories.length; i++) {
        ySum += heightRef.current[i] || 0;
        sectionYs.push(ySum);
      }
      sectionYSv.value = [...sectionYs];
    }
  };

  const scrollToIndex = (index: number) => {
    if (sectionYSv.value[index] !== undefined) {
      sectionListRef.current?.scrollToOffset({
        offset: sectionYSv.value[index],
        animated: true,
      });
    }
  };

  const listData = [
    { type: 'tabbar', id: 'tabbar' },
    ...categories,
  ];

  const onScrollHandler = useAnimatedScrollHandler({
    onScroll: event => {
      const y = event.contentOffset.y;
      const triggerPoint = y - 500;

      for (let i = 1; i < sectionYSv.value.length; i++) {
        if (triggerPoint < sectionYSv.value[i]) {
          activeIndexSv.value = i - 1;
          break;
        }
      }
    },
    onBeginDrag: () => {
      userDragged.value = true;
    },
  });

  if (isFetching) {
    return (
      <View className="flex-1 justify-center items-center bg-[#EEF2F6]">
        <Loading />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-[#EEF2F6]">

      <Animated.FlatList
        ref={sectionListRef}
        data={listData}
        ListHeaderComponent={
          <>
            <ExpiringOffers />
            <TrendingOffers />
          </>
        }
        renderItem={({ item, index }) => {
          if ('type' in item && item.type === 'tabbar') {
            return (
              <TabBar
                tabs={tabs}
                activeIndex={activeIndexSv}
                scrollToIndex={scrollToIndex}
                userDragged={userDragged}
              />
            );
          }
          return (
            <SectionItem
              item={item}
              onLayout={onLayoutHandler}
              index={index - 1}
            />
          );
        }}
        keyExtractor={item => item.id.toString()}
        onScroll={onScrollHandler}
        stickyHeaderIndices={[1]}
        showsVerticalScrollIndicator={false}
        contentContainerClassName="pb-12"
      />
    </View>
  );
}




