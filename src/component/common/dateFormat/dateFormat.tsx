import React from 'react';

const DateFormat = ({ date, division }: { date: string; division: string }) => {
  return (
    <>
      {date.slice(0, 4) +
        `${division}` +
        date.slice(4, 6) +
        `${division}` +
        date.slice(6, 8)}
    </>
  );
};

export default DateFormat;
