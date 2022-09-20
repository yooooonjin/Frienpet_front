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

export type LostPet = {
  lostpetid?: string;
  petid?: string;
  userid?: string;
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

export type LostAnimal = Animal &
  LostPet & { photo: Photo[] } & { helpers: Helper[] };

const LostPetPage = () => {
  const { email, name, phone } = useSelector(
    (state: RootState) => state.user.loggedInfo
  );
  const [lostPetPop, setLostPetPop] = useState(false);
  const [lostAnimals, setLostAnimals] = useState<Array<LostAnimal>>();

  const [lostMyPet, setLostMyPet] = useState<LostAnimal>();
  const [helping, setHelping] = useState<LostAnimal>();

  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    getLostAnimalsData();
  }, []);

  useEffect(() => {
    getLostPetByParam({ userid: email }).then((lostpet) => {
      if (lostpet) {
        getHelpers(lostpet?.lostpetid).then((helpers) =>
          setLostMyPet({ ...lostpet, helpers })
        );
      }
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

  const getLostAnimalsData = async () => {
    const result = await getLostAnimals();
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

  const onDelete = (e: React.MouseEvent<HTMLDivElement>) => {
    const { id } = e.currentTarget;

    if (id === 'myLostPet') {
      deleteLostPet(lostMyPet?.lostpetid!);
    } else if (id === 'helping') {
      deleteHelping(email);
    }

    getLostAnimalsData();
  };

  return (
    <>
      {(lostMyPet || helping) && (
        <div className={styles.lostMyPet_container}>
          <div className={styles.lostMyPet}>
            {lostMyPet && (
              <InfoSharing lostInfo={lostMyPet} onDelete={onDelete} />
            )}
            {lostMyPet && helping && <p className={styles.line}></p>}
            {helping && <InfoSharing lostInfo={helping} onDelete={onDelete} />}
          </div>
        </div>
      )}
      <section className={styles.lostpet_container}>
        <div className={styles.lostpet}>
          <div className={styles.write} onClick={onRegistration}>
            등록하기
          </div>
          <div className={styles.lostAnimals}>
            {lostAnimals?.map((animal) => {
              return (
                <div className={styles.animal} key={animal.lostpetid}>
                  <div>
                    <div className={styles.info}>
                      <div className={styles.lostInfo}>
                        <div className={styles.location}>
                          <FontAwesomeIcon
                            icon={faLocationDot}
                            className={styles.locationIcon}
                          />
                          <div>{animal.location}</div>
                        </div>
                        <div className={styles.datetime}>
                          <div className={styles.date}>
                            {moment(animal.createddate).format('MM월 DD일')}
                          </div>
                          <div className={styles.time}>
                            {moment(animal.createddate).format('HH시 mm분')}
                          </div>
                        </div>
                      </div>
                      <div className={styles.animalPhoto}>
                        {animal.photo.map((photo, idx) => {
                          return (
                            <img
                              className={styles.photo}
                              src={photo.url}
                              key={idx}
                            />
                          );
                        })}
                      </div>
                      <div className={styles.character}>
                        {animal.upkind && <div>{animal.upkind}</div>}
                        {animal.kind && <div>{animal.kind}</div>}
                        {animal.color && <div>{animal.color}</div>}
                        {animal.weight && <div>{animal.weight}kg</div>}
                        {animal.gender && (
                          <div>{animal.gender === 'F' ? '암컷' : '수컷'}</div>
                        )}
                      </div>
                    </div>
                  </div>
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
