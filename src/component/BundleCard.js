import React, { useState, useContext, useEffect } from "react";
import {
  Typography,
  Box,
  makeStyles,
  Grid,
  Button,
  TextField,
  InputAdornment,
  Input,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import axios from "axios";
import Apiconfigs from "src/Apiconfig/Apiconfigs";
import { UserContext } from "src/context/User";
import { FaHeart } from "react-icons/fa";
import { useHistory } from "react-router-dom";
import ButtonCircularProgress from "./ButtonCircularProgress";

import { toast } from "react-toastify";
import { saveAs } from "file-saver";
const useStyles = makeStyles((theme) => ({
  cards: {
    border: "solid 0.5px #c9c7c3",
    padding: "10px",
    borderRadius: "10px",
    position: "relative",
    backgroundImage:
      "linear-gradient(45deg, #eef2f3 90%,#8e9eab 30%, #eef2f3 90%)",
    margin: "8px",
    width: "90%",
    "&:hover": {
      transform: "scale(1.03)",
      transition: "all 0.4s ease-in-out 0s",
    },
  },
  NFTbg: {
    width: "100%",
    height: "100px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "12px",
    fontWeight: "500",
    color: "#fff",
    marginBottom: "20px",
    backgroundImage: "linear-gradient(to bottom, #c04848, #480048)",
  },
  contantCard: {
    textAlign: "left",
    position: "relative",
    "& h6": {
      marginBottom: "2px !important",
      fontSize: "16px !important",
      [theme.breakpoints.down("md")]: {
        fontSize: "10px !important",
      },

      "& span": {
        color: "#000",
        paddingLeft: "5px",
      },
      "@media(max-width:821px)": {
        fontSize: "11px !important",
      },
    },
    "& p": {
      fontSize: "12px",
    },
  },

  contantCard2: {
    textAlign: "left",
    position: "relative",
    paddingTop: "10px",
    borderTop: "solid 0.5px #707070",
    "&::after": {
      position: "absolute",
      border: " solid 0.5px #707070",
      content: "''",
      left: "50%",
      top: "0",
      transform: "translatex(-50%)",
    },
  },
  btnBox: {
    display: "flex",
    alignItems: "center",
    "& button": {
      fontSize: "8px !important",
    },
  },
  sublink: {
    display: "flex",
    justifyContent: "space-between",
    color: "#000",
    alignItems: "center",
    paddingBottom: "10px",
    position: "relative",
    "&::after": {
      content: "''",
      height: " 1px",
      width: "70%",
      position: "absolute",
      backgroundColor: "#f2f1ee",
      bottom: "6px",
      maxWidth: "100%",
      left: "50%",
      transform: " translateX(-50%)",
    },
  },

  feedmenu: {
    fontSize: "20px",
    color: "#707070",
    position: "absolute",
    right: "0px",
    top: "0px",
    zIndex: "9",
  },
  donation: {
    "& span": {
      fontSize: "12px",
      padding: "2px 5px",
      border: "1px solid #ccc",
    },
  },
  input_fild2: {
    width: "100%",
    "& input": {
      height: "45px",
    },
  },
  changepic: {
    textAlign: "center",
    "& img": {
      width: "80%",
    },
    "& small": {
      position: "relative",
      fontSize: "12px !important",
      "& input": {
        position: "absolute",
        width: "300px",
        left: "50%",
        transform: "translateX(-50%)",
        opacity: "0",
      },
    },
  },

  PhotoBox: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    "& img": {
      width: "100%",
      height: "368px",
      paddingLeft: "149",
      display: "flex",
      alignItems: "center",
      borderRadius: "15px",
    },
    "@media(max-width:768px)": {
      "& img": {
        height: "auto",
      },
    },
  },
  bundleText: {
    "& .red": {
      color: "#792034",
    },
    "& h4": {
      color: "#141518",
      fontSize: "20px",
    },
  },
  deskiText: {
    "& h4": {
      marginBottom: "10px",
      color: "#707070",
      fontSize: "20px",
      "& span": {
        color: "#141518",
      },
    },
  },
  input_fild: {
    backgroundColor: "#ffffff6e",
    borderRadius: "5.5px",
    border: " solid 0.5px #e5e3dd",
    color: "#141518",
    width: "100%",
    "&:hover": {
      "& .MuiOutlinedInput-notchedOutline": {
        borderColor: "transparent",
      },
    },
    "& .MuiInputBase-input": {
      color: "#141518",
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "transparent",
      borderWidth: 0,
    },
  },
  dilogBody: {
    paddingBottom: "30px",
    position: "relative",
    "& small": {
      position: "absolute",
      bottom: " 3px",
      left: "50%",
      transform: "translateX(-50%)",
      fontSize: "13px",
      width: "100%",
      textAlign: "center",
    },
  },
  certificateimg: {
    margiBottom: "30px",
    width: "100%",
    height: "auto",
  },

  heding: {
    backgroundImage: "linear-gradient(to bottom, #792034, #3d101a)",
    display: "flex",
    justifyContent: "center",
    padding: "20px",
    alignItems: "center",
    color: "#fff",
    [theme.breakpoints.down("xs")]: {
      padding: "10px",
    },
    "& img": {
      width: "60px",
      [theme.breakpoints.down("xs")]: {
        width: "20px",
      },
    },
    "& h6": {
      fontSize: "15px",
      fontWeight: "400",
      padding: "0 20px",
      [theme.breakpoints.down("xs")]: {
        padding: "0 5px",
        fontSize: "10px",
      },
    },
  },
  body: {
    position: "relative",
    zIndex: 2,
    padding: "50px 20px 150px 20px",
    [theme.breakpoints.down("xs")]: {
      padding: "50px 20px 60px 20px",
    },
    "& h5": {
      fontSize: "15px",
      fontWeight: "400",
      lineHeight: "1.53",
      color: "#141518",
    },
    "& h2": {
      fontSize: "23px",
      fontWeight: "600",
      lineHeight: "1.51",
      paddingLeft: "5px",
      color: "#141518",
      [theme.breakpoints.down("xs")]: {
        fontSize: "18px",
      },
    },
    "& img": {
      width: "30px",
      margin: "0 5px",
    },
  },
  footer: {
    "& h5": {
      fontSize: "15px",
      fontWeight: "500",
      lineHeight: "1.53",
      color: "#141518",
    },
    "& p": {
      fontSize: "10px",
      fontWeight: "500",
      lineHeight: "1.5",
      color: "#141518",
    },
    "& span": {
      fontSize: "9px",
      fontWeight: "500",
      lineHeight: "1.5",
      color: "rgba(112, 112, 112, 0.64)",
    },
    "& label": {
      fontSize: "10px",
      fontWeight: "400",
      lineHeight: "1.35",
      margin: "0",
      padding: "0",
      color: "#707070",
      whiteSpace: "initial !important",
      wordBreak: "break-all",
    },
  },
  certificateBox: {
    position: "relative",
  },
  centerImg: {
    position: "absolute",
    left: "50%",
    bottom: "30px",
    width: "45%",
    transform: "translateX(-50%)",
    zIndex: 1,
  },
  certificate: {
    [theme.breakpoints.down("xs")]: {
      padding: "10px",
    },
  },
  buttonGroup: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
    marginTop: "14px",
    "& button": {
      border: "0.5px solid #ccc",
      marginRight: "10px",
      backgroundImage: "linear-gradient(45deg, #240b36 30%, #c31432 90%)",
      color: "#fff",
      width: "127px",
      fontSize: "12px",
    },
  },
  LoginButton: {
    marginTop: "10px",
    backgroundImage: "linear-gradient(45deg, #240b36 30%, #c31432 90%)",
    color: "#fff",
  },
  downloadButton: {
    maxWidth: "100px",
    backgroundColor: "#a33748",
    borderRadius: "33px",
    color: "white",
    "&:hover": {
      backgroundColor: "red",
    },
  },
  
  nftImg: {
    width: "100%",
    overflow: "hidden",
    backgroundPosition: "center !important",
    backgroundSize: "cover !important",
    backgroundRepeat: " no-repeat !important",
    backgroundColor: "#ccc !important",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    border: " solid 0.5px #e5e3dd",
  },
}));

function BundleCard({ data }) {
  const history = useHistory();
  const classes = useStyles();
  const auth = useContext(UserContext);
  const [openSubscribe, setOpenSubscribe] = useState(false);
  const [isLoading, setIsloading] = useState(false);
  const [open3, setOpen3] = useState(false);
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open1, setOpen1] = useState(false);

  const [isLike, setisLike] = useState(false);
  const [nbLike, setnbLike] = useState(0);
  const [isSubscribed, setisSubscribed] = useState(false);
  const [nbSubscribed, setnbSubscribed] = useState(0);

  let BundleData = data.bundleDetails || data;

  const handleClose = () => {
    setOpen(false);
  };

  const handleClose1 = () => {
    setOpen1(false);
  };

  const handleClickOpen2 = () => {
    setOpenSubscribe(false);
    setOpen2(true);
  };
  const handleClose2 = () => {
    setOpen2(false);
  };
  const subscribeToBundleHandler = async () => {
    setIsloading(true);
    await axios({
      method: "GET",
      url: Apiconfigs.subscribeNow + BundleData._id,
      headers: {
        token: sessionStorage.getItem("token"),
      },
    })
      .then(async (res) => {
        setIsloading(false);
        if (res.data.statusCode === 200) {

          setisSubscribed(res.data.result.subscribed == "yes");
          setnbSubscribed(res.data.result.nb);

          setOpen2(false);
        } else {
          toast.error(res.data.responseMessage);
        }
      })
      .catch((err) => {
        setIsloading(false);
        console.log(err.message);
        toast.error(err?.response?.data?.responseMessage);
      });
  };

  const handleClose3 = () => {
    setOpen3(false);
  };

  const isVideo = BundleData.mediaUrl.includes(".mp4");

  const userId =
    typeof BundleData.userId === "object" &&
    !Array.isArray(BundleData.userId) &&
    BundleData.userId !== null
      ? BundleData.userId._id
      : BundleData.userId;

  const likeDislikeNfthandler = async (id) => {
    if (auth.userData?._id) {
      try {
        const res = await axios.get(Apiconfigs.likeDislikeNft + id, {
          headers: {
            token: sessionStorage.getItem("token"),
          },
        });
        if (res.data.statusCode === 200) {
          setisLike((liked)=>!liked);
          setnbLike((nb)=> isLike ? nb-1 : nb+1)
        } else {
          setisLike(false);
          toast.error(res.data.responseMessage);
        }
      } catch (error) {
        console.log("ERROR", error);
      }
      
    } else {
      toast.error("Please login");
    }
  };

  
  const unSubscribeToBundleHandler = async () => {
    setIsloading(true);
    await axios({
      method: "DELETE",
      url: Apiconfigs.unSubscription + BundleData?._id,
      headers: {
        token: sessionStorage.getItem("token"),
      },
    })
      .then(async (res) => {
        setIsloading(false);
        if (res.data.statusCode === 200) {
          setIsloading(false);
          toast.success("You have unsubscribed successfully.");
          setisSubscribed(false);
          setnbSubscribed((nb)=>nb-1);
        } else {
          toast.error("Something went wrong");
        }
      })
      .catch((err) => {
        toast.error("Something went wrong");
      });
  };

  const downLoadFile = () => {
    saveAs(BundleData?.mediaUrl);
  };

  useEffect(()=>{
    setnbLike(BundleData.likesUsers.length);
    setnbSubscribed(BundleData.subscribers.length);
    if (auth.userData?._id) {
      setisLike(BundleData.likesUsers?.includes(auth.userData._id));
      setisSubscribed(BundleData.subscribers?.includes(auth.userData._id));
    }
  },[])

  return (
    <Box className={classes.cards}>
      <Box className={classes.contantCard}>
        <Box display="flex" justifyContent="space-between">
          <Box>
            <Typography
              variant="h6"
              component="h6"
              className="textOverflow seats"
              style={{
                color: "#792034",
                width: "150px",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                textTransform: "capitalize",
                cursor: "pointer"
              }}
              onClick={() =>
                history.push({
                  pathname: "/bundles-details",
                  search: BundleData?._id,
                })
              }
            >
              {BundleData?.bundleName ? BundleData?.bundleName : ""}
            </Typography>
          </Box>
          <Box style={{
              textAlign: "center",
              justifyContent: "center",
              alignItems: "center",
              display: "flex",
            }}>
              <span style={{fontSize:'12px',padding:'2px'}}>
                {nbLike && nbLike}
              </span>
              <FaHeart
                style={isLike ? { color: "red" } : {}}
                onClick={() => likeDislikeNfthandler(BundleData._id)}
                className={classes.socialbox}
              />
          </Box>
        </Box>
        <Box
          className={classes.nftimg}
          onClick={() =>
            history.push({
              pathname: "/bundles-details",
              search: BundleData?._id,
            })
          }
          style={{ cursor: "pointer" }}
        >
          {isVideo ? (
            <Box
              className={classes.nftimg}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "250px",
                overflow: "hidden",
                background: "#000",
              }}
            >
              <video
                width="100%"
                style={{
                  cursor: "pointer",
                  background: "#000",
                }}
              >
                <source
                  src={BundleData.mediaUrl}
                  type="video/mp4"
                />
              </video>
            </Box>
          ) : (
            <Box
              className={classes.nftImg}
              style={{
                background: "url(" + BundleData.mediaUrl + ")",
                height: "250px"
              }}
            ></Box>
          )}
        </Box>
        <Box>
        <Typography
          variant="h6"
          component="h6"
          className="seats"
        >
          By
          <span style={{ color: "blue", fontWeight: "400", fontSize: "14px" }}
          onClick={() => {
            history.push({
              pathname: "/user-profile",
              search: BundleData.userId.userName || BundleData.userDetail.userName,
            });
          }}>{BundleData && BundleData.userDetail && BundleData.userDetail.name
            ? BundleData.userDetail.name
            : BundleData.userId.name}</span>
          
        </Typography>
        </Box>
        <Typography
          variant="h6"
          component="h6"
          style={{ color: "#000", fontWeight: "400" }}
        >
          {BundleData?.donationAmount ? BundleData?.donationAmount : "Any amount"}{" "}
          {BundleData && BundleData.coinName ? BundleData.coinName : "MAS"} {" for "}
          {BundleData?.duration ? BundleData?.duration : "Ever"}
        </Typography>
        
        <Typography
          variant="h6"
          component="h6"
          style={{ color: "#000", fontWeight: "400", fontSize: "12px" }}
        >
          {nbSubscribed ? nbSubscribed > 0 ? nbSubscribed+" members subscribed"  : "0 subscriber" : "0  members subscribed"}
        </Typography>
        
        <Box className={classes.buttonGroup}>
            {auth.userData &&
              auth.userLoggedIn &&
              auth.userData._id !== userId &&
              isSubscribed && (
                <Button onClick={handleClickOpen2}> Renew </Button>
              )}

            {auth.userData &&
              auth.userLoggedIn &&
              auth.userData._id !== userId &&
              isSubscribed && (
                <Button fullWidth onClick={unSubscribeToBundleHandler}>
                  Unsubscribe
                </Button>
              )}
            {
              auth?.userData?._id !== userId && !isSubscribed && (
                <Button fullWidth onClick={handleClickOpen2}>
                  Subscribe
                </Button>
              )
            }
            {auth.userData &&
              auth.userLoggedIn &&
              auth.userData._id === userId && (
                <Button
                  fullWidth
                  onClick={() =>
                    history.push({
                      pathname: "/bundles-details",
                      search: BundleData?._id,
                    })
                  }
                >
                  View
                </Button>
              )}
        </Box>
      </Box>

      {/* edit */}
      {open && (
        <Dialog
          open={open}
          fullWidth="sm"
          maxWidth="sm"
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <Typography
                variant="h4"
                align="center"
                style={{ color: "#792034", margiBottom: "10px" }}
              >
                {BundleData.bundleTitle}
              </Typography>

              <Box>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={4}>
                    <label> Donation Amount</label>
                  </Grid>
                  <Grid item xs={12} md={8}>
                    <TextField
                      id="standard-basic"
                      placeholder="30"
                      className={classes.input_fild2}
                    />
                  </Grid>
                </Grid>
              </Box>
              <Box
                style={{
                  paddingBotton: "10px",
                  borderBottom: "solid 0.5px #e5e3dd",
                }}
              >
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={12} md={4}>
                    <label> Duration</label>
                  </Grid>
                  <Grid item xs={12} md={8} className={classes.donation}>
                    <span>7 Days</span>
                    <span>14 Days</span>
                    <span>30 Days</span>
                    <span>60 Days</span>
                    <span>1 Year</span>
                    <span>Forever</span>
                  </Grid>
                </Grid>
              </Box>

              <Box align="center">
                <label> Services:</label>
                <Typography
                  variant="body2"
                  componant="p"
                  style={{ color: "#000", fontSize: "20px" }}
                >
                  I will send you a special video every <br />
                  month specially for you! (edit)
                </Typography>
              </Box>
              <Box mt={2} className={classes.changepic}>
                <small>
                  Change/upload a photo or video
                  <input type="file" />
                </small>
                <img src="images/Rectangle.png" alt="" />
              </Box>
              <Box mt={4}>
                <Grid container alignItems="center" spacing={2}>
                  <Grid item md={4}>
                    <Link style={{ color: "#000" }} onClick={handleClose}>
                      Delete this bundle
                    </Link>
                  </Grid>
                  <Grid item md={4}>
                    <Button
                      variant="contained"
                      size="large"
                      color="primary"
                      className="btn-block removeredius"
                      onClick={handleClose}
                    >
                      Cancel
                    </Button>
                  </Grid>
                  <Grid item md={4}>
                    <Button
                      variant="contained"
                      size="large"
                      color="secondary"
                      className="btn-block removeredius ml-10"
                      onClick={handleClose}
                    >
                      Save Changes
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </DialogContentText>
          </DialogContent>
        </Dialog>
      )}
      {/* view */}
      {open1 && (
        <Dialog
          open={open1}
          fullWidth="sm"
          maxWidth="sm"
          onClose={handleClose1}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <Typography
                variant="h4"
                align="center"
                style={{ color: "#792034", margiBottom: "10px" }}
              >
                Bundle I
              </Typography>
              <Typography
                variant="h6"
                align="center"
                style={{ color: "#000", borderBottom: "solid 0.5px #e5e3dd" }}
              >
                {" "}
                My basic supporter
              </Typography>

              <Box align="center" mt={3}>
                <Typography
                  variant="h6"
                  component="h6"
                  style={{ color: "#000", fontWeight: "400" }}
                >
                  <span style={{ color: "#707070" }}>Donation amount: </span>10
                  MAS{" "}
                </Typography>
                <Typography
                  variant="h6"
                  component="h6"
                  style={{ color: "#000", fontWeight: "400" }}
                >
                  <span style={{ color: "#707070" }}>Duration: </span>One month
                </Typography>
                <Typography
                  variant="h6"
                  component="h6"
                  style={{ color: "#000", fontWeight: "400" }}
                >
                  <span style={{ color: "#707070" }}>
                    Number of subscribers:{" "}
                  </span>
                  100
                </Typography>
              </Box>

              <Box align="center">
                <label> Services:</label>
                <Typography
                  variant="body2"
                  componant="p"
                  style={{ color: "#000", fontSize: "20px" }}
                >
                  I will send you a special video every <br />
                  month specially for you!
                </Typography>
              </Box>
              <Box mt={2} className={classes.changepic}>
                <img src="images/Rectangle.png"  alt=""/>
              </Box>
            </DialogContentText>
          </DialogContent>
        </Dialog>
      )}
      {/* Subscribe now */}
      {open2 && (
        <Dialog
          fullWidth="sm"
          maxWidth="sm"
          open={open2}
          onClose={handleClose2}
          aria-labelledby="max-width-dialog-title"
          disableBackdropClick={isLoading}
          disableEscapeKeyDown={isLoading}
        >
          <DialogContent>
            <Box className={classes.PhotoBox}>
              {isVideo ? (
                <div>
                  <video width="100%" controls>
                    <source src={BundleData.mediaUrl} type="video/mp4" />
                  </video>
                  {auth.userData &&
                    auth.userLoggedIn &&
                    auth.userData._id !== userId &&
                    isSubscribed && (
                      <Box>
                        <Grid
                          lg={12}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <Button
                            className={classes.downloadButton}
                            fullWidth
                            onClick={downLoadFile}
                          >
                            Download
                          </Button>
                        </Grid>
                      </Box>
                    )}
                </div>
              ) : (
                <img
                  src={BundleData.mediaUrl}
                  alt=""
                />
              )}
            </Box>
            <Box mt={3} className={classes.bundleText} textAlign="center">
              <Typography variant="h4" className="red seats">
                {BundleData.bundleTitle}
              </Typography>
            </Box>

            <Box mt={2} className={classes.deskiText}>
              <Typography variant="h4" align="left" color="textSecondary">
                Donation amount:{" "}
                <span>
                  {BundleData.donationAmount} {BundleData.coinName}
                </span>
              </Typography>
              <Typography variant="h4" align="left" color="textSecondary">
                Duration: <span> {BundleData.duration}</span>
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={3} lg={2}>
                  <Typography variant="h4" align="left" color="textSecondary">
                    Details:{" "}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={9} lg={10}>
                  <Typography
                    variant="body2"
                    align="left"
                    color="textSecondary"
                    className="seats"
                  >
                    {BundleData?.details}
                  </Typography>
                </Grid>
              </Grid>
            </Box>
            {!auth.userLoggedIn && (
              <Box mt={3} mb={3} textAlign="center">
                {" "}
                <Button className={classes.LoginButton} onClick={handleClose2}>
                  Cancel
                </Button>
                &nbsp;&nbsp;{" "}
                <Button
                  className={classes.LoginButton}
                  onClick={() => {
                    history.push("/login");
                  }}
                >
                  Login
                </Button>
              </Box>
            )}
            {auth.userData &&
              auth.userLoggedIn &&
              auth.userData._id !== data.userId && (
                <Box mt={3} mb={3} textAlign="center">
                  <Button
                    variant="contained"
                    color="secondary"
                    size="large"
                    onClick={() => {
                      handleClose2();
                    }}
                    disabled={isLoading}
                  >
                    Cancel
                  </Button>
                  &nbsp;&nbsp;&nbsp;
                  {auth.userData &&
                    auth.userLoggedIn &&
                    auth.userData._id !== userId && (
                      <Button
                        variant="contained"
                        color="secondary"
                        size="large"
                        onClick={subscribeToBundleHandler}
                        
                        disabled={isLoading}
                      >
                        {isLoading ? "pending..." : "Subscribe now"}{" "}
                        {isLoading && <ButtonCircularProgress />}
                      </Button>
                    )}
                </Box>

                
              )}
          </DialogContent>
        </Dialog>
      )}

      {open3 && (
        <Dialog
          open={open3}
          fullWidth="sm"
          maxWidth="sm"
          onClose={handleClose3}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogContent className={classes.dilogBody}>
            <DialogContentText id="alert-dialog-description">
              <Typography variant="h4" align="center" style={{ color: "#000" }}>
                Enter an amount
              </Typography>
              <Box mt={4}>
                <Input
                  placeholder="300"
                  className={classes.input_fild2}
                  endAdornment={
                    <InputAdornment position="end">
                      Select a token
                    </InputAdornment>
                  }
                />
              </Box>

              <Box mt={4}>
                <Typography
                  variant="h4"
                  align="center"
                  style={{ color: "#000" }}
                >
                  Send a message
                </Typography>
                <TextField
                  id="outlined-multiline-static"
                  multiline
                  rows={4}
                  className={classes.input_fild}
                  defaultValue="Default Value"
                  variant="outlined"
                />
              </Box>
              <Box mt={2} mb={4}>
                <Button
                  variant="contained"
                  size="large"
                  color="secondary"
                  className="btnWidth btn-block btnHight"
                >
                  Donate now
                </Button>
              </Box>
              <small>ETH fees and ETH fees and apply. apply.</small>
            </DialogContentText>
          </DialogContent>
        </Dialog>
      )}
    </Box>
  );
}

export default React.memo(BundleCard);

