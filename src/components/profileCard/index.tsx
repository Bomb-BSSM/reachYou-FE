import React from 'react';
import * as _ from './style';
import Button from '@/components/button';

interface ProfileCardProps {
  name: string;
  mbti: string;
  imageUrl?: string;
  onEdit?: () => void;
  onDelete?: () => void;
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  name,
  mbti,
  imageUrl,
  onEdit,
  onDelete,
}) => {
  return (
    <_.Card>
      <_.ProfileImage>
        {imageUrl ? (
          <_.ProfileImg src={imageUrl} alt={name} />
        ) : (
          <_.DefaultAvatar>
            <_.AvatarHead />
            <_.AvatarBody />
          </_.DefaultAvatar>
        )}
      </_.ProfileImage>

      <_.InfoSection>
        <_.Name>{name}</_.Name>
        <_.Mbti>{mbti}</_.Mbti>
      </_.InfoSection>

      <_.ButtonGroup>
        <Button body="수정 " type="pink" onClick={onEdit} />
        <Button body="삭제" type="white" onClick={onDelete} />
      </_.ButtonGroup>
    </_.Card>
  );
};

export default ProfileCard;
