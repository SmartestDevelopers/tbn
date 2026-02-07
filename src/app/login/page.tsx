'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Loader2, ArrowRight, ShieldCheck } from 'lucide-react';
import { FloatingLabelInput } from '@/components/ui/FloatingLabelInput';

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            const result = await signIn('credentials', {
                email,
                password,
                redirect: false,
            });

            if (result?.error) {
                setError('Invalid credentials. Please try again.');
            } else {
                router.push('/admin');
            }
        } catch (err) {
            setError('An unexpected error occurred.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen w-full flex bg-white overflow-hidden">
            {/* Left Side - Beauty Image (Hidden on Mobile) */}
            <div className="hidden lg:block lg:w-1/2 relative bg-primary-navy overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-navy/80 to-primary-navy/40 z-10" />
                <Image
                    src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1600"
                    alt="Premium Office"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 z-20 flex flex-col justify-between p-16 text-white">
                    <div className="w-32 h-32 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center p-4">
                        <Image
                            src="https://img1.wsimg.com/isteam/ip/229ea690-42c2-4058-a5c9-f993ebb37281/blob.png/:/rs=h:265,cg:true,m/qt=q:100/ll"
                            alt="Logo"
                            width={100}
                            height={100}
                            className="object-contain"
                        />
                    </div>
                    <div className="space-y-6">
                        <h1 className="text-5xl font-bold leading-tight">
                            Secure Access.<br />
                            <span className="text-primary-gold">Global Reach.</span>
                        </h1>
                        <p className="text-lg text-white/80 max-w-md">
                            Welcome back to The Global Notariat command center. Manage your services with confidence and ease.
                        </p>
                    </div>
                </div>

                {/* Decorative Circles */}
                <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-primary-gold/20 rounded-full blur-3xl z-10" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-white/5 rounded-full z-0" />
            </div>

            {/* Right Side - Login Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-24 relative">
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="w-full max-w-md space-y-8"
                >
                    <div className="text-center lg:text-left mb-12">
                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary-gold/10 text-primary-gold mb-6 lg:ml-0">
                            <ShieldCheck size={24} />
                        </div>
                        <h2 className="text-3xl font-bold text-primary-navy">Admin Portal</h2>
                        <p className="text-gray-500 mt-2">Please sign in to continue.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-6">
                            <FloatingLabelInput
                                label="Email Address"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <FloatingLabelInput
                                label="Password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        {error && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="p-4 rounded-xl bg-red-50 text-red-600 text-sm font-medium border border-red-100 flex items-center"
                            >
                                <div className="w-1.5 h-1.5 rounded-full bg-red-500 mr-2" />
                                {error}
                            </motion.div>
                        )}

                        <div className="flex items-center justify-between text-sm">
                            <label className="flex items-center space-x-2 cursor-pointer group">
                                <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-primary-gold focus:ring-primary-gold" />
                                <span className="text-gray-500 group-hover:text-primary-navy transition-colors">Remember me</span>
                            </label>
                            <a href="#" className="font-semibold text-primary-gold hover:text-primary-navy transition-colors">Forgot Password?</a>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-primary-navy text-white py-5 rounded-xl font-bold flex items-center justify-center space-x-2 hover:bg-primary-gold transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1 disabled:opacity-70 disabled:hover:translate-y-0"
                        >
                            {isLoading ? (
                                <Loader2 className="animate-spin" />
                            ) : (
                                <>
                                    <span>Sign In</span>
                                    <ArrowRight size={20} />
                                </>
                            )}
                        </button>
                    </form>

                    <p className="text-center text-sm text-gray-400 mt-8">
                        Protected by reCAPTCHA and Subject to the <a href="#" className="underline hover:text-primary-navy">Privacy Policy</a>
                    </p>
                </motion.div>
            </div>
        </div>
    );
}
