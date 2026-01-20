import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

interface UserInfo {
  user_id: number;
  username: string;
  mbti: string;
  profile_image_url: string;
}

export interface Rating {
  rating: number;
  comment: string;
  created_at: string;
  nickname: string;
}

interface CoupleResponse {
  couple_id: number;
  rank: number;
  user_a: UserInfo;
  user_b: UserInfo;
  score: number;
  average_rating: number;
  post_count: number;
  created_at: string;
  ratings_list: Rating[];
}

interface GetCoupleProps {
  couple_id: number;
}

const getCouple = async ({ couple_id }: GetCoupleProps) => {
  try {
    const response = await axios.get<CoupleResponse>(
      `/api/couples/${couple_id}`
    );
    return response.data;
  } catch (error) {
    console.error('커플 정보 조회 실패: ', error);
    throw error;
  }
};

export const useGetCouple = ({ couple_id }: GetCoupleProps) => {
  return useQuery({
    queryKey: ['couple', couple_id],
    queryFn: () => getCouple({ couple_id }),
    enabled: !!couple_id,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};
