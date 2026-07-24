import {useState} from 'react';

type Props = {
    clerk?: any;
    onSave: (clerk: { id?: number; name: string; dept: string }) => void;
    onCancel: () => void;
};

export default function ClerkForm({ 
    clerk, onSave, onCancel 
}: Props) {
    const [name, setName] = useState(clerk?.name || '');
    const [dept, setDept] = useState(clerk?.dept || '');

    return (
        <div className="clerk-form">
            <div>
                <label>Name:</label>
                <input
                    type="text"
                    placeholder="clerk name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
            <div>
                <label>Department:</label>
                <input
                    type="text"
                    placeholder="department"
                    value={dept}
                    onChange={(e) => setDept(e.target.value)}
                />
            </div>
            <button 
                className="bg-blue-500 text-white p-2 rounded"
                onClick={() => onSave({ id: clerk?.id, name, dept })}>Save</button>
            <button 
                className="bg-gray-500 text-white p-2 rounded"
                onClick={onCancel}>Cancel</button>
        </div>
    );
}