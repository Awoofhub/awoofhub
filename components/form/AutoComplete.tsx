import { TOMTOM_API_KEY } from "@/config/constants";
import axios from "axios";
import { debounce } from "lodash";
import { useEffect, useMemo, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  FlatList,
  ActivityIndicator,
} from "react-native";

interface TomTomSuggestion {
  id: string;
  address: {
    freeformAddress: string;
  };
}

interface TomTomAutocompleteProps {
  label?: string;
  error?: { message?: string };
  compulsory?: boolean;
  onPlaceSelect: (value: string) => void;
  value?: string;
  placeholder?: string;
}

export const TomTomAutocomplete = ({
  label,
  error,
  compulsory,
  onPlaceSelect,
  value,
  placeholder,
}: TomTomAutocompleteProps) => {
  const [options, setOptionsList] = useState<TomTomSuggestion[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setInputValue(value ?? "");
  }, [value]);

  const fetchSuggestions = useMemo(
    () =>
      debounce(async (query: string) => {
        if (!query) {
          setOptionsList([]);
          return;
        }

        try {
          setIsLoading(true);
          const { data } = await axios.get(
            `https://api.tomtom.com/search/2/search/${encodeURIComponent(
              query
            )}.json`,
            {
              params: {
                key: TOMTOM_API_KEY,
                limit: 5,
                typeahead: true,
              },
            }
          );

          setOptionsList(data.results);
        } catch (err) {
          console.log(err);
        } finally {
          setIsLoading(false);
        }
      }, 400),
    []
  );

  useEffect(() => {
    fetchSuggestions(inputValue);
  }, [inputValue, fetchSuggestions]);

  useEffect(() => {
    return () => fetchSuggestions.cancel();
  }, [fetchSuggestions]);

  const handleSelect = (option: TomTomSuggestion) => {
    const address = option.address.freeformAddress;
    setInputValue(address);
    setOptionsList([]);
    setIsFocused(false);
    onPlaceSelect(address);
  };

  const handleBlur = () => {
    // slight delay so a suggestion tap registers before the list unmounts
    setTimeout(() => {
      setIsFocused(false);
      onPlaceSelect(inputValue);
    }, 150);
  };

  return (
    <View className="w-full mb-4">
      {label && (
        <Text className="font-baloo text-sm lg:text-lg mb-1">
          {label} {compulsory && <Text className="text-red-500">*</Text>}
        </Text>
      )}

      <View
        className={`mt-2 w-full px-3 py-3 bg-white border rounded-md shadow-sm ${
          error ? "border-red-500" : "border-gray-300"
        } ${isFocused ? "border-orange-500" : ""}`}
      >
        <View className="flex-row items-center">
          <TextInput
            value={inputValue}
            onChangeText={setInputValue}
            onFocus={() => setIsFocused(true)}
            onBlur={handleBlur}
            placeholder={placeholder ?? "Search address..."}
            placeholderTextColor="#9CA3AF"
            className="flex-1 font-montserrat text-base lg:text-lg"
          />
          {isLoading && <ActivityIndicator size="small" color="#9CA3AF" />}
        </View>
      </View>

      {error?.message && (
        <Text className="text-red-500 text-xs mt-1">{error.message}</Text>
      )}

      {isFocused && options.length > 0 && (
        <View className="border border-gray-200 rounded-md mt-1 bg-white shadow-sm max-h-52">
          <FlatList
            data={options}
            keyExtractor={(item) => item.id}
            keyboardShouldPersistTaps="handled"
            renderItem={({ item }) => (
              <Pressable
                onPress={() => handleSelect(item)}
                className="px-3 py-3 border-b border-gray-100 active:bg-gray-50"
              >
                <Text className="font-baloo text-sm lg:text-base">
                  {item.address.freeformAddress}
                </Text>
              </Pressable>
            )}
          />
        </View>
      )}
    </View>
  );
};