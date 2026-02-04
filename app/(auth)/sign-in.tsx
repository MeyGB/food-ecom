import CustomButton from "@/components/CustomButton";
import CustonInput from "@/components/CustonInput";
import { account } from "@/service/Appwrite";
import { Link, router } from "expo-router";
import { useState } from "react";
import { Alert, Text, View } from "react-native";

const SignIn = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });

  const submit = async () => {
    // Appwrite Api Account
    //Condition if valid email and password
    if (!form.email || !form.password) {
      Alert.alert("Error", "Please Enter Vlaid Email & Password");
      return;
    }
    try {
      setIsSubmitted(true);
      await account.createEmailPasswordSession(form.email, form.password);
      Alert.alert("Success", "Login Sucessfully");
      setForm({ email: "", password: "" });
      setTimeout(() => {
        router.replace("/");
      }, 300);
      return;
    } catch (error: any) {
      Alert.alert("Login failed", error?.message || "Something went wrong");
    } finally {
      setIsSubmitted(false);
    }
  };

  return (
    <View className="gap-8 bg-white rounded-lg p-5 mt-5">
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
          Don't have an account ?
        </Text>
        <Link href={"/(auth)/sign-up"} className="base-bold text-primary">
          Sign Up
        </Link>
      </View>
    </View>
  );
};

export default SignIn;
