import { supabase } from './supabase';

const EMPLOYEES_TABLE = 'employees';

export async function initializeDatabase() {
  const { error: tableError } = await supabase.from(EMPLOYEES_TABLE).select('id').limit(1);
  
  if (tableError?.code === 'PGRST204') {
    const { error: createError } = await supabase.rpc('initialize_database');
    if (createError) {
      console.error('Error creating database schema:', createError);
      throw createError;
    }
  }
}

export async function createEmployee(data: {
  full_name: string;
  email: string;
  company_name: string;
  department: string;
  position: string;
}) {
  const { data: employee, error } = await supabase
    .from(EMPLOYEES_TABLE)
    .insert([{
      ...data,
      created_at: new Date().toISOString(),
    }])
    .select()
    .single();

  if (error) throw error;
  return employee;
}

export async function getEmployees() {
  const { data, error } = await supabase
    .from(EMPLOYEES_TABLE)
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}