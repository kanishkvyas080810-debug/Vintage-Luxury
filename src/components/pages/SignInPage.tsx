import React, { useState } from 'react';
import { BRAND_LOGO_URL } from '../../data/products';

interface SignInPageProps {
  currentUser: { name: string; isLoggedIn: boolean } | null;
  onLogin: (name: string) => void;
  onLogout: () => void;
  onBackToShop: () => void;
}

export const SignInPage: React.FC<SignInPageProps> = ({
  currentUser,
  onLogin,
  onLogout,
  onBackToShop
}) => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Please enter your name.');
      return;
    }
    if (!password.trim() || password.length < 4) {
      setError('Password must be at least 4 characters.');
      return;
    }

    setError(null);
    setSuccessMsg(isRegistering ? `Welcome to Series VL-01, ${name.trim()}!` : `Signed in successfully as ${name.trim()}!`);
    onLogin(name.trim());
  };

  return (
    <div className="w-full pt-24 pb-20 px-4 sm:px-6 md:px-12 max-w-xl mx-auto flex flex-col gap-8">
      {/* Top Breadcrumb */}
      <div className="flex items-center justify-between border-b border-[#432F2E]/10 pb-4">
        <button
          onClick={onBackToShop}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#432F2E] hover:text-[#C85A32] transition-colors cursor-pointer"
        >
          <span className="material-symbols-outlined text-[18px]">arrow_back</span>
          <span>Back to Home &amp; Shop</span>
        </button>

        <span className="text-[11px] font-mono text-[#C85A32] font-bold uppercase tracking-wider">
          MEMBER ACCESS • VL-01
        </span>
      </div>

      {/* Main Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#432F2E]/10 shadow-xl flex flex-col gap-6">
        {/* Brand Emblem */}
        <div className="flex items-center gap-3">
          <img
            src={BRAND_LOGO_URL}
            alt="Vintage Legacy Logo"
            className="w-10 h-10 object-contain"
          />
          <div>
            <h2 className="font-display font-extrabold text-2xl text-[#432F2E]">
              {currentUser?.isLoggedIn ? 'Member Profile' : (isRegistering ? 'Create Member Pass' : 'Sign In')}
            </h2>
            <p className="text-xs text-[#432F2E]/60">
              Vintage Legacy Atelier • 240 GSM Streetwear
            </p>
          </div>
        </div>

        {/* If already signed in */}
        {currentUser?.isLoggedIn ? (
          <div className="flex flex-col gap-5 pt-2">
            <div className="bg-[#FCF8ED] p-5 rounded-2xl border border-[#432F2E]/10 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold uppercase text-[#C85A32]">
                  ACTIVE MEMBERSHIP
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-[#22c55e]/15 text-[#22c55e] text-[10px] font-extrabold uppercase">
                  Verified
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[#432F2E] text-[#FEEFB8] font-display font-bold text-xl flex items-center justify-center">
                  {currentUser.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg text-[#432F2E]">
                    {currentUser.name}
                  </h3>
                  <p className="text-xs text-[#432F2E]/60">
                    Series VL-01 Early Drop Allocation Granted
                  </p>
                </div>
              </div>

              <div className="pt-2 border-t border-[#432F2E]/8 grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-[#432F2E]/50 block">Tier</span>
                  <span className="font-bold text-[#432F2E]">Founder Pass</span>
                </div>
                <div>
                  <span className="text-[#432F2E]/50 block">Dispatch Speed</span>
                  <span className="font-bold text-[#432F2E]">48-Hour Air Express</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={onBackToShop}
                className="flex-1 py-3.5 bg-[#432F2E] hover:bg-[#C85A32] text-[#FEEFB8] font-bold text-xs uppercase tracking-wider rounded-full transition-colors cursor-pointer text-center"
              >
                Continue Shopping
              </button>
              <button
                onClick={onLogout}
                className="py-3.5 px-6 bg-[#FCF8ED] hover:bg-[#ba1a1a]/10 hover:text-[#ba1a1a] text-[#432F2E] font-bold text-xs uppercase tracking-wider rounded-full border border-[#432F2E]/15 transition-colors cursor-pointer"
              >
                Sign Out
              </button>
            </div>
          </div>
        ) : (
          /* Sign In / Register Form */
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {error && (
              <div className="bg-[#ba1a1a]/10 text-[#ba1a1a] px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2">
                <span className="material-symbols-outlined text-[16px]">error</span>
                <span>{error}</span>
              </div>
            )}

            {successMsg && (
              <div className="bg-[#22c55e]/10 text-[#22c55e] px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2">
                <span className="material-symbols-outlined text-[16px]">check_circle</span>
                <span>{successMsg}</span>
              </div>
            )}

            {/* Name Input */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-[#432F2E] uppercase">
                Your Name:
              </label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Enter your full name or handle"
                className="w-full bg-[#FCF8ED] px-4 py-3 rounded-xl border border-[#432F2E]/15 text-sm font-semibold text-[#432F2E] placeholder:text-[#432F2E]/40 focus:outline-none focus:ring-2 focus:ring-[#C85A32]"
              />
            </div>

            {/* Password Input */}
            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold text-[#432F2E] uppercase">
                  Password:
                </label>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-[11px] font-semibold text-[#C85A32] hover:underline cursor-pointer"
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full bg-[#FCF8ED] px-4 py-3 rounded-xl border border-[#432F2E]/15 text-sm font-semibold text-[#432F2E] placeholder:text-[#432F2E]/40 focus:outline-none focus:ring-2 focus:ring-[#C85A32]"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="mt-2 w-full py-4 bg-[#432F2E] hover:bg-[#C85A32] text-[#FEEFB8] font-bold text-xs uppercase tracking-wider rounded-full shadow-lg transition-transform active:scale-95 cursor-pointer"
            >
              {isRegistering ? 'CREATE MEMBER ACCOUNT' : 'SIGN IN TO VINTAGE LEGACY'}
            </button>

            {/* Toggle Sign In / Create Account */}
            <div className="pt-2 text-center text-xs text-[#432F2E]/70">
              {isRegistering ? (
                <p>
                  Already registered?{' '}
                  <button
                    type="button"
                    onClick={() => {
                      setIsRegistering(false);
                      setError(null);
                    }}
                    className="font-bold text-[#C85A32] hover:underline cursor-pointer ml-1"
                  >
                    Sign In
                  </button>
                </p>
              ) : (
                <p>
                  New to Vintage Legacy?{' '}
                  <button
                    type="button"
                    onClick={() => {
                      setIsRegistering(true);
                      setError(null);
                    }}
                    className="font-bold text-[#C85A32] hover:underline cursor-pointer ml-1"
                  >
                    Create Member Pass
                  </button>
                </p>
              )}
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
