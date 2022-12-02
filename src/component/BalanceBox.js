import React, { useContext, useState, useEffect } from 'react'
import {
  List,
  ListItem,
  Box,
  makeStyles,
} from '@material-ui/core'
import BalanceBadge from "src/component/BalanceBadge";

const useStyles = makeStyles((theme) => ({
  masBox: {
    backdropFilter: " blur(15px)",
    border: "solid 0.5px #c6cacf",
    backgroundColor: "#fff",
    padding: "10px",
    "& ul": {
      display: "flex",
      padding: "0",
      justifyContent: "center",
      "& li": {
        display: "flex",
        justifyContent: "center",
        position: "relative",
        "&::after": {
          content: " ''",
          position: "absolute",
          height: "70%",
          width: "1px",
          backgroundColor: "#e5e3dd",
          right: "0",
          top: "50%",
          transform: "translateY(-50%)",
        },
        "&:last-child::after": {
          display: "none",
        },
      },
    },
  },
}))

export default function BalanceBox({availableBalance, tokensDetails, setSelectedToken}) {
  const classes = useStyles();  

  return (
    <Box className={classes.masBox}>
    <List>
      {tokensDetails.map((d, i) => {
        return (
          <ListItem p={0}
          style={{ cursor: "pointer" }}
          onClick={() => { setSelectedToken(d) }}
          className="lessFont" key={i}>
            <BalanceBadge
              token={d}
              balance={availableBalance[d.databaseKey]}
            />
          </ListItem>
        );
      })}
    </List>
  </Box>
  )
}
