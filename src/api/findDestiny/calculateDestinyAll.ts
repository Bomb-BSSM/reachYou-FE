import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

interface calculateResponse {
  success: boolean;
  message: string;
  total_users: number;
}

interface calculateProps {
  user_length: number;
}

const calculateDestinyAll = async ({ user_length }: calculateProps) => {
  try {
    const response = await axios.post<calculateResponse>(
      `/api/fated-match/calculate-recent/${user_length}`,
      {}
    );
    return response.data;
  } catch (error) {
    console.error('운명의 상대 전체 계산 요청 실패: ', error);
    throw error;
  }
};

export const useCalculateDestinyAll = () => {
  return useMutation({
    mutationFn: (user_length: number) => calculateDestinyAll({ user_length }),
    onError: () => console.log('운명의 상대 전체 계산 실패'),
  });
};
