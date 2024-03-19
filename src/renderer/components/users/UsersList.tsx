import React from 'react';
import { useQuery } from 'react-query';
import userService from '../../services/user.service';
import './UsersList.css';

function UsersList() {
  const {
    data: users,
    isLoading,
    isError,
  } = useQuery(['users'], () => userService.getUsers());

  if (isLoading) return <div>Loading...</div>;

  if (isError) return <div>Error fetching users</div>;

  return (
    <div className="users-list-container">
      <h1 className="users-list-title">Users List</h1>
      <ul className="users-list">
        {users.map((user: any) => (
          <li className="users-list-item" key={user.id}>
            {user.firstName} {user.lastName}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UsersList;
