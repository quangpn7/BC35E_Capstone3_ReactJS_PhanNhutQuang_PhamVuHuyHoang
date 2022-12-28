export const USER_LOGIN = "userLogin";
export const TOKEN = "accessToken";

export const CYBER_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCAzNUUiLCJIZXRIYW5TdHJpbmciOiIzMS8wNS8yMDIzIiwiSGV0SGFuVGltZSI6IjE2ODU0OTEyMDAwMDAiLCJuYmYiOjE2NTczODYwMDAsImV4cCI6MTY4NTYzODgwMH0.LWlPoCoXPHgp2U6FijTqXvKFt7ENvY9Tyn9ux-bVlXo";
//function localStorage
export const {
  saveStore,
  saveStoreJSON,
  getStore,
  getStoreJSON,
  deleteStore,
  setCookie,
  getCookie,
  eraseCookie,
} = {
  //<---LOCAL STORAGE--->

  saveStore: (name, data) => {
    localStorage.setItem(name, data);
  },
  saveStoreJSON: (name, data) => {
    localStorage.setItem(name, JSON.stringify(data));
  },
  getStore: (name) => {
    if (localStorage.getItem(name)) {
      return localStorage.getItem(name);
    }
    return null;
  },
  getStoreJSON: (name) => {
    if (localStorage.getItem(name)) {
      return JSON.parse(localStorage.getItem(name));
    }
    return null;
  },
  deleteStore: (name) => {
    localStorage.removeItem(name);
  },
  //<---COOKIES--->
  setCookie: (name, value, days) => {
    var expires = "";
    if (days) {
      var date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
  },
  getCookie: (name) => {
    var nameEQ = name + "=";
    var ca = document.cookie.split(";");
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == " ") c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  },
  eraseCookie: (name) => {
    document.cookie =
      name + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
  },
};
