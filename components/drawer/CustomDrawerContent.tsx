import Text from '@/components/common/Text';
import { useLogout } from "@/features/auth/useLogout";
import { useUser } from "@/features/user/useUser";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Href, useNavigationContainerRef, useRouter } from "expo-router";
import { DrawerActions } from "expo-router/build/react-navigation";
import { CircleHelp, LogOut, Mail, User } from "lucide-react-native";
import { Image, Pressable, ScrollView, View } from "react-native";


export default function CustomDrawerContent() {
    const router = useRouter();
    const { data: user } = useUser();
    const rootNavRef = useNavigationContainerRef();

    const navigate = (href: Href) => {
        if (rootNavRef.isReady()) {
            rootNavRef.dispatch(DrawerActions.closeDrawer());
        }
        router.push(href);
    };

    const { submit: logout } = useLogout({
        onSuccess: () => {
            if (rootNavRef.isReady()) {
                rootNavRef.dispatch(DrawerActions.closeDrawer());
            }
            router.replace('/login');
        },
    });

    return (
        <>
            {user && (
                <ScrollView
                    contentContainerStyle={{
                        flexGrow: 1,
                        paddingTop: 60,
                        paddingBottom: 20,
                    }}
                    className="bg-white"
                >
                    <View className="items-center my-7">
                        {user.profileImageUrl ? (
                            <Image
                                source={{ uri: user.profileImageUrl }}
                                className="w-100 h-100 rounded-full"
                            />
                        ) : (
                            <View className="w-100 h-100 bg-gray-300 justify-center items-center rounded-full">
                                <FontAwesome name="user" size={24} color="gray" />
                            </View>
                        )}
                    </View>

                    <Text type="headerBold" className="px-6 py-4 text-lg">{user.name}</Text>

                    <View>
                        {[
                            {
                                label: "Profile",
                                icon: User,
                                action: () => navigate(`/profile/${user.id}`),
                            },
                            {
                                label: "Messages",
                                icon: Mail,
                                action: () => navigate("/message"),
                            },
                            {
                                label: "Help & Support",
                                icon: CircleHelp,
                                action: () => navigate(`/message`),
                            },
                        ].map((item) => {
                            const Icon = item.icon;

                            return (
                                <Pressable
                                    key={item.label}
                                    onPress={item.action} // Corrected action trigger
                                    className="flex-row items-center gap-4 px-6 py-4 border-b border-gray-100 active:bg-gray-50"
                                >
                                    <Icon size={22} color="#FF5A1F" />
                                    <Text className="text-lg font-mont">
                                        {item.label}
                                    </Text>
                                </Pressable>
                            );
                        })}

                        {/* Logout Option */}
                        <Pressable
                            onPress={() => logout()}
                            className="flex-row items-center gap-4 px-6 py-4 active:bg-gray-50"
                        >
                            <LogOut size={22} color="#FF5A1F" />
                            <Text className="text-lg font-mont text-primary">
                                Logout
                            </Text>
                        </Pressable>
                    </View>
                </ScrollView>
            )}
        </>
    );
}