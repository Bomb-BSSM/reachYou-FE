import React from 'react';
import * as _ from './style';
import { useNavigate } from 'react-router-dom';
import normalProfile from '@/assets/normalProfileImg.svg';
import heartIcon from '@/assets/heart.svg';
import Button from '@/components/button';

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

  return (
    <_.Container>
      <_.ContentWrapper>
        <_.Header>
          <_.Title>커플랭킹</_.Title>
          <Button body="돌아가기" type="pink" onClick={handleBack} />
        </_.Header>

        <_.RankingList>
          {displayRankings.map((item) => (
            <_.RankingCard key={item.rank}>
              <_.LeftSection>
                <_.Rank>{item.rank}</_.Rank>

                <_.CoupleInfo>
                  <_.PersonCard>
                    <_.ProfileImage src={item.couple.person1.image} alt={item.couple.person1.name} />
                    <_.PersonName>{item.couple.person1.name}</_.PersonName>
                  </_.PersonCard>

                  <_.HeartIcon src={heartIcon} alt="heart" />

                  <_.PersonCard>
                    <_.ProfileImage src={item.couple.person2.image} alt={item.couple.person2.name} />
                    <_.PersonName>{item.couple.person2.name}</_.PersonName>
                  </_.PersonCard>
                </_.CoupleInfo>

                <_.CoupleName>{item.coupleName}</_.CoupleName>
              </_.LeftSection>

              <_.RightSection>
                <_.ScoreBox>
                  <_.ScoreLabel>점수</_.ScoreLabel>
                  <_.Score>{item.score}</_.Score>
                </_.ScoreBox>

                <_.StarRating>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <_.Star key={star} filled={star <= item.rating}>
                      ★
                    </_.Star>
                  ))}
                </_.StarRating>
              </_.RightSection>
            </_.RankingCard>
          ))}
        </_.RankingList>
      </_.ContentWrapper>
    </_.Container>
  );
};

export default Ranking;
