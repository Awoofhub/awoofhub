import Flame from "@/assets/images/flame.svg";
import Text from '@/components/common/Text';
import { Offer } from "@/types/offer";
import { formatCountdown } from "@/utils/formatCountdown";
import { Link } from "expo-router";
import { AlarmClock, Star, User, Users } from "lucide-react-native";
import { Image, TouchableOpacity, View } from "react-native";
import { StarRatingDisplay } from "react-native-star-rating-widget";
import WishlistButton from "../wishlist/WishlistButton";
import { getOfferVariant, useOfferCountdown } from "./Getoffervariant";
import { LocationIconFor, ValueIconFor } from "./Offercardicons";

interface Props {
  offer: Offer;
}

export default function OfferCard({ offer }: Props) {

  const variant = getOfferVariant(offer);
  const { secondsLeft, hasCountdown } = useOfferCountdown(offer, variant);

  return (

    <Link href={`/offers/${offer.id}`} asChild>
      <TouchableOpacity
        activeOpacity={0.9}
        className="flex-1 max-w-[50%] bg-white rounded-xl border border-gray-100 p-2"
      >
        <View className="relative items-center justify-center h-28 mb-3">
          {(variant === "trending" ||
            variant === "trending-expiring") && (
              <View className="absolute left-0 top-0 bg-white rounded-full p-1 z-10">
                <Flame width={18} height={18} />
              </View>
            )}

          <View className="absolute right-0 top-0 bg-white rounded-full p-1 z-10">
            <WishlistButton
              size={20}
              offerId={offer.id}
            />
          </View>

          <Image
            source={{ uri: offer.imageUrl }}
            className="w-full h-[100px] rounded-lg"
            resizeMode="stretch"
          />
        </View>

        <View className="flex-1">
          <View className="flex-row justify-between items-center mb-1">
            <Text
              numberOfLines={1}
              className="max-w-[55%] text-primary text-[10px] font-medium"
            >
              @{offer.contributor.username}
            </Text>

            <View className="flex-row items-center gap-1">
              <User size={10} color="#888" />
              <Text className="text-gray-500 text-[10px]">Awoofer</Text>
            </View>
          </View>

          {/* Card Content */}
          <View>
            <Text
              type="headerBold"
              numberOfLines={1}
              className="text-sm mb-0.5"
            >
              {offer.title}
            </Text>

            {/* Deal value */}
            <View className="flex-row items-center gap-1 mb-0.5">
              <ValueIconFor dealType={offer.dealType} />
              <Text
                type="paragraphBold"
                numberOfLines={1}
                className="text-primary text-sm flex-shrink"
              >
                {offer.value}
              </Text>
            </View>

            {/* Location + grabs */}
            <View className="flex-row justify-between items-center mb-2">
              <View
                className={`flex-row items-center gap-1 ${offer.clickCount > 0 ? "max-w-[50%]" : "flex-1"
                  }`}
              >
                <LocationIconFor location={offer.location} />
                <Text
                  numberOfLines={1}
                  className="text-gray-500 text-xs flex-shrink"
                >
                  {offer.location}
                </Text>
              </View>

              {offer.clickCount > 0 && (
                <View className="flex-row items-center gap-1">
                  <Users size={12} color="#888" />
                  <Text className="text-[11px] text-gray-500">
                    {offer.clickCount}{" "}
                    {offer.clickCount === 1 ? "grab" : "grabs"}
                  </Text>
                </View>
              )}
            </View>

            <View className="h-px bg-gray-200 mb-2" />

            {/* Rating + countdown */}
            <View className="flex-row justify-between items-center">
              <View className="flex-row items-center">
                <StarRatingDisplay
                  rating={offer.avgRating}
                  maxStars={5}
                  starSize={12}
                  StarIconComponent={({ type, size }) => {
                    if (type === "full") {
                      return <Star size={size} color="#FFD700" fill="#FFD700" />;
                    }
                    if (type === "half") {
                      return (
                        <Star
                          size={size}
                          color="#FFE033"
                          fill="#FFE033"
                          opacity={0.7}
                        />
                      );
                    }
                    return <Star size={size} color="#CCD1D8" fill="#CCD1D8" />;
                  }}
                  starStyle={{ marginHorizontal: -0.5 }}
                />

                <Text className="text-xs text-gray-400 ml-1">
                  ({offer.reviewCount})
                </Text>
              </View>

              {hasCountdown && (
                <View className="flex-row items-center gap-1">
                  <AlarmClock size={14} color="#E70606" />
                  <Text
                    type="paragraphBold"
                    className="text-red-600 text-xs"
                  >
                    {formatCountdown(secondsLeft)}
                  </Text>
                </View>
              )}
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </Link>
  );
}