import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

interface UserInfo {
  user_id: number;
  username: string;
  mbti: string;
  profile_image_url: string;
}

interface CoupleRankingItem {
  couple_id: number;
  rank: number;
  user_a: UserInfo;
  user_b: UserInfo;
  score: number;
  average_rating: number;
  rating_count: number;
  couple_name: string;
  created_at: string;
}

interface CoupleRankingResponse {
  count: number;
  ranking: CoupleRankingItem[];
}

const getCoupleRanking = async () => {
  try {
    const response = await axios.get<CoupleRankingResponse>(
      '/api/couples/ranking'
    );
    return response.data;
  } catch (error) {
    console.error('커플 랭킹 불러오기 실패: ', error);
    throw error;
  }
};

export const useGetCoupleRanking = () => {
  return useQuery({
    queryKey: ['coupleRanking'],
    queryFn: getCoupleRanking,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};
