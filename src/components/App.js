import React, { useState, useEffect } from "react";
import AppRouter from "components/Router";
// import fbase from "fbase";
import { authService } from "fbase";

function App() {
  const [init, setInit] = useState(false);
  // const [IsLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserobj] = useState([]); // 빈객체로 넣어주기
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setUserobj({
          displayName: user.displayName,
          uid: user.uid,
          updateProfile: (args) => user.updateProfile(args),
        });
        //   setIsLoggedIn(true);
      } else {
        setUserobj(null);
        // setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []);
  const refreshUser = () => {
    const user = authService.currentUser;
    setUserobj({
      displayName: user.displayName,
      uid: user.uid,
      updateProfile: (args) => user.updateProfile(args),
    });
  };
  return (
    <>
      {init ? (
        <AppRouter
          refreshUser={refreshUser}
          IsLoggedIn={Boolean(userObj)}
          userObj={userObj}
        />
      ) : (
        "initializing..."
      )}
      <footer>&copy; {new Date().getFullYear()} Nwitter</footer>
    </>
  );
}

export default App;
