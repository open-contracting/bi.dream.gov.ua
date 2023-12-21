import { useEffect, useContext, useState } from "react";
import GlobalContext from "GlobalContext";
import axios from "axios";

/**
 * Parse user info string and returns User object
 * @param {string} s - user info string: UserDirectory=dir; UserId=uid
 * e.g.: 
 * UserDirectory=NONE; UserId=anonymouse...
 * UserDirectory=facebook; UserId=some name
 * @returns User object info
 */
function parseUserStr(s) {
    const uinfo = (s && s.split(';')) || [];
    let userDirectory = "";
    let user = "";
    let id;
    if(uinfo.length > 1) {
      //console.log(uinfo[0].match(/^UserDirectory=(*);/));
      const dirInfo = uinfo[0].trim().match(/^UserDirectory=(.*)/);
      userDirectory = dirInfo && dirInfo.length > 1 ? dirInfo[1] : "";

      const userInfo = uinfo[1].trim().match(/^UserId=(.*)/);
      user = userInfo && userInfo.length > 1 ? userInfo[1] : "";

      id = uinfo.length > 2 ? uinfo[2] : '';
    }
    return {
      UserDirectory: userDirectory,
      User: user,
      isAnonymous: isAnonymous(userDirectory, user),
      //Id: id,
      getFullUserId: () => `${user};${id}`
    }
}

function isAnonymous(UserDirectory, UserId) {
  return UserDirectory === 'NONE' && UserId.match(/^anonymous*/) != null;
}

export default function useAuthenticatedUser() {
  const { app } = useContext(GlobalContext);
  const [userInfoObject, setUserInfoObject] = useState({UserDirectory: null, UserId: null});
  const [err, setError] = useState(null);
  
  useEffect(() => {
    app.model.waitForOpen.promise.then(() => {
      setTimeout(async () => {
        app.model.enigmaModel.evaluate('=OsUser()').then(async (reply) => {
          console.log('OsUser: ', reply);
          const u = parseUserStr(reply);
          if(!u.isAnonymous) {
            const userInfo = await axios.get(`${process.env.REACT_APP_API_SERVICE}/api/auth/user/${u.UserDirectory}/${u.getFullUserId()}`);
            if(userInfo.data && userInfo.data.length > 0) {
              u.Attributes = userInfo.data[0].Attributes ? [...userInfo.data[0].Attributes] : [];
              if(u.Attributes.length > 1 && u.Attributes[1].userName)
                u.User = u.Attributes[1].userName;
            }
            console.log(userInfo);
          }
          setUserInfoObject(u);
        }).catch(err => {
          if(!err) setError(err);
        });
      }, 500);
    });
  }, [app, err])

  return userInfoObject;
}
