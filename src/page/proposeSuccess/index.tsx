import React, { useState } from 'react';
import * as _ from './style';
import { useNavigate, useLocation } from 'react-router-dom';
import normalProfile from '@/assets/normalProfileImg.svg';
import { useAlert } from '@/contexts/AlertContext';
import HeartBackground from '@/assets/heartBackground.svg';
import { useAddCouple } from '@/api/couples/addCouple';

interface ProposeSuccessProps {
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
  onSubmit?: (coupleName: string) => void;
  onSkip?: () => void;
}

const ProposeSuccess: React.FC<ProposeSuccessProps> = props => {
  const navigate = useNavigate();
  const location = useLocation();
  const locationState = location.state as ProposeSuccessProps | null;
  const { showAlert } = useAlert();

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

  const addCoupleMutation = useAddCouple();
  const [coupleName, setCoupleName] = useState('');
  const handleSubmit = () => {
    if (!coupleName.trim()) {
      showAlert('커플명을 작성해주세요.');
      return;
    }
    if (props.onSubmit || locationState?.onSubmit) {
      (props.onSubmit || locationState?.onSubmit)?.(coupleName);
    } else {
      addCoupleMutation.mutate(
        {
          user_a_id: proposerId,
          user_b_id: receiverId,
          couple_name: coupleName,
        },
        {
          onSuccess: () => {
            showAlert('등록되었습니다!', `커플명: ${coupleName}`);
            if (origin === 'destiny') {
              navigate('/destiny-finder/list');
            } else {
              navigate('/');
            }
          },
          onError: error => {
            console.error('커플 등록 실패:', error);
            showAlert('커플 등록에 실패했습니다.');
          },
        }
      );
    }
  };

  const handleSkip = () => {
    if (props.onSkip || locationState?.onSkip) {
      (props.onSkip || locationState?.onSkip)?.();
    } else {
      if (origin === 'destiny') {
        navigate('/destiny-finder/list');
      } else {
        navigate('/');
      }
    }
  };

  return (
    <_.Container>
      <_.BackgroundHeart src={HeartBackground} />

      <_.ContentWrapper>
        <_.Title>
          {receiverName} 님은 {proposerName} 님의 고백을 수락했습니다!
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

        <_.FormSection>
          <_.InputGroup>
            <_.Label>커플명 작성하기*</_.Label>
            <_.Input
              type="text"
              placeholder="우리만의 특별한 커플명을 작성해주세요!"
              value={coupleName}
              onChange={e => setCoupleName(e.target.value)}
            />
          </_.InputGroup>
        </_.FormSection>

        <_.ActionSection>
          <_.SubmitButton onClick={handleSubmit}>등록하기</_.SubmitButton>
          <_.SkipLink onClick={handleSkip}>등록하지 않고 돌아가기</_.SkipLink>
        </_.ActionSection>
      </_.ContentWrapper>
    </_.Container>
  );
};

export default ProposeSuccess;
