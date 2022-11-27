import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { useDispatch } from "react-redux";

import Home_img from "../assets/img/Home.svg";
// import Folder_img from "../assets/img/Folder_grey.svg";
import Document_img from "../assets/img/Document.svg";
import Users_img from "../assets/img/3_User.svg";
import Files_img from "../assets/img/Files.svg";
import Folder_img from "../assets/img/folder(4).png";

import Logout_img from "../assets/img/Logout_grey.svg";


import Home_sel_img from "../assets/img/Home_selected.png";
import Folder_sel_img from "../assets/img/Folder_selected.png";
import Document_sel_img from "../assets/img/Document_selected.png";
import Users_sel_img from "../assets/img/Users_selected.png";

import Home_unsel_img from "../assets/img/Home_unselected.png";
import Folder_unsel_img from "../assets/img/Folder_unselected.png";
import Document_unsel_img from "../assets/img/Document_unselected.png";
import Users_unsel_img from "../assets/img/Users_unselected.png";

import MenuItemTop_img from "../assets/img/menuItem_top.png";

import Menubg_img from "../assets/img/menuSubtract.png";

import OnpenModal_img from "../assets/img/OnpenModal.png";
import CloseModal_img from "../assets/img/CloseModal.png";

import Users_blue_img from "../assets/img/Users_blue.png";
import Folder_blue_img from "../assets/img/Folder_blue.png";
import Document_blue_img from "../assets/img/Document_blue.png";
import AddModal_img from "../assets/img/addModal.png";
import { logout } from "../redux/actions/auth.action";

const FooterMenu = (props) => {
  const [selected, setSelected] = useState(props.selected);

  const dispatch = useDispatch()

  const selectSubmenu = (val) => () => {
    props.OpenModalfuc(false);
    props.navigation.navigate(val);
  };

  const logoutRecite = () => {
    dispatch(logout(props.navigation.navigate));
  }

  return (
    <ImageBackground
      source={Menubg_img}
      resizeMode="cover"
      style={styles.footerContainer}
    >
      <TouchableOpacity
        style={styles.menuItem}
        onPress={() => props.navigation.navigate("allSubjects")}
      >
        <Image
          source={selected == 1 ? Home_sel_img : Home_unsel_img}
          style={styles.menuselected}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.menuItem}
        onPress={() => props.navigation.navigate("contacts")}
      >
        <Image
          source={selected == 2 ? Users_sel_img : Users_unsel_img}
          style={styles.menuselected}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.menuItem}
        onPress={() => props.navigation.navigate("files")}
      >
        <Image
          source={selected == 3 ? Folder_sel_img : Folder_unsel_img}
          style={styles.menuselected}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.menuItem}
        onPress={() => props.navigation.navigate("folders")}
      >
        <Image
          source={selected == 4 ? Document_sel_img : Document_unsel_img}
          style={styles.menuselected}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => props.OpenModalfuc(!props.opensubmodal)}
        style={styles.touchopenmodal}
      >
        <Image
          source={props.opensubmodal ? CloseModal_img : OnpenModal_img}
          style={styles.menuCircelselected}
        />
      </TouchableOpacity>
      {props.opensubmodal && (
        <ImageBackground
          source={AddModal_img}
          resizeMode="contain"
          style={styles.addModal_img}
        >
          <TouchableOpacity
            style={styles.addSubMenu}
            onPress={selectSubmenu("addContact")}
          >
            <Image source={Users_blue_img} style={styles.addSubImg} />
            <Text style={styles.addSubText}>Add a Subject to Recite</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.addSubMenu}
            onPress={selectSubmenu("sendEmailOrMsg")}
          >
            <Image source={Document_blue_img} style={styles.addSubImg} />
            <Text style={styles.addSubText}>Send Email or Message to Subject(s)</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.addSubMenu}
            onPress={selectSubmenu("addFile")}
          >
            <Image source={Files_img} style={styles.addSubImg} />
            <Text style={styles.addSubText}>Add File to Recite</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.addSubMenu}
            onPress={selectSubmenu("addFolder")}
          >
            <Image source={Folder_img} style={styles.addSubImg} />
            <Text style={styles.addSubText}>Add Folder to Recite</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.addSubMenu}
            onPress={()=>logoutRecite()}
          >
            <Image source={Logout_img} style={styles.addSubImg} />
            <Text style={styles.addSubText}>Log Out of Recite</Text>
          </TouchableOpacity>
        </ImageBackground>
      )}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  footerContainer: {
    minWidth: "375px",
    flexDirection: "row",
    position: "relative",
    justifyContent: "space-around",
    height: "12vh",
    borderRadius: "10px",
    bottom: "-6vh",
  },
  menuselected: {
    width: "3.2vh",
    height: "5vh",
  },
  menuItem: {
    position: "relative",
    paddingBottom: "2vh",
  },
  menutop_img: {
    position: "absolute",
    top: 0,
    left: "1px",
  },
  menuCircelselected: {
    width: "9vh",
    height: "9vh",
  },
  touchopenmodal: {
    position: "absolute",
    top: "-3.5vh",
    left: "calc(50%-3.5vh)",
  },
  addModal_img: {
    position: "absolute",
    height: "30vh",
    width: "36vh",
    top: "-33vh",
    left: "calc(50% - 18vh)",
    padding: "2vh",
    justifyContent: "space-around",
    paddingBottom: "5vh",
  },
  addSubMenu: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomColor: "#8080802e",
    borderBottomWidth: "1px",
  },
  addSubImg: {
    width: "3vh",
    height: "3vh",
    margin: "0.1vh",
  },
  addSubText: {
    color: "#2D3442",
    fontFamily: "Museo Slab",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: "2vh",
  },
});

export default FooterMenu;
