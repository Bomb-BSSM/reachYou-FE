import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

interface getUserInterface {
  user_id: number;
}
interface getUserResponse {
  user_id: number;
  username: string;
  mbti: string;
  profile_image_url: string;
}

const getUser = async ({ user_id }: getUserInterface) => {
  try {
    const response = axios.get<getUserResponse>(`/api/users/${user_id}`);
    return response;
  } catch (error) {
    console.error('사용자 조회 실패: ', error);
    throw error;
  }
};

export const useGetUser = ({ user_id }: getUserInterface) => {
  return useQuery({
    queryKey: ['user', user_id],
    queryFn: () => getUser,
    staleTime: 10 * 60 * 1000,
    gcTime: 15 * 60 * 1000,
  });
};
