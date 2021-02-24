const React = require("react-native");
import { StyleSheet, Platform } from "react-native";
import { Colors } from "../../Common";
const { Dimensions } = React;

const deviceHeight = Dimensions.get("window").height;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    // alignItems: 'center',
    // alignContent: 'center'
  },
  main: {
    flex: 1,
    backgroundColor: Colors.secondary
  },
  otherLinksContainer: {
    // paddingTop: deviceHeight < 600 ? 5 : Platform.OS === "android" ? 10 : 15,
    flexDirection: "column",
    flex: 1,
    alignSelf: "center",
    justifyContent: 'flex-start',
  },
  helpBtns: {
    opacity: 0.9,
    fontWeight: "bold",
    color: "#fff",
    fontSize: Platform.OS === "android" ? 12 : 12
  },
  iLogo: {
    // width: 80,
    // height: 80,
    // borderRadius: 75,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    paddingTop: "10%"
  },
  iTxt: {
    flexDirection: "row",
    paddingVertical: 6,
    // paddingHorizontal: 25,
    marginHorizontal: 25,
    marginVertical: 2
  },
  iIcon: {
    ...Platform.select({
      android: {
        marginTop: 4
      }
    })
  },
  textError: {
    color: "#F00",
    marginTop: 0,
    marginLeft: 18
  },
  normalText: {
    color: Colors.textPrimary,
    fontSize: 16,
    marginVertical: 3
  },
  input: {
    color: Colors.vcb,
    borderRadius: 10,
    borderColor: "#fff",
    backgroundColor: Colors.textWhite,

    // Set border width.
    borderWidth: 1,
    paddingVertical: Platform.OS == 'ios' ? 16 : 12,
    // Set border Hex Color Code Here.
    
    // Set border Radius.
    borderRadius: 10,
    paddingLeft: 5
  },
  iInput: {
    paddingBottom: 4,
    marginBottom: 1,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    flex: 1,
    height: 40,
    overflow: "hidden",
    marginTop: 0,
    marginLeft: 12
  },
  inputLogin: {
    justifyContent: 'center',
    // flex:1,
    paddingVertical: 6,
    // paddingHorizontal: 25,
    marginHorizontal: 25,
    // marginRight: 10,
    // marginLeft: 10,
    // padding: 1,
    // borderRadius: 10,
    // borderWidth: 0.5,
    // borderColor: '#eee'
  },
  iB: {
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    width: "40%",
    marginBottom: 7
  },
  iO: {
    paddingHorizontal: 6
  },
  oW: {
    fontSize: 12,
    color: "#999"
  },
  lText: {
    fontSize: 25,
    color: "rgba(249, 81, 84, 1.000)",
    fontWeight: "bold"
  },
  iIconSocial: {
    width: "20%",
    alignItems: "center",
    justifyContent: "center"
  },
  socialLogin: {
    padding: 6
  },
  sI: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center"
  },
  sIF: {
    backgroundColor: "rgba(43, 121, 192, 1.000)"
  },
  sIT: {
    backgroundColor: "rgba(0, 190, 245, 1.000)"
  }
});

export default styles;
