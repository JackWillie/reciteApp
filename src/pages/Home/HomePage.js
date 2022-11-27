import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  Image,
  ImageBackground,
  TouchableOpacity,
} from "react-native";

import CustomSearchInput from "../../components/CustomSearchInput";
import { format } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import Icon from "react-native-vector-icons/FontAwesome";

import Contacts_img from "../../assets/img/Contacts.svg";
import Files_img from "../../assets/img/Files.svg";
import Messages_img from "../../assets/img/Messages.png";
import Call_img from "../../assets/img/Call.svg";

import Woman_img from "../../assets/img/woman.png";
import Exit_img from "../../assets/img/exit.svg";

import { IMG_URL } from "../../config";

import { getAllInfo } from "../../redux/actions/contact.action";
import { getIcon } from "../../utils";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const HomePage = (props) => {
  const [serach, setSearch] = useState("");
  const [turnonMike, setMike] = useState(false);

  const dispatch = useDispatch();

  const authinfo = useSelector((state) => state.authState);
  const contactInfo = useSelector((state) => state.contactState);

  const [tabitem, setTabitem] = useState(1);
  const [contactIndex, setcontactIndex] = useState(0);
  const [tocontact, setTo] = useState({});

  const [showSearch, setShowSearch] = useState(false);

  useEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => setShowSearch(!showSearch)}
          style={{ alignItem: "center", margin: "auto" }}
        >
          <Icon name="search" size={20} color="white" />
        </TouchableOpacity>
      ),
    });
  }, [props.navigation, showSearch]);

  useEffect(() => {
    if (props.route.params == undefined) {
      props.navigation.navigate("contacts");
    } else {
      // setcontactIndex(props.route.params.id);
      // setTo(contactInfo.unreadlist[props.route.params.id].to);
      dispatch(
        getAllInfo({
          owner: authinfo.currentUser.email,
          id: contactInfo.unreadlist[props.route.params.id].to._id,
        })
      );
    }
  }, [props.route.params]);

  // useEffect(() => {
  //   if (tocontact != {}) {
  //     dispatch(
  //       getContactEmailInfo({
  //         owner: authinfo.currentUser.email,
  //         to: tocontact.email,
  //       })
  //     );
  //   }
  // }, [tocontact]);

  const selectTabname = (val) => {
    // switch (val) {
    //   case 1:
    //     dispatch(
    //       getContactEmailInfo({
    //         owner: authinfo.currentUser.email,
    //         to: tocontact.email,
    //       })
    //     );
    //     break;
    //   case 2:
    //     dispatch(
    //       getContactMessageInfo({
    //         user1: authinfo.currentUser.email,
    //         user2: tocontact.email,
    //       })
    //     );
    //     break;
    // }
    setTabitem(val);
  };

  const changeSearch = (val) => {
    setSearch(val);
  };

  const handleMike = (e) => {
    setMike(true);
  };

  return (
    <View style={styles.homebg}>
      {contactInfo.contactPersonal.length == 0 ? (
        ""
      ) : (
        <View style={styles.contanier}>
          <View style={styles.header}>
            <View
              style={{
                position: "relative",
                width: "100%",
                alignItems: "center",
              }}
            >
              <TouchableOpacity
                style={styles.topheader}
                onPress={() => {
                  props.navigation.navigate("addContact", {
                    cinfo: contactInfo.contactPersonal.contactresult,
                  });
                }}
              >
                <Image
                  source={
                    contactInfo.contactPersonal.contactresult.image == ""
                      ? Woman_img
                      : IMG_URL +
                        contactInfo.contactPersonal.contactresult.image
                  }
                  style={styles.man_img}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => props.navigation.navigate("contacts")}
                style={{ position: "absolute", right: "1vh", top: "50%" }}
              >
                <Image
                  source={Exit_img}
                  style={{ width: "2vh", height: "2vh" }}
                />
              </TouchableOpacity>
            </View>
            {showSearch && (
              <CustomSearchInput
                color="black"
                mike={handleMike}
                onChangeText={changeSearch}
                value={serach}
                content={"Search for subjects..."}
              />
            )}
          </View>
          <View style={styles.body}>
            <View style={styles.inputview}>
              <View style={styles.statisticsgroup}>
                <TouchableOpacity
                  style={{
                    ...styles.statisticsView,
                    boxShadow:
                      tabitem == 1 ? "rgb(28 27 27 / 15%) 2px 2px 2px 2px" : "",
                  }}
                  onPress={() => selectTabname(1)}
                >
                  <Image source={Contacts_img} style={styles.statisticsImg} />
                  <View style={styles.statisticsInfo}>
                    <Text style={styles.statisticsCount}>
                      {contactInfo.contactPersonal.infos.reduce(
                        (sum, item) => sum + item.emailresult.length,
                        0
                      )}
                    </Text>
                    <Text style={styles.statisticsName}>Emails</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    ...styles.statisticsView,
                    boxShadow:
                      tabitem == 2 ? "rgb(28 27 27 / 15%) 2px 2px 2px 2px" : "",
                  }}
                  onPress={() => selectTabname(2)}
                >
                  <Image source={Messages_img} style={styles.statisticsImg} />
                  <View style={styles.statisticsInfo}>
                    <Text style={styles.statisticsCount}>
                      {contactInfo.contactPersonal.infos.reduce(
                        (sum, item) => sum + item.messageresult.length,
                        0
                      )}
                    </Text>
                    <Text style={styles.statisticsName}>Messages</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.statisticsView}
                  onPress={() => selectTabname(3)}
                >
                  <Image source={Call_img} style={styles.statisticsImg} />
                  <View style={styles.statisticsInfo}>
                    <Text style={styles.statisticsCount}>0</Text>
                    <Text style={styles.statisticsName}>Calls</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.statisticsView}>
                  <Image source={Files_img} style={styles.statisticsImg} />
                  <View style={styles.statisticsInfo}>
                    <Text style={styles.statisticsCount}>0</Text>
                    <Text style={styles.statisticsName}>Files</Text>
                  </View>
                </TouchableOpacity>
              </View>
              <ScrollView
                style={styles.contextView}
                contentContainerStyle={{
                  flexDirection: "row",
                  flexWrap: "wrap",
                  justifyContent: "space-around",
                }}
              >
                <View style={styles.subjectlist}>
                  {contactInfo.contactPersonal.infos.map((item, index) =>
                    tabitem == 1
                      ? item.emailresult.map((emailitem, eindex) => (
                          <View
                            style={{
                              ...styles.subjectView,
                              flexDirection:
                                emailitem.from == authinfo.currentUser.email
                                  ? "row-reverse"
                                  : "row",
                            }}
                            key={eindex}
                          >
                            <TouchableOpacity
                              onPress={() =>
                                props.navigation.navigate("previewEmail", {
                                  type: "Email",
                                  id: emailitem._id,
                                })
                              }
                              style={{
                                flex: 0.4,
                                flexDirection:
                                  emailitem.from == authinfo.currentUser.email
                                    ? "row-reverse"
                                    : "row",
                              }}
                            >
                              <ImageBackground
                                source={
                                  emailitem.image == "" ||
                                  emailitem.image == undefined
                                    ? Woman_img
                                    : IMG_URL + emailitem.image
                                }
                                resizeMode="contain"
                                style={styles.subject_owner}
                              />
                              <View style={styles.subjectTitleView}>
                                <Text style={styles.subjectName}>
                                  {emailitem.from}
                                </Text>
                                <Text
                                  style={{
                                    ...styles.noticeDate,
                                    textAlign:
                                      emailitem.from ==
                                      authinfo.currentUser.email
                                        ? "right"
                                        : "left",
                                  }}
                                >
                                  {format(
                                    new Date(emailitem.createdAt),
                                    "dd/MM/yy"
                                  )}
                                </Text>
                              </View>
                            </TouchableOpacity>
                            <View style={styles.subjectContentView}>
                              <Text
                                style={{
                                  ...styles.subjectType,
                                  textAlign:
                                    emailitem.from == authinfo.currentUser.email
                                      ? "right"
                                      : "left",
                                }}
                              >
                                {emailitem.subject}
                              </Text>
                              <View style={styles.subjectContent}>
                                <View
                                  style={{
                                    ...styles.subjectInfo,
                                    alignItems:
                                      emailitem.from ==
                                      authinfo.currentUser.email
                                        ? "end"
                                        : "start",
                                  }}
                                >
                                  <Text
                                    style={{
                                      ...styles.subjectInfoName,
                                      textAlign:
                                        emailitem.from ==
                                        authinfo.currentUser.email
                                          ? "right"
                                          : "left",
                                    }}
                                  >
                                    {emailitem.content}
                                  </Text>
                                </View>
                              </View>
                              {emailitem.media.map((mediaitem, mediaindex) => (
                                <View
                                  style={{
                                    ...styles.subjectContent,
                                    alignItems: "center",
                                    flexDirection:
                                      emailitem.from ==
                                      authinfo.currentUser.email
                                        ? "row-reverse"
                                        : "row",
                                  }}
                                  key={mediaindex}
                                >
                                  <View style={styles.subjectInfo}>
                                    <Text
                                      style={{
                                        ...styles.subjectInfoName,
                                        textAlign:
                                          emailitem.from ==
                                          authinfo.currentUser.email
                                            ? "right"
                                            : "left",
                                      }}
                                    >
                                      {mediaitem}
                                    </Text>
                                    {/* <Text  style={{
                                      ...styles.subjectInfoBefore,
                                      textAlign:
                                        emailitem.from ==
                                        authinfo.currentUser.email
                                          ? "right"
                                          : "left",
                                    }}>131 KB | Modified 1week ago</Text> */}
                                  </View>
                                  <Image
                                    source={getIcon(mediaitem)}
                                    style={styles.file_img}
                                  />
                                </View>
                              ))}
                            </View>
                          </View>
                        ))
                      : item.messageresult.map((messageitem, mindex) => (
                          <View
                            style={{
                              ...styles.subjectView,
                              flexDirection:
                                messageitem.from == authinfo.currentUser.email
                                  ? "row-reverse"
                                  : "row",
                            }}
                            key={mindex}
                          >
                            <TouchableOpacity
                              onPress={() =>
                                props.navigation.navigate("previewEmail", {
                                  type: "Message",
                                  id: messageitem._id,
                                })
                              }
                              style={{
                                flex: 0.4,
                                flexDirection:
                                  messageitem.from == authinfo.currentUser.email
                                    ? "row-reverse"
                                    : "row",
                              }}
                            >
                              <ImageBackground
                                source={
                                  messageitem.image == "" ||
                                  messageitem.image == undefined
                                    ? Woman_img
                                    : IMG_URL + messageitem.image
                                }
                                resizeMode="contain"
                                style={styles.subject_owner}
                              />
                              <View style={styles.subjectTitleView}>
                                <Text style={styles.subjectName}>
                                  {messageitem.from}
                                </Text>
                                <Text
                                  style={{
                                    ...styles.noticeDate,
                                    textAlign:
                                      messageitem.from ==
                                      authinfo.currentUser.email
                                        ? "right"
                                        : "left",
                                  }}
                                >
                                  {format(
                                    new Date(messageitem.createdAt),
                                    "dd/MM/yy"
                                  )}
                                </Text>
                              </View>
                            </TouchableOpacity>
                            <View style={styles.subjectContentView}>
                              <Text
                                style={{
                                  ...styles.subjectType,
                                  textAlign:
                                    messageitem.from ==
                                    authinfo.currentUser.email
                                      ? "right"
                                      : "left",
                                }}
                              >
                                {messageitem.subject}
                              </Text>
                              <View style={styles.subjectContent}>
                                <View
                                  style={{
                                    ...styles.subjectInfo,
                                    alignItems:
                                      messageitem.from ==
                                      authinfo.currentUser.email
                                        ? "end"
                                        : "start",
                                  }}
                                >
                                  <Text
                                    style={{
                                      ...styles.subjectInfoName,
                                      textAlign:
                                        messageitem.from ==
                                        authinfo.currentUser.email
                                          ? "right"
                                          : "left",
                                    }}
                                  >
                                    {messageitem.content}
                                  </Text>
                                  {/* <Text style={styles.subjectInfoBefore}>131 KB | Modified 1week ago</Text> */}
                                </View>
                                {/* <Image source={Pdf_img} style={styles.file_img}/> */}
                              </View>
                              {messageitem.media.map(
                                (mediaitem, mediaindex) => (
                                  <View
                                    style={{
                                      ...styles.subjectContent,
                                      alignItems: "center",
                                      flexDirection:
                                        messageitem.from ==
                                        authinfo.currentUser.email
                                          ? "row-reverse"
                                          : "row",
                                    }}
                                    key={mediaindex}
                                  >
                                    <View style={styles.subjectInfo}>
                                      <Text
                                        style={{
                                          ...styles.subjectInfoName,
                                          textAlign:
                                            messageitem.from ==
                                            authinfo.currentUser.email
                                              ? "right"
                                              : "left",
                                        }}
                                      >
                                        {mediaitem}
                                      </Text>
                                      {/* <Text  style={{
                                      ...styles.subjectInfoBefore,
                                      textAlign:
                                        messageitem.from ==
                                        authinfo.currentUser.email
                                          ? "right"
                                          : "left",
                                    }}>131 KB | Modified 1week ago</Text> */}
                                    </View>
                                    <Image
                                      source={getIcon(mediaitem)}
                                      style={styles.file_img}
                                    />
                                  </View>
                                )
                              )}
                            </View>
                          </View>
                        ))
                  )}
                </View>
              </ScrollView>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  homebg: {
    width: windowWidth,
    height: windowHeight - "10vh",
    backgroundColor: "#2D3442",
    alignItems: "center",
  },
  contanier: {
    minWidth: "375px",
    width: "100vw",
    alignItems: "center",
    textAlign: "center",
    // paddingTop: "0.8vh",
  },
  header: {
    maxWidth: "375px",
    width: "100%",
    alignItems: "center",
    // height: "26vh",
    padding: "2vh",
  },
  body: {
    backgroundColor: "#fbfbfd",
    borderTopLeftRadius: "30px",
    borderTopRightRadius: "30px",
    padding: "0.5vw",
    maxWidth: "375px",
    width: "100%",
    textAlign: "center",
    alignItems: "center",
    height: "73.6vh",
    position: "relative",
  },
  inputview: {
    width: "90%",
    marginTop: "1.5vh",
  },
  topheader: {
    justifyContent: "center",
    alignItems: "center",
  },
  man_img: {
    width: "12vh",
    height: "12vh",
  },
  notice_img: {
    width: "5vh",
    height: "5vh",
    position: "absolute",
    right: 0,
  },
  myStorage: {
    flexDirection: "row",
    padding: "2vh",
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    borderRadius: "30px",
    width: "100%",
    marginTop: "2vh",
  },
  storage: {
    width: "50%",
    textAlign: "left",
  },
  storageTitle: {
    fontFamily: "Museo Slab",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: "2.5vh",
    color: "#FFFFFF",
  },
  SpaceGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: "2vh",
    marginBottom: "2vh",
  },
  space: {},
  spaceTitle: {
    fontFamily: "Museo Slab",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: "1.5vh",
    color: "rgba(255, 255, 255, 0.6)",
  },
  spaceAmount: {
    fontFamily: "Museo Slab",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: "2vh",
    color: "#FFFFFF",
    marginTop: "1vh",
  },

  contextView: {
    width: "100%",
    height: "45vh",
  },
  statisticsgroup: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  statisticsView: {
    width: "40%",
    backgroundColor: "white",
    borderRadius: "10px",
    padding: "1.5vh",
    flexDirection: "row",
    margin: "1vh",
    alignItems: "center",
  },
  statisticsImg: {
    width: "5vh",
    height: "5vh",
  },
  statisticsInfo: {
    textAlign: "left",
    marginLeft: "1vh",
  },
  statisticsCount: {
    fontFamily: "Museo Slab",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: "3.5vh",
    color: "#2D3442",
  },
  statisticsName: {
    fontFamily: "Museo Slab",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: "2vh",
    color: "rgba(45, 52, 66, 0.5)",
  },
  subjectlist: {
    height: "100%",
    width: "100%",
  },

  subjectView: {
    backgroundColor: "transparent",
    borderRadius: "10px",
    marginBottom: "1vh",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    height: "10vh",
    flex: 1,
  },
  subject_owner: {
    width: "6vh",
    height: "6vh",
    flex: 0.4,
  },
  subjectTitleView: {
    textAlign: "left",
    marginLeft: "1vh",
    justifyContent: "space-around",
    height: "7vh",
    flex: 0.6,
  },
  subjectName: {
    color: "black",
    fontFamily: "ABeeZee",
    fontStyle: "italic",
    fontWeight: "400",
    fontSize: "2vh",
    backgroundColor: "#FF8F77",
    borderRadius: "10px",
    padding: "0.3vh",
    textAlign: "center",

    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  noticeDate: {
    color: "black",
    fontFamily: "ABeeZee",
    fontStyle: "italic",
    fontWeight: "400",
    fontSize: "1.5vh",
  },
  subjectContentView: {
    flexDirection: "column",
    textAlign: "left",
    flex: 0.55,
  },
  subjectType: {
    color: "black",
    fontFamily: "ABeeZee",
    fontStyle: "italic",
    fontWeight: "400",
    fontSize: "2vh",
  },
  subjectContent: {
    marginBottom: "1vh",
    flex: 0.4,
    justifyContent: "space-between",
  },
  subjectInfo: {
    // flexDirection: "column",
    // width: "100%",
  },
  subjectInfoName: {
    color: "black",
    fontFamily: "ABeeZee",
    fontStyle: "italic",
    fontWeight: "400",
    fontSize: "1.7vh",
    width: "13vh",
  },
  subjectInfoBefore: {
    color: "#2D3442",
    opacity: 0.5,
    fontFamily: "ABeeZee",
    fontStyle: "italic",
    fontWeight: "400",
    fontSize: "1.5vh",
  },
  file_img: {
    width: "6vh",
    height: "5vh",
  },
});

export default HomePage;
