import React, { useState } from "react";
import "./report.css";
import ReportIcon from "@material-ui/icons/Report";
import { TextareaAutosize } from "@material-ui/core";
import axios from "axios";
import { url } from "../../utils/constants";
import Alert from "@material-ui/lab/Alert";

//redux
import { connect } from "react-redux";

function Report({ post, currUser }) {
  const [isReport, setIsReport] = useState(false);
  const [isReportSuccess, setIsReportSuccess] = useState(false);
  const [isReportFailure, setIsReportFailure] = useState(false);
  const [reason, setReason] = useState("");

  function handleClick() {
    setIsReport(!isReport);
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setReason(value);
  }

  async function submitReport(event) {
    event.preventDefault();
    try {
      const res = await axios.post(url + "/report", {
        reportBy: currUser._id,
        reportAgainst: post.userId,
        postId: post._id,
        reason: reason,
      });

      if (res.status === 200) {
        setIsReportSuccess(true);
      }
    } catch (err) {
      console.log(err);
      setIsReportFailure(true);
    }

    setReason("");
  }

  return (
    <div className="report">
      <ReportIcon
        className="report-icon"
        onClick={handleClick}
        style={{ color: isReport ? "#be7f51fa" : "grey" }}
      />
      {isReport && (
        <div className="report-wrapper">
          <form onSubmit={submitReport}>
            <h4>Report</h4>

            <strong>Reason</strong>
            {isReportSuccess && (
              <Alert
                severity="success"
                onClose={() => setIsReportSuccess(false)}
                style={{ marginBottom: "5px" }}
              >
                Thank you for reporting!
              </Alert>
            )}

            {isReportFailure && (
              <Alert severity="error" onClose={() => setIsReportFailure(false)}>
                Something went wrong!
              </Alert>
            )}

            <TextareaAutosize
              name="report-reason"
              value={reason}
              className="reason-area"
              placeholder="Write your reason(s)"
              onChange={handleChange}
            />

            <button className="report-btn" type="submit">
              Report
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    currUser: state.auth.user
  }
}

export default connect(mapStateToProps)(Report);
