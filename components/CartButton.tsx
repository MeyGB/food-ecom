import { images } from "@/constants";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
type Props = {
  totalItems: number;
};

const CartButton = ({ totalItems }: Props) => {
  return (
    <TouchableOpacity className="cart-btn">
      <Image source={images.bag} resizeMode="contain" className="size-5" />
      {totalItems > 0 && (
        <View className="cart-badge">
          <Text className="text-white small-bold">{totalItems}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default CartButton;
