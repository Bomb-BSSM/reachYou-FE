import React, { useState, useRef } from 'react';
import * as _ from './style';
import Button from '@/components/button';
import normalProfile from '@/assets/normalProfileImg.svg';
import { MBTI_OPTIONS } from '@/utils/mbti';

interface ProfileCardProps {
  name: string;
  mbti: string;
  imageUrl?: string;
  onEdit?: (name: string, mbti: string) => void;
  onDelete?: () => void;
  onImageChange?: (imageUrl: string) => void;
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  name,
  mbti,
  imageUrl,
  onEdit,
  onDelete,
  onImageChange,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(name);
  const [editMbti, setEditMbti] = useState(mbti);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleEditClick = () => {
    setIsEditing(true);
    setEditName(name);
    setEditMbti(mbti);
  };

  const handleSave = () => {
    if (onEdit) {
      onEdit(editName, editMbti);
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditName(name);
    setEditMbti(mbti);
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageUrl = reader.result as string;
        if (onImageChange) {
          onImageChange(imageUrl);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <_.Card>
      <_.ProfileImage onClick={handleImageClick}>
        {imageUrl ? (
          <_.ProfileImg src={imageUrl} alt={name} />
        ) : (
          <_.ProfileImg src={normalProfile} />
        )}
      </_.ProfileImage>
      <_.HiddenFileInput
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleImageChange}
      />

      <_.InfoSection>
        {isEditing ? (
          <>
            <_.EditInput
              type="text"
              value={editName}
              onChange={e => setEditName(e.target.value)}
              placeholder="이름"
            />
            <_.EditSelect
              value={editMbti}
              onChange={e => setEditMbti(e.target.value)}
            >
              {MBTI_OPTIONS.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </_.EditSelect>
          </>
        ) : (
          <>
            <_.Name>{name}</_.Name>
            <_.Mbti>{mbti}</_.Mbti>
          </>
        )}
      </_.InfoSection>

      <_.ButtonGroup>
        {isEditing ? (
          <>
            <Button body="저장" type="pink" onClick={handleSave} />
            <Button body="취소" type="white" onClick={handleCancel} />
          </>
        ) : (
          <>
            {onEdit && (
              <Button body="수정 " type="pink" onClick={handleEditClick} />
            )}
            {onDelete && <Button body="삭제" type="white" onClick={onDelete} />}
          </>
        )}
      </_.ButtonGroup>
    </_.Card>
  );
};

export default ProfileCard;
