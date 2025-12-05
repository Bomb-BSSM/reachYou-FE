import React, { createContext, useContext, useState } from 'react';

export interface Profile {
  user_id: number;
  username: string;
  mbti: string;
  profile_image_url?: string;
  temprature?: number;
}

interface ProfilesContextType {
  profiles: Profile[];
  addProfile: (profile: Profile) => void;
  updateProfile: (userId: number, data: Partial<Profile>) => void;
  removeProfile: (userId: number) => void;
  clearProfiles: () => void;
}

const ProfilesContext = createContext<ProfilesContextType | undefined>(
  undefined
);

export const ProfilesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [profiles, setProfiles] = useState<Profile[]>(() => {
    const saved = sessionStorage.getItem('profiles');
    return saved ? JSON.parse(saved) : [];
  });

  const addProfile = (profile: Profile) => {
    const updated = [...profiles, profile];
    setProfiles(updated);
    sessionStorage.setItem('profiles', JSON.stringify(updated));
  };

  const updateProfile = (userId: number, data: Partial<Profile>) => {
    const updated = profiles.map(p =>
      p.user_id === userId ? { ...p, ...data } : p
    );
    setProfiles(updated);
    sessionStorage.setItem('profiles', JSON.stringify(updated));
  };

  const removeProfile = (userId: number) => {
    const updated = profiles.filter(p => p.user_id !== userId);
    setProfiles(updated);
    sessionStorage.setItem('profiles', JSON.stringify(updated));
  };

  const clearProfiles = () => {
    setProfiles([]);
    sessionStorage.removeItem('profiles');
  };

  return (
    <ProfilesContext.Provider
      value={{
        profiles,
        addProfile,
        updateProfile,
        removeProfile,
        clearProfiles,
      }}
    >
      {children}
    </ProfilesContext.Provider>
  );
};

export const useProfiles = () => {
  const context = useContext(ProfilesContext);
  if (!context) {
    throw new Error('useProfiles must be within ProfilesProvider');
  }
  return context;
};
