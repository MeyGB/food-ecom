import { MenuItem } from "@/type";
import { useState } from "react";
import {
  ActivityIndicator,
  Animated,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type Props = {
  item: MenuItem;
  onAddToCart: () => void;
};

const ProductCard = ({
  item: { image_url, name, categories, price, protien },
  onAddToCart,
}: Props) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const opacity = useState(new Animated.Value(0))[0];

  const handleImageLoad = () => {
    setImageLoaded(true);
    Animated.timing(opacity, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View
      className="bg-white rounded-2xl"
      style={{
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 5,
      }}
    >
      {/* Image */}
      <View className="w-full h-32 items-center justify-center relative">
        {!imageLoaded && (
          <ActivityIndicator
            size="small"
            color="#FFA500"
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              marginLeft: -10,
              marginTop: -10,
            }}
          />
        )}
        <Animated.Image
          source={{ uri: image_url || "https://via.placeholder.com/150" }}
          style={{ width: "100%", height: "100%", opacity }}
          resizeMode="contain"
          onLoad={handleImageLoad}
        />

        {/* Calories tag */}
        <Text className="absolute top-3 left-3 bg-black/70 text-white text-xs font-semibold px-2 py-0.5 rounded-full">
          {protien} cal
        </Text>
      </View>

      {/* Product info */}
      <View className="p-4">
        <Text
          numberOfLines={1}
          className="text-base font-semibold text-gray-800"
        >
          {name}
        </Text>

        {/* <Text numberOfLines={1} className="text-xs text-gray-400 mt-1">
          {categories?.[0]?.name ?? "Uncategorized"}
        </Text> */}

        <View className="flex-row items-center justify-between mt-3">
          <Text className="text-orange-500 font-bold text-sm">
            $ {Number(price).toFixed(2)}
          </Text>

          <TouchableOpacity
            className="bg-orange-500 px-3 py-1.5 rounded-full"
            onPress={onAddToCart}
          >
            <Text className="text-white text-xs font-semibold">+ Add</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ProductCard;
