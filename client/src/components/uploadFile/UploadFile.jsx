import React, { useEffect } from "react";
import { motion } from "framer-motion";
import useStorage from "../../hooks/useStorage";
import axios from "axios";
import { url as server_url } from "../../utils/constants";

export default function UploadFile({ file, setFile, user, dispatch, pic }) {
  const { url, progress } = useStorage(file);

  useEffect(() => {
    const fetchUpdatedUser = async () => {
      if (url) {
        try {
          const updatedProfile = {
            userId: user._id,
            [pic]: url,
          };

          const res = await axios.put(
            server_url + "/user/" + user._id,
            updatedProfile
          );
          // console.log(res.data);

          dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
          setFile(null);
        } catch (err) {
          console.log(err);
          dispatch({ type: "UPDATE_FAILURE" });
        }
      }
    };
    fetchUpdatedUser();
  }, [url, setFile, user._id, dispatch, pic]);

  return (
    <motion.div
      className="dp-progress-bar"
      initial={{ width: 0 }}
      animate={{ width: progress + "%" }}
    ></motion.div>
  );
}
