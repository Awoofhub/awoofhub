import { colors } from '@/styles/colors';
import { Feather } from '@expo/vector-icons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { Tabs } from 'expo-router';
import { Platform, View } from 'react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: 'black',
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopWidth: 1,
          borderTopColor: '#E5E7EB',
          height: 70,
          paddingBottom: Platform.OS === 'ios' ? 28 : 10,
          paddingTop: 5,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
        },
      }}
    >

      <Tabs.Screen
        name="(home)"
        options={{
          title: 'Home',
          tabBarLabel: () => null,
          tabBarIcon: ({ color, size }) => (
            <Feather name="home" size={26} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="posts"
        options={{
          title: 'My posts',
          tabBarLabel: () => null,
          tabBarIcon: ({ color, size }) => (
            <Feather name="list" size={28} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="create"
        options={{
          title: '',
          tabBarItemStyle: {
            marginHorizontal: -10,
          },
          tabBarIcon: () => (
            <View
              style={{
                backgroundColor: colors.primary,
                width: 50,
                height: 50,
                borderRadius: 27,
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: Platform.OS === 'ios' ? -15 : -25,
              }}
            >
              <FontAwesome5 name="plus" size={22} color="#FFFFFF" />
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="wishlist"
        options={{
          title: 'Wishlist',
          tabBarLabel: () => null,
          tabBarIcon: ({ color, size }) => (
            <Feather name="heart" size={26} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="notification"
        options={{
          title: 'Notifications',
          tabBarLabel: () => null,
          tabBarIcon: ({ color, size }) => (
            <Feather name="bell" size={26} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}