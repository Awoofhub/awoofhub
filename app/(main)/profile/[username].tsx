import Loading from "@/components/loading/Loading";
import ProfileDeals from "@/components/profile/ProfileDeals";
import { useUser } from "@/features/user/useUser";
import { useUserByUsername } from "@/features/user/useUserByUsername";
import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";


interface ProfileScreenProps {
  params: {
    username: string;
  }
}


export default function ProfileScreen({ params }: ProfileScreenProps) {
  const { username } = useLocalSearchParams();
  const { data: currentUser } = useUser();
  const { data: user, isLoading: userLoading } = useUserByUsername({
    username: username as string,
  });

  if (userLoading) return <Loading />;

  if (!user) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text className="text-center text-gray-500">User not found.</Text>
      </View>
    );
  }

  const isOwnProfile = currentUser?.id === user.id;


  return (
      <ProfileDeals isOwnProfile={isOwnProfile} profile={user} />
  );
}