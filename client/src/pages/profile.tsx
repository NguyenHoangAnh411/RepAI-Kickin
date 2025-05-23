import React from "react";
import { usePrivy } from '@privy-io/react-auth';
import { useGuestUserContext } from "@/contexts/GuestUserContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Profile() {
  const { user, ready, authenticated } = usePrivy();
  const { guestUser } = useGuestUserContext();

  const getAvatarUrl = () => {
    if (guestUser?.avatar) return guestUser.avatar;
    if (user && 'picture' in user && user.picture) return user.picture as string;
    if (user && 'avatar' in user && user.avatar) return user.avatar as string;
    return undefined;
  };

  const displayName = user?.email?.address?.split('@')[0] || user?.wallet?.address?.slice(0, 6) || guestUser?.name || 'Guest';

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-10 max-w-xl">
        <div className="bg-white rounded-xl shadow-md p-8 flex flex-col items-center">
          <div className="w-24 h-24 rounded-full border-4 border-primary overflow-hidden mb-4">
            {getAvatarUrl() ? (
              <img src={getAvatarUrl()} alt="Avatar" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-primary flex items-center justify-center text-white text-3xl font-bold">
                {displayName[0]?.toUpperCase()}
              </div>
            )}
          </div>
          <h2 className="text-2xl font-bold text-slate-800 mb-1">{displayName}</h2>
          <p className="text-slate-500 mb-4">
            {user?.email?.address || user?.wallet?.address || guestUser?.user_type === 'guest' ? 'Guest User' : ''}
          </p>

          <div className="w-full space-y-3 mt-4">
            <div className="flex justify-between text-slate-700">
              <span className="font-medium">Account Type:</span>
              <span>{guestUser?.user_type === 'guest' ? 'Guest' : 'Privy'}</span>
            </div>
            <div className="flex justify-between text-slate-700">
              <span className="font-medium">Email:</span>
              <span>{user?.email?.address || 'N/A'}</span>
            </div>
            <div className="flex justify-between text-slate-700">
              <span className="font-medium">Wallet:</span>
              <span>{user?.wallet?.address || 'N/A'}</span>
            </div>
            <div className="flex justify-between text-slate-700">
              <span className="font-medium">Total Matches:</span>
              <span>{guestUser?.total_matches ?? guestUser?.match_history?.length ?? 0}</span>
            </div>
            <div className="flex justify-between text-slate-700">
              <span className="font-medium">Points:</span>
              <span>{guestUser?.point ?? 0}</span>
            </div>
            <div className="flex justify-between text-slate-700">
              <span className="font-medium">Wins:</span>
              <span>{guestUser?.wins ?? 0}</span>
            </div>
            <div className="flex justify-between text-slate-700">
              <span className="font-medium">Losses:</span>
              <span>{guestUser?.losses ?? 0}</span>
            </div>
          </div>
        </div>
        {!authenticated && (
          <div className="mt-8 text-center text-slate-500">
            <p>Please connect your account to view and edit your profile.</p>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
} 