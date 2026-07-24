import {useState} from "react";

type Props = {
    customer?: any;
    onSave: (customer:any) => void;
    onCancel: () => void;
}

export default function CustomerForm({
    customer,
    onSave,
    onCancel,
}: Props) {
    const [name, setName] = useState(customer?.name || "");
    const [adress, setAdress] = useState(customer?.adress || "");
    const [vatcode, setVatcode] = useState(customer?.vatcode || "");
    const [presentative, setPresentative] = useState(customer?.presentative || "");
    const [phone, setPhone] = useState(customer?.phone || "");
    const [email, setEmail] = useState(customer?.email || "");

    return (
        <div className="border rounded p-5 bg-gray-100 mb-5">
            <h2 className="text-xl font-bold mb-4">Add Customer</h2>
            <input
                className="border p-2 w-full mb-3"
                placeholder="Customer name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <input
                className="border p-2 w-full mb-3"
                placeholder="Address"
                value={adress}
                onChange={(e) => setAdress(e.target.value)}
            />
            <input
                className="border p-2 w-full mb-3"
                placeholder="VAT code"
                value={vatcode}
                onChange={(e) => setVatcode(e.target.value)}
            />
            <input
                className="border p-2 w-full mb-3"
                placeholder="Representative"
                value={presentative}
                onChange={(e) => setPresentative(e.target.value)}
            />
            <input
                className="border p-2 w-full mb-3"
                placeholder="Phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
            />
            <input
                className="border p-2 w-full mb-3"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <button
                className="bg-blue-500 text-white p-2 rounded"
                onClick={() => onSave({ 
                    id: customer?.id,
                    name, adress, vatcode, presentative, phone, email })}
            >
                Save
            </button>
            <button
                className="bg-gray-500 text-white p-2 rounded ml-2"
                onClick={onCancel}
            >
                Cancel
            </button>
        </div>

    )
}   