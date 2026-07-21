import Text from "@/components/common/Text";
import { colors } from "@/styles/colors";
import { User } from "@/types/user";
import { Feather, FontAwesome, MaterialIcons } from "@expo/vector-icons";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { format } from "date-fns";
import { router } from "expo-router";
import { Plus } from "lucide-react-native";
import { useState } from "react";
import { Image, Pressable, TouchableOpacity, View } from "react-native";
import AlertButton from "../alert/Alert";
import ReportModal from "../modal/ReportModal";

interface Props {
  isOwnProfile: boolean;
  profile: User;
}

export default function ProfileCard({ isOwnProfile, profile }: Props) {

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isReportOpen, setIsReportOpen] = useState(false);

  return (
    <>
      <Pressable
        className="relative w-full rounded-3xl border border-gray-100 bg-white px-4 py-6"
        onPress={() => setIsDropdownOpen(false)}
      >
        {/* Report Dropdown */}
        {!isOwnProfile && (
          <View className="absolute right-4 top-4 z-50">
            <TouchableOpacity
              onPress={() =>
                setIsDropdownOpen((prev) => !prev)
              }
              className="pt-4"
            >
              <Feather
                name="more-horizontal"
                size={24}
                color="black"
              />
            </TouchableOpacity>

            {isDropdownOpen && (
              <View className="right-0 top-16 w-32 absolute  overflow-hidden rounded-xl border border-red-500 bg-white">
                <TouchableOpacity
                  className="py-3"
                  onPress={() => {
                    setIsReportOpen(true)
                    setIsDropdownOpen(false);
                  }}
                >
                  <Text className="text-center font-medium text-red-500">
                    Report User
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        )}

        <View className="flex flex-col mb-4">

          {profile.profileImageUrl ? (
            <Image
              source={{ uri: profile.profileImageUrl }}
              className="h-28 w-28 rounded-full border-2 border-primary mb-3"
              resizeMode="contain"
            />
          ) : (
            <View className="w-28 h-28 bg-gray-300 justify-center items-center rounded-full border-2 border-primary mb-3">
              <FontAwesome name="user" size={40} color="gray" />
            </View>
          )}


          {/* Name */}
          <View className="flex-row flex-wrap items-center gap-2">
            <Text type="headerBold" className="text-2xl text-black">
              {profile.name}
            </Text>

            <View className="flex-row items-center gap-1 rounded-full bg-orange-50 px-2 py-1">
              <MaterialIcons
                name="person-outline"
                size={15}
                color={colors.primary}
              />

              <Text type={'paragraphBold'} className="text-xs text-primary">
                Awoofer
              </Text>
            </View>
          </View>

          {/* Username */}
          <View className="mt-2 flex-row flex-wrap items-center">
            <Text type={'paragraphSemiBold'} className="text-base text-black">
              @{profile.username}
            </Text>

            {profile.address && (
              <>
                <Text className="mx-1 text-lg">•</Text>
                <Text type={'paragraphSemiBold'} className="text-base text-black">
                  {profile.address}
                </Text>
              </>
            )}
          </View>

          {/* Bio */}
          <Text className="mt-4 text-base text-gray-500">
            {profile.bio || "No bio added."}
          </Text>

          {/* Joined */}
          <Text type={'paragraphSemiBold'} className="mt-3 text-primary">
            Awoofer since{" "}
            {format(
              new Date(profile.createdAt),
              "MMMM yyyy"
            )}
          </Text>

        </View>

        {/* Message */}
        {!isOwnProfile && (
          <TouchableOpacity className="mt-6 flex-row items-center justify-center rounded-xl border border-primary py-3">

            <MaterialCommunityIcons
             name="message-text-outline"
             size={20}
             color="#FF4D0D" 
             />

            <Text type="headerBold" className="text-lg ml-2 text-primary">
              Message
            </Text>
          </TouchableOpacity>
        )}

        {/* Stats */}
        <View className="mt-5 gap-3">
          <View className="flex-row items-center justify-between rounded-xl border border-gray-200 p-5">
            <Text type={'paragraphSemiBold'} className="text-sm text-gray-500">
              DEALS POSTED
            </Text>

            <Text type={'paragraphSemiBold'} className="text-xl">
              {profile.numOfDealPosted ?? 0}
            </Text>
          </View>

          <View className="flex-row items-center justify-between rounded-xl border border-gray-200 p-5">
            <Text type={'paragraphSemiBold'} className="text-sm font-semibold text-gray-500">
              OFFER CLICKS
            </Text>

            <Text type={'paragraphSemiBold'} className="text-xl">
              {profile.offerClicks ?? 0}
            </Text>
          </View>
        </View>

        {/* Own Profile */}
        {isOwnProfile && (
          <View className="my-6 gap-3">
            <TouchableOpacity className="rounded-xl border border-primary py-4">
              <Text type={"headerBold"} className="text-lg text-center text-primary">
                Edit Profile
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="flex-row items-center justify-center rounded-xl bg-primary py-4"
              onPress={() =>
                router.push("/offers/create")
              }
            >
              <Plus size={18} color="white" />

              <Text type={'headerBold'} className="text-lg ml-2 text-white">
                Post Awoof
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Alerts */}
        {!isOwnProfile && (
          <View className="mt-4 flex-row items-center justify-between rounded-xl border border-orange-100 bg-orange-50 p-4">
            <View className="flex-1">
              <Text type="headerBold" className="text-lg text-black">
                Post alerts
              </Text>

              <Text type="paragraphSemiBold" className="mt-1 text-sm text-gray-500">
                Get notified when{" "}
                {profile.name.split(" ")[0]} posts.
              </Text>
            </View>

            <AlertButton contributorId={profile.id} />

          </View>
        )}
      </Pressable>

      <ReportModal
        isOpen={isReportOpen}
        onClose={() => setIsReportOpen(false)}
        targetType="user"
        targetId={profile.id}
      />

    </>
  );
}