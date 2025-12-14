import React, { useEffect } from 'react';
import * as _ from './style';
import Button from '@/components/button';
import CaptureButton from '@/components/captureButton';
import NormalProfileImg from '@/assets/normalProfileImg.svg';
import HeartBackground from '@/assets/heartBackground.svg';
import { useNavigate, useLocation } from 'react-router-dom';
import { useGetFinderDestiny } from '@/api/findDestiny/getFindDestiny';
import LoadingSpinner from '@/components/loadingSpinner';
import { useAlert } from '@/contexts/AlertContext';
import { useCaptureScreen } from '@/hooks/useCaptureScreen';

const DestinyResult: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const userId = location.state?.userId;
  const { showAlert } = useAlert();
  const { captureScreen, isCapturing } = useCaptureScreen();

  const { data, isLoading, isError } = useGetFinderDestiny({ user_id: userId });

  useEffect(() => {
    if (isError || (!isLoading && !data)) {
      showAlert('데이터를 불러오는데 실패했습니다.', '잠시 후 다시 시도해주세요.', () => {
        navigate('/destiny-finder/list');
      });
    }
  }, [isError, isLoading, data, navigate, showAlert]);

  const handleBack = () => {
    navigate('/destiny-finder/list');
  };

  const handleCapture = () => {
    captureScreen('destiny-result-container', {
      fileName: `reachyou-운명찾기-결과-${new Date().getTime()}.png`,
      ignoreElements: ['[data-capture-ignore="true"]'],
    });
  };

  if (isLoading || isError || !data) {
    return (
      <_.Container>
        <_.HeartBackground src={HeartBackground} />
        {isLoading && (
          <_.LoadingContainer>
            <LoadingSpinner size={60} />
            <_.LoadingText>로딩 중...</_.LoadingText>
          </_.LoadingContainer>
        )}
      </_.Container>
    );
  }

  const result = data.data;
  const currentUser = result.current_user;
  const fatedMatches = result.fated_matches || [];
  const destinyMatch = fatedMatches[0];
  const otherMatches = fatedMatches.slice(1);

  if (!destinyMatch) {
    return (
      <_.Container>
        <_.ErrorText>운명의 상대를 찾을 수 없습니다.</_.ErrorText>
        <Button body="돌아가기" type="pink" onClick={handleBack} />
      </_.Container>
    );
  }

  return (
    <_.Container id="destiny-result-container">
      <_.HeartBackground src={HeartBackground} />
      <CaptureButton onClick={handleCapture} isCapturing={isCapturing} />

      <_.ContentWrapper>
        <_.MainHeader>
          <_.HeaderTextArea>
            <_.HeaderPink>결과</_.HeaderPink>
            <_.HeaderTitle>
              {currentUser.username} 님의 운명의 상대는 {destinyMatch.username}
              님 입니다!
            </_.HeaderTitle>
          </_.HeaderTextArea>
          <Button body="돌아가기" type="pink" onClick={handleBack} />
        </_.MainHeader>

        <_.ProfileSection>
          <_.ProfileBox>
            <_.ProfileImageWrapper>
              <_.ProfileImage
                src={currentUser.profile_image_url || NormalProfileImg}
                alt={currentUser.username}
              />
            </_.ProfileImageWrapper>
            <_.ProfileInfo>
              <_.ProfileName>{currentUser.username}</_.ProfileName>
              <_.ProfileMBTI>{currentUser.mbti}</_.ProfileMBTI>
            </_.ProfileInfo>
          </_.ProfileBox>

          <_.CompatibilityScore>
            {destinyMatch.compatibility_score}
          </_.CompatibilityScore>

          <_.ProfileBox>
            <_.ProfileImageWrapper>
              <_.ProfileImage
                src={destinyMatch.profile_image_url || NormalProfileImg}
                alt={destinyMatch.username}
              />
            </_.ProfileImageWrapper>
            <_.ProfileInfo>
              <_.ProfileName>{destinyMatch.username}</_.ProfileName>
              <_.ProfileMBTI>{destinyMatch.mbti}</_.ProfileMBTI>
            </_.ProfileInfo>
          </_.ProfileBox>
        </_.ProfileSection>

        <_.AnalysisSection>
          <_.SectionTitle>유사도 분석</_.SectionTitle>
          <_.AnalysisBox>
            <_.AnalysisText>
              {currentUser.username} 님과 {destinyMatch.username} 님의{' '}
              <_.Highlight>MBTI</_.Highlight>는 {destinyMatch.mbti_score}% 만큼
              유사했습니다!
            </_.AnalysisText>
            <_.AnalysisText>
              {currentUser.username} 님과 {destinyMatch.username} 님의{' '}
              <_.Highlight>심박수</_.Highlight>는{' '}
              {destinyMatch.heart_rate_score}% 만큼 유사했습니다!
            </_.AnalysisText>
            <_.AnalysisText>
              {currentUser.username} 님과 {destinyMatch.username} 님의{' '}
              <_.Highlight>체온</_.Highlight>은 {destinyMatch.temperature_score}
              % 만큼 유사했니다!
            </_.AnalysisText>
          </_.AnalysisBox>
        </_.AnalysisSection>

        {otherMatches.length > 0 && (
          <_.OtherCompatibilitySection>
            <_.SectionTitle>다른 사람과의 궁합</_.SectionTitle>
            <_.OtherCompatibilityText>
              {otherMatches.map((match, index) => (
                <React.Fragment key={match.user_id}>
                  {currentUser.username} 님은{' '}
                  <_.Highlight>{match.username}</_.Highlight>님과의 궁합이{' '}
                  {match.compatibility_score}점입니다.
                  {index < otherMatches.length - 1 && <br />}
                </React.Fragment>
              ))}
            </_.OtherCompatibilityText>
          </_.OtherCompatibilitySection>
        )}
        <Button
          body="고백하기"
          type="pink"
          onClick={() =>
            navigate('/propose', {
              state: {
                origin: 'destiny',
                proposerId: result.user_id,
                proposerName: currentUser.username,
                proposerMbti: currentUser.mbti,
                proposerImage: currentUser.profile_image_url || NormalProfileImg,
                receiverId: destinyMatch.user_id,
                receiverName: destinyMatch.username,
                receiverMbti: destinyMatch.mbti,
                receiverImage: destinyMatch.profile_image_url || NormalProfileImg,
                compatibilityScore: destinyMatch.compatibility_score,
                heartRateCompatibility: destinyMatch.heart_rate_score,
                temperatureCompatibility: destinyMatch.temperature_score,
                mbtiCompatibility: destinyMatch.mbti_score,
              },
            })
          }
        />
      </_.ContentWrapper>
    </_.Container>
  );
};

export default DestinyResult;
