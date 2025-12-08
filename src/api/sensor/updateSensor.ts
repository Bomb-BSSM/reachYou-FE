import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

interface updateSensorInterface {
  user_id: number;
  heart_rate: number;
  temperature: number;
}

const updateSensor = async ({
  user_id,
  heart_rate,
  temperature,
}: updateSensorInterface) => {
  try {
    await axios.post(`/api/fated-match/update-sensor`, {
      user_id: user_id,
      heart_rate: heart_rate,
      temperature: temperature,
    });
  } catch (error) {
    console.error('센서 데이터 업데이트 실패: ', error);
    throw error;
  }
};

export const useUpdateSensor = () => {
  return useMutation({
    mutationFn: updateSensor,
    onError: () => console.log('센서 데이터 업데이트 실패'),
  });
};
