import React from 'react';
import * as _ from './style';
import { useNavigate } from 'react-router-dom';
import normalProfile from '@/assets/normalProfileImg.svg';
import Button from '@/components/button';
import RankingPreview from '@/components/rankingPreview';

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

  const displayRankings = rankings || defaultRankings;

  const handleBack = () => {
    navigate('/');
  };

  const handleCardClick = (item: CoupleRanking) => {
    navigate('/ranking-detail', {
      state: {
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

  return (
    <_.Container>
      <_.Header>
        <_.Title>커플랭킹</_.Title>
        <Button body="돌아가기" type="pink" onClick={handleBack} />
      </_.Header>

      <_.RankingList>
        {displayRankings.map((item) => (
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
