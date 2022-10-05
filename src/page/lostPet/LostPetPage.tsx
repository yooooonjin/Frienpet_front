import React, { useEffect, useState } from 'react';
import styles from './LostPetPage.module.css';
import Write from './write/write';
import { getPetInfo } from '../../apis/pet';
import * as lostPetData from '../../apis/lostPet';
import { Animal } from '../join/JoinPage';
import { getPetPhoto } from '../../apis/photo';
import { RootState } from '../../modules';
import { useSelector } from 'react-redux';
import Alert from '../../component/common/alert/alert';
import InfoSharing from '../../component/infoSharing/infoSharing';
import LostInfo from '../../component/lostInfo/lostInfo';
import Range from '../../component/common/range/range';
import LostPetSkeleton from './skeleton/lostPetSkeleton';
import EmptyMsg from '../../component/common/emptyMsg/emptyMsg';
import Button from '../../component/common/button/button';

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

  const [showWritePopup, setShowWritePopup] = useState(false);
  const [lostAnimals, setLostAnimals] = useState<Array<LostAnimal>>();

  const [lostMyPet, setLostMyPet] = useState<LostAnimal | null>();
  const [helping, setHelping] = useState<LostAnimal | null>();

  const [range, setRange] = useState({ range: 'sigungu', address: sigungu });

  const [error, setError] = useState({ status: false, msg: '' });
  const [isLoading, setIsLoading] = useState(true);

  //내가 등록한 게시글
  useEffect(() => {
    lostPetData.getLostPetByParam({ userid: email }).then((lostpet) => {
      setLostMyPet(lostpet);
    });
  }, [lostAnimals]);

  //도움을 주고있는 게시글
  useEffect(() => {
    lostPetData.getAllHelpers().then((helpers) => {
      const lostInfo = helpers.find((res: Helper) => res.userid === email);
      lostPetData
        .getLostPetByParam({ lostpetid: lostInfo?.lostpetid })
        .then((res) => {
          setHelping(res);
        });
    });
  }, [lostAnimals]);

  //범위 선택 시 지정 범위에 맞는 데이터 불러오기
  useEffect(() => {
    range.address && getLostAnimalsData();
  }, [range]);

  //데이터 불러오기
  const getLostAnimalsData = async () => {
    setIsLoading(true);

    const result = await lostPetData.getLostAnimals(
      false,
      range.range,
      range.address
    );
    let lostPetInfo: Array<LostAnimal> = [];
    //잃어버린 상황 정보
    for (const lostpet of result) {
      const petInfo = await getPetInfo(lostpet.userid!); //반려동물 정보
      const photo = await getPetPhoto(lostpet.petid!); //반려동물 사진
      const helpers = await lostPetData.getHelpers(lostpet.lostpetid); //도움을 주고있는 사람들
      const lostInfo = {
        ...lostpet,
        ...petInfo,
        photo,
        helpers,
      };
      lostPetInfo.push(lostInfo);
    }
    setLostAnimals(lostPetInfo);
    setIsLoading(false);
  };

  //등록하기 버튼 클릭 시
  const onRegistration = () => {
    if (lostMyPet) {
      setError({ status: true, msg: '이미 등록한 게시글이 존재합니다.' });
      return;
    }
    setShowWritePopup(true);
  };

  //참여하기 버튼 클릭 시
  const onParticipate = async (e: React.MouseEvent<HTMLDivElement>) => {
    const { id } = e.currentTarget;

    const selectedPost = lostAnimals?.find(
      (lostAnimal) => lostAnimal.lostpetid === id
    );
    const duplicate = selectedPost?.helpers.findIndex(
      (helper) => helper.userid === email
    );

    if (duplicate! >= 0) {
      setError({ status: true, msg: '이미 참여중입니다.' });
      return;
    } else if (selectedPost?.userid === email) {
      setError({ status: true, msg: '내가 올린 게시글 입니다.' });
      return;
    } else if (helping) {
      setError({ status: true, msg: '다른 게시글에 참여중 입니다.' });
      return;
    } else if (selectedPost?.helpers.length! >= 6) {
      setError({ status: true, msg: '정원 초과로 참여할 수 없습니다.' });
      return;
    }
    const helper = { lostpetid: id, userid: email, name, phone };
    await lostPetData.saveLostpetHelper(helper).then(getLostAnimalsData);
  };

  //삭제 버튼 클릭 시
  const onDelete = async (e: React.MouseEvent<HTMLDivElement>) => {
    const { id } = e.currentTarget;
    if (id === 'myLostPet') {
      await lostPetData.deleteLostPet(lostMyPet?.lostpetid!);
    } else if (id === 'helping') {
      await lostPetData.deleteHelping(email);
    }
    await getLostAnimalsData();
  };

  //범위 변경
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
            <Button msg='등록하기' onClick={onRegistration} />
          </div>
          {lostAnimals?.length === 0 && !isLoading && <EmptyMsg />}
          {isLoading ? (
            <LostPetSkeleton />
          ) : (
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
        </div>
        {showWritePopup && (
          <Write
            setShowWritePopup={setShowWritePopup}
            getLostAnimalsData={getLostAnimalsData}
            userid={email}
            userphone={phone}
          />
        )}
        {error.status && <Alert message={error.msg} setErrorMsg={setError} />}
      </section>
    </>
  );
};

export default LostPetPage;
