import { colors } from "@/styles/colors";
import { Offer } from "@/types/offer"; // Ensure this type definition is compatible
import { FontAwesome6, Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';

const LOCATION_COLOR = colors.muted;
const VALUE_COLOR = colors.primary
const LOCATION_ICON_SIZE = 14;
const VALUE_ICON_SIZE = 20;

// Icon shown next to the location
export function LocationIconFor({ location }: { location: string }) {
  if (location === "Online")
    return <Ionicons name="globe-outline" size={LOCATION_ICON_SIZE} color={LOCATION_COLOR} />;
  if (location === "Nationwide")
    return <MaterialIcons name="flag" size={LOCATION_ICON_SIZE} color={LOCATION_COLOR} />;
  return <MaterialIcons name="location-on" size={LOCATION_ICON_SIZE} color={LOCATION_COLOR} />;
}

// Icon shown next to the deal value
export function ValueIconFor({ dealType }: { dealType: Offer["dealType"] }) {
  switch (dealType) {
    case "cashback":
      return <MaterialCommunityIcons name="cash-refund" size={VALUE_ICON_SIZE} color={VALUE_COLOR} />;
    case "freebie":
      return <MaterialCommunityIcons name="gift-outline" size={VALUE_ICON_SIZE} color={VALUE_COLOR} />;
    case "discount":
      return <MaterialCommunityIcons name="tag-outline" size={VALUE_ICON_SIZE} color={VALUE_COLOR} />;
    case "bogo":
      return <MaterialCommunityIcons name="lightning-bolt-outline" size={VALUE_ICON_SIZE} color={VALUE_COLOR} />;
    case "promo_code":
      return <MaterialCommunityIcons name="ticket-percent-outline" size={VALUE_ICON_SIZE} color={VALUE_COLOR} />;
    case "free_trial":
      return <FontAwesome6 name="arrows-rotate" size={VALUE_ICON_SIZE} color={VALUE_COLOR} />;
    case "free_delivery":
      return <MaterialCommunityIcons name="truck-outline" size={VALUE_ICON_SIZE} color={VALUE_COLOR} />;
    case "price_drop":
      return <MaterialCommunityIcons name="trending-down" size={VALUE_ICON_SIZE} color={VALUE_COLOR} />;
    default:
      return <MaterialCommunityIcons name="tag-outline" size={VALUE_ICON_SIZE} color={VALUE_COLOR} />;
  }
}