import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";

interface Photo {
  id: number;
  albumId: number;
  title: string;
  url: string;
}

const PhotoPage: React.FC = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [albumId, setAlbumId] = useState<number | null>(null);
  const [loadedPhotos, setLoadedPhotos] = useState<Photo[]>([]);
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    fetchPhotos();
  }, [albumId, count]);

  const fetchPhotos = async () => {
    let url = "https://jsonplaceholder.typicode.com/photos";
    url += `?_start=${loadedPhotos.length}&_limit=12&`;
    if (albumId !== null) {
      url += `albumId=${albumId}`;
    }

    const response = await fetch(url);
    const data = await response.json();
    setPhotos([...loadedPhotos, ...data]);
    setLoadedPhotos([...loadedPhotos, ...data]);
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPhotos([]);
    setLoadedPhotos([]);
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const searchedAlbumId = formData.get("albumId") as string;
    setAlbumId(parseInt(searchedAlbumId));
  };

  const handleLoadMore = () => {
    setCount((prev) => (prev += 1));
  };

  return (
    <div>
      <div className="py-2 container">
        <div className="row">
          <div className="col-12">
            <h2 className="h2 fw-bold">Photos</h2>
          </div>
        </div>
        <div className="my-4 row">
          <div className="col-12">
            <Form className="d-flex items-center gap-2" onSubmit={handleSearch}>
              <div>
                <select name="filter" className="form-select" id="">
                  <option value="albumId">AlbumId</option>
                </select>
              </div>
              <Form.Group>
                <div>
                  <Form.Control
                    type="search"
                    name="albumId"
                    placeholder="Search by album id"
                  />
                </div>
              </Form.Group>
              <Button type="submit" className="btn btn-primary">
                Search
              </Button>
            </Form>
          </div>
        </div>
        <div className="row">
          {photos.map((photo) => (
            <div className="col-3 mb-4" key={photo.id}>
              <div className="card w-100 p-0">
                <img className="card-img-top" src={photo.url} alt="" />
                <div className="card-body">
                  <div className="w-full text-truncate card-title h5">
                    {photo.title}
                  </div>
                  <p className="mb-1 card-text">{`Id: #${photo.id}`}</p>
                  <p className="card-text">{`Album Id: #${photo.albumId}`}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="row">
          <div className="col-12">
            <div className="w-100 text-center">
              <Button onClick={handleLoadMore} className="btn btn-primary">
                Load More
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhotoPage;
