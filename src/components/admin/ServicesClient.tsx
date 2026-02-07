'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit2, Trash2, Shield, X, Save, AlertCircle, GripVertical } from 'lucide-react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

interface Service {
    id: string;
    slug: string;
    title: string;
    description: string;
    fullDesc?: string | null;
    features?: string | null;
    icon?: string | null;
    order: number;
}

export default function ServicesClient({ initialServices }: { initialServices: Service[] }) {
    const [services, setServices] = useState<Service[]>(initialServices);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingService, setEditingService] = useState<Service | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const [formData, setFormData] = useState({
        title: '',
        slug: '',
        description: '',
        fullDesc: '',
        features: '',
        icon: 'Shield',
    });

    const openAddModal = () => {
        setEditingService(null);
        setFormData({ title: '', slug: '', description: '', fullDesc: '', features: '', icon: 'Shield' });
        setIsModalOpen(true);
    };

    const openEditModal = (service: Service) => {
        setEditingService(service);
        setFormData({
            title: service.title,
            slug: service.slug,
            description: service.description,
            fullDesc: service.fullDesc || '',
            features: service.features ? JSON.parse(service.features).join(', ') : '', // Assume features is stored as JSON string
            icon: service.icon || 'Shield',
        });
        setIsModalOpen(true);
    };

    const handleDelete = async (slug: string) => {
        if (!confirm('Are you sure you want to delete this service?')) return;
        try {
            await axios.delete(`/api/admin/services/${slug}`);
            setServices(services.filter(s => s.slug !== slug));
            router.refresh();
        } catch (error) {
            console.error('Failed to delete service', error);
            alert('Failed to delete service');
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const dataToSubmit = {
                ...formData,
                features: JSON.stringify(formData.features.split(',').map(f => f.trim()).filter(Boolean)),
            };

            if (editingService) {
                await axios.patch(`/api/admin/services/${editingService.slug}`, dataToSubmit);
            } else {
                await axios.post('/api/admin/services', dataToSubmit);
            }

            setIsModalOpen(false);
            router.refresh(); // Refresh server data
            // Optimistic update could happen here but refresh is safer for sync
            window.location.reload(); // Force reload to see changes if simple refresh isn't enough for server components
        } catch (error) {
            console.error('Failed to save service', error);
            alert('Failed to save service');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {services.map((service) => (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        key={service.id}
                        className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-start justify-between group hover:shadow-lg hover:border-primary-gold/30 transition-all duration-300"
                    >
                        <div className="flex space-x-4">
                            <div className="w-12 h-12 bg-primary-gold/10 text-primary-gold rounded-xl flex items-center justify-center shrink-0">
                                <Shield size={24} />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg text-primary-navy group-hover:text-primary-gold transition-colors">{service.title}</h3>
                                <p className="text-gray-500 text-sm line-clamp-2 mt-1">{service.description}</p>
                            </div>
                        </div>
                        <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity translate-x-4 group-hover:translate-x-0 duration-300">
                            <button
                                onClick={() => openEditModal(service)}
                                className="p-2 text-primary-navy hover:bg-blue-50 rounded-lg transition-colors border border-gray-100"
                            >
                                <Edit2 size={16} />
                            </button>
                            <button
                                onClick={() => handleDelete(service.slug)}
                                className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors border border-gray-100"
                            >
                                <Trash2 size={16} />
                            </button>
                        </div>
                    </motion.div>
                ))}

                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={openAddModal}
                    className="lg:col-span-1 p-6 border-2 border-dashed border-gray-200 rounded-3xl flex flex-col items-center justify-center text-gray-400 hover:border-primary-gold hover:text-primary-gold hover:bg-primary-gold/5 transition-all cursor-pointer min-h-[140px]"
                >
                    <Plus size={32} className="mb-2" />
                    <span className="font-bold">Add New Service</span>
                </motion.button>
            </div>

            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsModalOpen(false)}
                            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto relative z-10"
                        >
                            <div className="p-8">
                                <div className="flex justify-between items-center mb-6">
                                    <h2 className="text-2xl font-bold text-primary-navy">
                                        {editingService ? 'Edit Service' : 'Add New Service'}
                                    </h2>
                                    <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-full">
                                        <X size={24} />
                                    </button>
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-bold text-gray-700 mb-2">Service Title</label>
                                            <input
                                                required
                                                value={formData.title}
                                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-gold focus:ring-2 focus:ring-primary-gold/20 outline-none"
                                                placeholder="e.g. Remote Online Notary"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold text-gray-700 mb-2">Slug (URL)</label>
                                            <input
                                                required
                                                value={formData.slug}
                                                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-gold focus:ring-2 focus:ring-primary-gold/20 outline-none"
                                                placeholder="e.g. remote-online-notary"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Short Description</label>
                                        <textarea
                                            required
                                            rows={2}
                                            value={formData.description}
                                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-gold focus:ring-2 focus:ring-primary-gold/20 outline-none resize-none"
                                            placeholder="Brief overview visible on cards..."
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Full Description</label>
                                        <textarea
                                            rows={4}
                                            value={formData.fullDesc}
                                            onChange={(e) => setFormData({ ...formData, fullDesc: e.target.value })}
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-gold focus:ring-2 focus:ring-primary-gold/20 outline-none resize-none"
                                            placeholder="Detailed description for the service page..."
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Key Features (comma separated)</label>
                                        <input
                                            value={formData.features}
                                            onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-gold focus:ring-2 focus:ring-primary-gold/20 outline-none"
                                            placeholder="24/7 Access, Secure, Fast..."
                                        />
                                    </div>

                                    <div className="flex justify-end pt-4">
                                        <button
                                            type="button"
                                            onClick={() => setIsModalOpen(false)}
                                            className="px-6 py-3 mr-4 font-bold text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded-xl transition-colors"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            disabled={isLoading}
                                            className="px-8 py-3 bg-primary-navy text-white font-bold rounded-xl hover:bg-primary-gold transition-colors shadow-lg flex items-center space-x-2 disabled:opacity-70"
                                        >
                                            {isLoading ? <span className="animate-spin">⌛</span> : <Save size={18} />}
                                            <span>{editingService ? 'Update Service' : 'Create Service'}</span>
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
}
