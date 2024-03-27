import { Tour } from "antd";
import React, { useState, useEffect, useRef } from "react";

interface User {
  id: number;
  username: string;
  name: string;
  email: string;
  phone: string;
  website: string;
  address: {
    city: string;
  };
  company: {
    name: string;
  };
}

const UserPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  //Begin Tour
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);
  const [open, setOpen] = useState(false);
  const steps = [
    {
      title: "All user",
      description: "Click on users to see all users.",
      target: () => ref1.current,
    },
    {
      title: "All photo",
      description: "Click on photo to see all photos.",
      target: () => ref2.current,
    },
    {
      title: "User",
      description:
        "Click on each user row to view detailed information for each user and edit user information..",
      target: () => ref3.current,
    },
  ];
  //---------------------------

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data: User[]) => setUsers(data))
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  const handleClick = (event: React.MouseEvent<HTMLTableRowElement>): void => {
    const target = event.target as HTMLTableCellElement;
    const parent = target.parentElement as HTMLTableRowElement;
    const userIdAttr = parent.getAttribute("data-user-id");

    if (userIdAttr) {
      window.location.href = `/users/${userIdAttr}`;
    }
  };

  return (
    <div className="container py-2">
      <div className="col-12">
        <h2 className="h2 fw-bold">Users</h2>
      </div>
      <div className="col-12">
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>UserName</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Website</th>
              <th>City</th>
              <th>Company Name</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr
                key={user.id}
                className="cursor-pointer"
                onClick={handleClick}
                data-user-id={user.id}
              >
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>{user.website}</td>
                <td>{user.address.city}</td>
                <td>{user.company.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="col-12">
        <div className="help">
          <button
            type="button"
            className="btn btn-primary position-fixed p-0"
            onClick={() => setOpen(true)}
          >
            Help
          </button>
        </div>
      </div>
      <Tour
        open={open}
        onClose={() => setOpen(false)}
        steps={steps}
        indicatorsRender={(current, total) => (
          <span>
            {current + 1} / {total}
          </span>
        )}
      />
    </div>
  );
};

export default UserPage;
