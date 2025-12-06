import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

interface measureSensorAllResponse {
  success: boolean;
  message: string;
  total_users: number;
  results: {
    user_id: number;
    username: string;
    heart_rate: number;
    temperature: number;
  }[];
}

const measureSensorAll = async () => {
  try {
    const response = await axios.post<measureSensorAllResponse>(
      `/api/fated-match/measure-all-users`
    );
    return response;
  } catch (error) {
    console.error('전체 측정 실패: ', error);
    throw error;
  }
};

export const useMeasureSensorAll = () => {
  return useMutation({
    mutationFn: measureSensorAll,
    onError: () => console.log('전체 측정 오류'),
  });
};
