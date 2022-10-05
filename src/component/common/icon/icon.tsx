import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faDog,
  faCat,
  faCircleExclamation,
  faAngleRight,
  faAngleLeft,
  faPaperPlane,
  faClock,
  faMagnifyingGlassLocation,
  faComments,
  faHouseMedical,
  faLocationDot,
  faPhone,
  faCircleXmark,
  faTrashCan,
  faHeart,
  faCircleUser,
  faCircleCheck,
  faUserPen,
  faRightFromBracket,
} from '@fortawesome/free-solid-svg-icons';

const Icon = ({ icon }: { icon: string }) => {
  return (
    <>
      {icon === 'Left' ? (
        <FontAwesomeIcon icon={faAngleLeft} />
      ) : icon === 'Right' ? (
        <FontAwesomeIcon icon={faAngleRight} />
      ) : icon === 'Dog' ? (
        <FontAwesomeIcon icon={faDog} />
      ) : icon === 'Cat' ? (
        <FontAwesomeIcon icon={faCat} />
      ) : icon === 'Exclamation' ? (
        <FontAwesomeIcon icon={faCircleExclamation} />
      ) : icon === 'PaperPlane' ? (
        <FontAwesomeIcon icon={faPaperPlane} />
      ) : icon === 'Clock' ? (
        <FontAwesomeIcon icon={faClock} />
      ) : icon === 'discovery' ? (
        <FontAwesomeIcon icon={faMagnifyingGlassLocation} />
      ) : icon === 'lostPet' ? (
        <FontAwesomeIcon icon={faComments} />
      ) : icon === 'homeless' ? (
        <FontAwesomeIcon icon={faHouseMedical} />
      ) : icon === 'LocationDot' ? (
        <FontAwesomeIcon icon={faLocationDot} />
      ) : icon === 'Phone' ? (
        <FontAwesomeIcon icon={faPhone} />
      ) : icon === 'CircleXmark' ? (
        <FontAwesomeIcon icon={faCircleXmark} />
      ) : icon === 'TrashCan' ? (
        <FontAwesomeIcon icon={faTrashCan} />
      ) : icon === 'Heart' ? (
        <FontAwesomeIcon icon={faHeart} />
      ) : icon === 'User' ? (
        <FontAwesomeIcon icon={faCircleUser} />
      ) : icon === 'CircleCheck' ? (
        <FontAwesomeIcon icon={faCircleCheck} />
      ) : icon === 'UserPen' ? (
        <FontAwesomeIcon icon={faUserPen} />
      ) : icon === 'RightFromBracket' ? (
        <FontAwesomeIcon icon={faRightFromBracket} />
      ) : (
        ''
      )}
    </>
  );
};

export default Icon;
