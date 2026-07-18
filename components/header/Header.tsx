import { LOGO } from '@/config/constants';
import { useSearch } from '@/context/SearchContext';
import { Fontisto } from '@expo/vector-icons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { useRouter } from 'expo-router';
import { Image, TouchableOpacity, View } from 'react-native';
import Avatar from './Avatar';
import ExpandableSearchForm from './ExpandableSearchForm';
import { SafeAreaView } from 'react-native-safe-area-context';

interface HeaderProps {
    isHome?: boolean;
}

export default function Header({ isHome = true }: HeaderProps) {
    const router = useRouter();
    const { isSearchOpen, closeSearch, openSearch } = useSearch();

    return (
      <SafeAreaView className="flex-1 bg-white"> 
        <View className="px-5 bg-white flex-row h-[65px] justify-between items-center">
            {isHome ? (
                <Avatar />
            ) : (
                <TouchableOpacity onPress={() => router.back()}>
                    <FontAwesome6 name="arrow-left" size={20} color="black" />
                </TouchableOpacity>
            )}

            <Image source={LOGO} style={{ width: 160, height: 50 }} resizeMode="contain" />

            {isHome ? (
                <TouchableOpacity onPress={() => {
                    router.push("/offers")
                    openSearch();
                }}>
                    <Fontisto name="search" size={20} color="black" />
                </TouchableOpacity>

            ) : (
                <>
                    <ExpandableSearchForm onOpen={openSearch} />
                    <ExpandableSearchForm
                        isOverlay
                        isOpen={isSearchOpen}
                        onClose={closeSearch} />
                </>
            )}
        </View>
      </SafeAreaView>

    );
};