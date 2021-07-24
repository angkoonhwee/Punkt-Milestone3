import React, { useEffect } from "react";
import { motion } from "framer-motion";
import useStorage from "../../hooks/useStorage";

import { connect } from "react-redux";
import { updateProfile } from "../../redux/actions/auth";

function UploadFile({ file, setFile, user, pic, updateProfile }) {
  const { url, progress } = useStorage(file);

  useEffect(() => {
    if (url) {
      const updatedProfile = {
        userId: user._id,
        [pic]: url
      };
      updateProfile(updatedProfile);
      setFile(null);
    }
  }, [url, setFile, user, updateProfile, pic]);

  return (
    <motion.div
      className="dp-progress-bar"
      initial={{ width: 0 }}
      animate={{ width: progress + "%" }}
    ></motion.div>
  );
};

export default connect(null, { updateProfile })(UploadFile);