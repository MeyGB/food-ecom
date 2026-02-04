import {
  BUCKET_ID,
  database,
  db_name,
  storage,
  table_categories,
  table_customization,
  table_menu_customization,
  table_menus,
} from "@/service/Appwrite";
import { ID } from "react-native-appwrite";
import dummyData from "./data";

interface Category {
  name: string;
  description: string;
}

interface Customization {
  name: string;
  price: number;
  type: "topping" | "side" | "size" | "crust" | string;
}

interface MenuItem {
  name: string;
  description: string;
  image_url: string;
  price: number;
  rating: number;
  calories: number;
  protein: number;
  category_name: string;
  customizations: string[]; // list of customization names
}

interface DummyData {
  categories: Category[];
  customizations: Customization[];
  menu: MenuItem[];
}

const data = dummyData as DummyData;

// ---- Helper Functions ----

async function clearAll(tableId: string) {
  const list = await database.listDocuments(db_name, tableId);
  await Promise.all(
    list.documents.map((doc) =>
      database.deleteDocument(db_name, tableId, doc.$id),
    ),
  );
}

async function clearStorage() {
  const list = await storage.listFiles(BUCKET_ID);
  await Promise.all(
    list.files.map((file) => storage.deleteFile(BUCKET_ID, file.$id)),
  );
}

// Upload image to Appwrite Storage and return URL
async function uploadImageToStorage(imageUrl: string) {
  const response = await fetch(imageUrl);
  const blob = await response.blob();

  // react-native-appwrite requires a File object
  const fileObj: any = {
    name: imageUrl.split("/").pop() || `file-${Date.now()}.jpg`,
    size: blob.size,
    type: blob.type,
    uri: imageUrl,
  };

  const file = await storage.createFile(BUCKET_ID, ID.unique(), fileObj);
  return storage.getFileViewURL(BUCKET_ID, file.$id);
}

// ---- Seed Function ----
async function seed() {
  console.log("🧹 Clearing old data...");
  await clearAll(table_categories);
  await clearAll(table_customization);
  await clearAll(table_menus);
  await clearAll(table_menu_customization);
  await clearStorage();

  console.log("📂 Creating categories...");
  const categoryMap: Record<string, string> = {};
  for (const cat of data.categories) {
    // console.log("hii", JSON.stringify(data.categories, null, 2));

    const doc = await database.createDocument(
      db_name,
      table_categories,
      ID.unique(),
      cat,
    );
    categoryMap[cat.name] = doc.$id;
  }

  console.log("🛠 Creating customizations...");
  const customizationMap: Record<string, string> = {};
  for (const cus of data.customizations) {
    const doc = await database.createDocument(
      db_name,
      table_customization,
      ID.unique(),
      {
        name: cus.name,
        price: cus.price,
        type: cus.type.toUpperCase(),
      },
    );
    customizationMap[cus.name] = doc.$id;
  }

  console.log("🍽 Creating menu items...");
  for (const item of data.menu) {
    const uploadedImage = await uploadImageToStorage(item.image_url);

    const doc = await database.createDocument(
      db_name,
      table_menus,
      ID.unique(),
      {
        name: item.name,
        description: item.description,
        image_url: uploadedImage,
        price: item.price,
        rating: item.rating,
        calories: item.calories,
        protien: item.protein,
        categories: categoryMap[item.category_name], // Use category ID
      },
    );

    // Create menu_customizations
    for (const cusName of item.customizations) {
      await database.createDocument(
        db_name,
        table_menu_customization,
        ID.unique(),
        {
          menus: doc.$id,
          customization: customizationMap[cusName],
        },
      );
    }
    console.log("hello me");
  }

  console.log("✅ Seeding complete!");
}

export default seed;
