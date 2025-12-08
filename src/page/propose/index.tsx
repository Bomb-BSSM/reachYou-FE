import React from 'react';
import * as _ from './style';
import { useNavigate, useLocation } from 'react-router-dom';
import normalProfile from '@/assets/normalProfileImg.svg';
import HeartBackground from '@/assets/heartBackground.svg';

interface ProposeProps {
  origin?: 'destiny' | 'compatibility';
  proposerId?: number;
  proposerName?: string;
  proposerMbti?: string;
  proposerImage?: string;
  receiverId?: number;
  receiverName?: string;
  receiverMbti?: string;
  receiverImage?: string;
  compatibilityScore?: number;
  heartRateCompatibility?: number;
  temperatureCompatibility?: number;
  mbtiCompatibility?: number;
  onAccept?: () => void;
  onReject?: () => void;
}

const Propose: React.FC<ProposeProps> = props => {
  const navigate = useNavigate();
  const location = useLocation();
  const locationState = location.state as ProposeProps | null;

  const origin = props.origin || locationState?.origin || 'compatibility';
  const proposerId = props.proposerId || locationState?.proposerId || 1;
  const proposerName =
    props.proposerName || locationState?.proposerName || '이원희';
  const proposerMbti =
    props.proposerMbti || locationState?.proposerMbti || 'ISFP';
  const proposerImage =
    props.proposerImage || locationState?.proposerImage || normalProfile;
  const receiverId = props.receiverId || locationState?.receiverId || 2;
  const receiverName =
    props.receiverName || locationState?.receiverName || '이원희';
  const receiverMbti =
    props.receiverMbti || locationState?.receiverMbti || 'ISFP';
  const receiverImage =
    props.receiverImage || locationState?.receiverImage || normalProfile;
  const compatibilityScore =
    props.compatibilityScore || locationState?.compatibilityScore || 99;
  const heartRateCompatibility =
    props.heartRateCompatibility || locationState?.heartRateCompatibility || 99;
  const temperatureCompatibility =
    props.temperatureCompatibility ||
    locationState?.temperatureCompatibility ||
    88;
  const mbtiCompatibility =
    props.mbtiCompatibility || locationState?.mbtiCompatibility || 95;

  const handleAccept = () => {
    if (props.onAccept || locationState?.onAccept) {
      (props.onAccept || locationState?.onAccept)?.();
    } else {
      navigate('/propose-success', {
        state: {
          origin,
          proposerId,
          proposerName,
          proposerMbti,
          proposerImage,
          receiverId,
          receiverName,
          receiverMbti,
          receiverImage,
          compatibilityScore,
        },
      });
    }
  };

  const handleReject = () => {
    if (props.onReject || locationState?.onReject) {
      (props.onReject || locationState?.onReject)?.();
    } else {
      navigate('/propose-fail', {
        state: {
          origin,
          proposerName,
          proposerMbti,
          proposerImage,
          receiverName,
          receiverMbti,
          receiverImage,
          compatibilityScore,
        },
      });
    }
  };
  return (
    <_.Container>
      <_.BackgroundHeart src={HeartBackground} />

      <_.ContentWrapper>
        <_.Title>
          {proposerName} 님이 {receiverName} 님에게 고백했습니다!
        </_.Title>

        <_.ProfileSection>
          <_.ProfileCard>
            <_.ProfileImageWrapper>
              <_.ProfileImage src={proposerImage} alt={proposerName} />
            </_.ProfileImageWrapper>
            <_.ProfileInfo>
              <_.ProfileName>{proposerName}</_.ProfileName>
              <_.ProfileMbti>{proposerMbti}</_.ProfileMbti>
            </_.ProfileInfo>
          </_.ProfileCard>

          <_.CompatibilityScore>{compatibilityScore}</_.CompatibilityScore>

          <_.ProfileCard>
            <_.ProfileImageWrapper>
              <_.ProfileImage src={receiverImage} alt={receiverName} />
            </_.ProfileImageWrapper>
            <_.ProfileInfo>
              <_.ProfileName>{receiverName}</_.ProfileName>
              <_.ProfileMbti>{receiverMbti}</_.ProfileMbti>
            </_.ProfileInfo>
          </_.ProfileCard>
        </_.ProfileSection>

        <_.InfoBox>
          <_.InfoText>
            {proposerName} 님은 {receiverName} 님과{' '}
            <_.HighlightText>심박도</_.HighlightText>는 {heartRateCompatibility}
            %로 가장 유사했습니다!
          </_.InfoText>
          <_.InfoText>
            {proposerName} 님은 {receiverName} 님과{' '}
            <_.HighlightText>온도</_.HighlightText>는 {temperatureCompatibility}
            %로 유사했습니다!
          </_.InfoText>
          <_.InfoText>
            {proposerName} 님과 {receiverName} 님은{' '}
            <_.HighlightText>MBTI</_.HighlightText>는 {mbtiCompatibility}%로
            유사했습니다!
          </_.InfoText>
        </_.InfoBox>

        <_.ButtonGroup>
          <_.AcceptButton onClick={handleAccept}>수락하기</_.AcceptButton>
          <_.RejectButton onClick={handleReject}>거절하기</_.RejectButton>
        </_.ButtonGroup>
      </_.ContentWrapper>
    </_.Container>
  );
};

export default Propose;
