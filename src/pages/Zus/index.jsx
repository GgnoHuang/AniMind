import React, { useState } from 'react';
import useStore from './store';

function UserProfile() {
  const { username,  zSetUsername } = useStore();
  const [newUsername, setNewUsername] = useState('');

  // const handleInputChange = (e) => {
  //   setNewUsername(e.target.value);
  // };

  // const handleUpdateUsername = () => {
  //   zSetUsername(newUsername);
  //   setNewUsername('');
  // };

  return (
    <div>
      <p>Username: {username}</p>
      <input type="text" value={newUsername} onChange={
        e =>{ setNewUsername(e.target.value) }
        } />
      <button onClick={() => {
          zSetUsername(newUsername)
          setNewUsername('')}
      }>Update Username</button>
    </div>
  );
}

export default UserProfile;
