import { Cancel } from "@material-ui/icons";
import React, { useState } from "react";
import useStorage from "../../hooks/useStorage";
import { motion } from "framer-motion";
import { CircularProgress } from "@material-ui/core";

export default function ImgPreview({ id, f, onDelete, imgURLs }) {
  const { url } = useStorage(f);
  // console.log(file);
  function pushImgURLs(url) {
    if (!imgURLs.includes(url)) {
      imgURLs.push(url);
    }
    return true;
  }

  return (
    <div className="img-preview">
      {url ? (
        pushImgURLs(url) && (
          <img
            className="record-img"
            // src={URL.createObjectURL(file)}
            src={url}
            alt="record-img"
          />
        )
      ) : (
        <div className="record-img">
          <CircularProgress id="progress-icon" size="20px" />
        </div>
      )}

      <Cancel
        className="record-remove-img"
        onClick={() => {
          onDelete(id);
        }}
      />
    </div>
  );
}