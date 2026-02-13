import CartButton from "@/components/CartButton";
import Filter from "@/components/Filter";
import ProductCard from "@/components/ProductCard";
import SearchBar from "@/components/SearchBar";
import { images } from "@/constants";
import { getCategories, getMenu } from "@/service/Appwrite";
import useAppwrite from "@/service/useAppwrite";
import { MenuItem } from "@/type";
import { useLocalSearchParams } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Search = () => {
  const [search, setSearch] = useState("");
  const [totalCart, setTotalCart] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  const handleAddToCart = useCallback((item: MenuItem) => {
    setTotalCart((prev) => prev + 1);
    setTotalPrice((prev) => prev + item.price);
  }, []);

  const { category, query } = useLocalSearchParams<{
    category?: string;
    query?: string;
  }>();

  const { data, loading, refetch } = useAppwrite({
    fn: getMenu,
    params: { category, query, limit: 6 },
  });

  const { data: categories } = useAppwrite({ fn: getCategories });

  useEffect(() => {
    refetch({ category, query, limit: 6 });
  }, [category, query]);

  const renderItem = useCallback(
    ({ item }: { item: MenuItem }) => (
      <View className="flex-1 max-w-[48%]">
        <ProductCard item={item} onAddToCart={() => handleAddToCart(item)} />
      </View>
    ),
    [],
  );

  return (
    <SafeAreaView className="flex-1 bg-white mb-15">
      <View className="flex-1">
        <FlatList
          data={data ?? []}
          keyExtractor={(item) => item.$id}
          numColumns={2}
          renderItem={renderItem}
          columnWrapperClassName="gap-7"
          contentContainerClassName="gap-7 px-5 pb-40"
          keyboardShouldPersistTaps="handled"
          ListEmptyComponent={() => {
            if (loading) {
              return (
                <View className="items-center justify-center mt-10">
                  <ActivityIndicator size="large" color="#FFA500" />
                  <Text className="text-gray-500 mt-2">Loading...</Text>
                </View>
              );
            } else {
              return (
                <Text className="text-center text-gray-500 mt-10">
                  No Result !!!
                </Text>
              );
            }
          }}
          ListHeaderComponent={
            <View className="gap-4">
              {/* Header */}
              <View className="flex-row justify-between items-center py-3">
                <View>
                  <Text className="text-sm font-bold text-orange-500">
                    SEARCH
                  </Text>
                  <View className="flex-row items-center mt-1">
                    <Text className="text-base mr-1">
                      Find your favorite food.
                    </Text>
                    <Image
                      source={images.arrowDown}
                      className="w-4 h-4"
                      resizeMode="contain"
                    />
                  </View>
                </View>
                <CartButton totalItems={totalCart} />
              </View>

              {/* Search and Filter */}
              <SearchBar />
              {categories && <Filter categories={categories} />}
            </View>
          }
        />
      </View>

      {/* Cart summary at bottom */}
      {totalCart > 0 && (
        <View className="absolute bottom-28 left-4 right-4 bg-orange-400 px-5 py-3 rounded-full shadow-lg z-50 flex-row items-center justify-between">
          <Text
            className="text-white font-bold"
            style={{ fontSize: 18, fontFamily: "QuickSand_700Bold" }}
          >
            Total: ${totalPrice.toFixed(2)}
          </Text>
          <View className="flex-row items-center bg-white px-3 py-1.5 rounded-full">
            <Text
              className="text-orange-500 font-bold mr-2"
              style={{ fontSize: 16, fontFamily: "QuickSand_600SemiBold" }}
            >
              {totalCart}
            </Text>
            <Image
              className="w-6 h-6"
              source={images.shoppingCart}
              resizeMode="contain"
            />
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

export default Search;
