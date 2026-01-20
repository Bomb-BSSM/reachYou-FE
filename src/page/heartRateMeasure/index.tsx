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

  useEffect(() => {
    return () => {
      disconnect();
      if (mockDataTimeoutRef.current) {
        clearTimeout(mockDataTimeoutRef.current);
      }
    };
  }, [disconnect]);

  const handleStartMeasurement = () => {
    disconnect();

    setMeasurementStatus('measuring');
    setHeartRate(0);
    setTemperature(0);
    setShouldUseMockData(false);

    measureSensorMutation.mutate(
      { user_id: currentProfile.user_id },
      {
        onError: () => {
          showAlert('센서 측정이 실패했습니다.');
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
        // 모든 측정 완료 - 바로 결과 페이지로 이동
        disconnect();
        navigate('/result');
      }
    }
  };

  return (
    <_.Container>
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
    </_.Container>
  );
};

export default HeartRateMeasure;
