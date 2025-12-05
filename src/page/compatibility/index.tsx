import React, { useEffect } from 'react';
import * as _ from './style';
import ProfileCard from '@/components/profileCard';
import Button from '@/components/button';
import HeartBackground from '@/assets/heartBackground.svg';
import { useNavigate } from 'react-router-dom';
import { useProfiles } from '@/contexts/UserContext';

const Compatibility: React.FC = () => {
  const navigate = useNavigate();
  const { profiles, setAllProfiles, updateProfile } = useProfiles();

  // 페이지 진입 시 기본 2명의 프로필 설정
  useEffect(() => {
    if (profiles.length === 0) {
      setAllProfiles([
        { user_id: Date.now(), username: '이름', mbti: 'ISTJ', profile_image_url: '' },
        { user_id: Date.now() + 1, username: '이름', mbti: 'ISTJ', profile_image_url: '' },
      ]);
    }
  }, []);

  const handleEditProfile = (userId: number, name: string, mbti: string) => {
    updateProfile(userId, { username: name, mbti });
  };

  const handleImageChange = (userId: number, imageUrl: string) => {
    updateProfile(userId, { profile_image_url: imageUrl });
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
                  handleEditProfile(profile.user_id, name, mbti)
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
