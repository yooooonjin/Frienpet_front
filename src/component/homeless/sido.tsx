import React, { FunctionComponent, useEffect, useRef, useState } from 'react';
import { getSido } from '../../service/abandoned_animal_api';

interface SidoProps {
  onSidoChange(e: React.ChangeEvent<HTMLSelectElement>): void;
}

type Sido = {
  orgCd: string;
  orgdownNm: string;
};
const Sido: FunctionComponent<SidoProps> = ({ onSidoChange }): JSX.Element => {
  const [sido, setSido] = useState<Array<Sido>>();

  useEffect(() => {
    if (!sido) {
      getSido(17).then((data: any) => {
        if (data.data.response) {
          setSido(data.data.response.body.items.item);
        } else {
          setSido([]);
        }
      });
    }
  }, [sido]);

  const handleChangeSido = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onSidoChange(e);
  };

  return (
    <select name='upr_cd' id='upr_cd' onChange={handleChangeSido}>
      <option value=''>전체</option>
      {sido?.map((data: Sido) => {
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
