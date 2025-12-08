import React, { createContext, useContext, useState, useCallback } from 'react';

export interface Profile {
  user_id: number;
  username: string;
  mbti: string;
  profile_image_url?: string;
  heartRate?: number;
  temperature?: number;
}

interface ProfilesContextType {
  profiles: Profile[];
  addProfile: (profile: Profile) => void;
  updateProfile: (userId: number, data: Partial<Profile>) => void;
  removeProfile: (userId: number) => void;
  clearProfiles: () => void;
  setAllProfiles: (profiles: Profile[]) => void;
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

  const addProfile = useCallback((profile: Profile) => {
    setProfiles(prevProfiles => {
      const updated = [...prevProfiles, profile];
      sessionStorage.setItem('profiles', JSON.stringify(updated));
      return updated;
    });
  }, []);

  const updateProfile = useCallback((userId: number, data: Partial<Profile>) => {
    setProfiles(prevProfiles => {
      const updated = prevProfiles.map(p =>
        p.user_id === userId ? { ...p, ...data } : p
      );
      sessionStorage.setItem('profiles', JSON.stringify(updated));
      return updated;
    });
  }, []);

  const removeProfile = useCallback((userId: number) => {
    setProfiles(prevProfiles => {
      const updated = prevProfiles.filter(p => p.user_id !== userId);
      sessionStorage.setItem('profiles', JSON.stringify(updated));
      return updated;
    });
  }, []);

  const clearProfiles = useCallback(() => {
    setProfiles([]);
    sessionStorage.removeItem('profiles');
  }, []);

  const setAllProfiles = useCallback((newProfiles: Profile[]) => {
    setProfiles(newProfiles);
    sessionStorage.setItem('profiles', JSON.stringify(newProfiles));
  }, []);

  return (
    <ProfilesContext.Provider
      value={{
        profiles,
        addProfile,
        updateProfile,
        removeProfile,
        clearProfiles,
        setAllProfiles,
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
