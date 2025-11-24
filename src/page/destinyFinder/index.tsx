import React from 'react';
import * as _ from './style';
import Button from '@/components/button';

const DestinyFinder: React.FC = () => {
  return (
    <_.Container>
      <_.HeaderArea>
        <Button body="다음으로" type="pink" />
      </_.HeaderArea>
    </_.Container>
  );
};

export default DestinyFinder;
