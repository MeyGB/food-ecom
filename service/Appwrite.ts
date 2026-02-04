import { CreateUserParams, GetMenuParams, SignInParams } from "@/type";
import {
  Account,
  Avatars,
  Client,
  Databases,
  ID,
  Query,
  Storage,
} from "react-native-appwrite";

const platform = process.env.EXPO_PUBLIC_APPWRITE_PROJECT_NAME!;
const project_id = process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!;
const api_endpoint = process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!;

export const client = new Client()
  .setProject(project_id)
  .setPlatform(platform)
  .setEndpoint(api_endpoint);

export const account = new Account(client);
export const storage = new Storage(client);
export const database = new Databases(client);

export const BUCKET_ID = process.env.EXPO_PUBLIC_APPWRITE_BUCKET_ID!;
export const db_name = process.env.EXPO_PUBLIC_APPWRITE_DATABASE!;
export const table_user = process.env.EXPO_PUBLIC_APPWRITE_TABLE_USER!;
export const table_menus = process.env.EXPO_PUBLIC_APPWRITE_TABLE_MENU!;
export const table_menu_customization =
  process.env.EXPO_PUBLIC_APPWRITE_TABLE_MENU_CUSTOMIZATION!;
export const table_customization =
  process.env.EXPO_PUBLIC_APPWRITE_TABLE_CUSTOMIZATION!;
export const table_categories =
  process.env.EXPO_PUBLIC_APPWRITE_TABLE_CATEGORIES!;

const avatar = new Avatars(client);

export const userSignUp = async ({
  name,
  email,
  password,
}: CreateUserParams) => {
  try {
    const createUser = await account.create(ID.unique(), email, password, name);
    if (!createUser) throw new Error();
    const userID = createUser.$id;
    await userSignIn({ email, password });
    const avatarUrl = avatar.getInitialsURL(name);
    await database.createDocument(db_name, table_user, ID.unique(), {
      accountid: userID,
      name: name,
      email: email,
      avatar: avatarUrl,
    });
    return createUser;
  } catch (e: any) {
    throw new Error(e);
  }
};

export const userSignIn = async ({ email, password }: SignInParams) => {
  try {
    const session = await account.createEmailPasswordSession(email, password);
    return session;
  } catch (e: any) {
    console.log("Other Error", e);
    return null;
  }
};

export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get();
    // Checks if a session exists
    if (!currentAccount) throw Error;
    const response = await database.listDocuments(db_name, table_user, [
      Query.equal("accountid", currentAccount.$id),
    ]);
    // Each user should only have one profile
    console.log(response);

    return response.documents[0] ?? null;
  } catch (error) {
    console.log("message", error);
    return null;
  }
};
export const userSignOut = async () => {
  try {
    // Deletes the current session
    await account.deleteSession("current");
    console.log("Logged out successfully");
    return true;
  } catch (error: any) {
    console.error("SignOut Error:", error);
    throw new Error(error.message || "Logout failed");
  }
};

export const getMenu = async ({ category, query }: GetMenuParams) => {
  try {
    const queries: string[] = [];
    if (category) queries.push(Query.equal("category", category));
    if (query) queries.push(Query.equal("name", query));
  } catch (e) {
    throw new Error(e as string);
  }
};
