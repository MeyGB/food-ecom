import { Search as SearchIcon } from "lucide-react-native";
import { KeyboardAvoidingView, Platform, TextInput, View } from "react-native";

const SearchBar = ({ search, setSearch }) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={10}
    >
      <View>
        <View className="flex-row items-center bg-white rounded-full px-4 py-3 shadow-md">
          <SearchIcon color="#555" size={20} />

          <TextInput
            placeholder="Search here..."
            placeholderTextColor="#888"
            value={search}
            onChangeText={setSearch}
            className="flex-1 ml-3"
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default SearchBar;
