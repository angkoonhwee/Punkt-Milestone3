import React from "react";
import { useContext, useRef, useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import "./recordStatus.css";
import { TextareaAutosize } from "@material-ui/core";
import { PermMedia } from "@material-ui/icons";
import { UserContext } from "../../context/UserContext";
import axios from "axios";
import ImgPreview from "./ImgPreview";
import { url } from "../../utils/constants";

export default function RecordStatus({ goal }) {
  const { user } = useContext(UserContext);
  const desc = useRef("");

  const [files, setFiles] = useState([]);
  const [isCompleted, setCompleted] = useState(
    goal.status !== "In Progress" ||
      (goal.postIds ? goal.postIds.length === goal.numDays : false)
  );
  // console.log("isCompleted: " + isCompleted);
  // console.log("goal status: " + goal.status);
  // useEffect dep on isCompleted => sort and change ranking

  const [isDisabled, setDisabled] = useState(false);
  const [recordText, setRecordText] = useState("");

  const _MS_PER_DAY = 1000 * 60 * 60 * 24;

  function dateDiffInDays(a, b) {
    // Discard the time and time-zone information.
    const utc1 = Date.UTC(
      a.getFullYear(),
      a.getMonth(),
      a.getDate(),
      a.getHours(),
      a.getMinutes()
    );

    const utc2 = Date.UTC(
      b.getFullYear(),
      b.getMonth(),
      b.getDate(),
      b.getHours(),
      b.getMinutes()
    );

    return Math.round((utc2 - utc1) / _MS_PER_DAY);
    // return 99;
  }

  const dayDiff = dateDiffInDays(new Date(goal.createdAt), new Date());
  // console.log(dayDiff);

  useEffect(() => {
    if (goal._id && goal.postIds && goal.status === "In Progress") {
      // console.log("goal.postIds " + goal.postIds.length);
      // console.log("goal.numDays " + goal.numDays);
      setCompleted(goal.postIds.length === goal.numDays);
      setDisabled(dayDiff < goal.postIds.length);
      const updateStatus = async () => {
        // console.log("isCompleted " + isCompleted);
        if (goal.postIds.length === goal.numDays) {
          await axios.put(url + "/goal/" + goal._id + "/status", {
            userId: user._id,
            status: "Success",
          });
        }
      };
      updateStatus();
    } else if (goal.status === "Success") {
      setCompleted(true);
    }
  }, [goal.postIds, goal.numDays, goal.status, dayDiff, goal._id, user._id]);

  async function submitRecord(event) {
    // setRecordText("");
    event.preventDefault();
    const newPost = {
      userId: user._id,
      desc: desc.current.value,
      goalId: goal._id,
      img: [],
    };

    if (files.length > 0) {
      const data = new FormData();
      let fileNames = [];

      files.forEach((f) => {
        // const fileExtension = (f.name.match(/\.+[\S]+$/) || [])[0];
        // fileNames.push(`${Date.now()}${f.name}`);
        fileNames.push(f.name);
      });

      files.forEach((f) => {
        data.append("file", f);
        data.append("name", f.name);
      });

      newPost.img = fileNames;
      // console.log(newPost);
      try {
        await axios.post(url + "/upload", data);
      } catch (err) {
        console.log(err);
      }
    }

    try {
      await axios.post(url + "/post", newPost);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setRecordText(value);
  }

  function handleUpload(event) {
    console.log(event.target.files);
    let fileList = [];
    for (let i = 0; i < event.target.files.length; i++) {
      fileList.push(event.target.files[i]);
    }

    setFiles(fileList);
  }

  function deleteImg(id) {
    setFiles((prev) => {
      return prev.filter((file, index) => index !== id);
    });
  }

  return (
    <div className="record-status">
      <form
        className="record-form"
        disabled={isDisabled || isCompleted}
        onSubmit={isDisabled || isCompleted ? null : submitRecord}
      >
        <div className="record-container">
          <TextareaAutosize
            name="record-text"
            value={recordText}
            ref={desc}
            className="record-area"
            placeholder="Have you completed your goals today? (You can only record once a day, with a max of 6 imgs / record)"
            disabled={isDisabled || isCompleted}
            onChange={handleChange}
            style={{
              cursor: isDisabled || isCompleted ? "not-allowed" : "text",
            }}
          />
          <div className="record-bottom">
            <label
              htmlFor="file"
              className="shareOption"
              style={{
                cursor: isDisabled || isCompleted ? "not-allowed" : "pointer",
              }}
            >
              <PermMedia
                htmlColor={
                  isDisabled || isCompleted ? "grey" : "rgb(255 101 132)"
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
                disabled={isDisabled || isCompleted}
                multiple
                onChange={handleUpload}
              />
            </label>
            <button
              type="submit"
              disabled={isDisabled || isCompleted}
              style={{
                cursor: isDisabled || isCompleted ? "not-allowed" : "pointer",
                backgroundColor:
                  isDisabled || isCompleted ? "grey" : "rgb(247, 176, 25)",
              }}
            >
              Record
            </button>
          </div>
          {files.length !== 0 && (
            <div className="record-preview">
              {files.map((f, index) => {
                return (
                  <ImgPreview
                    key={f.name}
                    id={index}
                    f={f}
                    onDelete={deleteImg}
                  />
                );
              })}
            </div>
          )}
        </div>
      </form>
    </div>
  );
}
