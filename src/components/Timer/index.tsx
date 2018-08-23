import * as React from 'react';
import Timeago from 'timeago-react';
import timeago from 'timeago.js';
import ko from 'timeago.js/locales/ko';

timeago.register('ko', ko);

interface IProps {
  datetime: string;
}

const Timer: React.SFC<IProps> = ({ datetime }) => {
  return (
    <Timeago
      datetime={datetime}
      locale={'ko'}
      live={false}
    />
  );
}

export default Timer;