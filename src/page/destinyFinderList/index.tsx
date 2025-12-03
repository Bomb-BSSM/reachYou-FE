import React, { useState } from 'react';
import * as _ from './style';
import Button from '@/components/button';
import ProfileCard from '@/components/profileCard';
import { useNavigate, useLocation } from 'react-router-dom';

interface Profile {
  id: number;
  name: string;
  mbti: string;
  imageUrl?: string;
}

interface LocationState {
  profiles?: Profile[];
}

const DestinyFinderList: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const locationState = location.state as LocationState;

  const [profiles, setProfiles] = useState<Profile[]>(
    locationState?.profiles || []
  );

  const handleEditProfile = (id: number, name: string, mbti: string) => {
    setProfiles(
      profiles.map(profile =>
        profile.id === id ? { ...profile, name, mbti } : profile
      )
    );
  };

  const handleImageChange = (id: number, imageUrl: string) => {
    setProfiles(
      profiles.map(profile =>
        profile.id === id ? { ...profile, imageUrl } : profile
      )
    );
  };

  const handleDeleteProfile = (id: number) => {
    setProfiles(profiles.filter(profile => profile.id !== id));
  };

  const handleNext = () => {
    navigate('/heart-rate-measure', { state: { profiles } });
  };

  return (
    <_.Container>
      <_.MainHeader>
        <_.HeaderTextArea>
          <_.HeaderText color="pink">Q1.</_.HeaderText>
          <_.HeaderText color="black">
            운명찾기를 진행할 사람의 정보를 입력해 주세요.
          </_.HeaderText>
        </_.HeaderTextArea>
        <Button body="다음으로" type="pink" onClick={handleNext} />
      </_.MainHeader>

      <_.ProfileCardGrid>
        {profiles.map(profile => (
          <ProfileCard
            key={profile.id}
            name={profile.name}
            mbti={profile.mbti}
            imageUrl={profile.imageUrl}
            onEdit={(name, mbti) => handleEditProfile(profile.id, name, mbti)}
            onImageChange={imageUrl => handleImageChange(profile.id, imageUrl)}
            onDelete={() => handleDeleteProfile(profile.id)}
          />
        ))}
      </_.ProfileCardGrid>
    </_.Container>
  );
};

export default DestinyFinderList;
