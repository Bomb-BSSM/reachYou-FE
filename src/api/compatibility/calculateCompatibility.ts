import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

interface calculateCompatibilityProps {
  user_id_1: number;
  user_id_2: number;
}
interface calculateCompatibilityResponse {
  user_1: {
    user_id: number;
    username: string;
    mbti: string;
    heart_rate: number;
    temperature: number;
  };
  user_2: {
    user_id: number;
    username: string;
    mbti: string;
    heart_rate: number;
    temperature: number;
  };
  compatibility: {
    total_score: number;
    mbti_score: number;
    heart_rate_score: number;
    temperature_score: number;
  };
}

const calculateCompatibility = async ({
  user_id_1,
  user_id_2,
}: calculateCompatibilityProps) => {
  try {
    const response = await axios.post<calculateCompatibilityResponse>(
      `/api/compatibility/calculate`,
      { user_id_1, user_id_2 }
    );
    return response;
  } catch (error) {
    console.error('두 사용자 궁합 계산 오류: ', error);
    throw error;
  }
};

export const useCaculateCompatibility = () => {
  return useMutation({
    mutationFn: calculateCompatibility,
    onError: () => console.log('두 사용자 궁합 계산 실패.'),
  });
};
