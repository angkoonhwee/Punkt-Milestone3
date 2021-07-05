import React, { useState } from "react";
import "./editProfile.css";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import {
  Description,
  ListAlt,
  Instagram,
  LinkedIn,
  GitHub,
} from "@material-ui/icons";
import axios from "axios";
import { url } from "../../utils/constants";

export default function EditProfile({ user, dispatch, setIsEditing }) {
  const [userProfile, setUserProfile] = useState({
    userId: user._id,
    bio: user.bio || "",
    school: user.school || "",
    major: user.major || "",
    yearOfStudy: user.yearOfStudy || "",
    // currentModules: user.currentModules || [],
    instagram: user.instagram || "",
    github: user.github || "",
    linkedIn: user.linkedIn || "",
  });

  const [tags, setTags] = useState(user.currentModules || []);
  const [tagVal, setTagVal] = useState("");
  const [moduleInputFocus, setModuleInputFocus] = useState(tags.length !== 0);

  const removeTag = (i) => {
    const newTags = [...tags];
    newTags.splice(i, 1);

    setTags(newTags);
    setModuleInputFocus(newTags.length !== 0);
  };

  const inputKeyDown = (e) => {
    const val = e.target.value;
    if ((e.key === "Enter" || e.key === "," || e.key === " ") && val) {
      e.preventDefault();
      if (tags.find((tag) => tag.toLowerCase() === val.toLowerCase())) {
        return;
      }
      setTags([...tags, val]);
      setTagVal("");
    } else if (e.key === "Backspace" && !val) {
      removeTag(tags.length - 1);
    }
  };

  function handleChange(event) {
    const { name, value } = event.target;
    setUserProfile((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
    // console.log(userProfile);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    // dispatch({ type: "UPDATE_START" });

    try {
      const updatedProfile = {
        ...userProfile,
        currentModules: tags,
      };

      const res = await axios.put(url + "/user/" + user._id, updatedProfile);

      dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
      setIsEditing(false);
    } catch (err) {
      console.log(err);
      dispatch({ type: "UPDATE_FAILURE" });
    }
  }
  return (
    <div className="edit-profile-form-wrapper">
      <form className="edit-profile-form" onSubmit={handleSubmit}>
        <Grid
          container
          spacing={1}
          alignItems="flex-end"
          style={{ marginBottom: "2.5px" }}
        >
          <Grid item>
            <Description />
          </Grid>
          <Grid item className="edit-profile-field">
            <TextField
              label="Bio"
              name="bio"
              value={userProfile.bio}
              onChange={handleChange}
            />
          </Grid>
        </Grid>

        <Grid
          container
          spacing={1}
          alignItems="flex-end"
          style={{ marginBottom: "2.5px" }}
        >
          <Grid item>
            <i className="fas fa-school" style={{ marginRight: "5px" }} />
          </Grid>
          <Grid item className="edit-profile-field">
            <TextField
              label="School"
              name="school"
              value={userProfile.school}
              onChange={handleChange}
            />
          </Grid>
        </Grid>

        <Grid
          container
          spacing={1}
          alignItems="flex-end"
          style={{ marginBottom: "2.5px" }}
        >
          <Grid item>
            <i className="fas fa-book-open" style={{ marginRight: "5px" }} />
          </Grid>
          <Grid item className="edit-profile-field">
            <TextField
              label="Major"
              name="major"
              value={userProfile.major}
              onChange={handleChange}
            />
          </Grid>
        </Grid>

        <Grid
          container
          spacing={1}
          alignItems="flex-end"
          style={{ marginBottom: "2.5px" }}
        >
          <Grid item>
            <i
              className="fas fa-graduation-cap"
              style={{ marginRight: "5px" }}
            />
          </Grid>

          <Grid item className="edit-profile-field">
            <TextField
              label="Year of Study"
              name="yearOfStudy"
              type="number"
              InputProps={{ inputProps: { min: 0 } }}
              value={userProfile.yearOfStudy}
              onChange={handleChange}
            />
          </Grid>
        </Grid>

        <Grid
          container
          spacing={1}
          alignItems="flex-end"
          style={{ marginBottom: "2.5px" }}
        >
          <Grid item>
            <ListAlt />
          </Grid>

          <Grid item className="edit-profile-field">
            {/* <TextField
              label="Current Modules"
              name="currentModules"
              value={userProfile.currentModules}
              onChange={handleChange}
            /> */}
            <div className="MuiFormControl-root MuiTextField-root">
              <label
                className={
                  moduleInputFocus
                    ? "MuiFormLabel-root MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-shrink Mui-focused"
                    : "MuiFormLabel-root MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated"
                }
                data-shrink={moduleInputFocus}
              >
                Current Modules
              </label>
              <div
                className={
                  moduleInputFocus
                    ? "MuiInputBase-root MuiInput-root MuiInput-underline Mui-focused MuiInputBase-formControl MuiInput-formControl"
                    : "MuiInputBase-root MuiInput-root MuiInput-underline MuiInputBase-formControl MuiInput-formControl"
                }
              >
                <ul className="module-tags">
                  {tags.map((tag, i) => (
                    <li className="module-item" key={tag}>
                      {tag}
                      <button
                        type="button"
                        onClick={() => {
                          removeTag(i);
                        }}
                      >
                        <i className="fas fa-times" />
                      </button>
                    </li>
                  ))}
                  <li className="module-tags-input">
                    <input
                      aria-invalid="false"
                      name="currentModules"
                      type="text"
                      className="MuiInputBase-input MuiInput-input"
                      value={tagVal}
                      onFocus={() => setModuleInputFocus(true)}
                      onBlur={(e) =>
                        setModuleInputFocus(
                          e.target.value !== "" || tags.length !== 0
                        )
                      }
                      onChange={(e) => setTagVal(e.target.value)}
                      onKeyDown={inputKeyDown}
                    />
                  </li>
                </ul>
              </div>
            </div>
          </Grid>
        </Grid>

        <Grid
          container
          spacing={1}
          alignItems="flex-end"
          style={{ marginBottom: "2.5px" }}
        >
          <Grid item>
            <Instagram style={{ color: "#C13584" }} />
          </Grid>
          <Grid item className="edit-profile-field">
            <TextField
              label="Instagram Profile URL"
              name="instagram"
              value={userProfile.instagram}
              onChange={handleChange}
            />
          </Grid>
        </Grid>

        <Grid
          container
          spacing={1}
          alignItems="flex-end"
          style={{ marginBottom: "2.5px" }}
        >
          <Grid item>
            <LinkedIn style={{ color: "#2867B2" }} />
          </Grid>
          <Grid item className="edit-profile-field">
            <TextField
              label="LinkedIn Profile URL"
              name="linkedIn"
              value={userProfile.linkedIn}
              onChange={handleChange}
            />
          </Grid>
        </Grid>

        <Grid
          container
          spacing={1}
          alignItems="flex-end"
          style={{ marginBottom: "2.5px" }}
        >
          <Grid item>
            <GitHub style={{ color: "#333" }} />
          </Grid>
          <Grid item className="edit-profile-field">
            <TextField
              label="Github Profile URL"
              name="github"
              value={userProfile.github}
              onChange={handleChange}
            />
          </Grid>
        </Grid>

        <button
          type="submit"
          className="edit-profile"
          style={{ marginTop: "15px", width: "50%" }}
        >
          Save
        </button>
        <div
          className="cancel-edit-profile"
          onClick={() => setIsEditing(false)}
        >
          Cancel
        </div>
      </form>
    </div>
  );
}
