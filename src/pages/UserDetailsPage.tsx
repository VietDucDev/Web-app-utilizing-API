import React, { useState, useEffect, ChangeEvent } from "react";
import { useParams } from "react-router-dom";

interface User {
  id: number;
  name: string;
  username: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
  };
  email: string;
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

interface Album {
  userId: number;
  id: number;
  title: string;
}

const UserDetails: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const [user, setUser] = useState<User | null>(null);
  const [albums, setAlbums] = useState<Album[]>([]);
  const [valueNewAlbum, setValueNewAlbum] = useState("");
  const [editingContact, setEditingContact] = useState(false);
  const [originalUser, setOriginalUser] = useState<User | null>(null); // State để lưu trữ dữ liệu contact ban đầu
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false);

  useEffect(() => {
    fetchUserData();
    fetchUserAlbums();
  }, [userId]);

  const fetchUserData = async () => {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/users/${userId}`
      );
      const userData = await response.json();
      setUser(userData);
      setOriginalUser(userData);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const fetchUserAlbums = async () => {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/users/${userId}/albums`
      );
      const userAlbums = await response.json();
      setAlbums(userAlbums);
    } catch (error) {
      console.error("Error fetching user albums:", error);
    }
  };

  const updateUser = async () => {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/users/${userId}`,
        {
          method: "PUT",
          body: JSON.stringify(user),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      );

      if (response.ok) {
        const updatedUserData = await response.json();
        setUser(updatedUserData);
        toggleEditingContact();
        if (!editingContact) {
          setIsButtonDisabled(true);
        }
      }
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  const handleOnChangeInputNewAlbum = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setValueNewAlbum(event.target.value);
  };

  const addUserAlbum = async (newAlbum: Partial<Album>) => {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/users/${userId}/albums`,
        {
          method: "POST",
          body: JSON.stringify(newAlbum),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      );
      if (response.ok) {
        const addedAlbum = await response.json();
        setAlbums([...albums, addedAlbum]);
        setValueNewAlbum("");
      }
    } catch (error) {
      console.error("Error adding user album:", error);
    }
  };

  const deleteUserAlbum = async (albumId: number) => {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/albums/${albumId}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        setAlbums(albums.filter((album) => album.id !== albumId));
      }
    } catch (error) {
      console.error("Error deleting user album:", error);
    }
  };

  const toggleEditingContact = () => {
    setEditingContact(!editingContact);
  };

  const onChangeInputContact = (key: keyof User, value: string) => {
    setUser((prevUser: any) => ({ ...prevUser, [key]: value }));
    if (originalUser?.[key] === value) {
      setIsButtonDisabled(true);
      return;
    }

    setIsButtonDisabled(false);
  };

  const handleResetContact = () => {
    if (originalUser) {
      setUser(originalUser); // Reset user về dữ liệu ban đầu
    }
    toggleEditingContact();
    if (isButtonDisabled) {
      setIsButtonDisabled(false);
    }
  };

  return (
    <div>
      <div className="container py-2">
        <div className="row mb-4">
          <div className="col-12">
            <div className="row mb-4">
              <div className="col-6">
                <h2 className="h2 fw-bold">{user?.name}</h2>
              </div>
            </div>
            <div className="row">
              <div className="col-6">
                <div className="d-flex flex-column gap-4">
                  <div className="row">
                    <div className="col-12">
                      <h4 className="h4 text-info">Personal:</h4>
                    </div>
                    <div className="col-12">
                      <div className="row">
                        <div className="col-lg-3 col-4">
                          <p className="mb-0">Id:</p>
                        </div>
                        <div className="col-lg-9 col-8">
                          <p className="mb-0 fw-bold">{user?.id}</p>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-lg-3 col-4">
                          <p className="mb-0">Username:</p>
                        </div>
                        <div className="col-lg-9 col-8">
                          <p className="mb-0 fw-bold">{user?.username}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12">
                      <h4 className="h4 text-info">Address:</h4>
                    </div>
                    <div className="col-12">
                      <div className="row">
                        <div className="col-lg-3 col-4">
                          <p className="mb-0">Street:</p>
                        </div>
                        <div className="col-lg-9 col-8">
                          <p className="mb-0 fw-bold">{user?.address.street}</p>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-lg-3 col-4">
                          <p className="mb-0">Suite:</p>
                        </div>
                        <div className="col-lg-9 col-8">
                          <p className="mb-0 fw-bold">{user?.address.suite}</p>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-lg-3 col-4">
                          <p className="mb-0">City:</p>
                        </div>
                        <div className="col-lg-9 col-8">
                          <p className="mb-0 fw-bold">{user?.address.city}</p>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-lg-3 col-4">
                          <p className="mb-0">Zipcode:</p>
                        </div>
                        <div className="col-lg-9 col-8">
                          <p className="mb-0 fw-bold">
                            {user?.address.zipcode}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12">
                      <h4 className="h4 text-info">Company:</h4>
                    </div>
                    <div className="col-12">
                      <div className="row">
                        <div className="col-lg-3 col-4">
                          <p className="mb-0">Name:</p>
                        </div>
                        <div className="col-lg-9 col-8">
                          <p className="mb-0 fw-bold">{user?.company.name}</p>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-lg-3 col-4">
                          <p className="mb-0">CatchPhrase:</p>
                        </div>
                        <div className="col-lg-9 col-8">
                          <p className="mb-0 fw-bold">
                            {user?.company.catchPhrase}
                          </p>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-lg-3 col-4">
                          <p className="mb-0">Bs:</p>
                        </div>
                        <div className="col-lg-9 col-8">
                          <p className="mb-0 fw-bold">{user?.company.bs}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-6">
                <div className="row">
                  <div className="col-6">
                    <div className="d-flex items-center justify-content-between">
                      <h4 className="text-info h4">Contact:</h4>
                    </div>
                  </div>
                  {!editingContact ? (
                    <div className="col-12 mb-2">
                      <div className="row">
                        <div className="col-lg-3 col-4">
                          <p className="mb-0">Emai:</p>
                        </div>
                        <div className="col-lg-9 col-4">
                          <p className="fw-bold mb-0">{user?.email}</p>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-lg-3 col-4">
                          <p className="mb-0">Website:</p>
                        </div>
                        <div className="col-lg-9 col-4">
                          <p className="fw-bold mb-0">{user?.website}</p>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-lg-3 col-4">
                          <p className="mb-0">Phone:</p>
                        </div>
                        <div className="col-lg-9 col-4">
                          <p className="fw-bold mb-0">{user?.phone}</p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="col-12 mb-2">
                      <form action="#">
                        <div className="row mb-3">
                          <div className="col-12">
                            <label htmlFor="email" className="form-label">
                              Email:
                            </label>
                            <input
                              type="email"
                              name="email"
                              className="form-control"
                              value={user?.email}
                              onChange={(e) =>
                                onChangeInputContact("email", e.target.value)
                              }
                            />
                          </div>
                        </div>
                        <div className="row mb-3">
                          <div className="col-12">
                            <label htmlFor="phone" className="form-label">
                              Phone:
                            </label>
                            <input
                              type="phone"
                              name="phone"
                              className="form-control"
                              value={user?.phone}
                              onChange={(e) =>
                                onChangeInputContact("phone", e.target.value)
                              }
                            />
                          </div>
                        </div>
                        <div className="row mb-3">
                          <div className="col-12">
                            <label htmlFor="website" className="form-label">
                              Website:
                            </label>
                            <input
                              type="website"
                              name="website"
                              className="form-control"
                              value={user?.website}
                              onChange={(e) =>
                                onChangeInputContact("website", e.target.value)
                              }
                            />
                          </div>
                        </div>
                      </form>
                    </div>
                  )}
                  <div className="col-12">
                    <button
                      type="button"
                      className=" btn btn-success"
                      disabled={isButtonDisabled}
                      onClick={updateUser}
                    >
                      {!editingContact ? "Edit" : "Submit"}
                    </button>
                    <button
                      type="button"
                      className={
                        editingContact
                          ? " btn btn-danger mx-2"
                          : " btn btn-danger mx-2 d-none"
                      }
                      onClick={handleResetContact}
                    >
                      Reset
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div className="row border-top pt-3 mb-3">
              <div className="col-8">
                <h4 className="h4">Photo Albums:</h4>
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-6">
                <form className="d-flex items-center gap-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Title of new album"
                    value={valueNewAlbum}
                    onChange={handleOnChangeInputNewAlbum}
                  />
                  <button
                    type="button"
                    className="flex-shrink-0 w-25 btn btn-success btn-lg"
                    onClick={() => addUserAlbum({ title: valueNewAlbum })}
                  >
                    New Album
                  </button>
                </form>
              </div>
            </div>
            <div className="row">
              {albums.map((album, index) => (
                <div className="col-md-6 mb-3" key={index}>
                  <div className="d-flex items-center justify-content-between border rounded text-decoration-none text-black ">
                    <div className=" py-2 px-4 flex-shrink-0 border-end d-flex items-center justify-content-center">
                      {index + 1}
                    </div>
                    <div className="py-2 w-100 px-4 text-truncate fw-bold text-start">
                      {album.title}
                    </div>
                    <div className="text-center flex-shrink-0 w-10 p-2">
                      <button
                        type="button"
                        className="btn btn-danger btn-sm"
                        onClick={() => deleteUserAlbum(album.id)}
                      >
                        x
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
