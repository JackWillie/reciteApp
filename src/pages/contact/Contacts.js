import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  Image,
  TouchableOpacity,
  Pressable,
  ImageBackground,
} from "react-native";
import Modal from "react-native-modal";
import Icon from 'react-native-vector-icons/FontAwesome';

import CustomSearchInput from "../../components/CustomSearchInput";
import FooterMenu from "../../components/FooterMenu";
import { format } from "date-fns";
import { useToast } from "react-native-toast-notifications";

import Woman_img from "../../assets/img/woman.png";
import arrowDown_img from "../../assets/img/arrow_down2.svg";
import { IMG_URL } from "../../config/index";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
import AlphabetFlatList from "react-native-alphabetflatlist";
import {
  deleteContact,
  getUnreadInfo,
} from "../../redux/actions/contact.action";
import { useDispatch, useSelector } from "react-redux";


const Contacts = (props) => {
  const [photo, setPhoto] = useState("woman.png");

  const authinfo = useSelector((state) => state.authState);
  const contactinfo = useSelector((state) => state.contactState);
  const toast = useToast();
  const [serach, setSearch] = useState("");
  const [turnonMike, setMike] = useState(false);

  const [openModal, setOpenModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  const [selcontact, setSelcontact] = useState("");

  const dispatch = useDispatch();

  const [focus_folloing, setFocus_folloing] = useState("Both");
  const [category, setCategory] = useState("Both");

  const [showSearch, setShowSearch] = useState(false);

  useEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={()=>setShowSearch(!showSearch)} style={{alignItem: 'center', margin: 'auto'}}><Icon name="search" size={20} color="white" /></TouchableOpacity>
      ),
    });
  }, [props.navigation, showSearch]);


  useEffect(() => {
    dispatch(
      getUnreadInfo({
        owner: authinfo.currentUser.email,
        category: category,
        focus_folloing: focus_folloing,
      })
    );
  }, [focus_folloing, category, dispatch]);

  // useEffect(() => {
  //   dispatch(getContact({ owner: authinfo.currentUser.email }));
  // }, [authinfo.currentUser, dispatch]);

  const changeSearch = (val) => {
    setSearch(val);
  };

  const handleMike = (e) => {
    setMike(true);
  };

  const onPressRow = (index) => () => {
    props.navigation.navigate("home", { id: index });
  };

  const onDeleteContact = (id) => {
    setSelcontact(id);
    setDeleteModal(true);
  };

  const deleteConfirm = () => {
    dispatch(
      deleteContact({
        id: selcontact,
        getunread: {
          owner: authinfo.currentUser.email,
          category: category,
          focus_folloing: focus_folloing,
        },
      })
    );
    setDeleteModal(false);
  };

  const renderItem = ({ item, index }) => {
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        horizontal={true}
        contentContainerStyle={{ width: "100%" }}
      >
        <Pressable onPress={onPressRow(index)} style={{ width: "101%" }}>
          <View style={styles.contactView}>
            <View style={{ flexDirection: "row", width: "50%" }}>
              <ImageBackground
                source={
                  item.to.image == "" || item.to.image == undefined
                    ? Woman_img
                    : IMG_URL + item.to.image
                }
                resizeMode="contian"
                style={styles.contact_avatar}
              />
              <View style={styles.contact_info}>
                <Text style={styles.contactName}>{item.to.name}</Text>
                <Text style={styles.createdAt}>
                  {format(new Date(item.to.createdAt), "dd/MM/yy")}
                </Text>
              </View>
            </View>
            <Text
              style={{
                ...styles.contactType,
                backgroundColor:
                  item.to.category === "Personal" ? "#FF8F77" : "#757FDB",
              }}
            >
              {item.to.category}
            </Text>
            {item.content.reduce((sum, subcount)=> sum + subcount.count,0) > 0 && (
              <View style={styles.unreadMsg}>
                <Text style={styles.unreadMsgText}>{item.content.reduce((sum, subcount)=> sum + subcount.count,0)}</Text>
              </View>
            )}
          </View>
        </Pressable>
        <TouchableOpacity
          style={{
            backgroundColor: "#F22323",
            width: "10vh",
            height: "7vh",
            maxHeight: "60px",
            borderRadius: "10px",
            alignItems: "center",
            textAlign: "center",
            justifyContent: "center",
          }}
          onPress={() => {
            onDeleteContact(item.to._id);
          }}
        >
          <Text style={{ color: "white", fontSize: "14px" }}>Delete</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  };

  const getItemLayout = (data, index) => ({
    length: 0,
    offset: 0 * index,
    index,
  });

  return (
    <View style={styles.homebg}>
      <View style={styles.contanier}>
        <View style={styles.header}>
          {/* <Text style={styles.title}>Contacts pages</Text> */}
          {showSearch && <CustomSearchInput
            mike={handleMike}
            onChangeText={changeSearch}
            value={serach}
            content={"Search for subjects..."}
          />}
        </View>
        <View style={styles.body}>
          <View style={styles.inputview}>
            <View style={styles.bodyTitle}>
              <Text style={styles.allContacts}>Detail</Text>
              <Text style={styles.sortby}>
                Sort by
                <Image source={arrowDown_img} style={styles.arrowDown} />
              </Text>
            </View>
            <ScrollView style={{ backgroundColor: "transparent" }}>
              <AlphabetFlatList
                renderItem={renderItem}
                data={contactinfo.unreadlist}
                getItemLayout={getItemLayout}
                showsHorizontalScrollIndicator={false}
                mainFlatListContainerStyle={{
                  flex: 1,
                  height: "70vh",
                  backgroundColor: "transparent",
                }}
                alphabetListProps={{
                  alphabetListContainerStyle: {
                    position: "absolute",
                    right: 0,
                    backgroundColor: "#E8E8E8",
                    borderRadius: "10px",
                    padding: "2px",
                    paddingTop: "5px",
                  },
                  alphabetTextStyle: {
                    fontSize: "9px",
                    color: "#2D3442",
                    fontFamily: "Museo Slab",
                    fontStyle: "normal",
                    fontWeight: 400,
                    marginBottom: "0.4vh",
                  },
                  selectedAlphabetTextStyle: {
                    fontSize: "12px",
                    color: "#2D3442",
                    fontWeight: 600,
                    fontFamily: "Museo Slab",
                    fontStyle: "normal",
                    marginBottom: "0.4vh",
                  },
                  showsVerticalScrollIndicator: false,
                }}
              />
            </ScrollView>
          </View>
        </View>
      </View>
      {openModal && <View style={styles.modalBackground}></View>}
      <FooterMenu
        selected={2}
        opensubmodal={openModal}
        OpenModalfuc={setOpenModal}
        navigation={props.navigation}
      />
      <Modal
        isVisible={deleteModal}
        onBackdropPress={() => setDeleteModal(false)}
        style={{
          justifyContent: "center",
          textAlign: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            backgroundColor: "white",
            borderRadius: "10px",
            height: "150px",
            width: "250px",
          }}
        >
          <View
            style={{
              alignItems: "center",
              borderBottomColor: "black",
              borderBottomWidth: "1px",
              height: "100px",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ fontWeight: "600", fontSize: "2.5vh" }}>
              Are Your Sure?
            </Text>
            <Text style={{ fontWeight: "400", fontSize: "1.5vh" }}>
              Would you like to delete this conversation?
            </Text>
          </View>
          <View style={{ flexDirection: "row", height: "50px" }}>
            <TouchableOpacity
              style={{
                borderRightColor: "black",
                borderRightWidth: "1px",
                height: "99%",
                width: "50%",
                alignItems: "center",
                justifyContent: "center",
              }}
              onPress={() => deleteConfirm()}
            >
              <Text style={{ fontWeight: "400", fontSize: "1.5vh" }}>
                Yes, Delete
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                height: "99%",
                width: "50%",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{ fontWeight: "400", fontSize: "1.5vh", color: "red" }}
                onPress={() => setDeleteModal(false)}
              >
                No, Dont Delete
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
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
    // height: "10vh",
    paddingLeft: "3vh",
    paddingRight: "3vh",
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
    height: "90vh",
  },
  inputview: {
    width: "90%",
    marginTop: "0.5vh",
    flex: 1,
  },
  allContacts: {
    color: "#2D3442",
    fontFamily: "Museo Slab",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: "2.5vh",
    textAlign: "left",
    marginTop: "3vh",
    marginBottom: "3vh",
  },
  rowContainer: {
    width: "98%",
    flexDirection: "row",
  },
  contactView: {
    backgroundColor: "white",
    borderRadius: "10px",
    height: "7vh",
    maxHeight: "60px",
    marginBottom: "1vh",
    padding: "1.2vh",
    flexDirection: "row",
    alignItems: "center",
    paddingRight: "10%",
    width: "100%",
  },
  contact_avatar: {
    width: "5vh",
    height: "5vh",
  },
  contact_info: {
    flexDirection: "column",
    justifyContent: "space-evenly",
    textAlign: "left",
    marginLeft: "1vh",
  },
  contactName: {
    color: "#2D3442",
    fontFamily: "Museo Slab",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: "2vh",
  },
  createdAt: {
    color: "#9699a0",
    fontFamily: "Museo Slab",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: "1.2vh",
  },
  contactType: {
    borderRadius: "11px",
    color: "white",
    height: "max-content",
    width: "26%",
    padding: "3px",
    paddingLeft: "6px",
    paddingRight: "6px",
    marginLeft: "10%",
    marginRight: "10%",
  },
  unreadMsg: {
    borderRadius: "100%",
    backgroundColor: "rgba(45, 52, 66, 0.2)",
    width: "3vh",
    height: "3vh",
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
  },
  unreadMsgText: {
    color: "#2D3442",
    fontFamily: "Museo Slab",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: "1.5vh",
  },
  bodyTitle: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  arrowDown: {
    width: "25px",
    height: "25px",
  },
  sortby: {
    alignItems: "center",
    display: "flex",
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
});

export default Contacts;
