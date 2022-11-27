import API from "../API";

export function createFile(data, setResultModalVisible) {
  return async (dispatch) => {
    try {
      const result = await API.post("file/create", data.formData, {
        headers: {
          "content-type": "multipart/form-data",
        },
      });
      if (result.data.status == "success") {
        dispatch(getAllFiles({ creator: data.creator }));
        setResultModalVisible(true);
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

export function createFolder(data, setResultModalVisible) {
  return async (dispatch) => {
    try {
      const result = await API.post("folder/create", data);
      if (result.data.status == "success") {
        setResultModalVisible(true);
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

export function getAllFiles(data, navigate) {
  return async (dispatch) => {
    API.get(`file/getAllFiles?creator=${data.creator}`)
      .then((result) => {
        dispatch(setFilelist(result.data.fileresult));
      })
      .catch((err) => {});
  };
}

export function setFilelist(data) {
  return { type: "setfilelist", data };
}


export function getAllFolders(data, navigate) {
  return async (dispatch) => {
    API.get(`folder/getAllFolders?creator=${data.creator}`)
      .then((result) => {
        dispatch(setFolderlist(result.data.folderresult));
      })
      .catch((err) => {});
  };
}

export function setFolderlist(data) {
  return { type: "setFolderlist", data };
}

