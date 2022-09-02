import React, { FunctionComponent, useEffect, useState } from 'react';
import { getSido } from '../../util/abandoned_animal_api';
import { SidoProps } from './homeless';

type Sido = {
  orgCd: string;
  orgdownNm: string;
};
const Sido: FunctionComponent<SidoProps> = ({
  onSidoChange,
  onFilterChange,
}): JSX.Element => {
  const [sido, setSido] = useState([]);

  useEffect(() => {
    getSido(17).then((data: any) => {
      setSido(data.data.response.body.items.item);
    });
  }, []);

  const handleChangeSido = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onSidoChange(e.target.value);
    onFilterChange(e);
  };

  return (
    <select name='upr_cd' id='upr_cd' onChange={handleChangeSido}>
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
