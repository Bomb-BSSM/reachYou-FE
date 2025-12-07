import React from 'react';
import * as _ from './style';
import heartIcon from '@/assets/heart.svg';

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

interface RankingPreviewProps {
  item: CoupleRanking;
  onClick: () => void;
}

const RankingPreview: React.FC<RankingPreviewProps> = ({ item, onClick }) => {
  return (
    <_.RankingCard onClick={onClick}>
      <_.LeftSection>
        <_.Rank>{item.rank}</_.Rank>

        <_.CoupleInfo>
          <_.PersonCard>
            <_.ProfileImage
              src={item.couple.person1.image}
              alt={item.couple.person1.name}
            />
            <_.PersonName>{item.couple.person1.name}</_.PersonName>
          </_.PersonCard>

          <_.HeartIcon src={heartIcon} alt="heart" />

          <_.PersonCard>
            <_.ProfileImage
              src={item.couple.person2.image}
              alt={item.couple.person2.name}
            />
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
  );
};

export default RankingPreview;
