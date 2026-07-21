import { useRouter } from "expo-router";
import React from "react";
import { Pressable } from "react-native";

interface Props {
  targetUserId: string;
  children: React.ReactNode;
}

export default function ChatButton({targetUserId, children }: Props) {
  const router = useRouter();

  const handlePress = () => {
    router.push(`/message/${targetUserId}`);
  };

  return <Pressable onPress={handlePress}>{children}</Pressable>;
}