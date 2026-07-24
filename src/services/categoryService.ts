import {supabase} from '../lib/supabase';

export async function getCategories() {
    const { data, error } = await supabase
        .from('category')
        .select('*')
        .order('name', { ascending: true });
    if (error) {
        throw error;
    }
    return data;
}

export async function addCategory(category: {
    name: string;
    description: string;
}) {
    const { error } = await supabase
        .from('category')
        .insert(category)
    if (error) {
        throw error;
    }
}

export async function updateCategory(category: any) {
    const { error } = await supabase
        .from('category')
        .update({
            name: category.name,
            description: category.description
        })
        .eq('id', category.id);
    if (error) {
        throw error;
    }
}

export async function deleteCategory(id: string) {
    const { error } = await supabase
        .from('category')
        .delete()
        .eq('id', id);
    if (error) {
        throw error;
    }
}