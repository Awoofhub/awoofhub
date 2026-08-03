import { EditProfileForm } from "@/components/profile/EditProfileForm";
import EditSuccessModal from "./EditSuccessModal";
import { Feather } from "@expo/vector-icons";
import { useState } from "react";
import { useRouter } from "expo-router";
import { Modal, View, TouchableOpacity, ScrollView } from "react-native";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function EditProfileModal({ isOpen, onClose }: Props) {
  const [showSuccess, setShowSuccess] = useState(false);
  const [redirectUsername, setRedirectUsername] = useState<string | null>(null);
  const router = useRouter();

  return (
    <>
      <Modal
        visible={isOpen}
        transparent
        animationType="fade"
        onRequestClose={onClose}
      >
        <View className="flex-1 items-center justify-center bg-black/50 px-4">
          <View className="w-full bg-white rounded-2xl p-4 relative">
            <TouchableOpacity
              onPress={onClose}
              className="absolute top-4 right-4 z-10 p-1 rounded-full active:bg-gray-100"
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
              <Feather name="x" size={20} color="#000" />
            </TouchableOpacity>

            <ScrollView showsVerticalScrollIndicator={false}>
              <EditProfileForm
                onSuccess={(updatedUser) => {
                  onClose();
                  setShowSuccess(true);

                  if (updatedUser.username) {
                    setRedirectUsername(updatedUser.username);
                  }
                }}
              />
            </ScrollView>
          </View>
        </View>
      </Modal>

      <EditSuccessModal
        isOpen={showSuccess}
        onClose={() => {
          setShowSuccess(false);

          if (redirectUsername) {
            router.replace(`/profile/${redirectUsername}`);
            setRedirectUsername(null);
          }
        }}
      />
    </>
  );
}