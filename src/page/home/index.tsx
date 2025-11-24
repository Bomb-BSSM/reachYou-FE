import React from 'react';
import * as _ from './style';
import Logo from '@/assets/Logo.svg';
import Button from '@/components/button';

const Home: React.FC = () => {
  return (
    <_.Container>
      <_.LogoImg src={Logo} alt="로고 이미지" />
      <_.ButtonArea>
        <Button body="궁합 보기" />
        <Button body="운명 찾기" />
        <Button body="커플 랭킹" />
      </_.ButtonArea>
    </_.Container>
  );
};

export default Home;
