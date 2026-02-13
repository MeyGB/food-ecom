import { Category } from "@/type";
import cn from "clsx";
import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { FlatList, Platform, Text, TouchableOpacity, View } from "react-native";

type Props = {
  categories: Category[];
};
type FilterItem = {
  $id: string;
  name: string;
};

const Filter = ({ categories }: Props) => {
  const searchParams = useLocalSearchParams();
  const [active, setActive] = useState(searchParams.category || "all");
  const filterData: (Category | FilterItem)[] = categories
    ? [{ $id: "all", name: "All" }, ...categories]
    : [{ $id: "all", name: "All" }];

  const handlePress = (id: string) => {
    setActive(id);

    // console.log(JSON.stringify(categories, null, 2));

    if (id === "all") router.setParams({ category: undefined });
    else router.setParams({ category: id });
  };

  return (
    <View className="py-1">
      <FlatList
        data={filterData}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => {
          const isActive = active === item.$id;

          return (
            <TouchableOpacity
              key={item.$id}
              className={cn(
                "filter",
                isActive ? "bg-orange-500" : "bg-gray-300",
              )}
              style={
                Platform.OS === "android"
                  ? { elevation: 5, shadowColor: "#878787" }
                  : {}
              }
              onPress={() => handlePress(item.$id)}
            >
              <Text
                className={cn(
                  "body-medium",
                  isActive ? "text-white" : "text-gray-600",
                )}
              >
                {item.name}
              </Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default Filter;
