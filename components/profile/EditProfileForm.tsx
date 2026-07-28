import { View, TouchableOpacity, Image, Text, ActivityIndicator } from "react-native";
import { InputField } from "../common/InputField";
import { useUploadSinglePhoto } from "@/features/upload/useUpdateProfilePhoto";
import { useUpdateUser } from "@/features/user/useUpdateUser";
import { useUser } from "@/features/user/useUser";
import { notificationsStore } from "@/store/notifications/notifications";
import { EditProfileFormProps } from "@/types/form-props";
import { UpdateUserData, UsernameCheckResult } from "@/types/user";
import { capitalizeFirstLetter } from "@/utils/truncate";
import { differenceInDays, parseISO } from "date-fns";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Camera, LoaderCircle } from "lucide-react-native";
import * as ImagePicker from "expo-image-picker";
import { TomTomAutocomplete } from "../form/AutoComplete";
import UsernameChecker from "../form/UsernameChecker";

export const EditProfileForm = ({ onSuccess }: EditProfileFormProps) => {
  const { data: currentUser } = useUser();
  const updateUser = useUpdateUser({ onSuccess });
  const { uploadPhoto, isPending: isUploading } = useUploadSinglePhoto();

  const { handleSubmit, formState, control, reset, setValue, watch } =
    useForm<UpdateUserData>();

  const { isDirty } = formState;
  const [usernameResult, setUsernameResult] = useState<UsernameCheckResult>();
  const photoUrl = watch("profileImageUrl");

  const isUsernameLocked = currentUser?.usernameChangeLockedUntil
    ? differenceInDays(
        parseISO(currentUser.usernameChangeLockedUntil),
        new Date(),
      ) > 0
    : false;

  const currentUsername = currentUser?.username ?? "";
  const enteredUsername = watch("username") ?? "";
  const usernameChanged = enteredUsername !== currentUsername;

  const onSubmit = (data: UpdateUserData) => {
    if (usernameChanged && usernameResult && usernameResult.available === false) {
      return;
    }
    updateUser.submit(data);
  };

  const handlePhotoUpload = async () => {
    try {
      const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permission.granted) {
        notificationsStore.getState().showNotification({
          type: "error",
          title: "Permission required",
          duration: 5000,
          message: "We need access to your photos to upload a profile picture.",
        });
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (result.canceled) return;

      const asset = result.assets[0];
      const file = {
        uri: asset.uri,
        name: asset.fileName ?? `photo-${Date.now()}.jpg`,
        type: asset.mimeType ?? "image/jpeg",
      };

      const res = await uploadPhoto(file);
      setValue("profileImageUrl", res.data, { shouldDirty: true });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Something went wrong";
      notificationsStore.getState().showNotification({
        type: "error",
        title: "Error",
        duration: 5000,
        message,
      });
    }
  };

  useEffect(() => {
    if (currentUser) {
      reset({
        name: currentUser.name || "",
        username: currentUser.username || "",
        bio: currentUser.bio || "",
        address: currentUser.address || "",
        website: currentUser.website || "",
        profileImageUrl: currentUser.profileImageUrl || "",
      });
    }
  }, [currentUser, reset]);

  return (
    <View className="w-full">
      {/* Photo Upload Section */}
      <View className="items-center mb-8 ">
        <View className="relative mt-10 h-24 w-24">
          <View className="h-full w-full rounded-full border-2 border-primary overflow-hidden bg-gray-100 items-center justify-center">
            {photoUrl ? (
              <Image
                source={{ uri: photoUrl }}
                resizeMode="cover"
                className="w-full h-full"
              />
            ) : (
              <View className="bg-green-500 items-center justify-center w-full h-full">
                <Text className="text-white text-4xl font-semibold">
                  {capitalizeFirstLetter(currentUser?.name || "U")}
                </Text>
              </View>
            )}
          </View>
          <TouchableOpacity
            onPress={handlePhotoUpload}
            disabled={isUploading}
            className="absolute bottom-0 right-0 p-1 bg-white border-2 border-primary rounded-full shadow-lg w-8 h-8 items-center justify-center"
          >
            {isUploading ? (
              <ActivityIndicator size="small" color="#FF4D0D" />
            ) : (
              <Camera size={17} />
            )}
          </TouchableOpacity>
        </View>
      </View>

      <View className="gap-3 px-5 py-5">
        <Controller
          name="name"
          control={control}
          rules={{
            required: "Name is required",
            maxLength: { value: 50, message: "Name must be less than 50 characters" },
          }}
          render={({ field, fieldState }) => (
            <InputField
              label="Name"
              value={field.value}
              onChangeText={field.onChange}
              error={fieldState.error}
            />
          )}
        />

        <UsernameChecker
          value={watch("username") ?? currentUser?.username ?? ""}
          onChange={(val) => setValue("username", val, { shouldDirty: true })}
          onResult={setUsernameResult}
          disabled={isUsernameLocked}
        />

        <Controller
          name="bio"
          control={control}
          rules={{
            maxLength: { value: 200, message: "Bio must be less than 200 characters" },
          }}
          render={({ field, fieldState }) => (
            <InputField
              label="Bio"
              multiline
              value={field.value}
              onChangeText={field.onChange}
              error={fieldState.error}
            />
          )}
        />

        <Controller
          name="address"
          control={control}
          render={({ field, fieldState }) => (
            <TomTomAutocomplete
              label="Location"
              error={fieldState.error}
              value={field.value}
              onPlaceSelect={field.onChange}
              compulsory={false}
            />
          )}
        />

        <View className="justify-center mt-8 items-center">
          <TouchableOpacity
            onPress={handleSubmit(onSubmit)}
            disabled={updateUser.isPending || !isDirty}
            className={`font-baloo rounded-md py-3 w-full max-w-[400px] items-center justify-center flex-row gap-2 ${
              !isDirty ? "bg-[#FFD5C3]" : "bg-primary"
            }`}
          >
            {updateUser.isPending && <ActivityIndicator size="small" color="#fff" />}
            <Text className="text-white font-baloo">Save Changes</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};