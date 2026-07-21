import { useReport } from "@/features/report/useReport";
import { Ionicons } from "@expo/vector-icons";
import { ChevronDown } from "lucide-react-native";
import { useState } from "react";
import { Image, ScrollView, Text, TextInput, TouchableOpacity, View, } from "react-native";
import { Modal, Portal } from "react-native-paper";
import ReportConfirmationModal from "./ReportConfirmationModal";

const reportReasons = [
    { label: "Spam or repetitive posting", value: "spam" },
    { label: "Scam or fraudulent activities", value: "scam" },
    { label: "Explicit content", value: "explicit" },
    { label: "Violence", value: "violence" },
    { label: "Abuse", value: "abuse" },
    { label: "Illegal activity", value: "illegal" },
    { label: "Self harm", value: "self_harm" },
    { label: "Others", value: "other" },
];

interface Props {
    isOpen: boolean;
    onClose: () => void;
    targetType: "offer" | "user";
    targetId: string;
}

export default function ReportModal({ isOpen, onClose, targetType, targetId, }: Props) {
    const [type, setType] = useState("");
    const [description, setDescription] = useState("");
    const [error, setError] = useState("");
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const { submit, isPending, isSuccess } = useReport();

    const handleSubmit = () => {
        if (!type) {
            setError("Please select a reason for this report.");
            return;
        }

        setError("");
        submit({
            type,
            targetType,
            targetId,
            description,
        });
    };

    const handleClose = () => {
        setType("");
        setDescription("");
        setError("");
        setIsDropdownOpen(false);
        onClose();
    };


    if (!isOpen) return null;


    if (isSuccess) {
        <ReportConfirmationModal isOpen={isSuccess} onDone={handleClose} />
    }

    return (
        <Portal>
            <Modal
                visible={isOpen}
                onDismiss={handleClose}
                contentContainerStyle={{
                    marginHorizontal: 20,
                }}
            >
                <View className="rounded-3xl bg-white p-6">
                    <TouchableOpacity
                        className="absolute right-5 top-5 z-50"
                        onPress={handleClose}
                    >
                        <Ionicons
                            name="close"
                            size={26}
                            color="black"
                        />
                    </TouchableOpacity>

                    {/* Header */}
                    <View className="mt-4 flex-row items-center gap-4">
                        <View className="h-14 w-14 items-center justify-center rounded-full bg-[#CD0F0F1A]">
                            <Image
                                source={require("@/assets/images/reportFlag.png")}
                                className="w-[22px] h-[20px]"
                                resizeMode="contain"
                            />
                        </View>

                        <View className="flex-1">
                            <Text className="text-2xl font-semibold text-black">
                                {targetType === "offer"
                                    ? "Report this Deal"
                                    : "Report this Account"}
                            </Text>

                            <Text className="mt-1 text-sm text-gray-500">
                                Your reports remain anonymous.
                            </Text>
                        </View>
                    </View>

                    <View className="my-5 h-[1px] bg-gray-200" />

                    {/* Reason */}
                    <View className="relative">
                        <Text className="mb-2 text-base font-medium text-gray-600">
                            Reason for this report
                        </Text>

                        <TouchableOpacity
                            onPress={() =>
                                setIsDropdownOpen((prev) => !prev)
                            }
                            className="h-14 flex-row items-center justify-between rounded-xl border border-gray-300 px-4"
                        >
                            <Text
                                className={`${type
                                    ? "text-black"
                                    : "text-gray-400"
                                    }`}
                            >
                                {type
                                    ? reportReasons.find(
                                        (reason) =>
                                            reason.value === type
                                    )?.label
                                    : "Select option"}
                            </Text>

                            <ChevronDown
                                size={20}
                                color="black"
                            />
                        </TouchableOpacity>

                        {/* Dropdown */}
                        {isDropdownOpen && (
                            <View className="absolute left-0 right-0 top-16 z-50 rounded-xl border border-gray-200 bg-white">
                                <ScrollView
                                    className="max-h-64"
                                    showsVerticalScrollIndicator={
                                        false
                                    }
                                >
                                    {reportReasons.map((reason) => (
                                        <TouchableOpacity
                                            key={reason.value}
                                            className="flex-row items-center border-b border-gray-100 px-4 py-4"
                                            onPress={() => {
                                                setType(reason.value);
                                                setIsDropdownOpen(
                                                    false
                                                );
                                            }}
                                        >
                                            {type === reason.value && (
                                                <Text className="mr-2 text-green-500">
                                                    ✓
                                                </Text>
                                            )}

                                            <Text className="text-base text-black">
                                                {reason.label}
                                            </Text>
                                        </TouchableOpacity>
                                    ))}
                                </ScrollView>
                            </View>
                        )}

                        {error && (
                            <Text className="mt-2 text-xs text-red-500">
                                {error}
                            </Text>
                        )}
                    </View>

                    {/* Description */}
                    <View className="mt-5">
                        <Text className="mb-2 text-base font-medium text-gray-600">
                            Give more details
                        </Text>

                        <TextInput
                            multiline
                            numberOfLines={4}
                            value={description}
                            onChangeText={setDescription}
                            placeholder="Write a short note, you remain anonymous."
                            textAlignVertical="top"
                            className="rounded-xl border border-gray-300 p-4"
                        />
                    </View>

                    {/* Buttons */}
                    <View className="mt-6 flex-row justify-end gap-3">
                        <TouchableOpacity
                            className="rounded-xl border border-primary px-6 py-4"
                            onPress={handleClose}
                        >
                            <Text className="font-medium text-primary">
                                Discard
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            disabled={isPending}
                            className="rounded-xl bg-primary px-6 py-4"
                            onPress={handleSubmit}
                        >
                            <Text className="font-medium text-white">
                                {isPending
                                    ? "Submitting..."
                                    : "Submit"}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </Portal>
    );
}