import React, { useState, useEffect } from 'react';
import * as _ from './style';
import { useNavigate, useLocation } from 'react-router-dom';
import normalProfile from '@/assets/normalProfileImg.svg';
import sendBtn from '@/assets/sendBtnActive.svg';
import Button from '@/components/button';
import { useAlert } from '@/contexts/AlertContext';
import { formatRelativeTime, getCurrentDate } from '@/utils/date';
import { useGetCouple } from '@/api/couples/getCouple';
import LoadingSpinner from '@/components/loadingSpinner';
import { useAddStarScope } from '@/api/couples/addStarScope';

interface Comment {
  id: number;
  rating: number;
  text: string;
  createdAt: string;
}

interface LocationState {
  coupleId?: number;
}

const RankingDetail: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const locationState = location.state as LocationState | null;
  const { showAlert } = useAlert();
  const addStarScopeMutation = useAddStarScope();

  const coupleId = locationState?.coupleId;
  const { data, isLoading, isError } = useGetCouple({
    couple_id: coupleId || 0,
  });

  useEffect(() => {
    if (!coupleId) {
      showAlert('잘못된 접근입니다.', '랭킹 페이지로 돌아갑니다.', () => {
        navigate('/ranking');
      });
      return;
    }

    if (isError) {
      showAlert(
        '데이터를 불러오는데 실패했습니다.',
        '잠시 후 다시 시도해주세요.',
        () => {
          navigate('/ranking');
        }
      );
    }
  }, [isError, coupleId, navigate, showAlert]);

  const coupleName = data
    ? `${data.user_a.username} & ${data.user_b.username}`
    : '';

  const person1 = data
    ? {
        name: data.user_a.username,
        mbti: data.user_a.mbti,
        image: data.user_a.profile_image_url || normalProfile,
      }
    : { name: '', mbti: '', image: normalProfile };

  const person2 = data
    ? {
        name: data.user_b.username,
        mbti: data.user_b.mbti,
        image: data.user_b.profile_image_url || normalProfile,
      }
    : { name: '', mbti: '', image: normalProfile };

  const score = data?.score || 0;
  const rating = data?.average_rating || 0;

  // 센서 데이터는 API에서 제공하지 않으므로 기본값 사용
  const heartRateScore = 99;
  const temperatureScore = 88;
  const mbtiCompatibility = 95;

  const [userRating, setUserRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState<Comment[]>([]);

  const handleBack = () => {
    navigate('/ranking');
  };

  const handleStarClick = (value: number) => {
    setUserRating(value);
  };

  const handleSubmitComment = () => {
    if (!coupleId) {
      showAlert('커플 정보를 찾을 수 없습니다.');
      return;
    }
    if (userRating === 0) {
      showAlert('별점을 선택해주세요.');
      return;
    }
    if (!commentText.trim()) {
      showAlert('댓글을 작성해주세요.');
      return;
    }
    addStarScopeMutation.mutate(
      {
        couple_id: coupleId,
        rating: userRating,
        comment: commentText,
      },
      {
        onSuccess: () => {
          const newComment: Comment = {
            id: comments.length + 1,
            rating: userRating,
            text: commentText,
            createdAt: getCurrentDate(),
          };
          setComments([newComment, ...comments]);
        },
        onError: () => showAlert('댓글이 등록되지 않습니다.'),
      }
    );

    setUserRating(0);
    setCommentText('');
  };

  if (isLoading) {
    return (
      <_.Container>
        <_.ContentWrapper>
          <_.Header>
            <_.HeaderLeft>
              <_.CoupleLabel>Couple</_.CoupleLabel>
            </_.HeaderLeft>
            <Button body="돌아가기" type="pink" onClick={handleBack} />
          </_.Header>
          <_.LoadingContainer>
            <LoadingSpinner size={60} />
            <_.LoadingText>로딩 중...</_.LoadingText>
          </_.LoadingContainer>
        </_.ContentWrapper>
      </_.Container>
    );
  }

  return (
    <_.Container>
      <_.ContentWrapper>
        <_.Header>
          <_.HeaderLeft>
            <_.CoupleLabel>Couple</_.CoupleLabel>
            <_.CoupleName>{coupleName}</_.CoupleName>
            <_.StarDisplay>
              {[1, 2, 3, 4, 5].map(star => (
                <_.Star key={star} filled={star <= rating}>
                  ★
                </_.Star>
              ))}
            </_.StarDisplay>
          </_.HeaderLeft>
          <Button body="돌아가기" type="pink" onClick={handleBack} />
        </_.Header>

        <_.ProfileSection>
          <_.ProfileBox>
            <_.ProfileImageWrapper>
              <_.ProfileImage src={person1.image} alt={person1.name} />
            </_.ProfileImageWrapper>
            <_.ProfileInfo>
              <_.ProfileName>{person1.name}</_.ProfileName>
              <_.ProfileMBTI>{person1.mbti}</_.ProfileMBTI>
            </_.ProfileInfo>
          </_.ProfileBox>

          <_.CompatibilityScore>{score}</_.CompatibilityScore>

          <_.ProfileBox>
            <_.ProfileImageWrapper>
              <_.ProfileImage src={person2.image} alt={person2.name} />
            </_.ProfileImageWrapper>
            <_.ProfileInfo>
              <_.ProfileName>{person2.name}</_.ProfileName>
              <_.ProfileMBTI>{person2.mbti}</_.ProfileMBTI>
            </_.ProfileInfo>
          </_.ProfileBox>
        </_.ProfileSection>

        <_.AnalysisSection>
          <_.SectionTitle>유사도 분석</_.SectionTitle>
          <_.AnalysisBox>
            <_.AnalysisText>
              {person1.name} 님은 {person2.name} 님과{' '}
              <_.Highlight>심박도</_.Highlight>가 {heartRateScore}%로 가장
              유사했습니다!
            </_.AnalysisText>
            <_.AnalysisText>
              {person1.name} 님은 {person2.name} 님과{' '}
              <_.Highlight>온도</_.Highlight>가 {temperatureScore}%로
              유사했습니다!
            </_.AnalysisText>
            <_.AnalysisText>
              {person1.name} 님과 {person2.name} 님은{' '}
              <_.Highlight>MBTI</_.Highlight>는 {mbtiCompatibility}%로
              유사했습니다!
            </_.AnalysisText>
          </_.AnalysisBox>
        </_.AnalysisSection>

        <_.CommentSection>
          <_.SectionTitle>별점 남기기</_.SectionTitle>
          <_.CommentInputBox>
            <_.CommentInputLeft>
              <_.StarInputRow>
                {[1, 2, 3, 4, 5].map(star => (
                  <_.StarInput
                    key={star}
                    filled={star <= (hoverRating || userRating)}
                    onClick={() => handleStarClick(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                  >
                    ★
                  </_.StarInput>
                ))}
              </_.StarInputRow>
              <_.CommentInput
                placeholder="어떤 말이든 작성해보세요!"
                value={commentText}
                onChange={e => setCommentText(e.target.value)}
              />
            </_.CommentInputLeft>
            <_.SendButton
              onClick={handleSubmitComment}
              disabled={userRating === 0 || !commentText.trim()}
            >
              <_.SendButtonImage src={sendBtn} alt="전송" />
            </_.SendButton>
          </_.CommentInputBox>

          <_.CommentList>
            {comments.map(comment => (
              <_.CommentCard key={comment.id}>
                <_.CommentStars>
                  {[1, 2, 3, 4, 5].map(star => (
                    <_.Star key={star} filled={star <= comment.rating}>
                      ★
                    </_.Star>
                  ))}
                </_.CommentStars>
                <_.CommentText>{comment.text}</_.CommentText>
                <_.CommentTime>
                  {formatRelativeTime(comment.createdAt)}
                </_.CommentTime>
              </_.CommentCard>
            ))}
          </_.CommentList>
        </_.CommentSection>
      </_.ContentWrapper>
    </_.Container>
  );
};

export default RankingDetail;
