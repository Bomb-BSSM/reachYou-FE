import React, { useState, useEffect } from 'react';
import * as _ from './style';
import Button from '@/components/button';
import HeartRateWaveform from '@/components/heartRateWaveform';
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
  currentProfileId?: number;
  returnPath?: string;
}

type MeasurementStatus = 'idle' | 'measuring' | 'completed';

const HeartRateMeasure: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const locationState = location.state as LocationState;

  const [profiles, setProfiles] = useState<Profile[]>(locationState?.profiles || []);
  const currentProfileId = locationState?.currentProfileId;
  const returnPath = locationState?.returnPath;

  const [currentProfileIndex, setCurrentProfileIndex] = useState(() => {
    if (currentProfileId) {
      return profiles.findIndex(p => p.id === currentProfileId);
    }
    return 0;
  });

  const [measurementStatus, setMeasurementStatus] = useState<MeasurementStatus>('idle');
  const [heartRate, setHeartRate] = useState(0);
  const [temperature, setTemperature] = useState(0);

  const currentProfile = profiles[currentProfileIndex];
  const isSingleMeasurement = !!currentProfileId;

  // 심박수 측정 시뮬레이션
  useEffect(() => {
    if (measurementStatus === 'measuring') {
      const interval = setInterval(() => {
        // 60-100 사이의 랜덤한 심박수
        setHeartRate(Math.floor(Math.random() * 40) + 60);
        // 36.0-37.5 사이의 랜덤한 체온
        setTemperature(Math.floor(Math.random() * 15) / 10 + 36);
      }, 100);

      // 3초 후 측정 완료
      const timeout = setTimeout(() => {
        setMeasurementStatus('completed');
        clearInterval(interval);
      }, 3000);

      return () => {
        clearInterval(interval);
        clearTimeout(timeout);
      };
    }
  }, [measurementStatus]);

  const handleStartMeasurement = () => {
    setMeasurementStatus('measuring');
    setHeartRate(0);
    setTemperature(0);
  };

  const handleNext = () => {
    // 현재 프로필에 측정값 저장
    if (measurementStatus === 'completed') {
      const updatedProfiles = profiles.map((profile, index) =>
        index === currentProfileIndex
          ? { ...profile, heartRate, temperature }
          : profile
      );
      setProfiles(updatedProfiles);

      // 단일 측정 모드인 경우 (destinyFinderList에서 온 경우)
      if (isSingleMeasurement && returnPath) {
        navigate(returnPath, {
          state: {
            profiles: updatedProfiles,
          },
        });
        return;
      }

      // 연속 측정 모드인 경우
      if (currentProfileIndex < profiles.length - 1) {
        setCurrentProfileIndex(currentProfileIndex + 1);
        setMeasurementStatus('idle');
        setHeartRate(0);
        setTemperature(0);
      } else {
        // 모든 사용자 측정 완료
        // compatibility 페이지에서 온 경우(2명)는 result로
        if (updatedProfiles.length === 2) {
          navigate('/result', {
            state: {
              profile1: updatedProfiles[0],
              profile2: updatedProfiles[1],
              compatibilityScore: 99,
            },
          });
        } else {
          navigate('/result', {
            state: {
              profile1: updatedProfiles[0],
              profile2: updatedProfiles[1],
              compatibilityScore: 99,
            },
          });
        }
      }
    }
  };

  return (
    <_.Container>
      <_.MainHeader>
        <_.HeaderTextArea>
          <_.HeaderText color="pink">Q{currentProfileIndex + 1}.</_.HeaderText>
          <_.HeaderText color="black">
            {currentProfile?.name}님의 심박수와 체온을 측정해 주세요.
          </_.HeaderText>
        </_.HeaderTextArea>
        <Button
          body={
            isSingleMeasurement
              ? '완료'
              : currentProfileIndex < profiles.length - 1
              ? '다음으로'
              : '완료'
          }
          type="pink"
          onClick={handleNext}
          disabled={measurementStatus !== 'completed'}
        />
      </_.MainHeader>

      <_.ContentWrapper>
        <_.MeasurementCard>
          <_.CardHeader>
            <_.CardTitle>생체 정보 측정</_.CardTitle>
            <_.TemperatureInfo $isActive={measurementStatus === 'measuring'}>
              <_.TemperatureLabel>체온</_.TemperatureLabel>
              <_.TemperatureValue>
                {measurementStatus === 'idle' && '--'}
                {measurementStatus === 'measuring' && `${temperature.toFixed(1)}°C`}
                {measurementStatus === 'completed' && `${temperature.toFixed(1)}°C`}
              </_.TemperatureValue>
            </_.TemperatureInfo>
          </_.CardHeader>

          <HeartRateWaveform isActive={measurementStatus !== 'idle'} />

          <_.MeasurementInfo>
            <_.HeartRateLabel>심박수</_.HeartRateLabel>
            <_.HeartRateValue>
              {measurementStatus === 'idle' && '측정 시작을 눌러주세요'}
              {measurementStatus === 'measuring' && `${heartRate} BPM`}
              {measurementStatus === 'completed' && `${heartRate} BPM`}
            </_.HeartRateValue>
          </_.MeasurementInfo>
        </_.MeasurementCard>

        {measurementStatus === 'idle' && (
          <_.StartButton>
            <Button body="측정 시작" type="pink" onClick={handleStartMeasurement} />
          </_.StartButton>
        )}
      </_.ContentWrapper>
    </_.Container>
  );
};

export default HeartRateMeasure;
