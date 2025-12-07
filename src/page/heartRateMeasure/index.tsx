import { useState, useEffect, useRef } from 'react';
import * as _ from './style';
import Button from '@/components/button';
import MeasurementCard from '@/components/measurementCard';
import { useNavigate, useLocation } from 'react-router-dom';
import { useProfiles } from '@/contexts/UserContext';
import { useSensorWebSocket } from '@/api/sensor/useSensorWebSocket';
import { useMeasureSensor } from '@/api/sensor/measureSensor';
import { useAlert } from '@/contexts/AlertContext';

interface LocationState {
  currentProfileId?: number;
  returnPath?: string;
}

type MeasurementStatus = 'idle' | 'measuring' | 'completed';

const HeartRateMeasure = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const locationState = location.state as LocationState;
  const { profiles, updateProfile } = useProfiles();
  const measureSensorMutation = useMeasureSensor();
  const { showAlert } = useAlert();

  const currentProfileId = locationState?.currentProfileId;
  const returnPath = locationState?.returnPath;

  const [currentProfileIndex, setCurrentProfileIndex] = useState(() => {
    if (currentProfileId) {
      return profiles.findIndex(p => p.user_id === currentProfileId);
    }
    return 0;
  });

  const [measurementStatus, setMeasurementStatus] =
    useState<MeasurementStatus>('idle');
  const [heartRate, setHeartRate] = useState(0);
  const [temperature, setTemperature] = useState(0);
  const [shouldUseMockData, setShouldUseMockData] = useState(false);
  const [allMeasurementsCompleted, setAllMeasurementsCompleted] =
    useState(false);
  const mockDataTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const currentProfile = profiles[currentProfileIndex];
  const isSingleMeasurement = !!currentProfileId;

  // 웹소켓 연결
  const { latestMessage, error, disconnect } = useSensorWebSocket(
    measurementStatus === 'measuring' ? currentProfile?.user_id : null,
    {
      onMessage: message => {
        // 웹소켓에서 데이터가 오면 목 데이터 타이머 취소
        if (mockDataTimeoutRef.current) {
          clearTimeout(mockDataTimeoutRef.current);
          mockDataTimeoutRef.current = null;
        }
        setShouldUseMockData(false);

        // 실시간 측정 값 업데이트
        if (message.current_value !== undefined) {
          setHeartRate(Math.round(message.current_value));
        }
        if (message.temperature !== undefined) {
          setTemperature(message.temperature);
        }
      },
      onComplete: result => {
        setHeartRate(result.heart_rate);
        setTemperature(result.temperature);
        setMeasurementStatus('completed');
        setShouldUseMockData(false);
      },
      onError: errorMsg => {
        console.error('웹소켓 에러:', errorMsg);
        setShouldUseMockData(true);
      },
    }
  );

  useEffect(() => {
    if (shouldUseMockData && measurementStatus === 'measuring') {
      const interval = setInterval(() => {
        setHeartRate(Math.floor(Math.random() * 10) + 95);
        setTemperature(36.5 + Math.random() * 0.2 - 0.1);
      }, 100);

      const timeout = setTimeout(() => {
        setHeartRate(99);
        setTemperature(36.5);
        setMeasurementStatus('completed');
      }, 3000);

      return () => {
        clearInterval(interval);
        clearTimeout(timeout);
      };
    }
  }, [shouldUseMockData, measurementStatus]);

  // 웹소켓 연결 실패 감지 (5초 후에도 데이터가 없으면 목 데이터 사용)
  useEffect(() => {
    if (measurementStatus === 'measuring' && !shouldUseMockData) {
      mockDataTimeoutRef.current = setTimeout(() => {
        if (!latestMessage && !error) {
          console.warn('웹소켓 데이터를 받지 못함. 목 데이터 사용.');
          setShouldUseMockData(true);
        }
      }, 5000);

      return () => {
        if (mockDataTimeoutRef.current) {
          clearTimeout(mockDataTimeoutRef.current);
          mockDataTimeoutRef.current = null;
        }
      };
    }
  }, [measurementStatus, shouldUseMockData, latestMessage, error]);

  // 컴포넌트 언마운트 시 웹소켓 연결 해제
  useEffect(() => {
    return () => {
      disconnect();
      if (mockDataTimeoutRef.current) {
        clearTimeout(mockDataTimeoutRef.current);
      }
    };
  }, [disconnect]);

  const handleStartMeasurement = () => {
    // 재측정인 경우 기존 연결 종료
    disconnect();

    // 측정 상태 즉시 변경 (웹소켓 연결 시작)
    setMeasurementStatus('measuring');
    setHeartRate(0);
    setTemperature(0);
    setShouldUseMockData(false);

    // API 호출 (웹소켓과 동시 진행)
    measureSensorMutation.mutate(
      { user_id: currentProfile.user_id },
      {
        onError: () => {
          showAlert('센서 측정이 실패했습니다.');
          // API 실패해도 웹소켓으로 측정 시도 또는 목 데이터 사용
        },
      }
    );
  };

  const handleNext = () => {
    if (measurementStatus === 'completed') {
      updateProfile(currentProfile.user_id, { heartRate, temperature });

      if (isSingleMeasurement && returnPath) {
        disconnect();
        navigate(returnPath);
        return;
      }

      if (currentProfileIndex < profiles.length - 1) {
        setCurrentProfileIndex(currentProfileIndex + 1);
        setMeasurementStatus('idle');
        setHeartRate(0);
        setTemperature(0);
        setShouldUseMockData(false);
        disconnect();
      } else {
        disconnect();
        setAllMeasurementsCompleted(true);
      }
    }
  };

  const handleViewResult = (userId: number) => {
    navigate('/result', { state: { userId } });
  };

  return (
    <_.Container>
      {allMeasurementsCompleted ? (
        <>
          <_.MainHeader>
            <_.HeaderTextArea>
              <_.HeaderText color="black">
                각자의 결과를 확인해보세요!
              </_.HeaderText>
            </_.HeaderTextArea>
          </_.MainHeader>

          <_.ResultCardsGrid>
            {profiles.map(profile => (
              <MeasurementCard
                key={profile.user_id}
                username={profile.username}
                temperature={profile.temperature || 36.5}
                heartRate={profile.heartRate || 99}
                measurementStatus="completed"
                showButton={true}
                buttonText="확인하기"
                onButtonClick={() => handleViewResult(profile.user_id)}
              />
            ))}
          </_.ResultCardsGrid>
        </>
      ) : (
        <>
          <_.MainHeader>
            <_.HeaderTextArea>
              <_.HeaderText color="pink">
                Q{currentProfileIndex + 1}.
              </_.HeaderText>
              <_.HeaderText color="black">
                {currentProfile?.username}님의 심박수와 체온을 측정해 주세요.
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
            <MeasurementCard
              temperature={temperature}
              heartRate={heartRate}
              measurementStatus={measurementStatus}
            />

            {measurementStatus === 'idle' && (
              <_.StartButton>
                <Button
                  body="측정 시작"
                  type="pink"
                  onClick={handleStartMeasurement}
                />
              </_.StartButton>
            )}
          </_.ContentWrapper>
        </>
      )}
    </_.Container>
  );
};

export default HeartRateMeasure;
