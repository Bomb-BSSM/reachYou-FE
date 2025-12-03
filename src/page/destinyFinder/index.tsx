import React, { useState } from 'react';
import * as _ from './style';
import Button from '@/components/button';
import Input from '@/components/input';
import ProfileCard from '@/components/profileCard';
import AddProfileIcon from '@/assets/profileAddImg.svg';
import { useNavigate } from 'react-router-dom';

interface Profile {
  id: number;
  name: string;
  mbti: string;
  imageUrl?: string;
}

const DestinyFinder: React.FC = () => {
  const navigate = useNavigate();
  const [profiles, setProfiles] = useState<Profile[]>([
    { id: 1, name: '이원희', mbti: 'MBTI', imageUrl: undefined },
  ]);
  const [name, setName] = useState('');
  const [mbti, setMbti] = useState('');

  const handleAddProfile = () => {
    if (name && mbti) {
      const newProfile: Profile = {
        id: Date.now(),
        name,
        mbti,
      };
      setProfiles([...profiles, newProfile]);
      setName('');
      setMbti('');
    }
  };

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
    navigate('/destiny-finder/list', { state: { profiles } });
  };

  return (
    <_.Container>
      <_.ContentWrapper>
        <_.HeaderArea>
          <_.HeaderTextArea>
            <_.HeaderText color="pink">Q1.</_.HeaderText>
            <_.HeaderText color="black">
              운명찾기를 진행할 사람의 정보를 입력해 주세요.
            </_.HeaderText>
          </_.HeaderTextArea>
          <Button body="다음으로" type="pink" onClick={handleNext} />
        </_.HeaderArea>

        <_.MainContentDiv>
          <_.AddProfileDiv>
            <_.ProfileHeadText>
              <_.ProfileHeadTitle>프로필 작성</_.ProfileHeadTitle>
              <_.ProfileCount>{profiles.length} / 8</_.ProfileCount>
            </_.ProfileHeadText>

            <_.AddProfileImageButton>
              <img src={AddProfileIcon} />
            </_.AddProfileImageButton>

            <_.InputArea>
              <Input
                placeholder="이름을 입력해주세요"
                value={name}
                onChange={e => setName(e.target.value)}
              />
              <Input
                placeholder="MBTI를 입력해주세요"
                value={mbti}
                onChange={e => setMbti(e.target.value)}
              />
            </_.InputArea>

            <_.AddButtonWrapper>
              <Button body="추가하기" type="pink" onClick={handleAddProfile} />
            </_.AddButtonWrapper>
          </_.AddProfileDiv>

          <_.ProfileCardGrid>
            {profiles.map(profile => (
              <ProfileCard
                key={profile.id}
                name={profile.name}
                mbti={profile.mbti}
                imageUrl={profile.imageUrl}
                onEdit={(name, mbti) =>
                  handleEditProfile(profile.id, name, mbti)
                }
                onImageChange={(imageUrl) =>
                  handleImageChange(profile.id, imageUrl)
                }
                onDelete={() => handleDeleteProfile(profile.id)}
              />
            ))}
          </_.ProfileCardGrid>
        </_.MainContentDiv>
      </_.ContentWrapper>
    </_.Container>
  );
};

export default DestinyFinder;
