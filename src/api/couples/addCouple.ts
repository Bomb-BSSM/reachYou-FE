import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

interface addCoupleProps {
  user_a_id: number;
  user_b_id: number;
  couple_name: string;
}
interface addCoupleResponse {
  success: boolean;
  message: string;
  couple: {
    couple_id: number;
    user_a: {
      user_id: number;
      username: string;
      mbti: string;
      profile_image_url: string;
    };
    user_b: {
      user_id: number;
      username: string;
      mbti: string;
      profile_image_url: string;
    };
    score: number;
    couple_name: string;
    created_at: string;
  };
}

const addCouple = async ({
  user_a_id,
  user_b_id,
  couple_name,
}: addCoupleProps) => {
  const response = await axios.post<addCoupleResponse>(`/api/couples`, {
    user_a_id,
    user_b_id,
    couple_name,
  });
  return response.data.couple;
};

export const useAddCouple = () => {
  return useMutation({
    mutationFn: addCouple,
    onSuccess: (data) => {
      console.log('커플 생성 성공:', data);
    },
    onError: (error) => {
      console.error('커플 생성 실패:', error);
    },
  });
};
