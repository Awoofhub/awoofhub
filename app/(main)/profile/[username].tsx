import Loading from "@/components/loading/Loading";
import OfferCard from "@/components/offers/OfferCard";
import OfferListSkeleton from "@/components/offers/OfferListSkeleton";
import { About } from "@/components/profile/About";
import ProfileHeader from "@/components/profile/ProfileHeader";
import { useOffersByUsername } from "@/features/offers/useOffersByUsername";
import { useUser } from "@/features/user/useUser";
import { useUserByUsername } from "@/features/user/useUserByUsername";
import { colors } from "@/styles/colors";
import { useLocalSearchParams } from "expo-router";
import { useMemo } from "react";
import { ActivityIndicator, Dimensions, Text, View } from "react-native";
import { MaterialTabBar, Tabs } from "react-native-collapsible-tab-view";

export default function ProfileScreen() {
  const { username: rawUsername } = useLocalSearchParams();
  // what does this line do? It checks if rawUsername is an array, and if so, it takes the first element. Otherwise, it just uses rawUsername as is. This is useful because useLocalSearchParams can return an array if there are multiple query parameters with the same name.
  const username = Array.isArray(rawUsername) ? rawUsername[0] : rawUsername;

  const { data: currentUser } = useUser();
  const { data: user, isLoading: isUserLoading } = useUserByUsername({
    username,
  });

// why do i have to add isF
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

    // what is usememo i dont understand it use simple terms so its like it caches result and checks if the function changes or not
  const offers = useMemo(
    () => data?.pages.flatMap((page) => page.data) ?? [],
    [data]
  );
  
  if (isUserLoading) {
    return <Loading />;
  }
  if (!user) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-gray-500 text-lg">User not found</Text>
      </View>
    );
  } 



}

 


//   const isOwnProfile = currentUser?.id === user.id;

//   const renderProfileHeader = () => (
//     <ProfileHeader isOwnProfile={isOwnProfile} profile={user} />
//   );
//   console.log("user data:", user);
//   console.log("username param:", username);

//   return (

//       <Tabs.Container
//           renderHeader={renderProfileHeader}
//           renderTabBar={(props) => (
//               <MaterialTabBar
//                   {...props}
//                   getLabelText={(name) => {
//                       const str = String(name).toLowerCase();
//                       return str.charAt(0).toUpperCase() + str.slice(1);
//                   }}
//                   labelStyle={{
//                       margin: 0,
//                       paddingBottom: 4,
//                       textTransform: 'none',
//                       paddingTop: 15,
//                       textAlign: 'center',
//                       width: screenWidth / tabCount,
//                   }}
//               />
//           )}>

//           <Tabs.Tab name="Profile">
//               <Tabs.ScrollView>
//                   <About profile={user} />
//               </Tabs.ScrollView>
//           </Tabs.Tab>

//           <Tabs.Tab name="Offers">
//               <Tabs.FlatList
//                   nestedScrollEnabled
//                   columnWrapperClassName="gap-3"
//                   contentContainerStyle={{
//                       paddingTop: 320,
//                   }}
//                   contentContainerClassName="gap-3 px-3"
//                   data={allOffers}
//                   numColumns={2}
//                   keyExtractor={(item) => item.id ?? ''}
//                   renderItem={({ item }) => <OfferCard offer={item} />}
//                   onEndReached={() => {
//                       if (hasNextPage && !isFetchingNextPage) {
//                           fetchNextPage();
//                       }
//                   }}
//                   onEndReachedThreshold={0.5}
//                   ListFooterComponent={() => (
//                       <View style={{ paddingVertical: 20, alignItems: "center" }}>
//                           {isFetchingNextPage && <ActivityIndicator size="large" color={colors.primary} />}
//                           {!hasNextPage && allOffers.length > 0 && <Text>No more offers</Text>}
//                       </View>
//                   )}

//                   ListEmptyComponent={() => {
//                       if (isFetching) {
//                           return (
//                               <View style={{ paddingTop: HEADER_SPACE }}>
//                                   <OfferListSkeleton />
//                               </View>
//                           );
//                       }

//                       if (!isFetching && allOffers.length === 0) {
//                           return (
//                               <View style={{ paddingTop: HEADER_SPACE }}>
//                                   <Text className="text-gray-500 text-center">
//                                       No offers available.
//                                   </Text>
//                               </View>
//                           );
//                       }

//                       return null;
//                   }}
//               />
//           </Tabs.Tab>
//       </Tabs.Container>
//   );
// }
