import { useState, useRef } from 'react';
import * as _ from './style';
import Button from '@/components/button';
import Input from '@/components/input';
import Select from '@/components/select';
import ProfileCard from '@/components/profileCard';
import AddProfileIcon from '@/assets/profileAddImg.svg';
import { useNavigate } from 'react-router-dom';
import { MBTI_OPTIONS } from '@/utils/mbti';

interface Profile {
  id: number;
  name: string;
  mbti: string;
  imageUrl?: string | null;
}

const DestinyFinder = () => {
  const navigate = useNavigate();
  const [imageSrc, setImageSrc] = useState<string>('');
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [name, setName] = useState('');
  const [mbti, setMbti] = useState('');
  const imgInputRef = useRef<HTMLInputElement>(null);

  const handleAddProfile = () => {
    if (name && mbti) {
      const newProfile: Profile = {
        id: Date.now(),
        name,
        mbti,
        imageUrl: imageSrc || null,
      };
      setProfiles([...profiles, newProfile]);
      setName('');
      setMbti('');
      setImageSrc('');
    }
  };

  const handleEditProfile = (id: number, name: string, mbti: string) => {
    setProfiles(
      profiles.map(profile =>
        profile.id === id ? { ...profile, name, mbti } : profile
      )
    );
  };

  const handleImageChange = (imageUrl: string, id?: number) => {
    if (!id) {
      setImageSrc(imageUrl);
      return;
    }
    setProfiles(
      profiles.map(profile =>
        profile.id === id ? { ...profile, imageUrl } : profile
      )
    );
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.substring(0, 5) === 'image') {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageSrc(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setImageSrc('');
    }
  };

  const handleDeleteProfile = (id: number) => {
    setProfiles(profiles.filter(profile => profile.id !== id));
  };

  const handleNext = () => {
    if (profiles.length < 3) {
      alert('프로필 갯수는 최소 3개 이상입니다.');
      return;
    }
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

            <_.HiddenInput
              id="profileImgUpload"
              ref={imgInputRef}
              onChange={handleFileChange}
              accept="image/*"
            />
            <_.AddProfileImageButton htmlFor="profileImgUpload">
              {imageSrc ? (
                <_.ProfilePreviewImage src={imageSrc} alt="Profile preview" />
              ) : (
                <img src={AddProfileIcon} alt="Add profile" />
              )}
            </_.AddProfileImageButton>

            <_.InputArea>
              <Input
                placeholder="이름을 입력해주세요"
                value={name}
                maxlegth={5}
                onChange={e => setName(e.target.value)}
              />
              <Select
                placeholder="MBTI를 선택해주세요"
                value={mbti}
                onChange={e => setMbti(e.target.value)}
                options={MBTI_OPTIONS}
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
                imageUrl={profile.imageUrl || undefined}
                onEdit={(name, mbti) =>
                  handleEditProfile(profile.id, name, mbti)
                }
                onImageChange={imageUrl =>
                  handleImageChange(imageUrl, profile.id)
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
