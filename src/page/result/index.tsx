import React from 'react';
import * as _ from './style';
import Button from '@/components/button';
import NormalPofileImg from '@/assets/normalProfileImg.svg';
import HeartBackground from '@/assets/heartBackground.svg';
import { useNavigate } from 'react-router-dom';
import { useProfiles } from '@/contexts/UserContext';

const Result: React.FC = () => {
  const navigate = useNavigate();
  const { profiles, clearProfiles } = useProfiles();

  const profile1 = profiles[0] || {
    user_id: 0,
    username: '사용자1',
    mbti: 'MBTI',
    heartRate: 75,
    temperature: 36.5,
    profile_image_url: '',
  };
  const profile2 = profiles[1] || {
    user_id: 0,
    username: '사용자2',
    mbti: 'MBTI',
    heartRate: 78,
    temperature: 36.8,
    profile_image_url: '',
  };
  const compatibilityScore = 99; // TODO: 실제 궁합 점수 계산 로직

  const handleBack = () => {
    clearProfiles(); // 전역 상태 초기화
    navigate('/');
  };

  const handleConfess = () => {
    // TODO: 고백하기 기능 구현
  };

  return (
    <_.Container>
      <_.HeartBackground src={HeartBackground} />

      <_.ContentWrapper>
        <_.MainHeader>
          <_.HeaderTextArea>
            <_.HeaderPink>Q1.</_.HeaderPink>
            <_.HeaderTitle>
              {profile1.username} 님의 운명의 상대는 {profile2.username} 님입니다!
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

          <_.CompatibilityScore>{compatibilityScore}</_.CompatibilityScore>

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
              {profile1.username} 님은 {profile2.username} 님과{' '}
              <_.Highlight>심박도</_.Highlight>가 99%로 가장 유사했습니다!
            </_.AnalysisText>
            <_.AnalysisText>
              {profile1.username} 님은 {profile2.username} 님과{' '}
              <_.Highlight>온도</_.Highlight>가 88%로 유사했습니다!
            </_.AnalysisText>
            <_.AnalysisText>
              {profile1.username} 님과 {profile2.username} 님은{' '}
              <_.Highlight>MBTI</_.Highlight>의 궁합이 매우 좋은 편입니다!
            </_.AnalysisText>
          </_.AnalysisBox>
        </_.AnalysisSection>

        <_.OtherCompatibilitySection>
          <_.SectionTitle>다른 사람과의 궁합</_.SectionTitle>
          <_.OtherCompatibilityText>
            {profile1.username} 님은 <_.Highlight>이원희</_.Highlight>님과 10점으로
            가장 사이가 나쁜 관계입니다. 체온이 비슷했으며 심박도에서 큰 차이가
            나타났습니다.
            <br />
            {profile1.username} 님은 <_.Highlight>이로하</_.Highlight>님과 88 점으로
            좋은 관계입니다! 이로하 님과 체온이 가장 비슷했으며 MBTI에서 차이가
            나타났습니다.
            <br />
            {profile1.username} 님은 <_.Highlight>빌려온 고양이</_.Highlight> 님과
            90 점으로 잘 어울리는 관계입니다! 심박도가 비슷했습니다.
          </_.OtherCompatibilityText>
        </_.OtherCompatibilitySection>

        <_.ConfessButton>
          <Button body="고백하기" type="pink" onClick={handleConfess} />
        </_.ConfessButton>
      </_.ContentWrapper>
    </_.Container>
  );
};

export default Result;
