import React, { useState, useContext, useEffect } from "react";
import {
  Box,
  Container,
  Grid,
  Button,
  TextField,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import Apiconfigs from "src/Apiconfig/Apiconfigs";
import { UserContext } from "src/context/User";

import ButtonCircularProgress from "src/component/ButtonCircularProgress";
import { FiCopy } from "react-icons/fi";
import { toast } from "react-toastify";
import { CopyToClipboard } from "react-copy-to-clipboard";

const useStyles = makeStyles((theme) => ({
  LoginBox: {
    paddingBottom: "50px",
  },
  basic: {
    textAlign: "center",
    fontFamily: "Poppins",
    fontSize: "30px",
    paddingTop: "20px",
    color: "#141518",
  },
  input_fild2: {
    width: "100%",
    "& input": {
      height: "33px",
      "@media(max-width:960px)": {
        height: "15px",
        marginTop: "-15px",
      },
    },
  },
  Button: {
    display: "flex",
    justifyContent: "flex-end",
    paddingBottom: "25px",
  },
  ButtonBtn: {
    paddingTop: "30px",
    paddingRight: "10px",
    width: "200px",
  },
  name: {
    display: "flex",
    alignItems: "center",
    fontSize: "15px",
    color: "#141518",
    [theme.breakpoints.down("sm")]: {
      display: "block",
    },
    "& p": {
      fontSize: "15px",
      color: "#707070",
      paddingLeft: "5px",
    },
  },
  inputbox: {
    width: "100%",
    height: "120px",
  },
  profile: {
    display: "flex",
    flexDirection: "column",
    marginTop: "-75px",
  },
  coverpic: {
    width: "100%",
  },
  profilepic: {
    width: "127.7px",
    height: "127.7px",
    borderRadius: "50%",
  },
  coverback: {
    height: "127.7px",
    width: "100%",
  },

  CoverBox: {
    display: "flex",
    alignItems: "flex-end",
    flexDirection: "column",
  },
  coverEdit: {
    color: "#ffffff",
    marginTop: "-40px",
    padding: "10px",
    position: "relative",
    "& input": {
      position: "absolute",
      left: "0",
      top: "0",
      width: "100%",
      height: "100%",
      opacity: "0",
    },
  },
  profileFoto: {
    position: "relative",
    "& input": {
      position: "absolute",
      left: "0",
      top: "0",
      width: "100%",
      height: "100%",
      opacity: "0",
    },
  },
  Box: {
    width: "100%",
    height: "125px",
    backgroundImage: "linear-gradient(to bottom, #c04848, #480048)",
    backgroundRepeat: "no-repeat",
    backgroundSize: "100%",
    backgroundPosition: "center center",
  },
  newsec: {
    display: "flex",
    "@media(max-width:560px)": {
      display: "block",
    },
  },
  mainadd: {
    paddingTop: "8px",
    "@media(max-width:560px)": {},
  },
}));
export function copyTextById(id) {
  var copyText = document.getElementById(id);
  copyText.select();
  copyText.setSelectionRange(0, 99999); /* For mobile devices */
  navigator.clipboard.writeText(copyText.value);
  alert(`Copied ${copyText.value}`);
}

export default function ProfileSettings() {
  const classes = useStyles();
  const history = useHistory();
  const user = useContext(UserContext);
  const [isLoading, setIsloading] = useState(false);
  const [name, setname] = useState(user.userProfileData?.name);
  const [speciality, setspeciality] = useState(user.userProfileData?.speciality);
  const [bio, setbio] = useState(user.userProfileData?.userbio);
  const [profilePic, setProfilePic] = useState(user.userProfileData?.userprofilepic);
  const [cover, setcover] = useState(user.userProfileData?.usercover);
 
  const getBase64 = (file, cb) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      cb(reader.result);
    };
    reader.onerror = function (err) {
      console.log("Error: ", err);
    };
  };

  const updateProfile = async () => {

      if(!name || !bio || !speciality || !profilePic ){
        toast.error("Check field Errors !");
      } else { 
        
        setIsloading(true);
        axios({
          method: "PUT",
          url: Apiconfigs.updateprofile,
          headers: {
            token: sessionStorage.getItem("token"),
          },
          data: {
            name: name,
            speciality: speciality,
            profilePic: profilePic,
            coverPic: cover,
            bio: bio,
            facebook: user.link.userfacebook,
            twitter: user.link.usertwitter,
            youtube: user.link.useryoutube,
            telegram: user.link.usertelegram,
          },
        })
          .then(async (res) => {
            if (res.data.statusCode === 200) {
              toast.success("Your profile has been updated successfully");
            } else {
              toast.error(res.data.responseMessage);
            }
            setIsloading(false);
          })
          .catch((error) => {
            setIsloading(false);

            if (error.response) {
              toast.error(error.response.data.responseMessage);
            } else {
              toast.error(error.message);
            }
          });
      }
  };
  const sociallink = () => {
    history.push("/socialaccounts");
  };
  return (
    <Box className={classes.LoginBox}>
      <Grid className={classes.CoverBox}>
        <Box
          className={classes.Box}
          style={
            cover
              ? {
                  backgroundImage: `url(${cover})`,
                  
                }
              : null
          }
        >
        </Box>
        <Box className={classes.coverEdit} style={{ curser: "pointer" }}>
          Edit Cover Photo{" "}
          <input
            style={{ curser: "pointer" }}
            type="file"
            accept="image/*"
            onChange={(e) => {
              getBase64(e.target.files[0], (result) => {
                setcover(result);
              });
            }}
          />
        </Box>
      </Grid>
      <Container maxWidth="sm">
        <Box className={classes.profile}>
          <img
            style={!profilePic ? {
              border: "dotted 2px red"
            }: null}
            className={classes.profilepic}
            src={profilePic || "/images/users/profilepic1.svg"}
            alt=""
          />
          <Box className={classes.profileFoto} style={{ curser: "pointer" }}>
            Edit profile photo{" "}
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                getBase64(e.target.files[0], (result) => {
                  setProfilePic(result);
                });
              }}
            />
          </Box>
        </Box>
        <Box>
          <Grid container spacing={1}>
            <Grid item xs={12} md={4}>
              <label className={classes.name}>Name</label>
            </Grid>
            <Grid item xs={12} md={8}>
              <TextField
                id="standard-basic"
                value={name}
                error={!name}
                helperText={!name && "Please enter valid name"}
                onChange={(e) => setname(e.target.value)}
                className={classes.input_fild2}
              />
            </Grid>
          </Grid>
        </Box>
        <Box>
          <Grid container spacing={1}>
            <Grid item xs={12} md={4}>
              <label className={classes.name}>Speciality</label>
            </Grid>
            <Grid item xs={12} md={8}>
              <TextField
                id="standard-basic"
                value={speciality}
                error={!speciality}
                helperText={!speciality && "Please enter valid speciality"}
                onChange={(e) => setspeciality(e.target.value)}
                className={classes.input_fild2}
              />
              
            </Grid>
          </Grid>
        </Box>
        <Box>
          <Grid container spacing={1} style={{ alignItems: "center" }}>
          <Grid item xs={12} >
              <label className={classes.name}>About me</label>
            </Grid>
            <Grid item xs={12} >
              <TextField
                id="outlined-multiline-static"
                focused="true"
                multiline
                rows={4}
                value={bio}
                error={!bio}
                helperText={!bio && "Please Fill in something about you"}
                variant="outlined"
                className={classes.inputbox}
                onChange={(e) => setbio(e.target.value)}
              />
            </Grid>
          </Grid>
        </Box>
        <Box style={{ marginTop: "-10px" }}>
          <Grid container spacing={1}>
            <Grid item xs={12} md={4}>
              <label className={classes.name}>Email</label>
            </Grid>
            <Grid item xs={12} md={8}>
              <TextField
                id="standard-basic"
                disabled={true}
                value={user.userData.email}
                className={classes.input_fild2}
              />
            </Grid>
          </Grid>
        </Box>

        <Box>
          <Grid container spacing={1}>
            <Grid item xs={12} md={4}>
            <label className={classes.name}>Profile URL</label>
            </Grid>
            <Grid item xs={12} md={8} alignItems="center"
              justifyContent="center" spacing={2}>
              <span style={{fontSize: "12px", color: "blue"}}>
                https://masplatform.net/user-profile?{user?.userData.userName}
              </span> 
              <CopyToClipboard
                style={{ curser: "pointer" }}
                text={`https://masplatform.net/user-profile?${user.userData.userName}`}
              >
                <FiCopy onClick={() => toast.info("Copied")} />
              </CopyToClipboard>
            </Grid>
          </Grid>
        </Box>
        <Box>
          <Grid container spacing={1}>
          <Grid item xs={12} md={4}>
            <label className={classes.name}>Wallet Address</label>
            </Grid>
            <Grid item xs={12} md={8} alignItems="center"
              justifyContent="center" >
              <span style={{fontSize: "12px", color: "blue"}}>
                {user.userData.ethAccount.address}
              </span>
              <CopyToClipboard
                style={{ curser: "pointer" }}
                text={user.userData.ethAccount.address}
              >
                <FiCopy onClick={() => toast.info("Copied")} />
              </CopyToClipboard>
            </Grid>
            
          </Grid>
        </Box>
        <Box>
          <Grid container spacing={1}>
          <Grid item xs={12} md={4}>
            <label className={classes.name}>Referral</label>
            </Grid>
            <Grid item xs={12} md={4} alignItems="center"
            justifyContent="center">
                <span>{user.userData?.referralCode}</span>
                <CopyToClipboard text={user.userData?.referralCode}>
                  <FiCopy onClick={() => toast.info("Copied")} />
                </CopyToClipboard>
            </Grid>
            
          </Grid>
        </Box>
       
        <Box>
          <Grid container spacing={1} style={{ alignItems: "center" }}>
            <Grid item xs={12} md={6}>
              <Box
                style={{
                  width: "fit-content",
                  cursor: "pointer",
                  textDecoration: "underline",
                }}
              >
                <Typography
                  variant="h4"
                  className={classes.name}
                  onClick={sociallink}
                >
                  Social Link
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box className={classes.Button}>
                <Box className={classes.ButtonBtn}>
                  <Button
                    variant="contained"
                    size="large"
                    color="primary"
                    className="btn-block btnWidth removeredius"
                    component={Link}
                    to="/home"
                    disabled={isLoading}
                  >
                    Cancel
                  </Button>
                </Box>

                <Box className={classes.ButtonBtn}>
                  <Button
                    variant="contained"
                    size="large"
                    color="secondary"
                    className="btn-block btnWidth removeredius"
                    disabled={isLoading}
                    onClick={updateProfile}
                  >
                    {isLoading ? "Updating..." : "Update"}
                    {isLoading && <ButtonCircularProgress />}
                  </Button>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}
