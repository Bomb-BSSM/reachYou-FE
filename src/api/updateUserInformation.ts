import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

interface updateUserInforInterface {
  user_id: string;
  username: string;
  mbti: string;
  profile_image_url: string;
}
const updateUserInformatioin = async ({
  user_id,
  username,
  mbti,
  profile_image_url,
}: updateUserInforInterface) => {
  try {
    await axios.put(`http://127.0.0.1:8000/api/users/${user_id}`, {
      username: username,
      mbti: mbti,
      profile_image_url: profile_image_url,
    });
  } catch (error) {
    console.error('사용자 정보 수정 실패: ', error);
  }
};

export const useUpdateUserInformation = () => {
  useMutation({
    mutationFn: updateUserInformatioin,
    onError: () => console.log('사용자 정보 수정 오류'),
  });
};
