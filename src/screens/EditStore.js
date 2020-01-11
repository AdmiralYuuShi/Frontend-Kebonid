import React from 'react';
import Edit from '../components/EditStore';

const EditStore = props => {
  console.log(props.navigation.getParam);
  const data = props.navigation.getParam('data', {});
  return (
    <>
      <Edit data={data} />
    </>
  );
};

export default EditStore;
