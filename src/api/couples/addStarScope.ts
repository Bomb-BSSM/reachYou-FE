import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

interface AddStarScopeRequest {
  couple_id: number;
  rating: number;
  comment: string;
}

interface CoupleUserInfo {
  user_id: number;
  username: string;
}

interface CoupleInfo {
  couple_id: number;
  user_a: CoupleUserInfo;
  user_b: CoupleUserInfo;
  average_rating: number;
  score: number;
  rank: number;
}

interface AddStarScopeResponse {
  success: boolean;
  message: string;
  submitted_rating: number;
  submitted_comment: string;
  couple: CoupleInfo;
}

const addStarScope = async ({
  couple_id,
  rating,
  comment,
}: AddStarScopeRequest) => {
  try {
    const response = await axios.put<AddStarScopeResponse>(
      `/api/couples/${couple_id}/rating`,
      {
        rating,
        comment,
      }
    );
    return response.data;
  } catch (error) {
    console.error('별점 추가 실패: ', error);
    if (axios.isAxiosError(error) && error.response) {
      console.error('에러 응답:', error.response.data);
    }
    throw error;
  }
};

export const useAddStarScope = () => {
  return useMutation({
    mutationFn: addStarScope,
    onError: () => console.log('별점 추가 오류'),
  });
};
