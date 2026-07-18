import { User } from "@/types/user";
import { FontAwesome } from "@expo/vector-icons";
import AntDesign from '@expo/vector-icons/AntDesign';
import { router } from "expo-router";
import { Image, Pressable, Text, View } from "react-native";


interface Props {
    isOwnProfile: boolean;
    profile: User;
}

export default function ProfileHeader({ isOwnProfile, profile, }: Props) {

    if (!profile) {
        return null;
    }

    return (
        <View className="w-full mx-auto p-4">

            <View className="relative bg-white rounded-3xl px-4">
                <View className="flex flex-col pt-10 md:pt-0 md:flex-row items-center gap-6">


                    {profile.profileImageUrl ? (
                        <Image
                            source={{ uri: profile.profileImageUrl }}
                            className="w-[100px] h-[100px] rounded-full"
                        />
                    ) : (

                        <View className="w-[100px] h-[100px] bg-gray-300 justify-center items-center rounded-full">
                            <FontAwesome name="user" size={50} color="gray" />
                        </View>
                    )}
                    


                    {/* INFO */}
                    <View className="w-full gap-2">
                        <Text className="text-xl lg:text-2xl font-bold text-gray-900">
                            {profile.name}
                        </Text>

                        {profile.website && (
                            <View className="flex-row items-center gap-3">
                                <AntDesign name="link" size={24} color="black" />
                                <Text className="text-sm lg:text-base text-blue-500 font-medium">
                                    {profile.website}
                                </Text>
                            </View>
                        )}

                        <Text className="text-gray-600 text-sm break-all">
                            {profile.bio || "No bio yet"}
                        </Text>

                        <View className="flex-row mt-3 items-center gap-3">
                            {isOwnProfile ? (
                                <Pressable
                                    onPress={() => router.push("/profile/edit")}
                                    className="bg-gray-200 px-4 py-2 rounded-lg"
                                >
                                    <Text className="text-sm font-medium">
                                        Edit Profile
                                    </Text>
                                </Pressable>
                            ) : (
                                <Text>Add profle action button</Text>
                            )}
                        </View>
                    </View>
                </View>
            </View>
        </View>
    )
}