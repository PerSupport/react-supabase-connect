import { supabase } from "../lib/supabase";
import { v4 as uuidv4 } from "uuid";

export async function uploadProductImage(file : File) {
    
    const extension = file.name.split(".").pop();
    const fileName = `${uuidv4()}.${extension}`;

    const  { error }= await supabase.storage
        .from("product-images")
        .upload(fileName,file)

    if(error) throw error

    const {data }= await supabase.storage
        .from("product-images")
        .getPublicUrl(fileName)

    return data.publicUrl
}

export async function deleteProductImage(imageUrl: string) {
    const fileName = imageUrl.split("/").pop();
    if (!fileName) return;
    const { error } = await supabase.storage
        .from("product-images")
        .remove([fileName]);
    if (error) throw error;
}