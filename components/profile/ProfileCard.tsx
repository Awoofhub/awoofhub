import { View, TouchableOpacity, Image, Text, Modal, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import { format } from "date-fns";
import { useUserByUsername } from "@/features/user/useUserByUsername";
import { useUser } from "@/features/user/useUser";
import { useOffersByUsername } from "@/features/offers/useOffersByUsername"; // kept in case the offers list lives below this card
import { useLocalSearchParams } from "expo-router";
import { Link } from "expo-router";
import Loading from "../loading/Loading";
import CommonText from "../common/Text";
// swap for your existing plus icon import
import { Ellipse, EllipseIcon, MapPinCheckInside, User, MessageCircleIcon ,PlusIcon} from "lucide-react-native";
// Capitalizes the first letter for the fallback avatar initial
function capitalizeFirstLetter(name?: string) {
  if (!name) return "";
  return name.charAt(0).toUpperCase();
}

interface ProfileCardProps {
  isOwnProfile: boolean;
}

export default function ProfileCard({ isOwnProfile, }: ProfileCardProps) {
  const { username: rawUsername } = useLocalSearchParams();
  const username = Array.isArray(rawUsername) ? rawUsername[0] : rawUsername;

  const { data: currentUser } = useUser();
  // This is the actual source of truth for the card — not a `profile` prop.
  const { data: user, isLoading: isUserLoading } = useUserByUsername({ username });

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isReportOpen, setIsReportOpen] = useState(false);

  if (isUserLoading) return <Loading />;

  if (!user) {
    return (
      <View className="flex-1 justify-center">
        <Text className="text-gray-500 text-lg">User not found</Text>
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 w-full bg-white rounded-2xl px-4 py-8 shadow-sm border border-gray-100">
      {/* Report dropdown - top right, only for other users' profiles */}
      {!isOwnProfile && (
        <View className="flex-1 justify-center items-center">
          <TouchableOpacity
            onPress={() => setIsDropdownOpen((prev) => !prev)}
            className="p-2 rounded-xl bg-white"
          >
            <EllipseIcon width={18} height={18} stroke="#000" />
          </TouchableOpacity>

          {isDropdownOpen && (
            <>
              {/* Invisible full-screen pressable to close on outside tap */}
              <Pressable
                className="flex-1 justify-center items-center"
                onPress={() => setIsDropdownOpen(false)}
              />
              <View className="flex-1 right-0 mt-2 border border-[#E70606] bg-white rounded-lg overflow-hidden">
                <TouchableOpacity
                  onPress={() => {
                    setIsReportOpen(true);
                    setIsDropdownOpen(false);
                  }}
                  className="w-full flex-row items-center justify-center gap-2 px-4 py-3"
                >
                  <Text className="text-[#E70606] font-medium">Report User</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </View>
      )}

      {/* Avatar + identity block */}
      <View className="flex flex-col mb-4 items-start">
        <View className="w-28 h-28 border-2 border-primary rounded-full overflow-hidden mb-3">
          {user.profileImageUrl ? (
            <Image
              source={{ uri: user.profileImageUrl }}
              className="w-full h-full"
              resizeMode="cover"
            />
          ) : (
            <View className="bg-[#F7C8D5] flex-1 items-center  justify-center">
              <Text className="text-[#B85B80] text-3xl font-semibold">
                {capitalizeFirstLetter(user.name)}
              </Text>
            </View>
          )}
        </View>

        <View className="flex-row items-center gap-4 flex-wrap justify-center">
          <CommonText type="headerBold" className=" text-black text-3xl">{user.name}</CommonText>
          <View className="flex-row items-center gap-3 bg-[#FFF0EC] px-2 py-1 rounded-full">
          <User width={15} height={15} color="#FF4D0D" />
            <CommonText type="headerBold" className="text-primary text-xs font-semibold">Awoofer</CommonText>
          </View>
        </View>

        <View className="flex-row items-center gap-1 mt-1 flex-wrap justify-center">
          <CommonText type="paragraph" className="text-black font-medium">@{user.username}</CommonText>
          {user.address && (
            <>
              <Text className="text-black text-sm font-medium">•</Text>
              <MapPinCheckInside width={12} height={12} color="#000" />
              <Text className="text-black text-sm font-medium">{user.address}</Text>
            </>
          )}
        </View>

        {user.bio ? (
          <CommonText className="text-gray-500 text-sm mt-3 text-center">{user.bio}</CommonText>
        ) : (
          <CommonText type="paragraph" className="text-gray-500 mt-3 py-2">No bio added.</CommonText>
        )}

        <CommonText className="text-primary font-medium mt-3">
          Awoofer since {format(new Date(user.createdAt), "MMMM yyyy")}
        </CommonText>
      </View>

      {/* Message button - only for other users' profiles */}
      {!isOwnProfile && (
        <TouchableOpacity
          className="w-full mt-2 mb-6 flex-row items-center justify-center gap-1 border border-primary rounded-md py-2.5"
          onPress={() => {
            // navigate to / open chat with user.id
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
          <Text className="font-bold text-lg text-black">{user.numOfDealPosted ?? 0}</Text>
        </View>
        <View className="flex-row justify-between px-4 py-7 border border-gray-100 shadow-sm rounded-md items-center">
          <CommonText className="text-gray-500">OFFER CLICKS</CommonText>
          <Text className="font-bold text-lg text-black">{user.offerClicks ?? 0}</Text>
        </View>
      </View>

      {/* Own profile actions */}
      {isOwnProfile && (
        <View className="flex flex-col gap-3 my-4">
          <Link href="/profile/edit" asChild>
            <TouchableOpacity className="w-full items-center border border-primary rounded-md py-3">
              <Text className="text-primary text-base font-semibold">Edit Profile</Text>
            </TouchableOpacity>
          </Link>
          <Link href="/offers/create" asChild>
            <TouchableOpacity className="w-full flex-row items-center justify-center gap-1 bg-primary rounded-md py-3">
              <PlusIcon width={18} height={18} color="#fff" />
              <Text className="text-white text-base font-semibold">Post Awoof</Text>
            </TouchableOpacity>
          </Link>
        </View>
      )}

      {/* Post alerts - only for other users' profiles */}
      {!isOwnProfile && (
        <View className="bg-[#FFF6F2] border border-[#F7D9CC] shadow-sm p-3 rounded-lg my-2 flex-row justify-between items-center">
          <View className="shrink">
            <Text className="text-base font-medium text-black">Post alerts</Text>
            <Text className="text-sm text-gray-500">
              Get notified when {user.name.split(" ")[0]} posts.
            </Text>
          </View>
          {/* AlertButton RN equivalent goes here, e.g. <AlertButton contributorId={user.id} /> */}
        </View>
      )}

      {/* ReportModal RN equivalent */}
      <Modal visible={isReportOpen} transparent animationType="slide">
        {/* Port your ReportModal here — pass targetType="user", targetId={user.id}, etc. */}
        <Pressable className="flex-1 bg-black/40" onPress={() => setIsReportOpen(false)} />
      </Modal>
    </SafeAreaView>
  );
}
