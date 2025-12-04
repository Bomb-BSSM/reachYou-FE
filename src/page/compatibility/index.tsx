import React, { useState } from 'react';
import * as _ from './style';
import ProfileCard from '@/components/profileCard';
import Button from '@/components/button';
import HeartBackground from '@/assets/heartBackground.svg';
import { useNavigate } from 'react-router-dom';

interface Profile {
  id: number;
  name: string;
  mbti: string;
  imageUrl?: string;
}

const Compatibility: React.FC = () => {
  const [selectedProfiles, setSelectedProfiles] = useState<Profile[]>([
    { id: 1, name: '이름', mbti: 'ISTJ' },
    { id: 2, name: '이름', mbti: 'ISTJ' },
  ]);

  const handleEditProfile = (id: number, name: string, mbti: string) => {
    setSelectedProfiles(
      selectedProfiles.map(profile =>
        profile.id === id ? { ...profile, name, mbti } : profile
      )
    );
  };

  const handleImageChange = (id: number, imageUrl: string) => {
    setSelectedProfiles(
      selectedProfiles.map(profile =>
        profile.id === id ? { ...profile, imageUrl } : profile
      )
    );
  };

  const navigate = useNavigate();

  const handleNext = () => {
    navigate('/heart-rate-measure', {
      state: {
        profiles: selectedProfiles,
      },
    });
  };

  return (
    <_.Container>
      <_.HeartBackground src={HeartBackground} />

      <_.MainHeader>
        <_.HeaderPink>Q1.</_.HeaderPink>
        <_.HeaderBlack>
          궁합을 진행할 사람의 정보를 입력해 주세요.
        </_.HeaderBlack>
      </_.MainHeader>

      <_.MainContent>
        <_.CardArea>
          {selectedProfiles.map(profile => (
            <_.CardWrapper key={profile.id}>
              <ProfileCard
                name={profile.name}
                mbti={profile.mbti}
                imageUrl={profile.imageUrl}
                onEdit={(name, mbti) =>
                  handleEditProfile(profile.id, name, mbti)
                }
                onImageChange={imageUrl =>
                  handleImageChange(profile.id, imageUrl)
                }
              />
            </_.CardWrapper>
          ))}
        </_.CardArea>

        <_.NextButton>
          <Button body="다음으로" type="pink" onClick={handleNext} />
        </_.NextButton>
      </_.MainContent>
    </_.Container>
  );
};

export default Compatibility;
