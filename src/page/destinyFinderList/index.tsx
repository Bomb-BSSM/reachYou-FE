import React, { useEffect } from 'react';
import * as _ from './style';
import Button from '@/components/button';
import ProfileCard from '@/components/profileCard';
import { useNavigate } from 'react-router-dom';
import { useProfiles } from '@/contexts/UserContext';
import { useCalculateDestinyAll } from '@/api/findDestiny/calculateDestinyAll';
import { useAlert } from '@/contexts/AlertContext';
import { useMeasureSensor } from '@/api/sensor/measureSensor';

const DestinyFinderList: React.FC = () => {
  const navigate = useNavigate();
  const { profiles } = useProfiles();
  const calculateDestinyMutation = useCalculateDestinyAll();
  const measureSensorMutation = useMeasureSensor();
  const { showAlert } = useAlert();

  const isMeasured = (profile: (typeof profiles)[0]) => {
    return !!(profile.heartRate && profile.temperature);
  };

  const allMeasured = profiles.every(isMeasured);
  const measuredCount = profiles.filter(isMeasured).length;

  useEffect(() => {
    if (allMeasured && profiles.length > 0) {
      calculateDestinyMutation.mutate();
    }
  }, [allMeasured, profiles.length]);

  const handleCardClick = (userId: number) => {
    const profile = profiles.find(p => p.user_id === userId);

    if (!profile) return;

    if (isMeasured(profile)) {
      navigate('/destiny-result', {
        state: { userId },
      });
    } else {
      measureSensorMutation.mutate(
        { user_id: userId },
        {
          onSuccess: () => {
            navigate('/heart-rate-measure', {
              state: {
                currentProfileId: userId,
                returnPath: '/destiny-finder/list',
              },
            });
          },
          onError: () => showAlert('센서 측정이 실패했습니다.'),
        }
      );
    }
  };

  const handleNext = () => {
    if (!allMeasured) {
      showAlert('모든 사용자의 측정을 완료해주세요.');
      return;
    }

    navigate('/destiny-finder/list');
  };

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
        <Button
          body="결과 보기"
          type="pink"
          onClick={handleNext}
          disabled={!allMeasured}
        />
      </_.MainHeader>

      <_.ProfileCardGrid>
        {profiles.map(profile => (
          <ProfileCard
            key={profile.user_id}
            name={profile.username}
            mbti={profile.mbti}
            imageUrl={profile.profile_image_url}
            onMeasure={() => handleCardClick(profile.user_id)}
            isMeasured={isMeasured(profile)}
          />
        ))}
      </_.ProfileCardGrid>
    </_.Container>
  );
};

export default DestinyFinderList;
