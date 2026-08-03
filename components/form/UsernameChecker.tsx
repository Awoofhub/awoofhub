import { useUser } from "@/features/user/useUser";
import { UsernameCheckResult } from "@/types/user";
import { useUsernameChecker } from "@/features/user/useUsernameChecker";
import { useEffect, useMemo } from "react";
import { debounce } from "lodash"; 
import { CircleAlert } from "lucide-react-native";
import {
  View,
  Text,
  TextInput,
  Pressable,
  ActivityIndicator,
} from "react-native";


interface Props {
  value: string;
  onChange: (username: string) => void;
  disabled?: boolean;
  onResult?: (result: UsernameCheckResult | undefined) => void;
}

export default function UsernameChecker({
  value,
  onChange,
  disabled,
  onResult,
}: Props) {
  const { data: currentUser } = useUser();
  const {
    result,
    isPending: isChecking,
    submit: checkUsername,
    reset,
  } = useUsernameChecker();

  useEffect(() => {
    onResult?.(result);
  }, [result, onResult]);

  const hasChanged = value !== currentUser?.username;

  const debouncedCheck = useMemo(
    () =>
      debounce((username: string) => {
        if (!username) return;
        checkUsername(username);
      }, 500),
    [checkUsername]
  );

  useEffect(() => {
    return () => debouncedCheck.cancel();
  }, [debouncedCheck]);

  const handleBlur = () => {
    debouncedCheck.cancel();
    if (hasChanged && value) checkUsername(value);
  };

  const handleChange = (newValue: string) => {
    onChange(newValue);

    if (result) reset();

    if (newValue !== currentUser?.username) {
      debouncedCheck(newValue);
    } else {
      debouncedCheck.cancel();
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    onChange(suggestion);
    reset();
  };

  const borderColorClass = disabled
    ? "bg-gray-50 border-gray-200"
    : result?.available === false
      ? "border-red-400 bg-white"
      : result?.available === true
        ? "border-green-400 bg-white"
        : "border-gray-200 bg-white";

  return (
    <View>
      <Text className="text-sm lg:text-lg font-baloo mb-1">Username</Text>

      <View
        className={`flex-row items-center border rounded-lg px-3 py-3 ${borderColorClass}`}
      >
        <TextInput
          value={value}
          onChangeText={handleChange}
          onBlur={handleBlur}
          editable={!disabled}
          placeholder="Enter username"
          placeholderTextColor="#9CA3AF"
          className={`flex-1 text-sm lg:text-base ${disabled ? "text-gray-400" : "text-black"}`}
        />
        {isChecking && <ActivityIndicator size="small" color="#9CA3AF" />}
      </View>

      {!isChecking && result && (
        <Text
          className={`text-xs mt-1 ${result.available ? "text-green-500" : "text-red-500"}`}
        >
          {result.available
            ? "Username is available"
            : "Username is not available"}
        </Text>
      )}

      {!isChecking && result && !result.available && result.suggestion && (
        <View className="mt-2">
          <Text className="text-xs text-gray-400 mb-1">
            Suggested username:
          </Text>
          <Pressable
            onPress={() => handleSuggestionClick(result.suggestion!)}
            className="self-start bg-orange-50 border border-orange-200 px-3 py-1 rounded-full active:bg-orange-100"
          >
            <Text className="text-xs text-primary">{result.suggestion}</Text>
          </Pressable>
        </View>
      )}

      {disabled && (
        <View className="flex-row items-center gap-1 mt-1">
          <CircleAlert size={12} color="#E70606" />
          <Text className="text-muted text-[10px] lg:text-xs">
            You can change your username once every 60 days
          </Text>
        </View>
      )}
    </View>
  );
}