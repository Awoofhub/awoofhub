import { View, TouchableOpacity, Image, Modal, Pressable, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import { format } from "date-fns";
import { Link, useLocalSearchParams } from "expo-router";
import CommonText from "../common/Text";
import {
  EllipseIcon,
  MapPinCheckInside,
  User,
  MessageCircleIcon,
  PlusIcon,
  FlagIcon,
} from "lucide-react-native";
import { User as UserType } from "@/types/user";
import OverflowMenu, { MenuItem } from "@/components/menu/DropDownMenu";
import { capitalizeFirstLetter } from "@/utils/truncate";
import EditProfileModal from "../modal/EditProfileModal";

interface ProfileCardProps {
  isOwnProfile: boolean;
  profile?: UserType;
}

export default function ProfileCard({ isOwnProfile, profile }: ProfileCardProps) {
  const { username: rawUsername } = useLocalSearchParams();
  
  const username = Array.isArray(rawUsername) ? rawUsername[0] : rawUsername;

  const [isReportOpen, setIsReportOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false)


  const profileMenuItems: MenuItem[] = [
    {
      key: "report",
      label: "Report User",
      icon: FlagIcon,
      onPress: () => setIsReportOpen(true),
      variant: "danger",
    },
  ];

 

  if (!profile) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-gray-500 text-lg">User not found</Text>
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 w-full bg-white rounded-2xl px-4 py-3 shadow-sm border border-gray-100">
      {!isOwnProfile && (
        <View className="absolute top-4 right-4">
          <OverflowMenu
            trigger={
              <View className="p-2 rounded-xl bg-white">
                <EllipseIcon width={18} height={18} stroke="#000" />
              </View>
            }
            items={profileMenuItems}
          />
        </View>
      )}

      {/* Avatar + identity block */}
      <View className="flex flex-col mb-4 items-start">
        <View className="w-28 h-28 border-2 border-primary rounded-full overflow-hidden mb-3">
          {profile.profileImageUrl ? (
            <Image
              source={{ uri: profile.profileImageUrl }}
              className="w-full h-full"
              resizeMode="cover"
            />
          ) : (
            <View className="bg-[#F7C8D5] flex-1 items-center justify-center">
              <Text className="text-[#B85B80] text-3xl font-semibold">
                {capitalizeFirstLetter(profile.name)}
              </Text>
            </View>
          )}
        </View>

        <View className="flex-row items-center gap-4 flex-wrap justify-center">
          <CommonText type="headerBold" className="text-black text-3xl">
            {profile.name}
          </CommonText>
          <View className="flex-row items-center gap-3 bg-[#FFF0EC] px-2 py-1 rounded-full">
            <User width={15} height={15} color="#FF4D0D" />
            <CommonText type="headerBold" className="text-primary text-xs font-semibold">
              Awoofer
            </CommonText>
          </View>
        </View>

        <View className="flex-row items-center gap-1 mt-1 flex-wrap justify-center">
          <CommonText type="paragraph" className="text-black font-medium">
            @{profile.username}
          </CommonText>
          {profile.address && (
            <>
              <Text className="text-black text-sm font-medium">•</Text>
              <MapPinCheckInside width={12} height={12} color="#000" />
              <Text className="text-black text-sm font-medium">{profile.address}</Text>
            </>
          )}
        </View>

        {profile.bio ? (
          <CommonText className="text-gray-500 text-sm mt-3 text-center">
            {profile.bio}
          </CommonText>
        ) : (
          <CommonText type="paragraph" className="text-gray-500 mt-3 py-2">
            No bio added.
          </CommonText>
        )}

        <CommonText className="text-primary font-medium mt-3">
          Awoofer since {format(new Date(profile.createdAt), "MMMM yyyy")}
        </CommonText>
      </View>

      {!isOwnProfile && (
        <TouchableOpacity
          className="w-full mt-2 mb-6 flex-row items-center justify-center gap-1 border border-primary rounded-md py-2.5"
          onPress={() => {
      
          }}
        >
          <MessageCircleIcon width={18} height={18} color="#FF4D0D" />
          <Text className="text-primary text-sm font-medium">Message</Text>
        </TouchableOpacity>
      )}

      {/* Stats */}
      <View className="py-4 gap-3">
        <View className="flex-row justify-between px-4 py-7 border border-gray-100 shadow-sm rounded-md items-center">
          <CommonText className="text-gray-500">DEALS POSTED</CommonText>
          <Text className="font-bold text-lg text-black">{profile.numOfDealPosted ?? 0}</Text>
        </View>
        <View className="flex-row justify-between px-4 py-7 border border-gray-100 shadow-sm rounded-md items-center">
          <CommonText className="text-gray-500">OFFER CLICKS</CommonText>
          <Text className="font-bold text-lg text-black">{profile.offerClicks ?? 0}</Text>
        </View>
      </View>


      {isOwnProfile && (
        <View className="flex flex-col gap-3 my-4">
            <TouchableOpacity className="w-full items-center border border-primary rounded-md py-3" onPress={() => setIsEditOpen(true)}>
              <Text className="text-primary text-base font-semibold">Edit Profile</Text>
            </TouchableOpacity>
          
          <Link href="/offers/create" asChild>
            <TouchableOpacity className="w-full flex-row items-center justify-center gap-1 bg-primary rounded-md py-3">
              <PlusIcon width={18} height={18} color="#fff" />
              <Text className="text-white text-base font-semibold">Post Awoof</Text>
            </TouchableOpacity>
          </Link>
        </View>
      )}

      {!isOwnProfile && (
        <View className="bg-[#FFF6F2] border border-[#F7D9CC] shadow-sm p-3 rounded-lg my-2 flex-row justify-between items-center">
          <View className="shrink">
            <Text className="text-base font-medium text-black">Post alerts</Text>
            <Text className="text-sm text-gray-500">
              Get notified when {profile.name.split(" ")[0]} posts.
            </Text>
          </View>
          {/* TODO: <AlertButton contributorId={user.id} /> */}
        </View>
      )}

      {/* Report modal — opened via the OverflowMenu item above */}
      <EditProfileModal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
      />
    </SafeAreaView>
  );
}