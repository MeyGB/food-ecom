import { Search as SearchIcon } from "lucide-react-native";
import { KeyboardAvoidingView, Platform, TextInput, View } from "react-native";

const SearchBar = ({ search, setSearch }) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={10}
    >
      <View className="px-4">
        <View className="flex-row items-center bg-white rounded-full p-3 shadow-md">
          <SearchIcon color="#555" size={20} />
          <TextInput
            placeholder="Search here..."
            value={search}
            onChangeText={setSearch}
            className="ml-2 flex-1 "
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default SearchBar;
