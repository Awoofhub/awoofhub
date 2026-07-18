import OfferInfiniteList from "@/components/offers/OfferInfiniteList";
import CommonText from "@/components/common/Text";
import ProfileDealsSkeleton from "@/components/profile/ProfileDealsSkeleton";
import { useOffersByUsername } from "@/features/offers/useOffersByUsername";
import { User } from "@/types/user";
import { Link } from "expo-router";
import { Tag } from "lucide-react-native";
import { useMemo } from "react";
import { Text, TouchableOpacity, View } from "react-native";

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
    <View className="flex-1">
      <CommonText type="headerBold" className="text-2xl text-black mb-4">
        Active Deals are here
      </CommonText>

      {isLoading && <ProfileDealsSkeleton />}

      {!isLoading && isFetched && offers.length === 0 && (
        <View className="flex-1 items-center justify-center py-16 px-4">
          <Tag width={40} height={40} color="#000" />
          <Text className="font-bold text-black mb-1 text-lg mt-4">
            No deals yet
          </Text>
          <Text className="text-black text-sm mb-4 text-center">
            {isOwnProfile
              ? "Deals you post as an awoofer will appear here."
              : "This user has no live offers at the moment."}
          </Text>
          {isOwnProfile && (
            <Link href="/offers/create" asChild>
              <TouchableOpacity className="bg-primary px-6 py-2 rounded-md">
                <CommonText
                  type="headerBold"
                  className="text-white text-base font-semibold"
                >
                  Post an Awoof
                </CommonText>
              </TouchableOpacity>
            </Link>
          )}
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
