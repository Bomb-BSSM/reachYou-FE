import { useState, useRef, useEffect } from 'react';
import * as _ from './style';
import Button from '@/components/button';
import Input from '@/components/input';
import Select from '@/components/select';
import ProfileCard from '@/components/profileCard';
import AddProfileIcon from '@/assets/profileAddImg.svg';
import { useNavigate } from 'react-router-dom';
import { MBTI_OPTIONS } from '@/utils/mbti';
import { useCreateUserInformation } from '@/api/user/createUserInformation';
import { useUpdateUserInformation } from '@/api/user/updateUserInformation';
import { useDeleteUserInformation } from '@/api/user/deleteUserInformation';
import { useProfiles } from '@/contexts/UserContext';
import { useAlert } from '@/contexts/AlertContext';

const DestinyFinder = () => {
  const { profiles, addProfile, updateProfile, removeProfile, clearProfiles } = useProfiles();

  const navigate = useNavigate();
  const [imageSrc, setImageSrc] = useState<string>('');
  const [name, setName] = useState('');
  const [mbti, setMbti] = useState('');
  const imgInputRef = useRef<HTMLInputElement>(null);
  const createUserMutation = useCreateUserInformation();
  const updateUserMutation = useUpdateUserInformation();
  const deleteUserMutation = useDeleteUserInformation();
  const { showAlert } = useAlert();

  useEffect(() => {
    clearProfiles();
    // 운명찾기 처음 페이지로 돌아오면 결과 계산 플래그도 초기화
    sessionStorage.removeItem('destiny_result_calculated');
  }, []);

  const handleAddProfile = () => {
    if (profiles.length >= 8) {
      showAlert('프로필의 최대 개수는 8개 입니다.');
      setName('');
      setMbti('');
      setImageSrc('');
      return;
    }
    if (name && mbti) {
      createUserMutation.mutate(
        {
          username: name,
          mbti: mbti,
          profile_image_url: imageSrc,
        },
        {
          onSuccess: user => {
            if (user) {
              addProfile({
                user_id: user.user_id,
                username: user.username,
                mbti: user.mbti,
                profile_image_url: user.profile_image_url,
              });
            }
            setName('');
            setMbti('');
            setImageSrc('');
          },
        }
      );
    }
  };

  const handleEditProfile = (
    userId: number,
    name: string,
    mbti: string,
    profileImg?: string
  ) => {
    updateUserMutation.mutate({
      user_id: userId,
      username: name,
      mbti: mbti,
      profile_image_url: profileImg,
    });
    updateProfile(userId, {
      username: name,
      mbti,
      profile_image_url: profileImg,
    });
  };

  const handleImageChange = (imageUrl: string, userId?: number) => {
    if (!userId) {
      setImageSrc(imageUrl);
      return;
    }
    updateProfile(userId, { profile_image_url: imageUrl });
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

  const handleDeleteProfile = (userId: number) => {
    deleteUserMutation.mutate(
      { user_id: userId },
      {
        onSuccess: () => removeProfile(userId),
        onError: () => showAlert('프로필이 삭제 되지 않았습니다.'),
      }
    );
  };

  const handleNext = () => {
    if (profiles.length < 3) {
      showAlert('프로필 갯수는 최소 3개 이상입니다.');
      return;
    }
    navigate('/destiny-finder/list');
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
                key={profile.user_id}
                name={profile.username}
                mbti={profile.mbti}
                imageUrl={profile.profile_image_url || undefined}
                onEdit={(name, mbti) =>
                  handleEditProfile(
                    profile.user_id,
                    name,
                    mbti,
                    profile.profile_image_url
                  )
                }
                onImageChange={imageUrl =>
                  handleImageChange(imageUrl, profile.user_id)
                }
                onDelete={() => handleDeleteProfile(profile.user_id)}
              />
            ))}
          </_.ProfileCardGrid>
        </_.MainContentDiv>
      </_.ContentWrapper>
    </_.Container>
  );
};

export default DestinyFinder;
