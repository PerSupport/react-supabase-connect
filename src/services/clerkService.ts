import {supabase} from '../lib/supabase'

export async function getClerks() {
  const { data, error } = await supabase
    .from('nhanvien')
    .select('*')
    .order('name', { ascending: true });
  if (error) {
    throw error;  
    return [];
  }
  return data;
}

export async function addClerk(clerk: { 
    name: string; 
    dept: string 
}) {
  const { error } = await supabase
    .from('nhanvien')
    .insert(clerk);
  if (error) {
    throw error;
  }
}

export async function updateClerk(clerk : any) {
  const { error } = await supabase
    .from('nhanvien')
    .update({
        name: clerk.name,
        dept: clerk.dept
    })
    .eq('id', clerk.id);
  if (error) {
    throw error;
  }
}

export async function deleteClerk(id: number) {
  const { error } = await supabase
    .from('nhanvien')
    .delete()
    .eq('id', id);
  if (error) {
    throw error;
  }
}