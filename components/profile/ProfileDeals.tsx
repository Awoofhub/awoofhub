import Text from "@/components/common/Text";
import { useOffersByUsername } from "@/features/offers/useOffersByUsername";
import { User } from "@/types/user";
import { Tag } from "lucide-react-native";
import { useMemo } from "react";
import { View } from "react-native";
import OfferInfiniteList from "../offers/OfferInfiniteList";
import ProfileCard from "./ProfileCard";

interface Props {
  isOwnProfile: boolean;
  profile: User;
}

export default function ProfileDeals({ isOwnProfile, profile }: Props) {
  const { data, isLoading, isFetching, isFetched, hasNextPage, isFetchingNextPage, fetchNextPage } = useOffersByUsername({
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

  const header = (
    <>
      <View className="px-1 pt-6">
        <ProfileCard
          profile={profile}
          isOwnProfile={isOwnProfile}
        />

        <Text
          type="headerBold"
          className="text-2xl text-black mt-7"
        >
          Active Deals
        </Text>
      </View>
    </>
  );

  return (
    <OfferInfiniteList
      offers={offers}
      header={header}
      hasNextPage={hasNextPage}
      isLoading={false}
      isFetching={isFetching}
      isFetched={isFetched}
      fetchNextPage={fetchNextPage}
      isFetchingNextPage={isFetchingNextPage}
      emptyComponent={
        <View className="flex-1 items-center justify-center py-16 px-4">
          <View className="items-center">
            <Tag width={40} height={40} color="#FF4D0D" />
            <Text
              type="paragraph"
              className="text-black mb-1 text-lg mt-4"
            >
              No deals yet
            </Text>
            <Text type="paragraph" className="text-black text-sm mb-4 text-center">
              {isOwnProfile
                ? "Deals you post as an awoofer will appear here."
                : "This user has no live offers at the moment."}
            </Text>
          </View>
        </View>
      }
    />
  )
}