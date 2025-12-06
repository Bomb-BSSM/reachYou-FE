import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

interface getFinderDestinyInterface {
  user_id: number;
  current_user: {
    username: string;
    mbti: string;
    profile_image_url: string;
    heart_rate: number;
    temperature: number;
  };
  match_count: number;
  fated_matches: {
    user_id: number;
    username: string;
    mbti: string;
    profile_image_url: string;
    compatibility_score: number;
    mbti_score: number;
    heart_rate_score: number;
    temperature_score: number;
  }[];
}
interface getDestinyProps {
  user_id: number;
}

const getFinderDestiny = async ({ user_id }: getDestinyProps) => {
  try {
    const response = await axios.get<getFinderDestinyInterface>(
      `/api/fated-match/${user_id}`
    );
    return response;
  } catch (error) {
    console.error('운명의 상대 결과 불러오기 실패: ', error);
    throw error;
  }
};
export const useGetFinderDestiny = ({ user_id }: getDestinyProps) => {
  return useQuery({
    queryKey: ['finderDestiny', user_id],
    queryFn: () => getFinderDestiny({ user_id }),
    enabled: !!user_id,
    staleTime: 10 * 60 * 1000,
    gcTime: 15 * 60 * 1000,
  });
};
