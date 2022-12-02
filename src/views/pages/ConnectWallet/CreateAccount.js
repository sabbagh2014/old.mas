import React, { useContext, useState } from "react";
import {
  Box,
  Container,
  Button,
  TextField,
  makeStyles,
  Grid,
  Typography,
} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import { Link, useHistory } from "react-router-dom";
import Dialog from "@material-ui/core/Dialog";
import axios from "axios";
import {
  isValidationEmail,
  isValidPassword,
  isValidName,
} from "src/CommanFunction/Validation";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { UserContext } from "src/context/User";
import InputAdornment from "@material-ui/core/InputAdornment";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Apiconfigs from "src/Apiconfig/Apiconfigs.js";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
import { toast } from "react-toastify";
import {VerifyOtp} from "src/component/Modals/VerifyOtp"

const useStyles = makeStyles((theme) => ({
  LoginBox: {
    display: "flex",
    padding: "10px 0px",
  },
  connectBox: {
    display: "flex",
    justifyContent: " center",
    alignItems: "center",
    height: "60vh",
    "& h5": {
      fontSize: "20px",
      fontWeight: "500",
      color: "#000",
    },
    "& button": {
      height: "54.5px",
      width: "237.5px",
    },
  },
  modaltitel: {
    fontSize: "30px",
    fontWeight: "600",
    marginBottom: "10px",
    textAlign: "center",
    borderBottom: "solid 1px #e5e3dd",
    paddingBottom: "10px",
    color: "#141518",
    [theme.breakpoints.down("sm")]: {
      fontSize: "20px",
    },
  },
  form: {
    display: "flex",
    justifyContent: "center",
    // alignItems: "center",
  },
  input_fild2: {
    width: "100%",
    "& input": {
      // height: "45px",
    },
  },
  btnflex: {
    display: "flex",
    justifyContent: "flex-end",
    [theme.breakpoints.down("sm")]: {
      justifyContent: "center",
    },
  },
  labeltext: {
    fontSize: "20px",
    fontWeight: "500",
    color: "#000",
    // padding: "0.9em 0em 0.2em",
    marginBottom: "-8px",
  },
  paper: {
    display: "flex",
    alignItems: "center",
    marginLeft: 10,
    "& a": {
      fontWeight: "700",
      textDecoration: "underline",
      color: "#000",
    },
    "& label": {
      paddingTop: "0 !important",
      color: "#141518",
    },
  },
}));

export default function SignUp() {
  const classes = useStyles();
  const user = useContext(UserContext);
  const [pass, setpass] = useState("");
  const [confirmpass, setConfirmpass] = useState("");
  const history = useHistory();
  const [username, setusername] = useState("");
  const [email, setemail] = useState("");
  const [phone, setphone] = useState("");
  const [uservalid, setuservalid] = useState(false);
  const [emailvalid, setemailvalid] = useState(false);
  const [phonevalid, setphonevalid] = useState(false);
  const [passvalid, setpassvalid] = useState(false);
  const [show, setshow] = useState(false);
  const [confirmpassvalid, setconfirmpassvalid] = useState(false);
  const [confirmshow, setconfirmshow] = useState(false);
  const [verifyOTPOpen, setVerifyOTPOpen] = useState(false);
  const [loader, setloader] = useState(false);
  const [termsPopUp, setTermsPopUp] = useState(false);
  const [referralCode, setReferralCode] = useState("");
  const [state, setState] = useState({
    all: false,
    termsCond: false,
    privacyPolicy: true,
    riskStatment: false,
    kycProgram: true,
  });

  const signup = async () => {
    if (username === "" || isValidName(username) === false) {
      setuservalid(true);
      return;
    } else {
      setuservalid(false);
    }

    if (email === "" || isValidationEmail(email) === false) {
      setemailvalid(true);
      return;
    } else {
      setemailvalid(false);
    }

    if (phone === "" ) {
      setphonevalid(true);
      return;
    } else {
      setphonevalid(false);
    }

    if (pass === "" || isValidPassword(pass) == false) {
      setpassvalid(true);
      return;
    } else {
      setpassvalid(false);
    }
    if (confirmpass === "" || confirmpass !== pass) {
      setconfirmpassvalid(true);
      return;
    } else {
      setconfirmpassvalid(false);
    }
 
    setloader(true);
    await axios({
      method: "POST",
      url: Apiconfigs.register,
      data: {
        userName: username,
        password: pass,
        email: email,
        phone: phone,
        referralCode,
      },
    }).then(async (res) => {
        if (res.data.statusCode === 200) {
          user.updatetoken(res.data.result.token);
          setTermsPopUp(false);
          setVerifyOTPOpen(true);
          setloader(false);
        } else {
          toast.error(res.data.responseMessage);
          setloader(false);
        }
      })
      .catch((error) => {
        console.log(error.message);
        if (error.response) {
          toast.error(error.response.data.responseMessage);
        } else {
          toast.error(error.message);
        }
        setloader(false);
      });
  };

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: !state[event.target.name] });
  };
  const { termsCond, privacyPolicy, riskStatment, kycProgram, all } = state;

  return (
    <Box className={classes.LoginBox}>
      <Box className="leftimg">
        <div className="span1"></div>
        <div className="span2"></div>
        <div className="span3"></div>
      </Box>
      <Box className="rightimg">
        <div className="span1"></div>
        <div className="span2"></div>
        <div className="span3"></div>
      </Box>
      <img
        onClick={() => history.push("/")}
        src="images/centerimg.png"
        className="centerimg"
      />
      <Container maxWidth="lg">
        <Typography variant="h3" className={classes.modaltitel}>
          Create your account
        </Typography>

        <Grid container className={classes.form}>
          <Grid item xs={12} md={8}>
            <Box>
              <label className={classes.labeltext}>Username</label>
              <TextField
                required
                value={username}
                error={uservalid}
                helperText={uservalid ? "Please enter username" : ""}
                className={classes.input_fild2}
                onChange={(e) => setusername(e.target.value)}
              />
            </Box>
            <Box>
              <label className={classes.labeltext}>
                Email
              </label>
              <TextField
                required
                error={emailvalid}
                value={email}
                className={classes.input_fild2}
                type="email"
                helperText={emailvalid ? "Plese enter valid email address" : ""}
                onChange={(e) => setemail(e.target.value)}
              />
            </Box>
            <Box>
              <label className={classes.labeltext}>
                Phone number
              </label>
              <TextField
                required
                error={phonevalid}
                value={phone}
                className={classes.input_fild2}
                type="tel"
                helperText={phonevalid ? "Plese enter valid phone number" : ""}
                onChange={(e) => setphone(e.target.value)}
              />
            </Box>

            <Box>
              <label className={classes.labeltext}>Password</label>
              <TextField
                
                type={show ? "text" : "password"}
                error={passvalid}
                helperText={
                  passvalid
                    ? "Password must contain at least 8 characters, one uppercase, one number and one special case character"
                    : ""
                }
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setshow(!show)}
                      >
                        {show ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                onChange={(e) => setpass(e.target.value)}
                className={classes.input_fild2}
              />
            </Box>
            <Box>
              <label className={classes.labeltext}>Confirm Password</label>
              <TextField
                
                type={confirmshow ? "text" : "password"}
                error={confirmpassvalid}
                helperText={
                  confirmpassvalid
                    ? "Password didn't matched, Please check"
                    : ""
                }
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setconfirmshow(!confirmshow)}
                      >
                        {confirmshow ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                onChange={(e) => setConfirmpass(e.target.value)}
                className={classes.input_fild2}
              />
            </Box>
            <Box>
              <label className={classes.labeltext}>Referral Code</label>
              <TextField
                placeholder="Referral Code (optional)"
                className={classes.input_fild2}
                name="Referral"
                onChange={(e) => setReferralCode(e.target.value)}
              />
            </Box>
            <Box className={classes.btnflex} mt={5}>
              <Button
                variant="contained"
                size="large"
                color="primary"
                className="widthsame ml-10"
                onClick={() => history.goBack()}
              >
                Back
              </Button>
              <Button
                variant="contained"
                size="large"
                color="secondary"
                className="widthsame ml-10"
                onClick={() => setTermsPopUp(true)}
                disabled={loader}
              >
                Sign up {loader && <ButtonCircularProgress />}
              </Button>
            </Box>
          </Grid>
        </Grid>
        <Dialog
          open={termsPopUp}
          keepMounted
          fullWidth="sm"
          maxWidth="sm"
          onClose={() => setTermsPopUp(false)}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              <img src="images/centerimg.png" className="centerimg" />
              <Box>
                <Typography
                  variant="h4"
                  style={{ color: "#792034", marginBottom: "10px", textAlign: 'center' }}
                >
                  Last step to create your account
                </Typography>
                <Typography
                  variant="body"
                  component="p"
                  align="center"
                  style={{ fontSize: "14px" }}
                >
                  Before creating your account, you should agree to our terms
                  and conditions, privacy policy and risk disclosure statements.{" "}
                </Typography>
              </Box>
              <Box className={classes.paper} mt={4}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={termsCond}
                      onChange={handleChange}
                      name="termsCond"
                    />
                  }
                />
                <label>
                  I have read and agree to{" "}
                  <Link target="_blank" to="/terms-conditions">
                    Terms and Conditions
                  </Link>
                  .
                </label>
              </Box>
              <Box className={classes.paper}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={privacyPolicy}
                      onChange={handleChange}
                      name="privacyPolicy"
                    />
                  }
                />
                <label>
                  I have read and agree to{" "}
                  <Link target="_blank" to="/privacy-policy">
                    Privacy Policy
                  </Link>
                  .
                </label>
              </Box>
              <Box className={classes.paper}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={riskStatment}
                      onChange={handleChange}
                      name="riskStatment"
                    />
                  }
                />
                <label>
                  I have read and agree to{" "}
                  <Link target="_blank" to="/risk-statment">
                    Risk disclosure statement
                  </Link>
                  .
                </label>
              </Box>
              <Box className={classes.paper}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={kycProgram}
                      onChange={handleChange}
                      name="kycProgram"
                    />
                  }
                />
                <label>
                  I have read and agree to{" "}
                  <Link target="_blank" to="/kyc-program">
                    KYC program
                  </Link>
                  .
                </label>
              </Box>
              <Box className={classes.paper} mt={1}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={all}
                      onChange={() => {
                        if (state.all) {
                          setState({
                            ...state,
                            all: false,
                            termsCond: false,
                            privacyPolicy: false,
                            riskStatment: false,
                            kycProgram: false,
                          });
                        } else {
                          setState({
                            ...state,
                            all: true,
                            termsCond: true,
                            privacyPolicy: true,
                            riskStatment: true,
                            kycProgram: true,
                          });
                        }
                      }}
                      name="all"
                    />
                  }
                />
                <label>Read and agree to all.</label>
              </Box>
              
              <Box mt={2} mb={5} pb={3} className={classes.btnBox}>
                <Button
                  variant="contained"
                  size="large"
                  color="secondary"
                  className="btn-block"
                  disabled={loader}
                  onClick={() => {
                    if (
                      state.termsCond &&
                      state.privacyPolicy &&
                      state.riskStatment &&
                      state.kycProgram
                    ) {
                      signup();
                    }
                  }}
                >
                  Continue{loader && <ButtonCircularProgress />}
                </Button>
              </Box>
            </DialogContentText>
          </DialogContent>
        </Dialog>
      </Container>
      <VerifyOtp 
        open={verifyOTPOpen} 
        handleClose={()=> setVerifyOTPOpen(false)}
        successCallback={()=> {
          setVerifyOTPOpen(false);
          history.push('/profilesettings')
        }}
      />
    </Box>
  );
}
