'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import LunoLogo from '@/components/LunoLogo';
import Link from 'next/link';

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

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
                setError('Invalid credentials');
            } else {
                router.push('/');
                router.refresh();
            }
        } catch {
            setError('Something went wrong. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="auth-container" style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            width: '100vw',
            background: 'radial-gradient(ellipse 80% 50% at 50% 50%, rgba(20, 184, 166, 0.1), transparent), var(--bg-base)',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Ambient background effects */}
            <div style={{
                position: 'absolute',
                top: '-10%',
                left: '-10%',
                width: '40%',
                height: '40%',
                background: 'var(--luno-primary)',
                filter: 'blur(150px)',
                opacity: 0.1,
                borderRadius: '50%'
            }} />
            <div style={{
                position: 'absolute',
                bottom: '-10%',
                right: '-10%',
                width: '40%',
                height: '40%',
                background: 'var(--luno-accent)',
                filter: 'blur(150px)',
                opacity: 0.1,
                borderRadius: '50%'
            }} />

            <div className="auth-card" style={{
                width: '100%',
                maxWidth: '420px',
                padding: 'var(--space-2xl)',
                background: 'rgba(20, 20, 32, 0.6)',
                backdropFilter: 'blur(20px)',
                borderRadius: 'var(--radius-xl)',
                border: '1px solid var(--glass-border)',
                boxShadow: 'var(--shadow-card)',
                animation: 'slideUp 0.5s ease-out'
            }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 'var(--space-xl)' }}>
                    <LunoLogo size={60} showText={true} />
                    <h2 style={{
                        marginTop: 'var(--space-lg)',
                        fontSize: '24px',
                        fontWeight: 700,
                        color: 'var(--text-primary)'
                    }}>Welcome Back!</h2>
                    <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>
                        We&apos;re so excited to see you again!
                    </p>
                </div>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-lg)' }}>
                    <div>
                        <label className="input-label" htmlFor="email">Email</label>
                        <input
                            id="email"
                            type="email"
                            className="input"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder="user@luno.gg"
                        />
                    </div>

                    <div>
                        <label className="input-label" htmlFor="password">Password</label>
                        <input
                            id="password"
                            type="password"
                            className="input"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder="••••••••"
                        />
                    </div>

                    {error && (
                        <div style={{
                            color: 'var(--luno-danger)',
                            fontSize: '13px',
                            textAlign: 'center',
                            padding: 'var(--space-sm)',
                            background: 'rgba(239, 68, 68, 0.1)',
                            borderRadius: 'var(--radius-sm)'
                        }}>
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        className="btn btn-primary"
                        style={{ width: '100%', justifyContent: 'center', height: '44px' }}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <div className="loading-spinner" style={{ width: '20px', height: '20px' }} />
                        ) : (
                            'Log In'
                        )}
                    </button>
                </form>

                <div style={{ marginTop: 'var(--space-lg)', textAlign: 'center', fontSize: '14px', color: 'var(--text-secondary)' }}>
                    Need an account?{' '}
                    <Link href="/register" style={{ color: 'var(--luno-primary)', fontWeight: 600, textDecoration: 'none' }} className="hover:underline">
                        Register
                    </Link>
                </div>
            </div>
        </div>
    );
}
