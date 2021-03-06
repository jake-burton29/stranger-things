import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  Profile,
  NavBar,
  PostList,
  Register,
  Login,
  SinglePost,
  CreateNewPost,
  EditNewPost,
} from "components";
import { fetchMe } from "api/auth";

export default function App() {
  const [token, setToken] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [postList, setPostList] = useState([]);

  useEffect(() => {
    const myLocalStorageToken = localStorage.getItem("token");

    async function getMe() {
      const result = await fetchMe(myLocalStorageToken);
      setCurrentUser(result.data);
      setToken(myLocalStorageToken);
    }
    if (myLocalStorageToken) {
      getMe();
    }
  }, [token]);

  return (
    <div>
      <NavBar setToken={setToken} />
      <Routes>
        {/* <Route path="/home" element={<Home />} /> */}
        <Route
          path="/posts"
          element={<PostList setPostList={setPostList} postList={postList} />}
        />
        /*{" "}
        <Route
          path="/profile"
          element={
            <Profile
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
              setToken={setToken}
            />
          }
        />
        <Route path="/register" element={<Register setToken={setToken} />} />
        <Route
          path="/posts/:id"
          element={
            <SinglePost
              setPostList={setPostList}
              postList={postList}
              currentUser={currentUser}
              token={token}
            />
          }
        />
        <Route path="/login" element={<Login setToken={setToken} />} />
        {token ? (
          <Route path="/createPost" element={<CreateNewPost token={token} />} />
        ) : null}
        <Route path="/editPost" element={<EditNewPost token={token} />} />
      </Routes>
    </div>
  );
}
