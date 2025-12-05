import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

interface deleteUserInforInterface {
  user_id: number;
}
const deleteUserInformation = async ({ user_id }: deleteUserInforInterface) => {
  try {
    await axios.delete(`http://127.0.0.1:8000/api/users/${user_id}`);
  } catch (error) {
    console.error('사용자 정보 삭제 오류: ', error);
    throw error;
  }
};

export const useDeleteUserInformation = () => {
  return useMutation({
    mutationFn: deleteUserInformation,
    onError: () => console.log('사용자 정보 삭제 실패'),
  });
};
