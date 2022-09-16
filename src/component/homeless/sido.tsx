import React, { FunctionComponent, useEffect, useRef, useState } from 'react';
import { getSido } from '../../service/abandoned_animal_api';

interface SidoProps {
  onSidoChange(e: React.ChangeEvent<HTMLSelectElement>): void;
  userSido?: string;
}

type Sido = {
  orgCd: string;
  orgdownNm: string;
};
const Sido: FunctionComponent<SidoProps> = ({
  onSidoChange,
  userSido,
}): JSX.Element => {
  const [sido, setSido] = useState([]);

  useEffect(() => {
    getSido(17).then((data: any) => {
      setSido(data.data.response.body.items.item);
    });
  }, []);

  const handleChangeSido = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onSidoChange(e);
  };

  return (
    <select
      name='upr_cd'
      id='upr_cd'
      onChange={handleChangeSido}
      value={userSido && userSido}
      disabled={userSido ? true : false}
    >
      <option value=''>전체</option>
      {sido.map((data: Sido) => {
        return (
          <option key={data.orgCd} value={data.orgCd}>
            {data.orgdownNm}
          </option>
        );
      })}
    </select>
  );
};

export default Sido;
