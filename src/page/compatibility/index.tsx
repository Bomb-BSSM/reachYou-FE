import React, { useEffect } from 'react';
import * as _ from './style';
import ProfileCard from '@/components/profileCard';
import Button from '@/components/button';
import HeartBackground from '@/assets/heartBackground.svg';
import { useNavigate } from 'react-router-dom';
import { useProfiles } from '@/contexts/UserContext';
import { useCreateUserInformation } from '@/api/user/createUserInformation';
import { useUpdateUserInformation } from '@/api/user/updateUserInformation';

const Compatibility: React.FC = () => {
  const navigate = useNavigate();
  const { profiles, updateProfile, addProfile, clearProfiles } = useProfiles();
  const createUserMutation = useCreateUserInformation();
  const updateUserMutation = useUpdateUserInformation();

  // 페이지 진입 시 기존 프로필 삭제 및 기본 2명의 프로필 생성
  useEffect(() => {
    clearProfiles();

    // 첫 번째 사용자 생성
    createUserMutation.mutate(
      {
        username: '이름',
        mbti: 'ISTJ',
        profile_image_url: '',
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

            // 두 번째 사용자 생성
            createUserMutation.mutate(
              {
                username: '이름',
                mbti: 'ISTJ',
                profile_image_url: '',
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
                  }
                },
              }
            );
          }
        },
      }
    );
  }, []);

  const handleEditProfile = (userId: number, name: string, mbti: string, profileImg?: string) => {
    updateUserMutation.mutate({
      user_id: userId,
      username: name,
      mbti: mbti,
      profile_image_url: profileImg,
    });
    updateProfile(userId, { username: name, mbti, profile_image_url: profileImg });
  };

  const handleImageChange = (userId: number, imageUrl: string) => {
    const profile = profiles.find(p => p.user_id === userId);
    if (profile) {
      updateUserMutation.mutate({
        user_id: userId,
        username: profile.username,
        mbti: profile.mbti,
        profile_image_url: imageUrl,
      });
      updateProfile(userId, { profile_image_url: imageUrl });
    }
  };

  const handleNext = () => {
    navigate('/heart-rate-measure');
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
          {profiles.slice(0, 2).map(profile => (
            <_.CardWrapper key={profile.user_id}>
              <ProfileCard
                name={profile.username}
                mbti={profile.mbti}
                imageUrl={profile.profile_image_url}
                onEdit={(name, mbti) =>
                  handleEditProfile(
                    profile.user_id,
                    name,
                    mbti,
                    profile.profile_image_url
                  )
                }
                onImageChange={imageUrl =>
                  handleImageChange(profile.user_id, imageUrl)
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
