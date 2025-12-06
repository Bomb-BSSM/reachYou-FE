import React from 'react';
import * as _ from './style';
import Logo from '@/assets/Logo.svg';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const navigation = useNavigate();
  return (
    <_.Container>
      <_.LogoImg src={Logo} alt="로고 이미지" />
      <_.ButtonArea>
        <_.Button onClick={() => navigation('/compatibility')}>
          궁합 보기
        </_.Button>
        <_.Button onClick={() => navigation('/destiny-finder')}>
          운명 찾기
        </_.Button>
        <_.Button onClick={() => navigation('/ranking')}>커플 랭킹</_.Button>
      </_.ButtonArea>
    </_.Container>
  );
};

export default Home;
