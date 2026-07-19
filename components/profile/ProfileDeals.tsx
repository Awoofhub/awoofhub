import OfferInfiniteList from "@/components/offers/OfferInfiniteList";
import CommonText from "@/components/common/Text";
import ProfileDealsSkeleton from "@/components/profile/ProfileDealsSkeleton";
import { useOffersByUsername } from "@/features/offers/useOffersByUsername";
import { User } from "@/types/user";
import { Link } from "expo-router";
import { Tag } from "lucide-react-native";
import { useMemo } from "react";
import { TouchableOpacity, View } from "react-native";

interface Props {
  isOwnProfile: boolean;
  profile: User;
}

export default function ProfileDeals({ isOwnProfile, profile }: Props) {
  const {
    data,
    isLoading,
    isFetching,
    isFetched,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useOffersByUsername({
    username: profile?.username ?? "",
    search: "",
    category: "",
    minRating: 0,
    createdFrom: "",
    createdTo: "",
    limit: 20,
  });

  const offers = useMemo(
    () => data?.pages.flatMap((page) => page.data) ?? [],
    [data],
  );

  return (
    <View className="flex-1 w-full items-center justify-center bg-white py-4 px-4">
      <CommonText type="headerBold" className="text-2xl text-primary mb-4">
        Active Deals are here
      </CommonText>

      {isLoading && <ProfileDealsSkeleton />}

      {!isLoading && isFetched && offers.length === 0 && (
        <View className="flex-1 items-center justify-center py-16 px-4">
          <View className="items-center">
            <Tag width={40} height={40}  color="#FF4D0D" />
            <CommonText
              type="paragraph"
              className="text-black mb-1 text-lg mt-4"
            >
              No deals yet
            </CommonText>
            <CommonText type="paragraph" className="text-black text-sm mb-4 text-center">
              {isOwnProfile
                ? "Deals you post as an awoofer will appear here."
                : "This user has no live offers at the moment."}
            </CommonText>
          </View>
        </View>
      )}

      {!isLoading && offers.length > 0 && (
        <OfferInfiniteList
          offers={offers}
          hasNextPage={hasNextPage}
          isLoading={false}
          isFetching={isFetching}
          isFetched={isFetched}
          fetchNextPage={fetchNextPage}
          isFetchingNextPage={isFetchingNextPage}
        />
      )}
    </View>
  );
}