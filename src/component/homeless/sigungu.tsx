import React, { FunctionComponent, useEffect, useRef, useState } from 'react';
import { getSiGunGu } from '../../service/abandoned_animal_api';

interface SiGunGuProps {
  selectedSido: string;
  onFilterChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ): void;
  onReset(): void;
}

type Sigungu = {
  orgCd: string;
  orgdownNm: string;
};

const SiGunGu: FunctionComponent<SiGunGuProps> = ({
  selectedSido,
  onFilterChange,
  onReset,
}) => {
  const [sigungu, setSigungu] = useState([]);

  const selectRef = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    if (selectedSido) {
      getSiGunGu(selectedSido).then((data: any) => {
        if (data.data.response.body.items.item) {
          setSigungu(data.data.response.body.items.item);
        } else {
          setSigungu([]);
        }
      });
    } else {
      setSigungu([]);
    }
    onReset();
  }, [selectedSido]);

  return (
    <select ref={selectRef} name='org_cd' id='org_cd' onChange={onFilterChange}>
      <option value=''>전체</option>
      {sigungu.map((data: Sigungu) => {
        return (
          <option key={data.orgCd} value={data.orgCd}>
            {data.orgdownNm}
          </option>
        );
      })}
    </select>
  );
};

export default SiGunGu;
