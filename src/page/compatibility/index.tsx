import React, { useState } from 'react';
import * as _ from './style';
import ProfileCard from '@/components/profileCard';
import Button from '@/components/button';

interface Profile {
  id: number;
  name: string;
  mbti: string;
  imageUrl?: string;
}

const Compatibility: React.FC = () => {
  const [selectedProfiles] = useState<Profile[]>([
    { id: 1, name: '이름', mbti: 'MBTI' },
    { id: 2, name: '이름', mbti: 'MBTI' },
  ]);

  const handleEditProfile = (id: number) => {
    console.log('Edit profile:', id);
  };

  const handleDeleteProfile = (id: number) => {
    console.log('Delete profile:', id);
  };

  const handleNext = () => {
    console.log('Navigate to next step');
  };

  return (
    <_.Container>
      <_.HeartBackground />

      <_.MainHeader>
        <_.HeaderPink>Q1.</_.HeaderPink>
        <_.HeaderBlack>
          운명찾기를 진행할 사람의 정보를 입력해 주세요.
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
                onEdit={() => handleEditProfile(profile.id)}
                onDelete={() => handleDeleteProfile(profile.id)}
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
