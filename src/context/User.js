import React, { createContext, useEffect, useState, } from "react";
import Apiconfigs, { socketURL } from "src/Apiconfig/Apiconfigs";
import axios from "axios";

const UserContext = createContext();

function checkLogin() {
  const accessToken = sessionStorage.getItem("token");
  return accessToken ? true : false;
}

const setTokenSession = (token) => {
  if (token) {
    sessionStorage.setItem("token", token);
  } else {
    sessionStorage.removeItem("token");
  }
};

const UserContextProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(checkLogin());
  const [userData, setUserData] = useState({});
  const [unReadNotification, setUnReadNotification] = useState(0);
  const [search, setsearch] = useState("");
  const [userEarnings, setUserEarnings] = useState({});
  const [userProfileData, setUserProfileData] = useState({
    username: "",
    useremail: "",
    userbio: "",
    userprofile: "",
    usercover: "",
    userprofileurl: "",
    usercoverurl: "",
    name: "",
    speciality: "",
  });
  const [link, setlink] = useState({
    useryoutube: "",
    usertwitter: "",
    userfacebook: "",
    usertelegram: "",
  });
  const [notifyData, setNotifyData] = useState([]);
  const [notifyLoader, setNotifyLoder] = useState(false);


  const getProfileDataHandler = async () => {
    try {
      axios({
        method: "GET",
        url: Apiconfigs.profile,
        headers: {
          token: sessionStorage.getItem("token"),
        },
      }).then(async (res) => {
        if (res.data.statusCode === 200) {
          setUserData({...res.data.userDetails});
          setUserProfileData({
            ...userProfileData,
            name: res?.data?.userDetails?.name,
            speciality: res?.data?.userDetails?.speciality,
            username: res?.data?.userDetails?.userName,
            useremail: res?.data?.userDetails?.email,
            userurl: res?.data?.userDetails?.masPageUrl,
            userbio: res?.data?.userDetails?.bio,
            userprofilepic: res?.data?.userDetails?.profilePic,
            usercover: res?.data?.userDetails?.coverPic,
            userprofileurl: "",
            usercoverurl: "",
          });
          setlink({
            ...link,
            useryoutube: res?.data?.userDetails?.youtube,
            usertwitter: res?.data?.userDetails?.twitter,
            userfacebook: res?.data?.userDetails?.facebook,
            usertelegram: res?.data?.userDetails?.telegram,
          });
        } else {
          setIsLogin(false);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getTotalEarningsHandler = async () => {
    try {
      const res = await axios({
        method: "GET",
        url: Apiconfigs.totalEarnings,
        headers: {
          token: sessionStorage.getItem("token"),
        },
      });
      if (res.data.statusCode === 200) {
        setUserEarnings(res.data.result);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isLogin) {
      getProfileDataHandler();
      getTotalEarningsHandler();
    }
  }, [isLogin]);

  let data = {
    unReadNotification,
    userLoggedIn: isLogin,
    userEarnings,
    setsearch,
    search,    
    link,
    userProfileData,
    notifyLoader,
    notifyData,
    updateUserStateData: (data) => {
      setUserProfileData({
        ...userProfileData,
        name: data.name,
        speciality: data.speciality,
        username: data.username,
        useremail: data.useremail,
        userurl: data.userurl,
        userbio: data.userbio,
        userprofile: data.profile,
        usercover: data.cover,
        userprofileurl: data.profileurl,
        usercoverurl: data.coverurl,
      });
    },
    userlink: (data) => {
      setlink({
        ...link,
        useryoutube: data.youtube,
        usertwitter: data.twitter,
        userfacebook: data.facebook,
        usertelegram: data.telegram,
      });
    },
    isLogin,
    userData,
    logOut: () => {
      setIsLogin(false);
      setTokenSession(false);
      setUserData();
      setUserProfileData();
      sessionStorage.removeItem("token");
      sessionStorage.clear();
    },
    updatetoken: (token) => {
      setTokenSession(token);
      setIsLogin(true);
      data.updateUserData();
    },
    updateUserData: () => getProfileDataHandler(),
  };

  useEffect(() => {
    const web = new WebSocket(socketURL);
    const accessToken = sessionStorage.getItem("token");
    if (userData  && accessToken) {
      setNotifyLoder(true);
      try {
        setNotifyLoder(true);
        web.onopen = () => {
          const dataToSend = {
            option: "notification",
            token: accessToken,
          };
          web.send(JSON.stringify(dataToSend));
          web.onmessage = async (event) => {
            setNotifyLoder(false);

            if (event.data !== "[object Promise]" && event.data !== "null") {
              setNotifyLoder(false);

              let obj = JSON.parse(event.data);
              if (obj.data && obj.data.length > 0) {
                setNotifyLoder(false);

                setNotifyData(obj.data);
                setUnReadNotification(obj.unReadCount);
              } else {
                setNotifyLoder(false);

                setNotifyData([]);
                setUnReadNotification(0);
              }
            }
          };
        };
        return () => {
          setNotifyLoder(false);

          setNotifyData([]);
          setUnReadNotification(0);
        };
      } catch (err) {
        setNotifyLoder(false);
      }
    }
  }, [userData]);

  return (
    <UserContext.Provider value={data}>{children}</UserContext.Provider>
  );
}

export {UserContext, UserContextProvider}
