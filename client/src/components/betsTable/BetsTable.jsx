import React, { useEffect, useState } from "react";
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
import "./betsTable.css";
import { motion } from "framer-motion";
import axios from "axios";
import { url } from "../../utils/constants";
import Modal from "../modal/Modal";

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
    id: "user",
    label: "Username",
    width: "7.5%",
  },
  {
    id: "failed-message",
    label: "Leave a Message",
    width: "7.5%",
  },
];

export default function BetsTable({ user }) {
  const classes = useStyles2();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [userBets, setUserBets] = useState([]);
  const [currBet, setCurrBet] = useState(null);
  const [isReplyingBet, setIsReplyingBet] = useState(false);

  useEffect(() => {
    const fetchUserBets = async () => {
      const res = await axios.get(url + `/goal/user/${user._id}/bet`);
      const sortedBets = res.data.sort(
        (g1, g2) => new Date(g2.createdAt) - new Date(g1.createdAt)
      );
      setUserBets(sortedBets);
    };
    fetchUserBets();
  }, [user]);

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, userBets.length - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <motion.div
      className="bets-table"
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
              ? userBets.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : userBets
            ).map((bet, index) => (
              <TableRow key={index}>
                <TableCell align="center" component="th" scope="row">
                  {new Date(bet.createdAt).toLocaleDateString("en-GB", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </TableCell>
                <TableCell align="center" component="th" scope="row">
                  {bet.title}
                </TableCell>

                <TableCell align="center" component="th" scope="row">
                  {bet.atonement}
                </TableCell>

                <TableCell align="center" component="th" scope="row">
                  {bet.status}
                </TableCell>

                <TableCell align="center" component="th" scope="row">
                  {bet.username}
                </TableCell>

                <TableCell align="center" component="th" scope="row">
                  {bet.status === "Failed" || bet.status === "Draw" ? (
                    bet.madeAtonement ? (
                      <a
                        className="reply-atonement"
                        href={`progress/${bet._id}`}
                      >
                        View
                      </a>
                    ) : (
                      <button
                        className="reply-atonement"
                        onClick={() => {
                          setIsReplyingBet(true);
                          setCurrBet(bet);
                        }}
                      >
                        Reply
                      </button>
                    )
                  ) : (
                    <div>NA</div>
                  )}
                </TableCell>
              </TableRow>
            ))}

            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                colSpan={5}
                count={userBets.length}
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
      {isReplyingBet && currBet && (
        <Modal
          setIsClicked={setIsReplyingBet}
          task={"Reply"}
          goal={currBet}
          user={user}
        />
      )}
    </motion.div>
  );
}
