import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

interface calculateManualProps {
  mbti_1: string;
  mbti_2: string;
  heart_rate_1: number;
  heart_rate_2: number;
  temperature_1: number;
  temperature_2: number;
}

const calculateManual = async ({
  mbti_1,
  mbti_2,
  heart_rate_1,
  heart_rate_2,
  temperature_1,
  temperature_2,
}: calculateManualProps) => {
  try {
    const response = await axios.post(`/api/compatibility/calculate-manual`, {
      mbti_1,
      mbti_2,
      heart_rate_1,
      heart_rate_2,
      temperature_1,
      temperature_2,
    });
    return response;
  } catch (error) {
    console.error('수동 계산 오류: ', error);
    throw error;
  }
};

export const useCalculateManual = () => {
  return useMutation({
    mutationFn: calculateManual,
    onError: () => console.log('수동 계산 실패'),
  });
};
