import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

interface calculateMbtiProps {
  mbti_1: string;
  mbti_2: string;
}
interface calculateMbtiResponse {
  mbti_1: string;
  mbti_2: string;
  score: number;
  description: string;
}

const calculateMbti = async ({ mbti_1, mbti_2 }: calculateMbtiProps) => {
  try {
    const response = await axios.post<calculateMbtiResponse>(
      `/api/compatibility/mbti/${mbti_1}/${mbti_2}`
    );
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const useCalculateMbti = () => {
  return useMutation({
    mutationFn: calculateMbti,
    onError: () => console.log('mbti 궁합 계산 실패'),
  });
};
