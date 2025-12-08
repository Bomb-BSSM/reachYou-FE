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
}

interface RankingProps {
  rankings?: CoupleRanking[];
}

const Ranking: React.FC<RankingProps> = ({ rankings }) => {
  const navigate = useNavigate();
  const { data, isLoading, isError } = useGetCoupleRanking();
  const { showAlert } = useAlert();

  const defaultRankings: CoupleRanking[] = [
    {
      rank: 1,
      couple: {
        person1: { name: '이원희', image: normalProfile },
        person2: { name: '이로하', image: normalProfile },
      },
      coupleName: '둠칫냐옹',
      score: 100,
      rating: 4,
    },
    {
      rank: 2,
      couple: {
        person1: { name: '이원희', image: normalProfile },
        person2: { name: '이로하', image: normalProfile },
      },
      coupleName: '빌려온 고양이',
      score: 99,
      rating: 5,
    },
    {
      rank: 3,
      couple: {
        person1: { name: '이원희', image: normalProfile },
        person2: { name: '이로하', image: normalProfile },
      },
      coupleName: '한정판 콩국수',
      score: 88,
      rating: 4,
    },
    {
      rank: 4,
      couple: {
        person1: { name: '이원희', image: normalProfile },
        person2: { name: '이로하', image: normalProfile },
      },
      coupleName: '한정판 콩국수',
      score: 77,
      rating: 3,
    },
  ];

  // API 데이터를 컴포넌트 형식으로 변환
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
      rating: 0, // API에 rating 정보가 없으므로 기본값 설정
    })) || [];

  const displayRankings =
    rankings || (apiRankings.length > 0 ? apiRankings : defaultRankings);

  useEffect(() => {
    if (isError) {
      showAlert('데이터를 불러오는데 실패했습니다.', '잠시 후 다시 시도해주세요.', () => {
        navigate('/');
      });
    }
  }, [isError, navigate, showAlert]);

  const handleBack = () => {
    navigate('/');
  };

  const handleCardClick = (item: CoupleRanking, coupleId?: number) => {
    navigate('/ranking-detail', {
      state: {
        coupleId: coupleId,
        coupleName: item.coupleName,
        person1: {
          name: item.couple.person1.name,
          mbti: 'ISFP',
          image: item.couple.person1.image,
        },
        person2: {
          name: item.couple.person2.name,
          mbti: 'INFJ',
          image: item.couple.person2.image,
        },
        score: item.score,
        rating: item.rating,
        heartRateScore: 99,
        temperatureScore: 88,
        mbtiCompatibility: '매우 좋은',
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
        {displayRankings.map((item, index) => {
          const coupleId = data?.ranking[index]?.couple_id;
          return (
            <RankingPreview
              key={item.rank}
              item={item}
              onClick={() => handleCardClick(item, coupleId)}
            />
          );
        })}
      </_.RankingList>
    </_.Container>
  );
};

export default Ranking;
