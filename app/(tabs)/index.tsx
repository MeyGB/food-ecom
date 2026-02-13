import CartButton from "@/components/CartButton";
import { images, offers } from "@/constants";
import useAuthStore from "@/store/auth.store";
import cn from "clsx";
import {
  Dimensions,
  FlatList,
  Image,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const screenWidth = Dimensions.get("window").width;

export default function Home() {
  const { user } = useAuthStore();
  // console.log("USER:", JSON.stringify(user, null, 2));

  return (
    <SafeAreaView className="h-full bg-white">
      <FlatList
        data={offers}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item, index }) => {
          const isEven = index % 2 === 0;

          return (
            <Pressable
              android_ripple={{ color: "#fffff22" }}
              className={cn(
                "flex-row rounded-2xl p-4 mb-5",
                isEven ? "flex-row-reverse" : "flex-row",
              )}
              style={{
                backgroundColor: item.color,
                alignItems: "center",
              }}
            >
              <View className="flex-1 justify-center items-center">
                <Image
                  source={item.image}
                  style={{
                    width: screenWidth / 2.5,
                    height: screenWidth / 2.5,
                  }}
                  resizeMode="contain"
                />
              </View>

              <View
                className={cn(
                  "flex-1 justify-between",
                  isEven ? "pl-4" : "pr-4",
                )}
              >
                <Text className="text-white text-xl font-quicksand-bold leading-tight mb-2">
                  {item.title}
                </Text>
                <Image
                  source={images.arrowRight}
                  className="size-12"
                  resizeMode="contain"
                />
              </View>
            </Pressable>
          );
        }}
        ListHeaderComponent={() => {
          return (
            <View className="flex-row justify-between items-center px-3 py-3">
              <View>
                <Text className="text-sm font-bold text-orange-500">
                  SEARCH
                </Text>
                <TouchableOpacity className="flex-row items-center mt-1">
                  <Text className="text-base mr-1">
                    Find your favorite food.
                  </Text>
                  <Image
                    source={images.arrowDown}
                    className="w-4 h-4"
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              </View>
              <CartButton />
            </View>
          );
        }}
        contentContainerClassName="pb-32 px-2"
      />
    </SafeAreaView>
  );
}
