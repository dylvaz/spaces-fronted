import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import ConfirmModal from '../../components/ConfirmModal/ConfirmModal';
import SpaceComponent from '../../components/SpaceComponent/SpaceComponent';
import { Space } from '../../model/Model';
import { DataService } from '../../services/DataService';

interface SpacesProps {
  dataService: DataService;
}

const Spaces: React.FC<SpacesProps> = ({ dataService }) => {
  const [spaces, setSpaces] = useState<Space[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalContent, setModalContent] = useState<string>('');

  useEffect(() => {
    const getSpaces = async () => {
      const fetchedSpaces = await dataService.getSpaces();
      setSpaces(fetchedSpaces);
    };
    getSpaces();
  }, [dataService, setSpaces]);

  const close = () => {
    setShowModal(false);
    setModalContent('');
  };

  const reserveSpace = async (
    e: React.MouseEvent<HTMLButtonElement>,
    spaceId: string
  ) => {
    e.preventDefault();
    const reservationResult = await dataService.reserveSpace(spaceId);
    if (reservationResult) {
      setShowModal(true);
      setModalContent(`You reserved spaceId: ${spaceId}.
      Your reservation number is: ${reservationResult}`);
    } else {
      setShowModal(true);
      setModalContent(
        `Reservations are currently full for the space with id: ${spaceId}.`
      );
    }
  };

  return (
    <div>
      <h2>Welcome to Spaces!</h2>
      <div>
        <Link to='/createSpace'>Create Space</Link>
      </div>
      {spaces.map((space, key) => {
        return (
          <SpaceComponent
            key={key}
            spaceId={space.spaceId}
            name={space.name}
            location={space.location}
            photoUrl={space.photoUrl}
            reserveSpace={reserveSpace}
          />
        );
      })}
      <ConfirmModal close={close} content={modalContent} show={showModal} />
    </div>
  );
};

export default Spaces;
