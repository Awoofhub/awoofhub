import { View,TouchableOpacity, Image, Text } from "react-native"
import { User } from "@/types/user";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect,useState,useRef,useMemo } from "react";
import { useUserByUsername } from "@/features/user/useUserByUsername";
import { useUser } from "@/features/user/useUser";
import { useOffersByUsername } from "@/features/offers/useOffersByUsername";
import { useLocalSearchParams } from "expo-router";
import Loading from "../loading/Loading";
import Bsthreedots from "@/assets/icons/bsthreedots.svg";
import Fimagpin from "@/assets/icons/fimagpin.svg";
import fareguser from "@/assets/icons/fareguser.svg";
import mdoutlinechatbubble from "@/assets/icons/mdoutlinechatbubble.svg";

interface ProfileCardProps {
  profile: User;
  isOwnProfile: boolean;
}
export default function ProfileCard({ isOwnProfile, profile }: ProfileCardProps) {
  const { username: rawUsername } = useLocalSearchParams();
  const username = Array.isArray(rawUsername) ? rawUsername[0] : rawUsername;

  const { data: currentUser } = useUser();
  const { data: user, isLoading: isUserLoading } = useUserByUsername({ username });

  const { data, isFetching, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useOffersByUsername({
      username,
      search: "",
      category: "",
      minRating: 0,
      createdFrom: "",
      createdTo: "",
      limit: 8,
    });

  const offers = useMemo(
    () => data?.pages.flatMap((page) => page.data) ?? [],
    [data]
  );

  if (isUserLoading) return <Loading />;
  if (!user) return (
    <View className="flex-1 justify-center items-center">
      <Text className="text-gray-500 text-lg">User not found</Text>
    </View>
  );

  return (
    <SafeAreaView className="bg-white p-4 rounded-lg shadow-md">
      <View className="flex-row items-center justify-between mb-4">
        <View className="flex-row items-center">
          <Image
            source={{ uri: profile.profileImageUrl || "https://via.placeholder.com/150" }}
            className="w-16 h-16 rounded-full"
          />
          <View className="ml-4">
            <Text className="text-lg font-semibold">{profile.name}</Text>
            <Text className="text-gray-500">@{profile.username}</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}




