import React, { useContext, useState, useEffect } from 'react'
import {
  Typography,
  Box,
  makeStyles,

} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  token: {
    textAlign: 'center',
    padding: '20px 0',
    '& p': {
      fontSize: '14px',
      fontWeight: '500',
      lineHight: '20px',
      color: '#000',
    },
    '& img': {
      marginTop: '5px',
    },
  },
}))

export default function BalanceBadge({token, balance}) {
  const classes = useStyles();  
     
  return (
    <Box className="CardBox">
      <Box className={`${classes.token} lesspadd`}>
        <Box>
          <Typography variant="body2" component="p">
            {balance?.toFixed(2)}
          </Typography>
          <Typography variant="body2" component="p">
            {token.name}
          </Typography>
          <img height="20" width="20" src={token.img} />
        </Box>
      </Box>
    </Box>
  )
}
