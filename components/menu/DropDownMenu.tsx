import { View,Pressable,TouchableOpacity,Text } from "react-native";
import React, { useState } from "react";
import type { LucideIcon } from "lucide-react-native";
import { set } from "date-fns";

export interface MenuItem{
    key:string;
    label : string;
    icon : LucideIcon;
    onPress:()=> void;
    variant?: 'default' | 'danger'
}
export interface MenuItemProps{
    trigger:React.ReactNode;
    items:MenuItem[];    
}

export default function DropdownMenu({trigger,items}:MenuItemProps){

const [isOpen, setIsOpen] = useState(false);

const close = () =>setIsOpen(false);


return (
    <View className="relative z-20">
      <Pressable onPress={() => setIsOpen((prev) => !prev)}>
        {trigger}
      </Pressable>

      {isOpen && (
        <>
          <Pressable
            style={{ position: "absolute", top: -1000, left: -1000, right: -1000, bottom: -1000 }}
            onPress={close}
          />
          <View className="absolute top-10 right-0 z-20 bg-white border border-gray-200 rounded-lg overflow-hidden w-44 shadow-md">
            {items.map((item, index) => {
              const Icon = item.icon; // capitalized so JSX treats it as a component
              const isDanger = item.variant === "danger";

              return (
                <TouchableOpacity
                  key={item.key}
                  onPress={() => {
                    item.onPress();
                    close();
                  }}
                  className={`w-full flex-row items-center gap-2 px-4 py-3 ${
                    index !== items.length - 1 ? "border-b border-gray-100" : ""
                  }`}
                >
                  <Icon
                    width={16}
                    height={16}
                    color={isDanger ? "#E70606" : "#000"}
                  />
                  <Text className={isDanger ? "text-[#E70606] font-medium" : "text-black font-medium"}>
                    {item.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </>
      )}
    </View>
  );
}