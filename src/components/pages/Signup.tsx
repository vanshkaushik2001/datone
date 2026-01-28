import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Lock } from 'lucide-react';
import type { CurrentUser } from '../../types/collab';
import { supabase } from '../../lib/supabase-client';

interface SignupProps {
  onComplete: (user: CurrentUser) => void;
}

export function Signup({ onComplete }: SignupProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [signupMethod, setSignupMethod] = useState<'email' | 'google' | null>(null);

  const handleEmailSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (!email || !email.includes('@')) {
        setError('Please enter a valid email');
        setLoading(false);
        return;
      }

      if (password.length < 6) {
        setError('Password must be at least 6 characters');
        setLoading(false);
        return;
      }

      if (password !== confirmPassword) {
        setError('Passwords do not match');
        setLoading(false);
        return;
      }

      // Sign up with Supabase
      const { data, error: signupError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (signupError) {
        setError(signupError.message);
        setLoading(false);
        return;
      }

      if (data.user) {
        onComplete({
          email: data.user.email || email,
          profileCompleted: false,
          id: data.user.id,
        });
      }
    } catch (err) {
      console.error('Signup error:', err);
      setError('An unexpected error occurred');
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    setError('');
    setLoading(true);

    try {
      const { data, error: googleError } = await supabase.auth.signInWithOAuth({
        provider: 'google',
      });

      if (googleError) {
        setError(googleError.message);
        setLoading(false);
        return;
      }

      // Google sign-in redirects, so the onComplete will be called on redirect
      // For now, we'll handle it in the useEffect in App.tsx
    } catch (err) {
      console.error('Google signup error:', err);
      setError('Failed to sign in with Google');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-20 px-6 md:px-12 lg:px-20 bg-gradient-to-b from-[#082F49] to-[#0a3a5a]">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-md mx-auto"
      >
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-4">
            <Mail size={48} className="text-[#FFE3A5]" />
            <h1 className="text-5xl md:text-6xl font-black text-[#FFE3A5] uppercase tracking-tight">
              Sign Up
            </h1>
          </div>
          <p className="text-[#A9B2AC] text-lg">
            Join DATONE - Create your artist profile
          </p>
        </div>

        {!signupMethod ? (
          <div className="space-y-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="button"
              onClick={() => setSignupMethod('email')}
              className="w-full px-4 py-3 bg-[#FFE3A5] text-[#082F49] font-black uppercase text-sm hover:bg-[#4A0807] hover:text-[#FFE3A5] transition-all"
            >
              Create Account with Email
            </motion.button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#FFE3A5]/20"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-[#0a3a5a] text-[#A9B2AC]">or</span>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="button"
              onClick={handleGoogleSignup}
              disabled={loading}
              className="w-full px-4 py-3 bg-white text-[#082F49] font-black uppercase text-sm hover:bg-gray-200 transition-all disabled:opacity-50"
            >
              {loading ? 'Signing in...' : 'Sign in with Google'}
            </motion.button>
          </div>
        ) : (
          <>
            <form onSubmit={handleEmailSignup} className="space-y-6">
              <div>
                <label className="block text-[#FFE3A5] font-bold mb-2 uppercase text-sm">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError('');
                  }}
                  placeholder="your@email.com"
                  disabled={loading}
                  className="w-full bg-[#0a3a5a] border border-[#FFE3A5]/20 text-[#FFE3A5] placeholder-[#A9B2AC] px-4 py-3 focus:outline-none focus:border-[#FFE3A5] transition-colors disabled:opacity-50"
                />
              </div>

              <div>
                <label className="block text-[#FFE3A5] font-bold mb-2 uppercase text-sm flex items-center gap-2">
                  <Lock size={16} />
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError('');
                  }}
                  placeholder="Min. 6 characters"
                  disabled={loading}
                  className="w-full bg-[#0a3a5a] border border-[#FFE3A5]/20 text-[#FFE3A5] placeholder-[#A9B2AC] px-4 py-3 focus:outline-none focus:border-[#FFE3A5] transition-colors disabled:opacity-50"
                />
              </div>

              <div>
                <label className="block text-[#FFE3A5] font-bold mb-2 uppercase text-sm flex items-center gap-2">
                  <Lock size={16} />
                  Confirm Password
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    setError('');
                  }}
                  placeholder="Re-enter password"
                  disabled={loading}
                  className="w-full bg-[#0a3a5a] border border-[#FFE3A5]/20 text-[#FFE3A5] placeholder-[#A9B2AC] px-4 py-3 focus:outline-none focus:border-[#FFE3A5] transition-colors disabled:opacity-50"
                />
              </div>

              {error && <p className="text-red-400 text-sm font-bold">{error}</p>}

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                disabled={loading}
                className="w-full px-4 py-3 bg-[#FFE3A5] text-[#082F49] font-black uppercase text-sm hover:bg-[#4A0807] hover:text-[#FFE3A5] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Creating Account...' : 'Create DATONE Account'}
              </motion.button>

              <button
                type="button"
                onClick={() => {
                  setSignupMethod(null);
                  setEmail('');
                  setPassword('');
                  setConfirmPassword('');
                  setError('');
                }}
                disabled={loading}
                className="w-full text-[#A9B2AC] hover:text-[#FFE3A5] text-sm font-bold uppercase transition-colors disabled:opacity-50"
              >
                Back
              </button>
            </form>
          </>
        )}
      </motion.div>
    </div>
  );
}
