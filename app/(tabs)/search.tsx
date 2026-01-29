import CartButton from "@/components/CartButton";
import { images } from "@/constants";
import React, { useState } from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
const Search = () => {
  const [search, setSearch] = useState("");
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-row justify-between items-center py-3 px-5">
        <View>
          <Text className="text-sm font-bold text-orange-500">SEARCH</Text>
          <TouchableOpacity className="flex-row items-center mt-1">
            <Text className="text-base mr-1">Find your favorite food.</Text>
            <Image
              source={images.arrowDown}
              className="w-4 h-4"
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
        <View>
          <Text>
            <CartButton />
          </Text>
        </View>
      </View>
      <View className="p-4">
        <TextInput
          placeholder="Search here..."
          value={search}
          onChangeText={setSearch}
          className="p-3 border border-gray-200 rounded-full bg-white"
        />
      </View>
    </SafeAreaView>
  );
};

export default Search;
