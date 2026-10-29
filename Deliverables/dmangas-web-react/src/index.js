import "./mocks/mockApi";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./assets/css/index.css";
import "./assets/css/base.css";
import "./assets/css/style.css";
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import Books from "./pages/Books";
import RecommendedToday from "./pages/RecommendedToday";
import BookDetail from "./pages/BookDetail";
import BooksReadChapter from "./pages/BooksReadChapter";
import Group from "./pages/Group";
import CommunityBookDetail from "./pages/CommunityBookDetail";
import CommunityRequest from "./pages/CommunityRequest";
import LibraryNoLogin from "./pages/LibraryNoLogin";
import Wallet from "./pages/Wallet";
import Profile from "./pages/Profile";
import ProfileLogin from "./pages/ProfileLogin";
import UploadBook from "./pages/UploadBook";
import BooksProfile from "./pages/BooksProfile";
import BookEdit from "./pages/BookEdit";
import BooksEditChapter from "./pages/BooksEditChapter";
import BookUploadChapter from "./pages/BookUploadChapter";
import ConfirmAccount from "./pages/ConfirmAccount";
import EditBookForm from "./pages/EditBookForm"
import NewPassword from "./pages/NewPassword";
import CreateGroup from "./pages/CreateGroup";
import {AuthProvider} from './context/AuthProvider'
import PrivateRoute from "./components/private-routes/PrivateRoute"


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
  <AuthProvider>
  <Routes>
  <Route path="/" element={<Home />} />
  <Route path="/confirm/:token" element={<ConfirmAccount />} />
  <Route path="forget-password/:token" element={<NewPassword />} />
  <Route path="profile-login" element={<ProfileLogin />} />
  <Route path="about-us" element={<AboutUs />} />
  <Route path="books" element={<Books />} />
  <Route path="recommended-today" element={<RecommendedToday />} />
  <Route path="/book-detail/:title" element={<BookDetail />} />
  <Route path="/book-read-chapter/:chapterName/:chapterNumber/:chapterCode/:bookCode" element={<BooksReadChapter />} />
  <Route path="/community" element={<Group />} />
  <Route path="community/:name" element={<CommunityBookDetail />} />
  <Route path="/library" element={<LibraryNoLogin />} />

   {/*private routes*/}
  <Route element={<PrivateRoute/>}>
  <Route path="/upload-book" element={<UploadBook />} />
  <Route path="profile" element={<Profile />} />
  <Route path= "/my-books/:group/:code" element= {<BooksProfile />} />
  <Route path= "/book-edit/:title" element= {<BookEdit/>} />
  <Route path= "/book-edit-form" element={<EditBookForm/>} />
  <Route path= "/book-edit-chapter" element={<BooksEditChapter /> } />
  <Route path= "/book-upload-chapter/:title" element= {<BookUploadChapter />  } />
  <Route path= "/community-requests" element= {<CommunityRequest /> } />
  <Route path= "/wallet" element={ <Wallet /> } />
  <Route path="/new-group"  element={<CreateGroup />} />
  </Route>
  </Routes>
    </AuthProvider>
  </BrowserRouter>
);
