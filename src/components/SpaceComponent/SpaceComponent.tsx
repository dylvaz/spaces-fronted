import React from 'react';

import defaultSpacePhoto from '../../assets/defaultSpacePhoto.jpg';
import './SpaceComponent.css';

interface SpaceComponentProps {
  spaceId: string;
  name: string;
  location: string;
  photoUrl?: string;
  reserveSpace: (
    e: React.MouseEvent<HTMLButtonElement>,
    spaceId: string
  ) => void;
}

const SpaceComponent: React.FC<SpaceComponentProps> = ({
  spaceId,
  name,
  location,
  photoUrl,
  reserveSpace,
}) => {
  return (
    <div className='spaceComponent'>
      {photoUrl ? (
        <img src={photoUrl} alt='' />
      ) : (
        <img src={defaultSpacePhoto} alt='img unavailable' />
      )}
      <label className='name'>{name}</label>
      <br />
      <label className='spaceId'>{spaceId}</label>
      <br />
      <label className='location'>{location}</label>
      <br />
      <button onClick={(e) => reserveSpace(e, spaceId)}>Reserve</button>
    </div>
  );
};

export default SpaceComponent;
