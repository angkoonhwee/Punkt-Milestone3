import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableHead from "@material-ui/core/TableHead";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import LastPageIcon from "@material-ui/icons/LastPage";
import "./goalsTable.css";
import { motion } from "framer-motion";
import Modal from "../modal/Modal";
import { Link } from "react-router-dom";



import { connect } from "react-redux";
import { fetchUserGoals } from "../../redux/actions/goals";

const useStyles1 = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
}));

function TablePaginationActions(props) {
  const classes = useStyles1();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleFirstPageButtonClick = (event) => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

const useStyles2 = makeStyles({
  table: {
    minWidth: 500,
  },
});

const columns = [
  { id: "date", label: "Date", width: "20%" },
  { id: "title", label: "Title", width: "27.5%" },
  {
    id: "atonement",
    label: "Atonement",
    width: "27.5%",
  },

  {
    id: "status",
    label: "Status",
    width: "10%",
  },
  {
    id: "atonement-post",
    label: "Atonement Post",
    width: "7.5%",
  },
  {
    id: "failed-messages",
    label: "Messages",
    width: "7.5%",
  },
];

function GoalsTable({ user, userGoals, fetchUserGoals }) {
  const classes = useStyles2();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [isCreatingAtonement, setIsCreatingAtonement] = useState(false);
  const [currGoal, setCurrGoal] = useState(null);
  const [isViewMsg, setIsViewMsg] = useState(false);

  useEffect(() => {
    fetchUserGoals();
  }, [user, fetchUserGoals]);

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, userGoals.length - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <motion.div
      className="goals-table"
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
    >
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="custom pagination table">
          <TableHead>
            <TableRow>
              {columns.map((column, index) => (
                <TableCell
                  align="center"
                  key={index}
                  style={{ width: column.width, fontWeight: "bold" }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {(rowsPerPage > 0
              ? userGoals?.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : userGoals
            ).map((userGoal, index) => (
              <TableRow key={index}>
                <TableCell
                  align="center"
                  component="th"
                  scope="row"
                  style={{ width: "20%" }}
                >
                  {new Date(userGoal.createdAt).toLocaleDateString("en-GB", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </TableCell>
                <TableCell
                  align="center"
                  component="th"
                  scope="row"
                  style={{ width: "27.5%" }}
                >
                  <Link
                    to={`/progress/${userGoal._id}`}
                    style={{
                      textDecoration: "none",
                      color: "black",
                      lineHeight: "1.43",
                      fontSize: "0.875rem",
                    }}
                  >
                    {userGoal.title}
                  </Link>
                </TableCell>

                <TableCell
                  align="center"
                  component="th"
                  scope="row"
                  style={{ width: "27.5%" }}
                >
                  {userGoal.atonement}
                </TableCell>

                <TableCell
                  align="center"
                  component="th"
                  scope="row"
                  style={{ width: "10%" }}
                >
                  {userGoal.status}
                </TableCell>

                <TableCell
                  align="center"
                  component="th"
                  scope="row"
                  style={{ width: "7.5%" }}
                >
                  {userGoal.status === "Failed" ||
                  userGoal.status === "Draw" ? (
                    userGoal.madeAtonement ? (
                      <a
                        className="reply-atonement"
                        href={`progress/${userGoal._id}`}
                      >
                        View
                      </a>
                    ) : (
                      <button
                        className="reply-atonement"
                        onClick={() => {
                          setIsCreatingAtonement(true);
                          setCurrGoal(userGoal);
                        }}
                      >
                        Create
                      </button>
                    )
                  ) : (
                    <div>NA</div>
                  )}
                </TableCell>

                <TableCell
                  align="center"
                  component="th"
                  scope="row"
                  style={{ width: "10%" }}
                >
                  {userGoal.status === "Failed" ||
                  userGoal.status === "Draw" ? (
                    <button
                      className="reply-atonement"
                      onClick={() => {
                        setIsViewMsg(true);
                        setCurrGoal(userGoal);
                      }}
                    >
                      View
                    </button>
                  ) : (
                    <div>NA</div>
                  )}
                </TableCell>
              </TableRow>
            ))}

            {emptyRows > 0 && (
              <TableRow style={{ height: 50 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                colSpan={5}
                count={userGoals.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: { "aria-label": "rows per page" },
                  native: true,
                }}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
      {isCreatingAtonement && currGoal && (
        <Modal
          setIsClicked={setIsCreatingAtonement}
          task={"Create"}
          goal={currGoal}
        />
      )}
      {isViewMsg && currGoal && (
        <Modal setIsClicked={setIsViewMsg} task={"View"} goal={currGoal} />
      )}
    </motion.div>
  );
};

const mapStateToProps = state => {
  return {
    userGoals: state.goals.userGoals,
  };
}

export default connect(mapStateToProps, { fetchUserGoals })(GoalsTable);