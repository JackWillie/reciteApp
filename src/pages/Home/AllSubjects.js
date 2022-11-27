import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
  Image,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "react-native-toast-notifications";
import { format } from "date-fns";
import { getIcon } from "../../utils";

import FooterMenu from "../../components/FooterMenu";
import RoundNotice from "../../components/RoundNotice";

import Focus_img from "../../assets/img/Focus.png";
import Following_img from "../../assets/img/Follow.png";
import Other_img from "../../assets/img/Document_blue.png";
import Media_img from "../../assets/img/camera.png";
import Woman_img from "../../assets/img/woman.png";
import Users_img from "../../assets/img/Users_blue.png";

import { getUnreadInfo } from "../../redux/actions/contact.action";
import { ScrollView } from "react-native-web";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

let unit = 0;
if (windowHeight * 0.3 > 375) {
  unit = 375 / 100;
} else {
  unit = (windowHeight * 0.3) / 100;
}

const AllSubjects = (props) => {
  const dispatch = useDispatch();
  const toast = useToast();

  const authinfo = useSelector((state) => state.authState);
  const contactinfo = useSelector((state) => state.contactState);

  const [openModal, setOpenModal] = useState(false);

  const [focus_folloing, setFocus_folloing] = useState("Both");
  const [category, setCategory] = useState("Both");

  useEffect(() => {
    dispatch(
      getUnreadInfo({
        owner: authinfo.currentUser.email,
        category: category,
        focus_folloing: focus_folloing,
      })
    );
  }, [focus_folloing, category]);

  return (
    <View style={styles.homebg}>
      <View style={styles.contanier}>
        <View style={styles.noticeView}>
          <RoundNotice unit={unit*0.75} />
        </View>
        <View style={styles.body}>
          <View style={styles.inputview}>
            <View style={styles.PandB}>
              <TouchableOpacity
                onPress={() => setCategory("Personal")}
                style={{
                  ...styles.pandbtouch,
                  backgroundColor: "#FF8F77",
                  boxShadow:
                    category == "Personal"
                      ? "rgb(28 27 27 / 15%) 2px 2px 2px 2px"
                      : "",
                }}
              >
                <Text style={styles.pandbtext}>Personal</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setCategory("Business")}
                style={{
                  ...styles.pandbtouch,
                  backgroundColor: "#757FDB",
                  boxShadow:
                    category == "Business"
                      ? "rgb(28 27 27 / 15%) 2px 2px 2px 2px"
                      : "",
                }}
              >
                <Text style={styles.pandbtext}>Business</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setCategory("Both")}
                style={{
                  ...styles.pandbtouch,
                  backgroundColor: "#66BFE1",
                  boxShadow:
                    category == "Both"
                      ? "rgb(28 27 27 / 15%) 2px 2px 2px 2px"
                      : "",
                }}
              >
                <Text style={styles.pandbtext}> P&B</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.foucsoffollow}>
              <TouchableOpacity
                style={{
                  ...styles.subject_touch,
                  boxShadow:
                    focus_folloing == "Focus"
                      ? "rgb(28 27 27 / 15%) 2px 2px 2px 2px"
                      : "",
                  border:
                    focus_folloing == "Focus"
                      ? "1px solid rgb(28 27 27 / 15%)"
                      : "",
                }}
                onPress={() => setFocus_folloing("Focus")}
              >
                <ImageBackground
                  source={Focus_img}
                  resizeMode="contain"
                  style={styles.subject_img}
                />
                <Text style={styles.subject_text}>Focus</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  ...styles.subject_touch,
                  boxShadow:
                    focus_folloing == "Following"
                      ? "rgb(28 27 27 / 15%) 2px 2px 2px 2px"
                      : "",
                  border:
                    focus_folloing == "Following"
                      ? "1px solid rgb(28 27 27 / 15%)"
                      : "",
                }}
                onPress={() => setFocus_folloing("Following")}
              >
                <ImageBackground
                  source={Following_img}
                  resizeMode="contain"
                  style={styles.subject_img}
                />
                <Text style={styles.subject_text}>Following</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  ...styles.subject_touch,
                  boxShadow:
                    focus_folloing == "Both"
                      ? "rgb(28 27 27 / 15%) 2px 2px 2px 2px"
                      : "",
                  border:
                    focus_folloing == "Both"
                      ? "1px solid rgb(28 27 27 / 15%)"
                      : "",
                }}
                onPress={() => setFocus_folloing("Both")}
              >
                <ImageBackground
                  source={Other_img}
                  resizeMode="contain"
                  style={styles.subject_img}
                />
                <Text style={styles.subject_text}>Other</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.subject_touch}
                onPress={() => props.navigation.navigate("contacts")}
              >
                <ImageBackground
                  source={Users_img}
                  resizeMode="contain"
                  style={styles.subject_img}
                />
                <Text style={styles.subject_text}>All Subjects</Text>
              </TouchableOpacity>
            </View>
            <ScrollView
              style={styles.subjecthistory}
              showsVerticalScrollIndicator={false}
            >
              {contactinfo.unreadlist.map((item, i) =>
                item.content.map((contentitem, contentindex) => (
                  <View style={{ overflow: "hidden" }} key={i}>
                    {contentitem.count !== 0 &&
                      contentitem.emailresult.length > 0 &&
                      contentitem.emailresult.map((emailitem, eindex) => (
                        <View
                          onPress={() =>
                            props.navigation.navigate("home", { id: i })
                          }
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
                              props.navigation.navigate("home", { id: i })
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
                                    emailitem.from == authinfo.currentUser.email
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
                              <View style={{
                                    ...styles.subjectInfo,
                                    alignItems:
                                      emailitem.from ==
                                      authinfo.currentUser.email
                                        ? "end"
                                        : "start",
                                  }}>
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
                                    emailitem.from == authinfo.currentUser.email
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
                      ))}
                    {contentitem.count !== 0 &&
                      contentitem.messageresult.length > 0 &&
                      contentitem.messageresult.map((messageitem, mindex) => (
                        <View
                          onPress={() =>
                            props.navigation.navigate("home", { id: i })
                          }
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
                              props.navigation.navigate("home", { id: i })
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
                                  messageitem.from == authinfo.currentUser.email
                                    ? "right"
                                    : "left",
                              }}
                            >
                              {messageitem.subject}
                            </Text>
                            <View style={styles.subjectContent}>
                              <View style={{
                                    ...styles.subjectInfo,
                                    alignItems:
                                    messageitem.from ==
                                    authinfo.currentUser.email
                                        ? "end"
                                        : "start",
                                  }}>
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
                            {messageitem.media.map((mediaitem, mediaindex) => (
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
                            ))}
                          </View>
                        </View>
                      ))}
                  </View>
                ))
              )}
            </ScrollView>
          </View>
        </View>
      </View>
      {openModal && <View style={styles.modalBackground}></View>}
      <FooterMenu
        opensubmodal={openModal}
        OpenModalfuc={setOpenModal}
        navigation={props.navigation}
        selected={1}
      />
    </View>
  );
};
AllSubjects.navigationOptions = (navData) => {
  return {
    headerTitle: "fdsafdsafsda",
  };
};
const styles = StyleSheet.create({
  homebg: {
    width: windowWidth,
    height: windowHeight,
    backgroundColor: "#2D3442",
    alignItems: "center",
    flex: 1,
    overflow: "hidden",
  },
  contanier: {
    minWidth: "375px",
    width: "100vw",
    alignItems: "center",
    textAlign: "center",
    paddingTop: "0.8vh",
    flex: 1,
  },
  header: {
    maxWidth: "375px",
    width: "100%",
    alignItems: "center",
    height: "15vh",
    padding: "3vh",
    position: "relative",
    justifyContent: "center",
  },
  title: {
    fontFamily: "Museo Slab",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: "21px",
    color: "white",
  },
  Exit_img: {
    width: "1.5vh",
    height: "1.5vh",
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
    position: "relative",
    marginTop: "2vh",
    height: "82.2vh",
  },
  inputview: {
    width: "90%",
    marginTop: "1.5vh",
  },
  skiplink: {
    color: "white",
    fontFamily: "Museo Slab",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: "12px",
    position: "absolute",
    right: "30px",
  },
  noticeView: {
    width: "100%",
    height: "30vh",
  },
  modalBackground: {
    backgroundColor: "#171B2B",
    opacity: 0.8,
    backdropFilter: "blur(0.5px)",
    position: "absolute",
    flex: 1,
    width: "100vw",
    height: "100vh",
  },
  PandB: {
    flexDirection: "row",
    justifyContent: "space-around",
    margin: "2vh",
  },
  pandbtouch: {
    width: "25%",
    height: "3vh",
    padding: "0.5vh",
    borderRadius: "10px",
    backgroundColor: "pink",
  },
  pandbtext: {
    color: "white",
    fontFamily: "Museo Slab",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: "12px",
  },
  foucsoffollow: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  subject_touch: {
    width: "9vh",
    height: "9vh",
    alignItems: "center",
    borderRadius: "100%",
    justifyContent: "center",
  },
  subject_img: {
    width: "5vh",
    height: "5vh",
  },
  subject_text: {
    fontSize: "1.6vh",
    color: "#a3a6ac",
  },
  subjecthistory: {
    height: "50vh",
    marginBottom: "2vh",
    marginTop: "2vh",
    paddingBottom: "20vh",
  },
  subjectlist: {
    height: "100%",
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
    fontSize: "1.7vh",
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
    // width: '100%'
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

export default AllSubjects;
