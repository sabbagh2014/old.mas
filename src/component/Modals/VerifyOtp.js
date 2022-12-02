
import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
} from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import axios from "axios";
import { toast } from "react-toastify";
import Apiconfigs from "src/Apiconfig/Apiconfigs";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";

export const VerifyOtp = ({ open, handleClose, successCallback}) => {

  const [minuteTimer, setMinuteTimer] = useState(60);
  const [code, setCode] = useState("");
  const [validcode, setvalidcode] = useState("");
  const [loader, setloader] = useState(false);
  const [severity, setSeverity] = useState();


    const verifyOtpHandler = async () => {
        
        if (code.length != 6){
            setvalidcode(false)
        } else {
            setloader(true)
            const res = await axios.post(
                Apiconfigs.verifyOtp,
                {
                otp: code,
                channel: 'email',
                },
                {
                headers: {
                    token: sessionStorage.getItem("token"),
                },
                }
            );
            if(res.data.result.verified){
              successCallback()
            } else {
              toast.error(res.data.responseMessage);
            }
            setloader(false)
        }        
    }

    const sendOTPHandler = async () => {
      try {
        setloader(true);
        const res = await axios.post(Apiconfigs.sendOtp, {
          channel: 'email',
        },
        {
          headers: {
              token: sessionStorage.getItem("token"),
          },
        });
        if (res.data.statusCode === 200) {
          setloader(false);
          setMinuteTimer(60);
          toast.success(res.data.responseMessage);
        } else {
          toast.error(res.data.responseMessage);
        }
        setloader(false);
      } catch (error) {
        console.log(error.message);
        if (error.response) {
          toast.error(error.response.data.responseMessage);
        } else {
          toast.error(error.message);
        }
        setloader(false);
      }
    };

    useEffect(() => {
        let timeout;
        if (minuteTimer && minuteTimer >= 0) {
          timeout = setTimeout(() => setMinuteTimer(minuteTimer - 1), 1000);
        } else {
          setMinuteTimer();
          clearTimeout(timeout);
        }
    });

    return (
            <Dialog
              fullWidth
              maxWidth="sm"
              open={open}
              onClose={() => handleClose}
            >
              <DialogTitle>
              <Typography
                  variant="h4"
                  style={{ color: "#792034", marginBottom: "10px", textAlign: 'center' }}
                >
                  Please enter OTP sent to your email address
                </Typography>
              </DialogTitle>
              <DialogContent>
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                >
                  <TextField
                    style={{flexGrow: 1}}
                    autoFocus
                    margin="dense"
                    label="Please enter OTP"
                    variant="standard"
                    inputProps={{ maxLength: 6 }}
                    error={validcode}
                    helperText={
                      validcode && "OTP invalid"
                    }
                    value={code}
                    
                    onChange={(e) => setCode(e.target.value)}
                  />
                  <Button onClick={() => sendOTPHandler()} disabled={minuteTimer}>
                    Resend {minuteTimer && `in ${minuteTimer}s`}
                  </Button>
                </Box>
              </DialogContent>
              <DialogActions textAlign="center">
                <Button 
                variant="contained"
                color="secondary"
                style={{width: "200px"}}
                disabled={loader}
                onClick={() => verifyOtpHandler()}>
                  Submit {loader && <ButtonCircularProgress />}
                </Button>
              </DialogActions>
            </Dialog>
    );
}