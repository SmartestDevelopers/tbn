'use client';

import { useState } from 'react';
import { Save, Loader2, Globe, Mail, Phone, MapPin, Facebook, Twitter, Instagram } from 'lucide-react';
import { updateSettings } from '@/app/actions/admin';

export default function SettingsForm({ initialSettings }: { initialSettings: any }) {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        const formData = new FormData(e.currentTarget);
        const res = await updateSettings(formData);

        if (res.success) {
            setMessage('Settings updated successfully!');
            setTimeout(() => setMessage(''), 3000);
        } else {
            setMessage('Error updating settings.');
        }
        setLoading(false);
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-4xl">
            <div className="grid grid-cols-1 gap-8">

                {/* General Settings */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-6 border-b border-gray-100 bg-gray-50/50">
                        <h2 className="text-lg font-bold text-primary-navy flex items-center">
                            <Globe className="mr-2 text-primary-gold" size={20} />
                            General Information
                        </h2>
                    </div>
                    <div className="p-8 space-y-6">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Site Name</label>
                            <input
                                name="siteName"
                                defaultValue={initialSettings?.siteName || ''}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-navy focus:ring-2 focus:ring-primary-navy/20 transition-all outline-none"
                            />
                        </div>
                    </div>
                </div>

                {/* Contact Information */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-6 border-b border-gray-100 bg-gray-50/50">
                        <h2 className="text-lg font-bold text-primary-navy flex items-center">
                            <Mail className="mr-2 text-primary-gold" size={20} />
                            Contact Details
                        </h2>
                    </div>
                    <div className="p-8 space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Support Email</label>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-3.5 text-gray-400" size={18} />
                                    <input
                                        name="contactEmail"
                                        type="email"
                                        defaultValue={initialSettings?.contactEmail || ''}
                                        className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-primary-navy focus:ring-2 focus:ring-primary-navy/20 transition-all outline-none"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Phone Number</label>
                                <div className="relative">
                                    <Phone className="absolute left-4 top-3.5 text-gray-400" size={18} />
                                    <input
                                        name="contactPhone"
                                        defaultValue={initialSettings?.contactPhone || ''}
                                        className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-primary-navy focus:ring-2 focus:ring-primary-navy/20 transition-all outline-none"
                                    />
                                </div>
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Office Address</label>
                            <div className="relative">
                                <MapPin className="absolute left-4 top-3.5 text-gray-400" size={18} />
                                <textarea
                                    name="address"
                                    rows={3}
                                    defaultValue={initialSettings?.address || ''}
                                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-primary-navy focus:ring-2 focus:ring-primary-navy/20 transition-all outline-none resize-none"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Social Media */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-6 border-b border-gray-100 bg-gray-50/50">
                        <h2 className="text-lg font-bold text-primary-navy flex items-center">
                            <Facebook className="mr-2 text-primary-gold" size={20} />
                            Social Media
                        </h2>
                    </div>
                    <div className="p-8 space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Facebook URL</label>
                                <input
                                    name="facebookUrl"
                                    defaultValue={initialSettings?.facebookUrl || ''}
                                    placeholder="https://facebook.com/..."
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-navy focus:ring-2 focus:ring-primary-navy/20 transition-all outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Twitter URL</label>
                                <input
                                    name="twitterUrl"
                                    defaultValue={initialSettings?.twitterUrl || ''}
                                    placeholder="https://twitter.com/..."
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-navy focus:ring-2 focus:ring-primary-navy/20 transition-all outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Instagram URL</label>
                                <input
                                    name="instagramUrl"
                                    defaultValue={initialSettings?.instagramUrl || ''}
                                    placeholder="https://instagram.com/..."
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-navy focus:ring-2 focus:ring-primary-navy/20 transition-all outline-none"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Save Button */}
                <div className="sticky bottom-6 flex items-center justify-between bg-primary-navy text-white p-4 rounded-xl shadow-2xl shadow-primary-navy/30">
                    <p className="font-bold ml-2">
                        {message && <span className="text-green-400 animate-pulse">{message}</span>}
                    </p>
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-primary-gold text-primary-navy px-8 py-3 rounded-lg font-bold hover:bg-white transition-all transform hover:scale-105 flex items-center shadow-lg disabled:opacity-70 disabled:hover:scale-100"
                    >
                        {loading ? <Loader2 className="animate-spin mr-2" /> : <Save className="mr-2" size={18} />}
                        Save Changes
                    </button>
                </div>

            </div>
        </form>
    );
}
