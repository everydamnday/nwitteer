import React, { useState } from "react";
import { dbService, storageService } from "fbase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";

//edit & newNweet & NweetArray
const Nweeet = ({ nweetObj, isOwner }) => {
  const [editMode, setEditmode] = useState(false);
  const [newNweet, setNewNweet] = useState(nweetObj.text);

  const onDelete = async () => {
    const ok = window.confirm("Are you sure you want to delete this nweet?");
    if (ok) {
      await dbService.doc(`nweets/${nweetObj.id}`).delete();
      await storageService.refFromURL(nweetObj.attachmentUrl).delete();
    }
  };
  const onEditToggle = () => {
    setEditmode((prev) => !prev);
  };

  const onChange = (e) => {
    const { value } = e.target;
    setNewNweet(value);
  };

  //트윗 text submit
  const onNewnweetSubmit = async (e) => {
    e.preventDefault();
    await dbService.doc(`nweets/${nweetObj.id}`).update({ text: newNweet });
    setEditmode(false);
  };

  return (
    <div className="nweet">
      {editMode ? (
        <>
          <form onSubmit={onNewnweetSubmit} className="container nweetEdit">
            <input
              type="text"
              placeholder="Edit your nweet"
              value={newNweet}
              required
              autoFocus
              onChange={onChange}
              className="formInput"
            />
            <input type="submit" value="Update Nweet" className="formBtn" />
          </form>
          <span onClick={onEditToggle} className="formBtn cancelBtn">
            Cancel
          </span>
        </>
      ) : (
        <>
          <h3>{nweetObj.text}</h3>
          {nweetObj.attachmentUrl && <img src={nweetObj.attachmentUrl} />}
          {isOwner && (
            <div class="nweet__actions">
              <span onClick={onDelete}>
                <FontAwesomeIcon icon={faTrash} />
              </span>
              <span onClick={onEditToggle}>
                <FontAwesomeIcon icon={faPencilAlt} />
              </span>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Nweeet;
