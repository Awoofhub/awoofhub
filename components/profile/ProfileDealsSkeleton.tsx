import OfferListSkeleton from "@/components/offers/OfferListSkeleton";
import { View } from "react-native";

export default function ProfileDealsSkeleton() {
  return (
    <View className="flex-row flex-wrap gap-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <View key={i} className="w-[48%]">
          <OfferListSkeleton />
        </View>
      ))}
    </View>
  );
}
