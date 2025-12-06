import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

interface calculateResponse {
  success: boolean;
  message: string;
  total_users: number;
}

const calculateDestinyAll = async () => {
  try {
    const response = await axios.post<calculateResponse>(
      `/api/fated-match/calculate-all`,
      {}
    );
    return response;
  } catch (error) {
    console.error('운명의 상대 전체 계산 요청 실패: ', error);
    throw error;
  }
};

export const useCalculateDestinyAll = () => {
  return useMutation({
    mutationFn: calculateDestinyAll,
    onError: () => console.log('운명의 상대 계산 실패'),
  });
};
