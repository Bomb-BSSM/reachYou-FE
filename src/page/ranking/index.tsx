import React, { useEffect } from 'react';
import * as _ from './style';
import { useNavigate } from 'react-router-dom';
import normalProfile from '@/assets/normalProfileImg.svg';
import Button from '@/components/button';
import RankingPreview from '@/components/rankingPreview';
import LoadingSpinner from '@/components/loadingSpinner';
import { useGetCoupleRanking } from '@/api/couples/coupleRanking';
import { useAlert } from '@/contexts/AlertContext';

interface CoupleRanking {
  rank: number;
  couple: {
    person1: {
      name: string;
      image: string;
    };
    person2: {
      name: string;
      image: string;
    };
  };
  coupleName: string;
  score: number;
  rating: number;
  coupleId?: number;
}

interface RankingProps {
  rankings?: CoupleRanking[];
}

const Ranking: React.FC<RankingProps> = ({ rankings }) => {
  const navigate = useNavigate();
  const { data, isLoading, isError } = useGetCoupleRanking();
  const { showAlert } = useAlert();

  const defaultRankings: CoupleRanking[] = [];

  const apiRankings: CoupleRanking[] =
    data?.ranking.map(item => ({
      rank: item.rank,
      couple: {
        person1: {
          name: item.user_a.username,
          image: item.user_a.profile_image_url || normalProfile,
        },
        person2: {
          name: item.user_b.username,
          image: item.user_b.profile_image_url || normalProfile,
        },
      },
      coupleName: item.couple_name,
      score: item.score,
      rating: item.average_rating,
      coupleId: item.couple_id,
    })) || [];

  const displayRankings =
    rankings || (apiRankings.length > 0 ? apiRankings : defaultRankings);

  useEffect(() => {
    if (isError) {
      showAlert(
        '데이터를 불러오는데 실패했습니다.',
        '잠시 후 다시 시도해주세요.',
        () => {
          navigate('/');
        }
      );
    }
  }, [isError, navigate, showAlert]);

  const handleBack = () => {
    navigate('/');
  };

  const handleCardClick = (item: CoupleRanking) => {
    if (!item.coupleId) return;

    navigate('/ranking-detail', {
      state: {
        coupleId: item.coupleId,
      },
    });
  };

  if (isLoading || isError) {
    return (
      <_.Container>
        <_.Header>
          <_.Title>커플랭킹</_.Title>
          <Button body="돌아가기" type="pink" onClick={handleBack} />
        </_.Header>
        {isLoading && (
          <_.LoadingContainer>
            <LoadingSpinner size={60} />
            <_.LoadingText>로딩 중...</_.LoadingText>
          </_.LoadingContainer>
        )}
      </_.Container>
    );
  }

  return (
    <_.Container>
      <_.Header>
        <_.Title>커플랭킹</_.Title>
        <Button body="돌아가기" type="pink" onClick={handleBack} />
      </_.Header>

      <_.RankingList>
        {displayRankings.map(item => (
          <RankingPreview
            key={item.rank}
            item={item}
            onClick={() => handleCardClick(item)}
          />
        ))}
      </_.RankingList>
    </_.Container>
  );
};

export default Ranking;
