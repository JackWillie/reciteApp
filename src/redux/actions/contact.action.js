import API from "../API";

export function createContact(data, setModalVisible, setRelModal, toast) {
  return async (dispatch) => {
    try {
      const result = await API.post("contact/create", data, {
        headers: {
          "content-type": "multipart/form-data",
        },
      });
      if (result.data.status == "success") {
        setRelModal(false);
        setModalVisible(true);
      }
    } catch (err) {
      toast.show("Server Error", {
        duration: 5000,
        type: "warning",
        placement: "top",
      });
    }
  };
}

export function getContact(data, navigate) {
  return async (dispatch) => {
    API.get(`contact/getContact?owner=${data.owner}`)
      .then((result) => {
        dispatch(setContactlist(result.data.contactresult));
      })
      .catch((err) => {});
  };
}

export function setContactlist(data) {
  return { type: "setContactlist", data };
}

export function deleteContact(data) {
  return async (dispatch) => {
    API.post(`contact/delete`, { id: data.id })
      .then((result) => {
        if (result.data.status == "success")
          dispatch(getUnreadInfo(data.getunread));
      })
      .catch((err) => {});
  };
}

export function deleteEmail(data, navigation) {
  return async (dispatch) => {
    API.post(`email/delete`, data)
      .then((result) => {
        if (result.data.status == "success"){
          navigation.goBack();
        }
      })
      .catch((err) => {});
  };
}

export function deleteMessage(data, navigation) {
  return async (dispatch) => {
    API.post(`message/delete`, data)
      .then((result) => {
        if (result.data.status == "success"){
          navigation.goBack();
        }
      })
      .catch((err) => {});
  };
}

export function setContactInfo(data) {
  return { type: "setContactInfo", data };
}

export function getContactEmailInfo(data, navigate) {
  return async (dispatch) => {
    API.get(`email/getAllEmail?owner=${data.owner}&to=${data.to}`)
      .then((result) => {
        dispatch(setContactEmailInfo(result.data.emailresult));
      })
      .catch((err) => {});
  };
}

export function setContactEmailInfo(data) {
  return { type: "setContactEmailInfo", data };
}

export function getContactMessageInfo(data, navigate) {
  return async (dispatch) => {
    API.get(`message/getAllMessage?user1=${data.user1}&user2=${data.user2}`)
      .then((result) => {
        dispatch(setContactMessageInfo(result.data.messageresult));
      })
      .catch((err) => {});
  };
}

export function setContactMessageInfo(data) {
  return { type: "setContactMessageInfo", data };
}

export function sendEmail(data, navigation, setModalVisible, toast) {
  return async (dispatch) => {
    try {
      const result = await API.post("email/send", data, {
        headers: {
          "content-type": "multipart/form-data",
        },
      });
      if (result.data.status === "success") {
        setModalVisible(false);
        navigation.navigate("contacts");
      }
    } catch (err) {
      console.log(err);
      toast.show("Server Error", {
        duration: 5000,
        type: "warning",
        placement: "top",
      });
    }
  };
}

export function sendMessage(data, navigation, setModalVisible, toast) {
  return async (dispatch) => {
    try {
      const result = await API.post("message/send", data, {
        headers: {
          "content-type": "multipart/form-data",
        },
      });
      if (result.data.status === "success") {
        setModalVisible(false);
        navigation.navigate("contacts");
      }
    } catch (err) {
      toast.show("Server Error", {
        duration: 5000,
        type: "warning",
        placement: "top",
      });
    }
  };
}

export function saveRelative(data, setModalVisible, navigation, toast) {
  return async (dispatch) => {
    try {
      const result = await API.post("contact/saveRelative", data);
      if (result.data.status === "success") {
        setModalVisible(false);
        navigation.navigate("contacts");
      }
    } catch (err) {
      toast.show(JSON.parse(err.request.response).message, {
        duration: 5000,
        type: "warning",
        placement: "top",
      });
    }
  };
}

export function getUnreadInfo(data, navigate) {
  return async (dispatch) => {
    API.get(
      `contact/getUnreadInfo?owner=${data.owner}&category=${data.category}&focus_following=${data.focus_folloing}`
    )
      .then((result) => {
        dispatch(setUnreadlist(result.data.infos));
      })
      .catch((err) => {});
  };
}

export function setUnreadlist(data) {
  return { type: "setUnreadlist", data };
}


export function updateContact(data, setModalVisible, setRelModal, toast) {
  return async (dispatch) => {
    try {
      const result = await API.post("contact/edit", data, {
        headers: {
          "content-type": "multipart/form-data",
        },
      });
      if (result.data.status == "success") {
        setRelModal(false);
        setModalVisible(true);
      }
    } catch (err) {
      toast.show("Server Error", {
        duration: 5000,
        type: "warning",
        placement: "top",
      });
    }
  };
}


export function getAllInfo(data, navigate) {
  return async (dispatch) => {
    API.get(`contact/getAllInfo?owner=${data.owner}&id=${data.id}`)
      .then((result) => {
        dispatch(setPersonInfo({contactresult: result.data.contactresult, infos: result.data.infos}));
      })
      .catch((err) => {});
  };
}


export function setPersonInfo(data) {
  return { type: "setPersonInfo", data };
}

export function getEmail(data, navigate) {
  return async (dispatch) => {
    API.get(`email/getEmail?id=${data.id}`)
      .then((result) => {
        dispatch(setEmail(result.data.result));
      })
      .catch((err) => {});
  };
}

export function setEmail(data) {
  return { type: "setEmail", data };
}

export function getMessage(data, navigate) {
  return async (dispatch) => {
    API.get(`message/getMessage?id=${data.id}`)
      .then((result) => {
        dispatch(setEmail(result.data.result));
      })
      .catch((err) => {});
  };
}
