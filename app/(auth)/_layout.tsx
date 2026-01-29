import { images } from "@/constants";
import useAuthStore from "@/store/auth.store";
import { Redirect, Slot } from "expo-router";
import React from "react";
import {
  Dimensions,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
} from "react-native";

export default function AuthLayout() {
  const { isAuthenticated } = useAuthStore();
  if (isAuthenticated) <Redirect href="/" />;
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        keyboardShouldPersistTaps="handled"
        className="h-full bg-white"
      >
        <View className="relative w-full">
          <ImageBackground
            source={images.loginGraphic}
            className="rounded-b-lg"
            resizeMode="stretch"
            style={{ height: Dimensions.get("screen").height / 2.25 }}
          />
          <Image
            source={images.logo}
            className="absolute z-10 size-48 self-center -bottom-16"
          />
        </View>

        <Slot />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
