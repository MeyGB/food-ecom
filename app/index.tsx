import { images, offers } from "@/constants";
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
import CartButton from "../components/CartButton";

const screenWidth = Dimensions.get("window").width;

export default function App() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-row justify-between items-center px-5 py-3">
        <View>
          <Text className="text-sm font-bold text-orange-500">Delivery To</Text>
          <TouchableOpacity className="flex-row items-center mt-1">
            <Text className="text-base mr-1">Cambodia</Text>
            <Image
              source={images.arrowDown}
              className="w-4 h-4"
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
        <View>
          <Text className="text-base font-semibold">
            <CartButton />
          </Text>
        </View>
      </View>
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
        contentContainerClassName="pb-28 px-5"
      />
    </SafeAreaView>
  );
}
