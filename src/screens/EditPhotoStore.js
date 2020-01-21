import React from 'react';
import EditPhoto from '../components/EditPhotoStore';

const EditPhotoStore = props => {
  const photo = props.navigation.getParam('photo', {});
  return (
    <>
      <EditPhoto photo={photo} />
    </>
  );
};

export default EditPhotoStore;
