import React from 'react';
import Edit from '../components/EditUser';

const EditUser = props => {
  console.log(props.navigation.getParam);
  const data = props.navigation.getParam('data', {});
  return (
    <>
      <Edit data={data} />
    </>
  );
};

export default EditUser;
