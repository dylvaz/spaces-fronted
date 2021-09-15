import React, { useState } from 'react';

import { CreatedSpaceModel } from '../../model/Model';
import { DataService } from '../../services/DataService';

interface CreateSpaceProps {
  dataService: DataService;
}

const CreateSpace: React.FC<CreateSpaceProps> = ({ dataService }) => {
  const [values, setValues] = useState<CreatedSpaceModel>({
    name: '',
    location: '',
    description: '',
    photoUrl: '',
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setValues({ ...values, photo: e.target.files[0] });
    } else {
      setValues({ ...values, [e.target.name]: e.target.value });
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const id = await dataService.createSpace(values);
      alert(`Created space with id: ${id}`);
    } catch (err) {
      alert(`Error while creating space: ${err}`);
    }
  };

  let photoSpace;
  if (values.photo) {
    const localPhotoUrl = URL.createObjectURL(values.photo);
    photoSpace = <img alt='' src={localPhotoUrl} />;
  } else {
    photoSpace = <></>;
  }

  return (
    <form onSubmit={onSubmit}>
      <label>
        Name:
        <br />
        <input name='name' value={values.name} onChange={onChange} />
      </label>
      <br />
      <label>
        Location:
        <br />
        <input name='location' value={values.location} onChange={onChange} />
      </label>
      <br />
      <label>
        Description:
        <br />
        <input
          name='description'
          value={values.description}
          onChange={onChange}
        />
      </label>
      <br />
      <label>
        Photo:
        <br />
        <input name='photo' type='file' onChange={onChange} />
      </label>
      <br />
      {photoSpace}
      <br />
      <button data-test='submit-button' type='submit'>
        Create Space
      </button>
    </form>
  );
};

export default CreateSpace;
