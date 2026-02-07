'use client';

import { CheckCircle, Trash2, Loader2 } from "lucide-react";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function MessageActionButtons({ id, status }: { id: string, status: string }) {
    const [isUpdating, setIsUpdating] = useState(false);
    const router = useRouter();

    const handleUpdateStatus = async () => {
        setIsUpdating(true);
        try {
            await axios.patch(`/api/contact/${id}`, { status: status === 'new' ? 'read' : 'new' });
            router.refresh();
        } catch (error) {
            console.error(error);
        } finally {
            setIsUpdating(false);
        }
    };

    const handleDelete = async () => {
        if (!confirm('Are you sure you want to delete this message?')) return;
        setIsUpdating(true);
        try {
            await axios.delete(`/api/contact/${id}`);
            router.refresh();
        } catch (error) {
            console.error(error);
        } finally {
            setIsUpdating(false);
        }
    };

    return (
        <div className="flex items-center justify-end space-x-2">
            <button
                disabled={isUpdating}
                onClick={handleUpdateStatus}
                className={`p-2 rounded-lg shadow-sm transition-all border border-transparent hover:border-gray-200 ${status === 'new' ? 'text-primary-navy hover:bg-white' : 'text-gray-400 hover:bg-gray-100'
                    }`}
                title={status === 'new' ? 'Mark as Read' : 'Mark as New'}
            >
                {isUpdating ? <Loader2 size={18} className="animate-spin" /> : <CheckCircle size={18} />}
            </button>
            <button
                disabled={isUpdating}
                onClick={handleDelete}
                className="p-2 text-red-500 hover:bg-white rounded-lg shadow-sm transition-all border border-transparent hover:border-gray-200"
                title="Delete Message"
            >
                <Trash2 size={18} />
            </button>
        </div>
    );
}
