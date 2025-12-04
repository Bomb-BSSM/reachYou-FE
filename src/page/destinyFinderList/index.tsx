import React, { useState } from 'react';
import * as _ from './style';
import Button from '@/components/button';
import ProfileCard from '@/components/profileCard';
import { useNavigate, useLocation } from 'react-router-dom';

interface Profile {
  id: number;
  name: string;
  mbti: string;
  imageUrl?: string;
  heartRate?: number;
  temperature?: number;
}

interface LocationState {
  profiles?: Profile[];
}

const DestinyFinderList: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const locationState = location.state as LocationState;

  const [profiles, setProfiles] = useState<Profile[]>(
    locationState?.profiles || []
  );

  const handleMeasure = (id: number) => {
    navigate('/heart-rate-measure', {
      state: {
        profiles,
        currentProfileId: id,
        returnPath: '/destiny-finder/list'
      }
    });
  };

  const handleNext = () => {
    // 모든 프로필이 측정 완료되었는지 확인
    const allMeasured = profiles.every(
      profile => profile.heartRate && profile.temperature
    );

    if (!allMeasured) {
      alert('모든 사용자의 측정을 완료해주세요.');
      return;
    }

    navigate('/result', { state: { profiles } });
  };

  const isMeasured = (profile: Profile) => {
    return !!(profile.heartRate && profile.temperature);
  };

  const allMeasured = profiles.every(isMeasured);
  const measuredCount = profiles.filter(isMeasured).length;

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
            key={profile.id}
            name={profile.name}
            mbti={profile.mbti}
            imageUrl={profile.imageUrl}
            onMeasure={() => handleMeasure(profile.id)}
            isMeasured={isMeasured(profile)}
          />
        ))}
      </_.ProfileCardGrid>
    </_.Container>
  );
};

export default DestinyFinderList;
