import React from "react";
import { motion } from "framer-motion";
import UserInfo from "../userInfo/UserInfo";

export default function SettingsInfo({ user }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      {user.bio && <UserInfo field={"Bio"} data={user.bio} />}
      {user.education?.school && (
        <UserInfo field={"School"} data={user.education?.school} />
      )}
      {user.education?.major && (
        <UserInfo field={"Major"} data={user.education?.major} />
      )}
      {user.education?.yearOfStudy && (
        <UserInfo field={"Year of Study"} data={user.education?.yearOfStudy} />
      )}
      {user.education?.currentModules.length > 0 && (
        <UserInfo
          field={"Current Modules"}
          data={user.education?.currentModules}
        />
      )}
      {user.social?.instagram && (
        <UserInfo field={"Instagram"} data={user.social?.instagram} />
      )}
      {user.social?.linkedIn && (
        <UserInfo field={"LinkedIn"} data={user.social?.linkedIn} />
      )}
      {user.social?.github && (
        <UserInfo field={"Github"} data={user.social?.github} />
      )}
    </motion.div>
  );
}
