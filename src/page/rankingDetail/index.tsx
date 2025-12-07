import React, { useState } from 'react';
import * as _ from './style';
import { useNavigate, useLocation } from 'react-router-dom';
import normalProfile from '@/assets/normalProfileImg.svg';
import sendBtn from '@/assets/sendBtnActive.svg';
import Button from '@/components/button';
import { useAlert } from '@/contexts/AlertContext';
import { formatRelativeTime, getCurrentDate } from '@/utils/date';
import dayjs from 'dayjs';

interface Comment {
  id: number;
  rating: number;
  text: string;
  createdAt: string;
}

interface RankingDetailProps {
  coupleName?: string;
  person1?: {
    name: string;
    mbti: string;
    image: string;
  };
  person2?: {
    name: string;
    mbti: string;
    image: string;
  };
  score?: number;
  rating?: number;
  heartRateScore?: number;
  temperatureScore?: number;
  mbtiCompatibility?: string;
}

const RankingDetail: React.FC<RankingDetailProps> = props => {
  const navigate = useNavigate();
  const location = useLocation();
  const locationState = location.state as RankingDetailProps | null;
  const { showAlert } = useAlert();

  const coupleName =
    props.coupleName || locationState?.coupleName || '둠칫냐옹';
  const person1 = props.person1 ||
    locationState?.person1 || {
      name: '이원희',
      mbti: 'ISFP',
      image: normalProfile,
    };
  const person2 = props.person2 ||
    locationState?.person2 || {
      name: '이로하',
      mbti: 'INFJ',
      image: normalProfile,
    };
  const score = props.score || locationState?.score || 99;
  const rating = props.rating || locationState?.rating || 4;
  const heartRateScore =
    props.heartRateScore || locationState?.heartRateScore || 99;
  const temperatureScore =
    props.temperatureScore || locationState?.temperatureScore || 88;
  const mbtiCompatibility =
    props.mbtiCompatibility || locationState?.mbtiCompatibility || '매우 좋은';

  const [userRating, setUserRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState<Comment[]>([
    {
      id: 1,
      rating: 4,
      text: '천진난만한 이런 기분도 신이 나서 날아갈 정도로 웃었던 날도 사랑스럽고 소중하게 피울 수 있도록 ㅠㅠ\n너무 귀엽다!!',
      createdAt: dayjs().subtract(1, 'day').toISOString(),
    },
    {
      id: 2,
      rating: 4,
      text: '꿍실 냐옹',
      createdAt: dayjs().subtract(2, 'minute').toISOString(),
    },
  ]);

  const handleBack = () => {
    navigate('/ranking');
  };

  const handleStarClick = (value: number) => {
    setUserRating(value);
  };

  const handleSubmitComment = () => {
    if (userRating === 0) {
      showAlert('별점을 선택해주세요.');
      return;
    }
    if (!commentText.trim()) {
      showAlert('댓글을 작성해주세요.');
      return;
    }

    const newComment: Comment = {
      id: comments.length + 1,
      rating: userRating,
      text: commentText,
      createdAt: getCurrentDate(),
    };

    setComments([newComment, ...comments]);
    setUserRating(0);
    setCommentText('');
  };

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
              <_.Highlight>MBTI</_.Highlight>의 궁합이 {mbtiCompatibility}{' '}
              편입니다!
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
