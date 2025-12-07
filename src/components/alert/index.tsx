import * as _ from './style';
import Button from '@/components/button';

interface AlertProps {
  title: string;
  content?: string;
  onClose?: () => void;
}

const Alert = ({ title, content, onClose }: AlertProps) => {
  return (
    <_.Overlay onClick={onClose}>
      <_.AlertContainer onClick={e => e.stopPropagation()}>
        <_.TextDiv>
          <_.TitleText>{title}</_.TitleText>
          <_.ContentText>
            {content ?? '잠시 후 다시 시도하시길 바랍니다.'}
          </_.ContentText>
        </_.TextDiv>
        <_.ButtonDiv>
          <Button body="닫기" onClick={onClose} type="pink" />
        </_.ButtonDiv>
      </_.AlertContainer>
    </_.Overlay>
  );
};

export default Alert;
