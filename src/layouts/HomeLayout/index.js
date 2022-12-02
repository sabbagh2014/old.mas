import React from 'react'
import { makeStyles } from '@material-ui/core'
import Footer from './Footer'
import TopBar from './TopBar'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: '#fff',
  },
  childHeight: {
    minHeight: '850px',
  },
}))

const MainLayout = ({ children }) => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <TopBar />

      <div className={classes.childHeight}>{children}</div>
      <Footer />
    </div>
  )
}

export default MainLayout
