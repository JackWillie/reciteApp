const initialState = {
  filelist: [],
  folderlist: [],
};

export default function fileFolderReducer(state = initialState, action) {
  const temp = { ...state };
  switch (action.type) {
    case "setfilelist":
      temp.filelist = action.data;
      return temp;
    case "setFolderlist":
        temp.folderlist = action.data;
        return temp;
    default:
      return temp;
  }
}
