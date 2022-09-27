import React, { useEffect, useState } from 'react';
import styles from './LostPetPage.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import Write from './write/write';
import { getPetInfo } from '../../apis/pet';
import {
  deleteHelping,
  deleteLostPet,
  getAllHelpers,
  getHelpers,
  getLostAnimals,
  getLostPetByParam,
  saveLostpetHelper,
} from '../../apis/lostPet';
import { Animal } from '../join/JoinPage';
import { getPetPhoto } from '../../apis/photo';
import moment from 'moment';
import { RootState } from '../../modules';
import { useSelector } from 'react-redux';
import Alert from '../../component/alert/alert';
import InfoSharing from '../../component/infoSharing/infoSharing';
import LostInfo from '../../component/lostInfo/lostInfo';
import Range from '../../component/range/range';
import LostPetSkeleton from './skeleton/lostPetSkeleton';

export type LostPet = {
  lostpetid?: string;
  petid?: string;
  userid?: string;
  sido?: string;
  sigungu?: string;
  bname?: string;
  phone?: string;
  location: string;
  desc: string;
  createddate?: string;
};

type Photo = {
  order: string;
  petid: string;
  photoid: string;
  url: string;
};
export type Helper = {
  lostpetid: string;
  userid: string;
  name: string;
  phone: string;
};

export type LostAnimal =
  | Animal & LostPet & { photo: Photo[] } & { helpers: Helper[] };

const LostPetPage = () => {
  const { email, name, phone, sido, sigungu, bname } = useSelector(
    (state: RootState) => state.user.loggedInfo
  );

  const [lostPetPop, setLostPetPop] = useState(false);
  const [lostAnimals, setLostAnimals] = useState<Array<LostAnimal>>();

  const [lostMyPet, setLostMyPet] = useState<LostAnimal | null>();
  const [helping, setHelping] = useState<LostAnimal | null>();

  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const [range, setRange] = useState({ range: 'sigungu', address: sigungu });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getLostPetByParam({ userid: email }).then((lostpet) => {
      console.log(lostpet);

      setLostMyPet(lostpet);
      // if (lostpet) {
      //   getHelpers(lostpet?.lostpetid).then((helpers) =>

      //     setLostMyPet({ ...lostpet, helpers })
      //   );
      // }
    });
  }, [lostAnimals]);

  useEffect(() => {
    getAllHelpers().then((helpers) => {
      const lostInfo = helpers.find((res: Helper) => res.userid === email);
      getLostPetByParam({ lostpetid: lostInfo?.lostpetid }).then((res) => {
        setHelping(res);
      });
    });
  }, [lostAnimals]);

  useEffect(() => {
    range.address && getLostAnimalsData();
  }, [range]);

  const getLostAnimalsData = async () => {
    setIsLoading(true);

    const result = await getLostAnimals(false, range.range, range.address);

    let lostPetInfo: Array<LostAnimal> = [];

    for (const lostpet of result) {
      const petInfo = await getPetInfo(lostpet.userid!);
      const petPhoto = await getPetPhoto(lostpet.petid!);
      const helpers = await getHelpers(lostpet.lostpetid);
      const lostInfo = {
        ...lostpet,
        ...petInfo,
        photo: petPhoto,
        helpers,
      };
      lostPetInfo.push(lostInfo);
    }
    setLostAnimals(lostPetInfo);
    setIsLoading(false);
  };

  const onRegistration = () => {
    if (lostMyPet) {
      onError('이미 등록한 게시글이 존재합니다.');
      return;
    }
    setLostPetPop(true);
  };

  const onParticipate = async (e: React.MouseEvent<HTMLDivElement>) => {
    const { id } = e.currentTarget;

    const lostInfo = lostAnimals?.find(
      (lostAnimal) => lostAnimal.lostpetid === id
    );
    const overlap = lostInfo?.helpers.findIndex(
      (helper) => helper.userid === email
    );

    if (overlap! >= 0) {
      onError('이미 참여중입니다.');
      return;
    } else if (lostInfo?.userid === email) {
      onError('내가 올린 게시글 입니다.');
      return;
    } else if (helping) {
      onError('다른 게시글에 참여중 입니다.');
      return;
    } else if (lostInfo?.helpers.length! >= 6) {
      onError('정원 초과로 참여할 수 없습니다.');
      return;
    }
    const helper = { lostpetid: id, userid: email, name, phone };
    await saveLostpetHelper(helper).then(getLostAnimalsData);
  };

  const onError = (msg: string) => {
    setErrorMsg(msg);
    setError(true);
  };

  const onDelete = async (e: React.MouseEvent<HTMLDivElement>) => {
    const { id } = e.currentTarget;

    if (id === 'myLostPet') {
      await deleteLostPet(lostMyPet?.lostpetid!);
    } else if (id === 'helping') {
      await deleteHelping(email);
    }
    await getLostAnimalsData();
  };

  const onRangeChange = (range: string) => {
    const addrByRange =
      range === 'sido' ? sido : range === 'sigungu' ? sigungu : bname;

    setRange({ range, address: addrByRange });
  };

  return (
    <>
      {(lostMyPet || helping) && (
        <div className={styles.lostMyPet_container}>
          <div className={styles.lostMyPet}>
            {lostMyPet && (
              <InfoSharing lostMyPet={lostMyPet} onDelete={onDelete} />
            )}
            {lostMyPet && helping && <p className={styles.line}></p>}
            {helping && <InfoSharing helping={helping} onDelete={onDelete} />}
          </div>
        </div>
      )}
      <section className={styles.lostpet_container}>
        <div className={styles.lostpet}>
          <div className={styles.header}>
            <div>
              <Range onRangeChange={onRangeChange} />
            </div>
            <div className={styles.write} onClick={onRegistration}>
              등록하기
            </div>
          </div>
          {!isLoading && (
            <div className={styles.lostAnimals}>
              {lostAnimals?.map((animal) => {
                return (
                  <div className={styles.animal_wrap} key={animal.lostpetid}>
                    <LostInfo lostInfo={animal} key={animal.lostpetid} />
                    <div className={styles.desc}>{animal.desc}</div>
                    <div className={styles.helpers}>
                      <div
                        className={styles.participate}
                        id={animal.lostpetid}
                        onClick={onParticipate}
                      >
                        <p>참여하기</p>
                      </div>
                      <div className={styles.helpersInfo}>
                        {animal.helpers?.map((helper, idx) => {
                          return (
                            <div className={styles.helper} key={idx}>
                              {helper.name.substring(0, 1)}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
          {isLoading && <LostPetSkeleton />}
        </div>
        {lostPetPop && (
          <Write
            setLostPetPop={setLostPetPop}
            getLostAnimalsData={getLostAnimalsData}
            userid={email}
            userphone={phone}
          />
        )}
        {error && <Alert message={errorMsg} setError={setError} />}
      </section>
    </>
  );
};

export default LostPetPage;
