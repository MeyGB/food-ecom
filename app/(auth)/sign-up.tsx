import CustomButton from "@/components/CustomButton";
import CustonInput from "@/components/CustonInput";
import { userSignUp } from "@/service/Appwrite";
import { Link, router } from "expo-router";
import React, { useState } from "react";
import { Alert, Text, View } from "react-native";
const SignUp = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const submit = async () => {
    const { email, password, name } = form;
    // Appwrite Api Account
    //Condition if valid email and password
    if (!email || !password || !name) {
      Alert.alert("Error", "Please Enter Valid Name & Email & Password");
      return;
    }
    if (password.length < 8) {
      Alert.alert("Warning", "Enter a password with more than 8 characters");
      return;
    }
    setIsSubmitted(true);
    try {
      await userSignUp({ name, email, password });
      Alert.alert("Success", "Sign Up Sucessfully");
      setForm({ name: "", email: "", password: "" });

      router.replace("/(auth)/sign-in");
    } catch (error: any) {
      Alert.alert("Login faileddd", error?.message || "Something went wrong");
      console.error(error);
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
      <CustomButton title="Sign Up" onPress={submit} isLoading={isSubmitted} />

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
