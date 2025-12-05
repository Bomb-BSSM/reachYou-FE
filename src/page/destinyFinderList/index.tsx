import React from 'react';
import * as _ from './style';
import Button from '@/components/button';
import ProfileCard from '@/components/profileCard';
import { useNavigate } from 'react-router-dom';
import { useProfiles } from '@/contexts/UserContext';

const DestinyFinderList: React.FC = () => {
  const navigate = useNavigate();
  const { profiles } = useProfiles();

  const handleMeasure = (userId: number) => {
    navigate('/heart-rate-measure', {
      state: {
        currentProfileId: userId,
        returnPath: '/destiny-finder/list',
      },
    });
  };

  const handleNext = () => {
    const allMeasured = profiles.every(
      profile => profile.heartRate && profile.temperature
    );

    if (!allMeasured) {
      alert('모든 사용자의 측정을 완료해주세요.');
      return;
    }

    navigate('/result');
  };

  const isMeasured = (profile: (typeof profiles)[0]) => {
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
            key={profile.user_id}
            name={profile.username}
            mbti={profile.mbti}
            imageUrl={profile.profile_image_url}
            onMeasure={() => handleMeasure(profile.user_id)}
            isMeasured={isMeasured(profile)}
          />
        ))}
      </_.ProfileCardGrid>
    </_.Container>
  );
};

export default DestinyFinderList;
