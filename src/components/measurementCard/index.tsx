import * as _ from './style';
import Button from '@/components/button';
import HeartRateWaveform from '@/components/heartRateWaveform';

type MeasurementStatus = 'idle' | 'measuring' | 'completed';

interface MeasurementCardProps {
  username?: string;
  temperature: number;
  heartRate: number;
  measurementStatus: MeasurementStatus;
  showButton?: boolean;
  buttonText?: string;
  onButtonClick?: () => void;
}

const MeasurementCard = ({
  username,
  temperature,
  heartRate,
  measurementStatus,
  showButton = false,
  buttonText = '확인하기',
  onButtonClick,
}: MeasurementCardProps) => {
  return (
    <_.Wrapper>
      {username && <_.UserNameLabel>{username}</_.UserNameLabel>}

      <_.Card>
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
      </_.Card>

      {showButton && onButtonClick && (
        <_.ButtonWrapper>
          <Button body={buttonText} type="pink" onClick={onButtonClick} />
        </_.ButtonWrapper>
      )}
    </_.Wrapper>
  );
};

export default MeasurementCard;
