import Loading from "@/components/loading/Loading";
import { useUserByUsername } from "@/features/user/useUserByUsername";
import { useUser } from "@/features/user/useUser";
import { useLocalSearchParams } from "expo-router";
import { View, Text } from "react-native";
import ProfileCard from "@/components/profile/ProfileCard";

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
  console.log(user);

  return (
    <View className="flex-1 justify-center">
      <View className="flex-1 flex-col gap-6 items-start">
        <ProfileCard isOwnProfile={isOwnProfile} />
      </View>
    </View>
  );
}