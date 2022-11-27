const initialState = {
  contactlist: [],
  contactEmailInfo: [],
  contactMessageInfo: [],
  unreadlist: [],
  contactPersonal: [],
  showEmail: ''
};

export default function contactReducer(state = initialState, action) {
  const temp = { ...state };
  switch (action.type) {
    case "setContactlist":
      temp.contactlist = action.data;
      return temp;
    case "setContactInfo":
      temp.contactInfo = action.data;
      return temp;
    case "setContactEmailInfo":
      temp.contactEmailInfo = action.data;
      return temp;
    case "setContactMessageInfo":
      temp.contactMessageInfo = action.data;
      return temp;
    case "setUnreadlist":
      temp.unreadlist = action.data;
      return temp;
    case "setPersonInfo":
      temp.contactPersonal = action.data;
      return temp;
    case "setEmail":
      temp.showEmail = action.data;
      return temp;
    default:
      return temp;
  }
}
