import React from 'react';
import * as _ from './style';
import { useNavigate, useLocation } from 'react-router-dom';
import normalProfile from '@/assets/normalProfileImg.svg';

interface ProposeFailProps {
  proposerName?: string;
  proposerMbti?: string;
  proposerImage?: string;
  receiverName?: string;
  receiverMbti?: string;
  receiverImage?: string;
  compatibilityScore?: number;
  onGoBack?: () => void;
}

const ProposeFail: React.FC<ProposeFailProps> = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const locationState = location.state as ProposeFailProps | null;

  const proposerName = props.proposerName || locationState?.proposerName || '이원희';
  const proposerMbti = props.proposerMbti || locationState?.proposerMbti || 'ISFP';
  const proposerImage = props.proposerImage || locationState?.proposerImage || normalProfile;
  const receiverName = props.receiverName || locationState?.receiverName || '이원희';
  const receiverMbti = props.receiverMbti || locationState?.receiverMbti || 'ISFP';
  const receiverImage = props.receiverImage || locationState?.receiverImage || normalProfile;
  const compatibilityScore =
    props.compatibilityScore || locationState?.compatibilityScore || 99;

  const handleGoBack = () => {
    if (props.onGoBack || locationState?.onGoBack) {
      (props.onGoBack || locationState?.onGoBack)?.();
    } else {
      navigate('/');
    }
  };

  return (
    <_.Container>
      <_.BackgroundHeart />

      <_.ContentWrapper>
        <_.Title>
          {receiverName} 님은 {proposerName} 님의 고백을 수락하지 않았습니다...
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

        <_.GoBackButton onClick={handleGoBack}>돌아가기</_.GoBackButton>
      </_.ContentWrapper>
    </_.Container>
  );
};

export default ProposeFail;
