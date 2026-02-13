import { MenuItem } from "@/type";
import { Image, Text, TouchableOpacity, View } from "react-native";

type Props = {
  item: MenuItem;
  onAddToCart: () => void;
};

const ProductCard = ({
  item: { image_url, name, categories, price, protien },
  onAddToCart,
}: Props) => {
  return (
    <View className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Image */}
      <View className="w-full h-32 items-center justify-center relative">
        <Image
          source={{ uri: image_url ?? "No Image" }}
          className="w-24 h-24"
          resizeMode="contain"
        />

        <Text className="absolute top-3 left-3 bg-black/70 text-white text-xs font-semibold px-2 py-1 rounded-full">
          {protien} cal
        </Text>
      </View>

      {/* Content */}
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
          <Text className="text-orange-500 font-bold text-sm">$ {price}</Text>

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
