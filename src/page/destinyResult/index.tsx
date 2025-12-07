import React from 'react';
import * as _ from './style';
import Button from '@/components/button';
import NormalProfileImg from '@/assets/normalProfileImg.svg';
import HeartBackground from '@/assets/heartBackground.svg';
import { useNavigate, useLocation } from 'react-router-dom';
import { useGetFinderDestiny } from '@/api/findDestiny/getFindDestiny';

const DestinyResult: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const userId = location.state?.userId;

  const { data, isLoading, isError } = useGetFinderDestiny({ user_id: userId });

  const handleBack = () => {
    navigate('/destiny-finder/list');
  };

  if (isLoading) {
    return (
      <_.Container>
        <_.LoadingText>로딩 중...</_.LoadingText>
      </_.Container>
    );
  }

  if (isError || !data) {
    return (
      <_.Container>
        <_.ErrorText>데이터를 불러오는데 실패했습니다.</_.ErrorText>
        <Button body="돌아가기" type="pink" onClick={handleBack} />
      </_.Container>
    );
  }

  const result = data.data;
  const currentUser = result.current_user;
  const fatedMatches = result.fated_matches;

  return (
    <_.Container>
      <_.HeartBackground src={HeartBackground} />

      <_.ContentWrapper>
        <_.MainHeader>
          <_.HeaderTextArea>
            <_.HeaderPink>결과</_.HeaderPink>
            <_.HeaderTitle>
              {currentUser.username} 님의 운명의 상대는 {fatedMatches.length}명
              입니다!
            </_.HeaderTitle>
          </_.HeaderTextArea>
          <Button body="돌아가기" type="pink" onClick={handleBack} />
        </_.MainHeader>

        <_.CurrentUserSection>
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
          <_.UserStats>
            <_.StatItem>
              심박수: <_.Highlight>{currentUser.heart_rate}bpm</_.Highlight>
            </_.StatItem>
            <_.StatItem>
              체온: <_.Highlight>{currentUser.temperature}°C</_.Highlight>
            </_.StatItem>
          </_.UserStats>
        </_.CurrentUserSection>

        <_.MatchesSection>
          <_.SectionTitle>운명의 상대 ({fatedMatches.length}명)</_.SectionTitle>
          <_.MatchesGrid>
            {fatedMatches.map(match => (
              <_.MatchCard key={match.user_id}>
                <_.MatchImageWrapper>
                  <_.MatchImage
                    src={match.profile_image_url || NormalProfileImg}
                    alt={match.username}
                  />
                </_.MatchImageWrapper>
                <_.MatchInfo>
                  <_.MatchName>{match.username}</_.MatchName>
                  <_.MatchMBTI>{match.mbti}</_.MatchMBTI>
                </_.MatchInfo>
                <_.ScoreSection>
                  <_.CompatibilityScore>
                    {match.compatibility_score}점
                  </_.CompatibilityScore>
                  <_.DetailScores>
                    <_.DetailScore>MBTI: {match.mbti_score}점</_.DetailScore>
                    <_.DetailScore>
                      심박수: {match.heart_rate_score}점
                    </_.DetailScore>
                    <_.DetailScore>
                      체온: {match.temperature_score}점
                    </_.DetailScore>
                  </_.DetailScores>
                </_.ScoreSection>
              </_.MatchCard>
            ))}
          </_.MatchesGrid>
        </_.MatchesSection>
      </_.ContentWrapper>
    </_.Container>
  );
};

export default DestinyResult;
