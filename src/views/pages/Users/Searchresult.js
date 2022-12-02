import React, { useEffect, useState } from "react";
import {
  Grid,
  Box,
  Container,
  makeStyles,
} from "@material-ui/core";
import axios from "axios";
import Apiconfigs from "src/Apiconfig/Apiconfigs";
import DataLoading from "src/component/DataLoading";
import { useHistory } from "react-router";
import { Pagination } from "@material-ui/lab";
import UserDetailsCard from "src/component/UserDetailsCard";

import NoDataFound from "src/component/NoDataFound";
const useStyles = makeStyles((theme) => ({

  LoginBox: {
    minHeight: "661px",

    "& h6": {
      fontWeight: "bold",
      marginBottom: "10px",
      "& span": {
        fontWeight: "300",
      },
    },
  },
  divider: {
    padding: "20px 10px",
  },
  TokenBox: {
    border: "solid 0.5px #e5e3dd",
    padding: "5px",
  },
  header: {
    textAlign: "center",
  },
}));

export default function Login() {
  const classes = useStyles();
  const [search, setsearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [noOfPages, setNoOfPages] = useState(1);
  const [userListToDisplay, setUserListToDisplay] = useState([]);

  const getuser = async (cancelTokenSource) => {
    setIsLoading(true);
    axios({
      method: "GET",
      url: Apiconfigs.latestUserList,
      data: {
        cancelToken: cancelTokenSource && cancelTokenSource.token,
      },
      params: {
        limit: 10,
        page: page,
        search: search,
        userType: "Creator",
      },
      headers: {
        token: sessionStorage.getItem("token"),
      },
    })
      .then(async (res) => {
        setIsLoading(false);
        if (res.data.statusCode === 200) {
          if (res.data.result.docs) {
            setNoOfPages(res.data.result.pages);
            setUserListToDisplay(res.data.result.docs);
          }
        }
      })
      .catch(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    const cancelTokenSource = axios.CancelToken.source();
    getuser(cancelTokenSource);

    return () => {
      cancelTokenSource.cancel();
    };
  }, [search, page]);

  return (
    <Box className={classes.LoginBox} mb={5}>
      <Container maxWidth="sm">
        <Box>
          <h3 className={classes.header}>Talent Creators</h3>
          <Box textAlign="center" mb={3}>
            <div className={classes.search}>
              
            </div>
          </Box>
        </Box>
      </Container>
      {isLoading ? (
        <DataLoading />
      ) : (
        <Container maxWidth="lg">
          {userListToDisplay.length === 0 ? (
            <Box align="center" mt={4} mb={5}>
              <NoDataFound />
            </Box>
          ) : (
            ""
          )}
          <Grid container>
            {userListToDisplay.map((data, i) => {
              return (
                <UserDetailsCard data={data} indaex={i} callbackFn={getuser} />
              );
            })}
          </Grid>
        </Container>
      )}
      <Box display="flex" justifyContent="center">
        {noOfPages > 1 && (
          <Pagination
            count={noOfPages}
            page={page}
            onChange={(e, v) => setPage(v)}
          />
        )}
      </Box>
    </Box>
  );
}
