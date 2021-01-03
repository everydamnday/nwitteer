import React, { useState } from "react";
import { authService } from "../fbase";
import { useHistory } from "react-router-dom";

const Profile = ({ refreshUser, userObj }) => {
  const [newDisplayname, setnewDisplayname] = useState(userObj.displayname);
  const history = useHistory();
  const Logout = () => {
    authService.signOut();
    history.push("/");
  };
  // const getMynweet = async () => {
  //   const myNweet = await dbService
  //     .collection("nweets")
  //     .where("creator", "==", userObj.uid)
  //     .get();
  //   const myNweetArray = myNweet.docs.map((doc) => doc.data());
  // };
  // useEffect(() => {
  //   getMynweet();
  // }, []);

  const onChange = (e) => {
    const { value } = e.target;
    setnewDisplayname(value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (userObj.displayName !== newDisplayname) {
      await userObj.updateProfile({
        displayName: newDisplayname,
      });
      refreshUser();
    }
  };

  return (
    <div className="container">
      <form onSubmit={onSubmit} className="profileForm">
        <input
          onChange={onChange}
          type="text"
          autoFocus
          placeholder="Display name"
          value={newDisplayname}
          className="formInput"
        />
        <input
          type="submit"
          value="Update Profile"
          className="formBtn"
          style={{
            marginTop: 10,
          }}
        />
      </form>
      <span className="formBtn cancelBtn logOut" onClick={Logout}>
        Log Out
      </span>
    </div>
  );
};

export default Profile;
