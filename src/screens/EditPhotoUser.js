import React from 'react';
import EditPhoto from '../components/EditPhotoUser';

const EditPhotoUser = props => {
  const photo = props.navigation.getParam('photo', {});
  return (
    <>
      <EditPhoto photo={photo} />
    </>
  );
};

export default EditPhotoUser;
