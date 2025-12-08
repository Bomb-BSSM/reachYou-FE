import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

interface updateUserInforInterface {
  user_id: number;
  username: string;
  mbti: string;
  profile_image_url?: string;
}
const updateUserInformation = async ({
  user_id,
  username,
  mbti,
  profile_image_url = '',
}: updateUserInforInterface) => {
  try {
    await axios.put(`/api/users/${user_id}`, {
      username,
      mbti,
      profile_image_url,
    });
  } catch (error) {
    console.error('사용자 정보 수정 실패: ', error);
    throw error;
  }
};

export const useUpdateUserInformation = () => {
  return useMutation({
    mutationFn: updateUserInformation,
    onError: () => console.log('사용자 정보 수정 오류'),
  });
};
