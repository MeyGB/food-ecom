import { Account, Client, Databases, Storage } from "react-native-appwrite";

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
