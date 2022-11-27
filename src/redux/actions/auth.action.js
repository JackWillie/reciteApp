import API from "../API";
// import AsyncStorage from '@react-native-community/async-storage';

export function login(data, navigate, toast) {
  return async (dispatch) => {
    API.post("auth/login", data)
      .then((result) => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.setItem("user", JSON.stringify(result.data.data.user));
        localStorage.token = result.data.data.token;
        toast.show("Login success", {
          duration: 5000,
          type: "success",
          placement: "top",
        });
        dispatch(setUser(result.data.data.user));
      })
      .catch((err) => {
        toast.show(JSON.parse(err.request.response).message, {
          duration: 5000,
          type: "warning",
          placement: "top",
        });
      });
  };
}

export function setUser(data) {
  return { type: "setUser", data };
}

export function register(data, navigate, toast) {
  return async (dispatch) => {
    API.post("auth/register", data)
      .then((result) => {
        if (result.data.status === "success") {
          dispatch({ type: "settempemail", data: result.data.user.email });
          toast.show("Verify Code was sent to your email", {
            duration: 5000,
            type: "success",
            placement: "top",
          });
          navigate("verification", {id: 'unsigned'});
        }
      })
      .catch((err) => {
        toast.show(JSON.parse(err.request.response).message, {
          duration: 5000,
          type: "warning",
          placement: "top",
        });
      });
  };
}

export function logout(navigate) {
  return async (dispatch) => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    dispatch(setUser(""));
    navigate("signIn");
  };
}

export function verificationcode(data, navigate, toast) {
  return async (dispatch) => {
    API.post("auth/verification", data)
      .then((result) => {
        if (result.data.status === "success") {
          dispatch({ type: "settempcode", data: "" });
          navigate("verificationEmail");
        }
      })
      .catch((err) => {
        toast.show(JSON.parse(err.request.response).message, {
          duration: 5000,
          type: "warning",
          placement: "top",
        });
      });
  };
}

export function verificationresend(data, navigate, toast) {
  return async (dispatch) => {
    API.post("auth/resend", data)
      .then((result) => {
        if (result.data.status === "success") {
          toast.show("Verification code resend", {
            duration: 5000,
            type: "success",
            placement: "top",
          });
          dispatch({ type: "settempemail", data: data.email });
        }
      })
      .catch((err) => {
        toast.show(JSON.parse(err.request.response).message, {
          duration: 5000,
          type: "warning",
          placement: "top",
        });
      });
  };
}

export function resetPassword(data, navigate, toast) {
  return async (dispatch) => {
    API.post("auth/reset", data)
      .then((result) => {
        if (result.data.status === "success") {
          dispatch({ type: "settempemail", data: result.data.email });
          navigate("verification", {id:'signed'});
        }
      })
      .catch((err) => {
        toast.show(JSON.parse(err.request.response).message, {
          duration: 5000,
          type: "warning",
          placement: "top",
        });
      });
  };
}

export function resetverificationcode(data, navigate, toast) {
  return async (dispatch) => {
    API.post("auth/resetcode", data)
      .then((result) => {
        if (result.data.status === "success") {
          // dispatch({type: 'settempcode', data: ''});
          navigate("setUpPassword");
        }
      })
      .catch((err) => {
        toast.show(JSON.parse(err.request.response).message, {
          duration: 5000,
          type: "warning",
          placement: "top",
        });
      });
  };
}

export function resetverificationresend(data, navigate, toast) {
  return async (dispatch) => {
    API.post("auth/reset", data)
      .then((result) => {
        if (result.data.status === "success") {
          toast.show("Verification code resend", {
            duration: 5000,
            type: "success",
            placement: "top",
          });
          dispatch({ type: "settempemail", data: result.data.email });
        }
      })
      .catch((err) => {
        toast.show(JSON.parse(err.request.response).message, {
          duration: 5000,
          type: "warning",
          placement: "top",
        });
      });
  };
}

export function setUpPass(data, navigate, toast) {
  return async (dispatch) => {
    API.post("auth/setUpPassword", data)
      .then((result) => {
        if (result.data.status === "success") {
          dispatch({ type: "settempemail", data: "" });
          navigate("signIn");
        }
      })
      .catch((err) => {
        toast.show(JSON.parse(err.request.response).message, {
          duration: 5000,
          type: "warning",
          placement: "top",
        });
      });
  };
}
