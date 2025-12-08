import React, { useEffect, useState } from 'react';
import * as _ from './style';
import Button from '@/components/button';
import NormalPofileImg from '@/assets/normalProfileImg.svg';
import HeartBackground from '@/assets/heartBackground.svg';
import { useNavigate } from 'react-router-dom';
import { useProfiles } from '@/contexts/UserContext';
import { useCalculateCompatibility } from '@/api/compatibility/calculateCompatibility';
import LoadingSpinner from '@/components/loadingSpinner';
import { useAlert } from '@/contexts/AlertContext';

const Result: React.FC = () => {
  const navigate = useNavigate();
  const { profiles, clearProfiles } = useProfiles();
  const { showAlert } = useAlert();
  const calculateCompatibilityMutation = useCalculateCompatibility();

  const [compatibilityData, setCompatibilityData] = useState<{
    total_score: number;
    mbti_score: number;
    heart_rate_score: number;
    temperature_score: number;
  } | null>(null);

  const profile1 = profiles[0];
  const profile2 = profiles[1];

  useEffect(() => {
    if (!profile1 || !profile2) {
      showAlert(
        '프로필 정보를 찾을 수 없습니다.',
        '처음부터 다시 시작해주세요.',
        () => {
          navigate('/');
        }
      );
      return;
    }

    calculateCompatibilityMutation.mutate(
      {
        user_id_1: profile1.user_id,
        user_id_2: profile2.user_id,
      },
      {
        onSuccess: response => {
          setCompatibilityData(response.data.compatibility);
        },
        onError: () => {
          showAlert(
            '궁합 계산에 실패했습니다.',
            '잠시 후 다시 시도해주세요.',
            () => {
              navigate('/');
            }
          );
        },
      }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleBack = () => {
    clearProfiles(); // 전역 상태 초기화
    navigate('/');
  };

  const handleConfess = () => {
    if (!compatibilityData || !profile1 || !profile2) return;

    navigate('/propose', {
      state: {
        origin: 'compatibility',
        proposerId: profile1.user_id,
        proposerName: profile1.username,
        proposerMbti: profile1.mbti,
        proposerImage: profile1.profile_image_url || NormalPofileImg,
        receiverId: profile2.user_id,
        receiverName: profile2.username,
        receiverMbti: profile2.mbti,
        receiverImage: profile2.profile_image_url || NormalPofileImg,
        compatibilityScore: compatibilityData.total_score,
        heartRateCompatibility: compatibilityData.heart_rate_score,
        temperatureCompatibility: compatibilityData.temperature_score,
        mbtiCompatibility: compatibilityData.mbti_score,
      },
    });
  };

  if (
    calculateCompatibilityMutation.isPending ||
    !compatibilityData ||
    !profile1 ||
    !profile2
  ) {
    return (
      <_.Container>
        <_.HeartBackground src={HeartBackground} />
        <_.LoadingContainer>
          <LoadingSpinner size={60} />
          <_.LoadingText>궁합 계산 중...</_.LoadingText>
        </_.LoadingContainer>
      </_.Container>
    );
  }

  return (
    <_.Container>
      <_.HeartBackground src={HeartBackground} />

      <_.ContentWrapper>
        <_.MainHeader>
          <_.HeaderTextArea>
            <_.HeaderPink>결과</_.HeaderPink>
            <_.HeaderTitle>
              {profile1.username} 님과 {profile2.username} 님의 궁합 결과입니다!
            </_.HeaderTitle>
          </_.HeaderTextArea>
          <Button body="돌아가기" type="pink" onClick={handleBack} />
        </_.MainHeader>

        <_.ProfileSection>
          <_.ProfileBox>
            <_.ProfileImageWrapper>
              <_.ProfileImage
                src={profile1.profile_image_url || NormalPofileImg}
                alt={profile1.username}
              />
            </_.ProfileImageWrapper>
            <_.ProfileInfo>
              <_.ProfileName>{profile1.username}</_.ProfileName>
              <_.ProfileMBTI>{profile1.mbti}</_.ProfileMBTI>
            </_.ProfileInfo>
          </_.ProfileBox>

          <_.CompatibilityScore>
            {compatibilityData.total_score}
          </_.CompatibilityScore>

          <_.ProfileBox>
            <_.ProfileImageWrapper>
              <_.ProfileImage
                src={profile2.profile_image_url || NormalPofileImg}
                alt={profile2.username}
              />
            </_.ProfileImageWrapper>
            <_.ProfileInfo>
              <_.ProfileName>{profile2.username}</_.ProfileName>
              <_.ProfileMBTI>{profile2.mbti}</_.ProfileMBTI>
            </_.ProfileInfo>
          </_.ProfileBox>
        </_.ProfileSection>

        <_.AnalysisSection>
          <_.SectionTitle>유사도 분석</_.SectionTitle>
          <_.AnalysisBox>
            <_.AnalysisText>
              {profile1.username} 님과 {profile2.username} 님의{' '}
              <_.Highlight>MBTI</_.Highlight>는 {compatibilityData.mbti_score}%
              만큼 유사했습니다!
            </_.AnalysisText>
            <_.AnalysisText>
              {profile1.username} 님과 {profile2.username} 님의{' '}
              <_.Highlight>심박수</_.Highlight>는{' '}
              {compatibilityData.heart_rate_score}% 만큼 유사했습니다!
            </_.AnalysisText>
            <_.AnalysisText>
              {profile1.username} 님과 {profile2.username} 님의{' '}
              <_.Highlight>체온</_.Highlight>은{' '}
              {compatibilityData.temperature_score}% 만큼 유사했습니다!
            </_.AnalysisText>
          </_.AnalysisBox>
        </_.AnalysisSection>

        <Button body="고백하기" type="pink" onClick={handleConfess} />
      </_.ContentWrapper>
    </_.Container>
  );
};

export default Result;
