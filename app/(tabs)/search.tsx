import CartButton from "@/components/CartButton";
import { images } from "@/constants";
import { getMenu } from "@/service/Appwrite";
import useAppwrite from "@/service/useAppwrite";
import { useLocalSearchParams } from "expo-router/build/hooks";
import React, { useEffect, useState } from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Search = () => {
  const [search, setSearch] = useState("");
  const { category, query } = useLocalSearchParams<{
    category: string;
    query: string;
  }>();
  const { data, refetch, loading } = useAppwrite({
    fn: getMenu,
    params: { category, query, limit: 2 },
  });

  useEffect(() => {
    refetch({ category, query, limit: 2 });
  }, [category, query]);
  console.log(JSON.stringify(data, null, 2));

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
      {/* <Button
        title="Seed"
        onPress={() => seed().catch((e) => console.log("Error seeding", e))}
      /> */}
    </SafeAreaView>
  );
};

export default Search;
