import { Suspense } from "react";
import "./App.css";
import UserPage from "./pages/UserPage";
import PhotoPage from "./pages/PhotosPage";
import {
  BrowserRouter,
  NavLink,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import UserDetailsPage from "./pages/UserDetailsPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <div>
          <header>
            <nav className="navbar navbar-expand navbar-dark bg-dark">
              <div className="container">
                <div className="row">
                  <div className="col-12">
                    <div className="collapse navbar-collapse">
                      <ul className="navbar-nav">
                        <li className="nav-item">
                          <NavLink to="/users" className="nav-link px-0 pe-4">
                            Users
                          </NavLink>
                        </li>
                        <li className="nav-item">
                          <NavLink to="/photos" className="nav-link px-0 pe-4">
                            Photo
                          </NavLink>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </nav>
          </header>
          <main>
            <Suspense fallback={<h2>Loading.........</h2>}>
              <Routes>
                <Route path="/" element={<Navigate to="/users" />} />
                <Route path="users" element={<UserPage />} />
                <Route path="users/:userId" element={<UserDetailsPage />} />

                <Route path="photos" element={<PhotoPage />} />
              </Routes>
            </Suspense>
          </main>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
