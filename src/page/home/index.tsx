import React from 'react';
import * as _ from './style';
import Logo from '@/assets/Logo.svg';

const Home: React.FC = () => {
  return (
    <_.Container>
      <_.LogoImg src={Logo} alt="로고 이미지" />
    </_.Container>
  );
};

export default Home;
