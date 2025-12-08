import React, { useEffect, useState } from 'react';
import * as _ from './style';
import ProfileCard from '@/components/profileCard';
import Button from '@/components/button';
import HeartBackground from '@/assets/heartBackground.svg';
import { useNavigate } from 'react-router-dom';
import { useProfiles } from '@/contexts/UserContext';
import { useCreateUserInformation } from '@/api/user/createUserInformation';

interface LocalProfile {
  id: number;
  name: string;
  mbti: string;
  imageUrl?: string;
}

const Compatibility: React.FC = () => {
  const navigate = useNavigate();
  const { addProfile, clearProfiles } = useProfiles();
  const createUserMutation = useCreateUserInformation();

  const [localProfiles, setLocalProfiles] = useState<LocalProfile[]>([
    { id: 1, name: '이름', mbti: 'ISTJ', imageUrl: '' },
    { id: 2, name: '이름', mbti: 'ISTJ', imageUrl: '' },
  ]);

  useEffect(() => {
    clearProfiles();
  }, [clearProfiles]);

  const handleEditProfile = (id: number, name: string, mbti: string) => {
    setLocalProfiles(prev =>
      prev.map(profile =>
        profile.id === id ? { ...profile, name, mbti } : profile
      )
    );
  };

  const handleImageChange = (id: number, imageUrl: string) => {
    setLocalProfiles(prev =>
      prev.map(profile =>
        profile.id === id ? { ...profile, imageUrl } : profile
      )
    );
  };

  const handleNext = () => {
    const [profile1, profile2] = localProfiles;

    createUserMutation.mutate(
      {
        username: profile1.name,
        mbti: profile1.mbti,
        profile_image_url: profile1.imageUrl || '',
      },
      {
        onSuccess: user1 => {
          if (user1) {
            addProfile({
              user_id: user1.user_id,
              username: user1.username,
              mbti: user1.mbti,
              profile_image_url: user1.profile_image_url,
            });

            createUserMutation.mutate(
              {
                username: profile2.name,
                mbti: profile2.mbti,
                profile_image_url: profile2.imageUrl || '',
              },
              {
                onSuccess: user2 => {
                  if (user2) {
                    addProfile({
                      user_id: user2.user_id,
                      username: user2.username,
                      mbti: user2.mbti,
                      profile_image_url: user2.profile_image_url,
                    });
                    navigate('/heart-rate-measure');
                  }
                },
              }
            );
          }
        },
      }
    );
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
          {localProfiles.map(profile => (
            <_.CardWrapper key={profile.id}>
              <ProfileCard
                name={profile.name}
                mbti={profile.mbti}
                imageUrl={profile.imageUrl}
                onEdit={(name, mbti) => handleEditProfile(profile.id, name, mbti)}
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
