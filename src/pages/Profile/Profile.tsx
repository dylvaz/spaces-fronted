import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { User, UserAttribute } from '../../model/Model';
import AuthService from '../../services/AuthService';
import './Profile.css';

interface ProfileProps {
  user: User | undefined;
  authService: AuthService;
}

const Profile: React.FC<ProfileProps> = ({ authService, user }) => {
  const [userAttributes, setUserAttributes] = useState<UserAttribute[]>();

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        const userAtrs = await authService.getUserAttributes(user);
        setUserAttributes(userAtrs);
      }
    };
    fetchData();
  }, [user, authService]);

  let profileUi;

  const renderUserAttributes = () => {
    const rows = [];
    if (userAttributes) {
      for (const userAttribute of userAttributes) {
        rows.push(
          <tr key={userAttribute.Name}>
            <td>{userAttribute.Name}</td>
            <td>{userAttribute.Value}</td>
          </tr>
        );
      }
      return (
        <table className='attributesTable'>
          <tbody>{rows}</tbody>
        </table>
      );
    } else {
      return <label>No UserAttributes exist.</label>;
    }
  };

  if (user) {
    profileUi = (
      <div>
        <h3>Hello {user.username}</h3>
        Here are your attributes:
        {renderUserAttributes()}
      </div>
    );
  } else {
    profileUi = (
      <div>
        Please <Link to='/login'>Login</Link>
      </div>
    );
  }

  return (
    <div>
      <h1>Welcome to the profile page!</h1>
      {profileUi}
    </div>
  );
};

export default Profile;
