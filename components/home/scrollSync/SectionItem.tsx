import Text from '@/components/common/Text';
import OfferList from '@/components/offers/OfferList';
import { useOffers } from '@/features/offers/useOffers';
import { Feather } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { memo } from 'react';
import { LayoutChangeEvent, Pressable, View } from 'react-native';

interface Props {
    item: any;
    onLayout: (event: LayoutChangeEvent, index: number) => void;
    index: number;
}

function SectionItem({ item, onLayout, index }: Props) {

    const { data, isLoading, isFetched, isFetching } = useOffers({
        search: "",
        category: item.slug ?? "",
        minRating: 0,
        createdFrom: "",
        createdTo: "",
        limit: 4
    });

    const offers = data?.pages.flatMap((page) => page.data) ?? [];

    return (
        <View className="pb-5" onLayout={e => onLayout(e, index)}>
            {/* Header */}
            <View className="px-5 py-3 flex flex-row justify-between items-center">
                <Text type="headerBold" className="text-[18px] text-[#1C1C1E]">
                    {item.name}
                </Text>

                <Link href={`/offers?category=${item.slug}`} asChild>
                    <Pressable className="flex-row items-center gap-1">
                        <Text type="headerBold"  className="text-orange-600 text-sm">
                            View all
                        </Text>
                        <Feather name="arrow-right" size={16} color="#EA580C" />
                    </Pressable>
                </Link>
            </View>

            <OfferList offers={offers} isLoading={isLoading} isFetched={isFetched} isFetching={isFetching} />

        </View>
    );
}

export default memo(SectionItem, (prevProps, nextProps) => {
  return prevProps.item.id === nextProps.item.id && prevProps.index === nextProps.index;
});