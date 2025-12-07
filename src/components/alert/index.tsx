import * as _ from './style';
import Button from '@/components/button';

interface AlertProps {
  title: string;
  content?: string;
  onClose?: () => void;
}

const Alert = ({ title, content, onClose }: AlertProps) => {
  return (
    <_.AlertContainer>
      <_.TextDiv>
        <_.TitleText>{title}</_.TitleText>
        <_.ContentText>
          {content ?? '잠시 후 다시 시도하시길 바랍니다.'}
        </_.ContentText>
      </_.TextDiv>
      <Button body="닫기" onClick={onClose} />
    </_.AlertContainer>
  );
};

export default Alert;
