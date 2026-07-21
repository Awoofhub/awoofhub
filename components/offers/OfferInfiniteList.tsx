import Text from "@/components/common/Text";
import { colors } from '@/styles/colors';
import { Offer } from '@/types/offer';
import { ReactElement } from 'react';
import { ActivityIndicator, FlatList, View } from 'react-native';
import OfferCard from './OfferCard';
import OfferListSkeleton from './OfferListSkeleton';


interface Props {
    offers: Offer[];
    isFetchingNextPage: boolean;
    isFetching: boolean
    isFetched: boolean;
    isLoading: boolean;
    hasNextPage: boolean;
    fetchNextPage: () => void;
    header?: ReactElement;
    emptyComponent?: ReactElement;
}

export default function OfferInfiniteList({ offers, hasNextPage, isLoading, isFetched, isFetching, fetchNextPage, isFetchingNextPage, header, emptyComponent }: Props) {

    const listData = isLoading ? Array.from({ length: 8 }, (_, i) => ({ id: `skeleton-${i}` } as Offer)) : offers;

    return (
        <FlatList
            columnWrapperClassName="gap-3"
            contentContainerClassName="gap-3 px-3"
            data={listData}
            ListHeaderComponent={
                header ? () => header : undefined
            }
            numColumns={2}
            renderItem={({ item }) => {
                if (isLoading) {
                    return <OfferListSkeleton />;
                }
                return <OfferCard offer={item} />;
            }}
            keyExtractor={item => item.id ?? ''}
            onEndReached={() => {
                if (hasNextPage && !isFetchingNextPage && !isLoading) {
                    fetchNextPage();
                }
            }}
            onEndReachedThreshold={0.5}
            ListFooterComponent={() => (
                <View style={{ paddingVertical: 20, alignItems: "center" }}>
                    {isFetchingNextPage && (
                        <ActivityIndicator size="large" color={colors.primary} />
                    )}

                    {!hasNextPage && offers.length > 0 && (
                        <Text>No more offers</Text>
                    )}
                </View>
            )}

            ListEmptyComponent={() => {
                if (!isFetching && isFetched && offers.length === 0) {
                    return emptyComponent ?? (
                        <View className="pt-5">
                            <Text className="text-gray-500 text-center">
                                No offers available.
                            </Text>
                        </View>
                    );
                }
                return null;
            }}
        />
    );
};
