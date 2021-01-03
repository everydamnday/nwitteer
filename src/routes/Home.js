import React, { useState, useEffect } from "react";
import { dbService } from "../fbase";
import Nweet from "components/Nweet";
import NweeetFactory from "components/Nweetfactory";

const Home = ({ userObj }) => {
  const [nweets, setNweets] = useState([]);
  useEffect(() => {
    dbService.collection("nweets").onSnapshot((snapshot) => {
      const nweetsArray = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setNweets(nweetsArray);
    });
  }, []);

  return (
    <div className="container">
      <NweeetFactory userObj={userObj} />
      <div style={{ marginTop: 30 }}>
        {nweets.map((nweet) => (
          <Nweet
            key={nweet.id}
            nweetObj={nweet}
            isOwner={userObj.uid === nweet.creator}
          />
        ))}
      </div>
    </div>
  );
};
export default Home;
