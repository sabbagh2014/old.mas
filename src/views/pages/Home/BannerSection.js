import React from 'react'
import {
  Grid,
  Container,
  Box,
  Typography,
  makeStyles,
  Button,
} from '@material-ui/core'
import { useHistory, useLocation } from 'react-router-dom'
import Slider from 'react-slick'
const useStyles = makeStyles((theme) => ({
  bannerSectionBody: {
    padding: '100px 0px 0px',
    backgroundImage: 'url(/images/BannerImg.png)',
    width: '100%',
  },
  bannerSectionBodyNew: {
    padding: '100px 0px 0px',
    backgroundImage: 'linear-gradient(45deg, #240b36 30%, #c31432 90%)',
    width: '100%',
  },
  
  leftSection: {
    padding: '0px 0px',
    fontFamily: 'Poppins sans-serif',
    '@media(max-width:667px)': {
      marginTop: '11px',
    },

    '& h1': {
      fontSize: '60px',
      fontWeight: '800',
      fontFamily: 'Poppins sans-serif',
      lineHeight: '70px',
      letterSpacing: '10px',
      color: '#d0dfde',

      '@media(max-width:1156px)': {
        fontSize: '50px',
        lineHeight: '65px',
      },
      '@media(max-width:667px)': {
        fontSize: '40px',
        lineHeight: '55px',
      },
      '@media(max-width:450px)': {
        fontSize: '35px',
        lineHeight: '45px',
      },
    },
    '& h2': {
      fontSize: '48px',
      fontWeight: '600',
      lineHeight: '60px',
      fontFamily: 'Poppins sans-serif',
      letterSpacing: '2px',
      //   color: "#fc424d",
      color: '#d0dfde',
      '@media(max-width:1156px)': {
        fontSize: '38px',
        lineHeight: '52px',
      },
      '@media(max-width:667px)': {
        fontSize: '26px',
        lineHeight: '42px',
      },
      '@media(max-width:450px)': {
        fontSize: '24px',
        lineHeight: '38px',
      },
    },
    '& h3': {
      fontSize: '26px',
      fontWeight: '350',
      lineHeight: '48px',
      fontFamily: 'Poppins sans-serif',
      letterSpacing: '2px',
      color: '#d0dfde',
      textAlign: 'center',
      '@media(max-width:1156px)': {
        fontSize: '20px',
        lineHeight: '36px',
      },
      '@media(max-width:667px)': {
        fontSize: '17px',
        lineHeight: '32px',
      },
    },
    '& h4': {
      margin: '26px 0px',
      fontSize: '16px',
      fontWeight: '300',
      lineHeight: '28px',
      fontFamily: 'Poppins sans-serif',
      letterSpacing: '2px',
      color: '#d0dfde',
    },
    '& button': {
      borderRadius: '30px',
      background: '#fc424d',
      fontFamily: 'Poppins sans-serif',
      color: '#d0dfde',
      padding: '8px 14px',
    },
  },
  rightSection: {
    '& img': {
      width: '100%',
      minHeight: '300px',
      borderRadius: '10px',
    },
  },
  btn: {
    display: 'flex',
    justifyContent: 'center',
    paddingTop: '15px',
    width: '100%',
    height: '5vh',
  },
  imgsec: {
    position: 'absolute',
    right: '-15px',
    bottom: '57px',
    width: '95px',
    '@media(max-width:768px)': {
      right: '-17px',
      bottom: '113px',
      width: '87px',
    },
    
  },
}))

export default function BannerSection({ auth, bannerDetails, bannerVideo }) {
  const history = useHistory()
  const settings = {
    centerMode: true,
    slidesToShow: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    slidesToScroll: 1,
    focusOnSelect: true,
    infinite: true,
    arrows: false,
    dots: false,
    fade: true,
    speed: 500,
    centerPadding: '0px',
    className: 'slides',
  }
  const settings2 = {
    dots: false,
    infinite: true,
    speed: 500,
    centerPadding: '0px',
    slidesToShow: 1,
    className: 'slides',
    arrow: true,
    autoplay: true,
    autoplaySpeed: 4000,
    slidesToScroll: 1,
  }
  const classes = useStyles()
  return (
    <>
      <Slider {...settings2}>
        {bannerDetails &&
          bannerDetails?.map((data, i) => {
            return (
              <Box
                className={classes.bannerSectionBody}
                style={{
                  backgroundImage: 'url(/images/BannerImg.png) !important',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: 'cover',
                }}
              >
                {data?.mediaType === 'video' ? (
                  <video
                    controls="false"
                    autoPlay="true"
                    loop
                    muted
                    playsinline="true"
                    width="100%"
                    className="banerbg"
                  >
                    <source src={data?.image} type="video/mp4" />
                  </video>
                ) : (
                  <img className="banerbg" src={data?.image} alt="" />
                )}
                <Container maxWidth="lg">
                  <Grid container spacing={5} center>
                    <Grid item lg={6} sm={12} md={6} xs={12}>
                      <Box className={classes.leftSection}>
                      
                        <Box style={{ position: 'relative' }}>
                          <img
                            className={classes.imgsec}
                            src="/images/bannerFont.png"
                            alt=""
                          />
                          <Typography
                            variant="h1"
                            style={{ textAlign: 'right', marginTop: '34px' }}
                            className="seats"
                          >
                            {data?.title}
                          </Typography>
                        </Box>

                        <Typography
                          variant="h3"
                          className={`${classes.text} seats`}
                        >
                          {data?.description}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item lg={6} sm={12} md={6} xs={12}>
                      <Slider {...settings} className="width100">
                        {bannerVideo &&
                          bannerVideo.map((data, i) => {
                            return (
                              <Box className={classes.rightSection}>
                                <video
                                  className="videoBg"
                                  autoPlay
                                  muted
                                  loop
                                  width="100%"
                                  style={{ borderRadius: '20px' }}
                                 
                                >
                                  <source
                                    src={
                                      data?.video
                                        ? data?.video
                                        : '/video/MASpresentation.mp4'
                                    }
                                    type="video/mp4"
                                  />
                                </video>
                              </Box>
                            )
                          })}
                      </Slider>

                      <Box
                        className={classes.btn}
                        style={{ paddingBottom: '20px' }}
                      >
                        {!auth.userLoggedIn ? (
                          <Button
                            variant="outlined"
                            style={{
                              color: '#d0dfde',
                              borderColor: 'd0dfde',
                              borderRadius: '25px',
                              border: '4px solid #d0dfde',
                              fontSize: '25px',
                              height: '50px',
                            }}
                            onClick={() => {
                              auth.logOut()
                              history.push('/login')
                            }}
                          >
                            CLICK TO WIN
                          </Button>
                        ) : (
                          <Button
                            variant="outlined"
                            style={{
                              color: '#d0dfde',
                              borderColor: 'd0dfde',
                              borderRadius: '25px',
                              border: '4px solid #d0dfde',
                              fontSize: '25px',
                              height: '50px',
                            }}
                          >
                            CLICK TO WIN
                          </Button>
                        )}
                      </Box>
                    </Grid>
                  </Grid>
                </Container>
              </Box>
            )
          })}
      </Slider>
      {bannerDetails && bannerDetails?.length === 0 && (
        <Box className={classes.bannerSectionBodyNew}>
          <Container maxWidth="lg">
            <Grid container spacing={5} center>
              <Grid item lg={6} sm={12} md={6} xs={12}>
                <Box className={classes.leftSection}>
                  
                </Box>
              </Grid>

              <Grid item lg={6} sm={12} md={6} xs={12}>
                <Slider {...settings} className="width100">
                  {bannerVideo &&
                    bannerVideo.map((data, i) => {
                      return (
                        <Box className={classes.rightSection}>
                          <img src="images/feed1.png" alt="" /> 
                          <video
                            className="videoBg"
                            autoPlay
                            muted
                            loop
                            width="100%"
                            style={{ borderRadius: '20px' }}
                          >
                            <source
                              src={
                                data?.video
                                  ? data?.video
                                  : '/video/MASpresentation.mp4'
                              }
                              type="video/mp4"
                            />
                          </video>
                        </Box>
                      )
                    })}
                </Slider>

                
              </Grid>
            </Grid>
          </Container>
        </Box>
      )}
    </>
  )
}
