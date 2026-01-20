import CustomButton from "@/components/CustomButton";
import CustonInput from "@/components/CustonInput";
import { Link, router } from "expo-router";
import React, { useState } from "react";
import { Alert, Text, View } from "react-native";

const SignUp = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const submit = async () => {
    // Appwrite Api Account
    //Condition if valid email and password
    if (!form.email || !form.password) {
      Alert.alert("Error", "Please Enter Valid Name & Email & Password");
      return;
    }
    try {
      setIsSubmitted(true);
      Alert.alert("Success", "Sign Up Sucessfully");
      router.replace("/");
    } catch (error: any) {
      Alert.alert("Login failed", error?.message || "Something went wrong");
    } finally {
      setIsSubmitted(false);
    }
  };
  return (
    <View className="gap-8 bg-white rounded-lg p-5 mt-5">
      <CustonInput
        label="Name"
        placeholder="Enter Your Name"
        value={form.name}
        onChangeText={(text) => setForm((prev) => ({ ...prev, name: text }))}
      />
      <CustonInput
        label="Email"
        placeholder="Enter Your Email"
        value={form.email}
        onChangeText={(text) => setForm((prev) => ({ ...prev, email: text }))}
        keyboardType="email-address"
      />
      <CustonInput
        label="Password"
        placeholder="Enter Your Password"
        value={form.password}
        onChangeText={(text) =>
          setForm((prev) => ({ ...prev, password: text }))
        }
        secureTextEntry={true}
      />
      <CustomButton title="Sign In" onPress={submit} isLoading={isSubmitted} />

      <View className="flex justify-center flex-row gap-2">
        <Text className="base-regular text-gray-100">
          I already have an account ?
        </Text>
        <Link href={"/(auth)/sign-in"} className="base-bold text-primary">
          Sign In
        </Link>
      </View>
    </View>
  );
};

export default SignUp;
