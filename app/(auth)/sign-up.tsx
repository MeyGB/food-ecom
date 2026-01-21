import CustomButton from "@/components/CustomButton";
import CustonInput from "@/components/CustonInput";
import { account, database, db_name, table_user } from "@/service/Appwrite";
import { Link, router } from "expo-router";
import React, { useState } from "react";
import { Alert, Text, View } from "react-native";
import { ID } from "react-native-appwrite";

const SignUp = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const submit = async () => {
    // Appwrite Api Account
    //Condition if valid email and password
    if (!form.email || !form.password || !form.name) {
      Alert.alert("Error", "Please Enter Valid Name & Email & Password");
      return;
    }
    if (form.password.length < 8) {
      Alert.alert("Warning", "Enter a password with more than 8 characters");
      return;
    }
    try {
      setIsSubmitted(true);
      const user = await account.create(
        ID.unique(),
        form.email,
        form.password,
        form.name,
      );
      // table users
      const accountID = user.$id; // field accountid in table users should the same as id in auth user
      await database.createDocument(db_name, table_user, ID.unique(), {
        accountid: accountID,
        name: form.name,
        email: form.email,
        avatar: "https://picsum.photos/400/400",
        $createdAt: new Date().toISOString(),
      });

      Alert.alert("Success", "Sign Up Sucessfully");
      router.replace("/");
      setForm({ name: "", email: "", password: "" });
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
