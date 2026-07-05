import { Offer } from '@/types/offer';
import { Text, View } from 'react-native';
import OfferCard from './OfferCard';
import OfferListSkeleton from './OfferListSkeleton';

interface Props {
  offers: Offer[];
  isLoading: boolean;
  isFetched: boolean;
  isFetching: boolean;
}

export default function OfferList({ offers, isLoading, isFetching, isFetched }: Props) {
  // Generate 4 skeletons or take the top 4 offers
  const previewOffers = isLoading
    ? Array.from({ length: 4 }, (_, i) => ({ id: `skeleton-${i}` } as Offer))
    : offers.slice(0, 4);

  const hasNoOffers = !isFetching && isFetched && offers.length === 0;

  const rows = [];

  for (let i = 0; i < previewOffers.length; i += 2) {
    rows.push(previewOffers.slice(i, i + 2));
  }

  return (
    <View className="px-3">
      {/* Empty State */}
      {hasNoOffers && (
        <View className="pt-5">
          <Text className="text-gray-500 text-center">
            No offers available.
          </Text>
        </View>
      )}

      {/* Grid Container */}
      {!hasNoOffers && (
        <View>
          {rows.map((row, rowIndex) => (
            <View
              key={rowIndex}
              className="flex-row justify-between gap-3 mb-3"
            >
              {row.map((item) =>
                isLoading ? (
                  <OfferListSkeleton key={item.id} />
                ) : (
                  <OfferCard key={item.id} offer={item} />
                )
              )}
            </View>
          ))}
        </View>
      )}
    </View>
  );
}