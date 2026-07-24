import { useState, useEffect } from "react";
import {getCustomers, addCustomer, updateCustomer, deleteCustomer} from "../services/customerService"
//import { useNavigate } from "../components/CustomerForm";
import CustomerForm from "../components/CustomerForm";


export default function CustomersPage() {

    const [customers, setCustomers] = useState<any[]>([]);
    const [showForm, setShowForm] = useState(false);
    const [editingCustomer, setEditingCustomer] = useState<any>(null);

    async function loadCustomers() {
        const data = await getCustomers();
        setCustomers(data);
    }

    useEffect(() => {
        loadCustomers();
    }, []);


    async function saveCustomers(customer: any) {
        if (editingCustomer) {
            await updateCustomer(customer);
        } else {
            await addCustomer(customer);
        }
        setEditingCustomer(null);
        setShowForm(false);
        await loadCustomers();
    }

    async function removeCustomers(id: string) {
        const ok = confirm("Bạn có chắc muốn xóa khách hàng này?");
        if (!ok) {
            return;
        }
        await deleteCustomer(id);
        await loadCustomers();
    }


    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">

                Customers

            </h1>
            
            <button 
                className="bg-green-600 text-white px-4 py-2 rounded mb-5"
                onClick={() => setShowForm(true)}>Add Customer
            </button>
            {showForm && (
                <CustomerForm
                    customer={editingCustomer}
                    onSave={saveCustomers}
                    onCancel={() => {
                        setShowForm(false);
                        setEditingCustomer(null);
                    }}
                />
            )}

            {customers.map((customer) => (
                <div key={customer.id} 
                    className="border rounded p-4 mb-4 bg-white shadow">
                    <h2 className="font-bold text-xl">{customer.cusid}</h2>
                    <p >{customer.name}</p>
                    <p >{customer.adress}</p>
                    <p >{customer.vatcode}</p>
                    <p >{customer.presentative}</p>
                    <p >{customer.phone}</p>
                    <p >{customer.email}</p>
                    <p >{customer.created_at}</p>
                    <button 
                        className="bg-yellow-500 text-white px-3 py-1 rounded mt-3"
                        onClick={() => {
                            setEditingCustomer(customer);
                            setShowForm(true);}}>
                        Edit
                    </button>
                    <button 
                        className="bg-red-600 text-white px-3 py-1 rounded mt-3"
                        onClick={() => removeCustomers(customer.id)}>
                        Delete
                    </button>
                </div>
            ))}
        </div>
    )
}

