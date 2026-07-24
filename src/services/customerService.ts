import {supabase} from "../lib/supabase";

export async function getCustomers() {
    const { data, error } = await supabase
        .from("khachhang")
        .select("*")
        .order("name");

    if (error) {
        console.error("Error fetching customers:", error);
        return [];
    }

    return data;

}

export async function addCustomer(customer: {
    name: string;
    adress: string;
    vatcode: string;
    presentative: string;
    phone: string;
    email: string;
}) {
    const { error } = await supabase
        .from("khachhang")
        .insert([customer]);

    if (error) 
        throw error;
}

export async function updateCustomer(customer: any) {
    const { error } = await supabase
        .from("khachhang")
        .update({
            name: customer.name,
            adress: customer.adress,
            vatcode: customer.vatcode,
            presentative: customer.presentative,
            phone: customer.phone,
            email: customer.email
        })
        .eq("id", customer.id); 

    if (error) 
        throw error;
}

export async function deleteCustomer(id: string) {
    const { error } = await supabase
        .from("khachhang")
        .delete()
        .eq("id", id);

    if (error) 
        throw error;
}