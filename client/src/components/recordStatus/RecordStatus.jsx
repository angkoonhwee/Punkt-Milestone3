import React from "react";
import { useRef, useState, useEffect } from "react";
import "./recordStatus.css";
import { TextareaAutosize } from "@material-ui/core";
import { PermMedia } from "@material-ui/icons";
import ImgPreview from "./ImgPreview";

//redux
import { connect } from "react-redux";
import { loadMe } from "../../redux/actions/auth";
import { createPost } from "../../redux/actions/posts";

function RecordStatus({
  user,
  goal,
  atonement,
  postIds,
  createPost,
  status,
  currGoal
}) {
  const desc = useRef("");

  const [files, setFiles] = useState([]);
  const [imgURLs, setImgURLs] = useState([]);
  const [error, setError] = useState(null);

  const [isCompleted, setCompleted] = useState(status === "Success");

  useEffect(() => {
    if (status !== "In Progress") {
      setCompleted(true);
    }
  }, [status, isCompleted]);

  const [isDisabled, setDisabled] = useState(false);
  const [isAtonement, setIsAtonement] = useState(atonement);

  function dateDiffInDays(a, b) {
    // Discard the time and time-zone information.
    const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());

    const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

    return Math.round((utc2 - utc1) / (1000 * 60 * 60 * 24));
    // return 99;
  }

  const dayDiff = dateDiffInDays(new Date(goal.createdAt), new Date());

  useEffect(() => {
    if (postIds && goal.status === "In Progress") {
      setCompleted(postIds.length === goal.numDays);
      setDisabled(dayDiff < postIds.length);

    } else if (goal.status === "Success") {
      setCompleted(true);
    }
  }, [dayDiff, postIds, goal.status, goal.numDays]);

  

  function submitRecord(event) {
    event.preventDefault();

    
    const newPost = {
      userId: user._id,
      username: user.username,
      desc: desc.current.value,
      goalId: atonement ? currGoal._id : goal._id,
      img: [],
      atonement: isAtonement,
    }


    if (imgURLs.length > 0) {
      newPost.img = imgURLs;
    }

    createPost(newPost);
    desc.current.value = "";
    setFiles([]);

    if (atonement) {
      window.location.reload();
    }
  }

  function handleUpload(event) {
    let fileList = [];

    if (event.target.files.length > 6) {
      setError("Only a maximum of 6 images are allowed.");
    } else {
      setError(null);

      for (let i = 0; i < event.target.files.length; i++) {
        let selected = event.target.files[i];
        fileList.push(selected);
      }
      setFiles(fileList);
    }
  }

  function deleteImg(id) {
    setFiles((prev) => {
      return prev.filter((file, index) => index !== id);
    });
    setImgURLs((prev) => {
      return prev.filter((file, index) => index !== id);
    });
  }

  return (
    <div className="record-status">
      <form
        className="record-form"
        disabled={isAtonement ? !isAtonement : isDisabled || isCompleted}
        onSubmit={
          (isAtonement ? !isAtonement : isDisabled || isCompleted)
            ? null
            : submitRecord
        }
      >
        <div className="record-container">
          <TextareaAutosize
            name="record-text"
            //value={recordText}
            ref={desc}
            className="record-area"
            required
            placeholder={
              isAtonement
                ? "Have you atoned?"
                : "Have you completed your goals today? (You can only record once a day)"
            }
            disabled={isAtonement ? !isAtonement : isDisabled || isCompleted}
            //onChange={handleChange}
            style={{
              cursor: (isAtonement ? !isAtonement : isDisabled || isCompleted)
                ? "not-allowed"
                : "text",
            }}
          />
          <div className="record-bottom">
            <label
              htmlFor="file"
              className="shareOption"
              style={{
                cursor: (isAtonement ? !isAtonement : isDisabled || isCompleted)
                  ? "not-allowed"
                  : "pointer",
              }}
            >
              <PermMedia
                htmlColor={
                  (isAtonement ? !isAtonement : isDisabled || isCompleted)
                    ? "grey"
                    : "rgb(255 101 132)"
                }
                className="shareIcon"
              />
              <span className="shareOptionText">Image</span>
              <input
                style={{
                  display: "none",
                }}
                type="file"
                id="file"
                accept=".png,.jpeg,.jpg"
                disabled={
                  isAtonement ? !isAtonement : isDisabled || isCompleted
                }
                multiple
                onChange={handleUpload}
              />
            </label>
            <button
              className="record-btn"
              type="submit"
              disabled={isAtonement ? !isAtonement : isDisabled || isCompleted}
              style={{
                cursor: (isAtonement ? !isAtonement : isDisabled || isCompleted)
                  ? "not-allowed"
                  : "pointer",
                backgroundColor: (
                  isAtonement ? !isAtonement : isDisabled || isCompleted
                )
                  ? "grey"
                  : "rgb(247, 176, 25)",
              }}
            >
              Record
            </button>
          </div>
          {error && (
            <div style={{ color: "#de6464", marginLeft: "5px" }}>{error}</div>
          )}
          {files.length !== 0 && (
            <div className="record-preview">
              {files.map((f, index) => {
                return (
                  <ImgPreview
                    key={f.name}
                    id={index}
                    f={f}
                    onDelete={deleteImg}
                    imgURLs={imgURLs}
                  />
                );
              })}
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    user: state.auth.user,
    post: state.posts.goals,
    goal: state.goals.goals,
    status: state.goals.goals.status,
    postIds: state.goals.goals.postIds,

  };
};

export default connect(
  mapStateToProps,
  {
    loadMe,
    createPost
  })(RecordStatus);