import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

interface createUserInforInterface {
  username: string;
  mbti: string;
  profile_image_url: string;
}
interface createUserInforRes {
  success: boolean;
  message: string;
  user: {
    user_id: number;
    username: string;
    mbti: string;
    profile_image_url: string;
  };
}
const createUserInformation = async ({
  username,
  mbti,
  profile_image_url,
}: createUserInforInterface) => {
  try {
    const response: createUserInforRes = await axios.post(
      `http://127.0.0.1:8000/api/users`,
      {
        username: username,
        mbti: mbti,
        profile_image_url: profile_image_url,
      }
    );
    return response.user;
  } catch (error) {
    console.error('유저 정보 추가 에러: ', error);
  }
};

export const useCreateUserInformation = () => {
  return useMutation({
    mutationFn: createUserInformation,
    onError: () => console.log('유저 정보 추가 실패'),
  });
};
