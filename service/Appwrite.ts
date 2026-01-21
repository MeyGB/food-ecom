import { CreateUserParams, SignInParams } from "@/type";
import {
  Account,
  Avatars,
  Client,
  Databases,
  ID,
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

export const db_name = process.env.EXPO_PUBLIC_APPWRITE_DATABASE!;
export const table_user = process.env.EXPO_PUBLIC_APPWRITE_TABLE_USER!;

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
    throw new Error(e);
  }
};
