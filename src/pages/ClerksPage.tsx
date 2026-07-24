import {useState,useEffect} from 'react';
import ClerkForm from '../components/ClerkForm';
import { getClerks,addClerk,updateClerk,deleteClerk } from '../services/clerkService';

export default function ClerksPage() {
    const [clerks, setClerks] = useState<any[]>([]);
    const [editingClerk, setEditingClerk] = useState<any | null>(null);
    const [showForm, setShowForm] = useState(false);

    async function loadClerks() {

        const data = await getClerks();
        setClerks(data);
    }

    useEffect(() => {
        console.log("load clerks");
        loadClerks();
    }, []);

    async function saveClerk(clerk: any) {
        if (editingClerk) {
            await updateClerk(clerk);
        } else {
            await addClerk(clerk);
        }
        loadClerks();
        setShowForm(false);
        setEditingClerk(null);
    }
    async function removeClerk(id: number) {
        const ok = confirm("Bạn có chắc muốn xóa nhân viên này?");
        if (!ok) {
            return;
        }   
        await deleteClerk(id);
        loadClerks();
    }

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">Clerks</h1>
            <button onClick={() => setShowForm(true)}>
                Add Clerk
            </button>
            {showForm && (
                <ClerkForm
                    clerk={editingClerk}
                    onSave={saveClerk}
                    onCancel={() => {
                        setShowForm(false);
                        setEditingClerk(null);
                    }}
                />
            )}
            
            { clerks.map((clerk) => (
                <div
                    className="border rounded p-4 mb-4 bg-white shadow"> 
                    <h2 className="text-xl">{clerk.name} - {clerk.dept}</h2>
                    <button onClick={() => {
                        setEditingClerk(clerk);
                        setShowForm(true);
                    }}>
                        Edit
                    </button>
                    <button onClick={() => removeClerk(clerk.id)}>
                        Delete
                    </button>
                </div>
            )) }
            

        </div>
    );

}

   

    