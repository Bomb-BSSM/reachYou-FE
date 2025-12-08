import { useState, useEffect } from 'react';
import * as _ from './style';
import Button from '@/components/button';
import ProfileCard from '@/components/profileCard';
import { useNavigate } from 'react-router-dom';
import { useProfiles } from '@/contexts/UserContext';
import { useCalculateDestinyAll } from '@/api/findDestiny/calculateDestinyAll';
import { useAlert } from '@/contexts/AlertContext';

const DESTINY_RESULT_KEY = 'destiny_result_calculated';

const DestinyFinderList = () => {
  const navigate = useNavigate();
  const { profiles } = useProfiles();
  const calculateDestinyMutation = useCalculateDestinyAll();
  const { showAlert } = useAlert();

  const [showResults, setShowResults] = useState(() => {
    return sessionStorage.getItem(DESTINY_RESULT_KEY) === 'true';
  });

  const isMeasured = (profile: (typeof profiles)[0]) => {
    return !!(profile.heartRate && profile.temperature);
  };

  const allMeasured = profiles.every(isMeasured);
  const measuredCount = profiles.filter(isMeasured).length;

  const handleCardClick = (userId: number) => {
    const profile = profiles.find(p => p.user_id === userId);

    if (!profile) return;

    if (isMeasured(profile)) {
      navigate('/destiny-result', {
        state: { userId },
      });
    } else {
      navigate('/heart-rate-measure', {
        state: {
          currentProfileId: userId,
          returnPath: '/destiny-finder/list',
        },
      });
    }
  };

  const handleRemeasure = (userId: number) => {
    navigate('/heart-rate-measure', {
      state: {
        currentProfileId: userId,
        returnPath: '/destiny-finder/list',
      },
    });
  };

  const handleNext = () => {
    if (!allMeasured) {
      showAlert('모든 사용자의 측정을 완료해주세요.');
      return;
    }

    setShowResults(true);
    sessionStorage.setItem(DESTINY_RESULT_KEY, 'true');
    calculateDestinyMutation.mutate(profiles.length, {
      onError: () => {
        showAlert('운명의 상대 계산에 실패했습니다.');
        setShowResults(false);
        sessionStorage.removeItem(DESTINY_RESULT_KEY);
      },
    });
  };

  // 컴포넌트 언마운트 시 (다른 페이지로 이동 시) 플래그 유지
  // 하지만 운명찾기 처음 페이지로 돌아가면 초기화되어야 함
  useEffect(() => {
    return () => {
      // 이 페이지를 떠날 때는 플래그 유지 (결과 페이지 보고 돌아올 수 있음)
    };
  }, []);

  return (
    <_.Container>
      <_.MainHeader>
        <_.HeaderTextArea>
          <_.HeaderText color="pink">Q2.</_.HeaderText>
          <_.HeaderText color="black">
            운명찾기를 진행할 사람의 생체 정보를 측정해 주세요.
          </_.HeaderText>
        </_.HeaderTextArea>
        <_.MeasureStatus>
          {measuredCount} / {profiles.length} 측정 완료
        </_.MeasureStatus>
        {!showResults && (
          <Button
            body="결과 보기"
            type="pink"
            onClick={handleNext}
            disabled={!allMeasured}
          />
        )}
      </_.MainHeader>

      <_.ProfileCardGrid>
        {profiles.map(profile => (
          <ProfileCard
            key={profile.user_id}
            name={profile.username}
            mbti={profile.mbti}
            imageUrl={profile.profile_image_url}
            onMeasure={() => handleCardClick(profile.user_id)}
            onRemeasure={
              showResults ? undefined : () => handleRemeasure(profile.user_id)
            }
            isMeasured={isMeasured(profile)}
          />
        ))}
      </_.ProfileCardGrid>
    </_.Container>
  );
};

export default DestinyFinderList;
