import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

interface measureSensorInterface {
  user_id: number;
}
interface measureSensorResponse {
  success: boolean;
  message: string;
  user_id: number;
  match_count: number;
}

const measureSensor = async ({ user_id }: measureSensorInterface) => {
  try {
    const response = await axios.post<measureSensorResponse>(
      `/api/fated-match/measure-sensor/${user_id}`
    );
    return response;
  } catch (error) {
    console.error('개인 측정 실패: ', error);
    throw error;
  }
};

export const useMeasureSensor = () => {
  return useMutation({
    mutationFn: measureSensor,
    onError: () => console.log('개인 측정 오류'),
  });
};
