import { getCurrentUser, userSignOut } from "@/service/Appwrite";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Profile = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const currentUser = await getCurrentUser();
        setUser(currentUser);
      } catch (error) {
        console.log("Error fetching user:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleLogout = async () => {
    try {
      await userSignOut();
      // You can navigate to the login screen here if using Expo Router
      console.log("Logged out successfully");
    } catch (error) {
      console.log("Logout failed:", error);
    }
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#ff6347" />
      </View>
    );
  }

  if (!user) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text>No user found.</Text>
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white px-5 py-10">
      <View className="items-center mb-10">
        <Image
          source={{ uri: user.avatar }}
          className="w-24 h-24 rounded-full"
          resizeMode="cover"
        />
        <Text className="text-xl font-bold mt-4">{user.name}</Text>
        <Text className="text-gray-500">{user.email}</Text>
      </View>

      <TouchableOpacity
        onPress={handleLogout}
        className="bg-red-500 py-3 rounded-lg items-center"
      >
        <Text className="text-white font-bold text-lg">Logout</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Profile;
