import { StyleSheet, Dimensions, Platform } from 'react-native';


//StatusBar manip
const X_WIDTH = 375;
const X_HEIGHT = 812;
const XSMAX_WIDTH = 414;
const XSMAX_HEIGHT = 896;
const PAD_WIDTH = 768;
const PAD_HEIGHT = 1024;
const IPADPRO11_WIDTH = 834;
const IPADPRO11_HEIGHT = 1194;
const IPADPRO129_HEIGHT = 1024;
const IPADPRO129_WIDTH = 1366;

const { height: D_HEIGHT, width: D_WIDTH } = Dimensions.get('window');

const deviceHeight = Dimensions.get("window").height;
const isIPhoneX = (() => {
  if (Platform.OS === 'web') return false;

  return (
    (Platform.OS === 'ios' &&
      ((D_HEIGHT === X_HEIGHT && D_WIDTH === X_WIDTH) ||
        (D_HEIGHT === X_WIDTH && D_WIDTH === X_HEIGHT))) ||
    ((D_HEIGHT === XSMAX_HEIGHT && D_WIDTH === XSMAX_WIDTH) ||
      (D_HEIGHT === XSMAX_WIDTH && D_WIDTH === XSMAX_HEIGHT))
  );
})();

const isNewIPadPro = (() => {
  if (Platform.OS !== 'ios') return false;

  return (
    (D_HEIGHT === IPADPRO11_HEIGHT && D_WIDTH === IPADPRO11_WIDTH) ||
    (D_HEIGHT === IPADPRO11_WIDTH && D_WIDTH === IPADPRO11_HEIGHT) ||
    ((D_HEIGHT === IPADPRO129_HEIGHT && D_WIDTH === IPADPRO129_WIDTH) ||
      (D_HEIGHT === IPADPRO129_WIDTH && D_WIDTH === IPADPRO129_HEIGHT))
  );
})();

const isIPad = (() => {
  if (Platform.OS !== 'ios' || isIPhoneX) return false;

  // if portrait and width is smaller than iPad width
  if (D_HEIGHT > D_WIDTH && D_WIDTH < PAD_WIDTH) {
    return false;
  }

  // if landscape and height is smaller that iPad height
  if (D_WIDTH > D_HEIGHT && D_HEIGHT < PAD_WIDTH) {
    return false;
  }

  return true;
})();

let _customStatusBarHeight = null;
const statusBarHeight = isLandscape => {
  if (_customStatusBarHeight !== null) {
    return _customStatusBarHeight;
  }

  /**
   * This is a temporary workaround because we don't have a way to detect
   * if the status bar is translucent or opaque. If opaque, we don't need to
   * factor in the height here; if translucent (content renders under it) then
   * we do.
   */
  if (Platform.OS === 'android') {
    if (global.Expo) {
      return global.Expo.Constants.statusBarHeight;
    } else {
      return 0;
    }
  }

  if (isIPhoneX) {
    return isLandscape ? 0 : 44;
  }

  if (isNewIPadPro) {
    return 24;
  }

  if (isIPad) {
    return 20;
  }

  return isLandscape ? 0 : 20;
};


/*
Expo.Font.loadAsync({
  Helvetica: require('./assets/fonts/HELR45W.ttf')
});
*/

const Fonts = {
  //family:{
  //  _default:'Helvetica',
  //},
  size:{
    _default:14,
    h1:30,
    h2:28,
    h3:26,
    h4:22,
    h5:20,
    h6:18,
    h7:16,
    labelSize:14,
  }
};

const Images = {
    'loading': require('./assets/images/loading.png'),
    'business': require('./assets/images/c01.png'),
    'guitar': require('./assets/images/c02.png'),
    'medicine':  require('./assets/images/c03.png'),
    'profile': require('./assets/images/Picture.png'),
    'coursebg': require('./assets/images/coursebg.png'),
    'coursecv': require('./assets/images/Cover.png'),
    'confetti': require('./assets/images/Confetti.png'),
    'icons':{
        'business': require('./assets/images/icons/006-travel.png'),
        'design': require('./assets/images/icons/002-edit-tools.png'),
        'economy': require('./assets/images/icons/004-pie-chart.png'),
        'database': require('./assets/images/icons/004-database.png'),
        'literature': require('./assets/images/icons/003-book.png'),
        'science': require('./assets/images/icons/002-medical.png'),
        'favorite': require('./assets/images/icons/favorite.png'),
        'friends': require('./assets/images/icons/friends.png'), 
        'achieve': require('./assets/images/icons/achieve.png'),
        'interest': require('./assets/images/icons/interest.png'), 
        'key': require('./assets/images/icons/key.png'),  
        'blocked': require('./assets/images/icons/blocked.png'),
        'course': require('./assets/images/icons/course.png'),  
        'students': require('./assets/images/icons/icousers.png'),
        'ratings': require('./assets/images/icons/icorating.png'),
        'lectures': require('./assets/images/icons/icolecture.png'),
        'download': require('./assets/images/icons/download.png'),
        'sharegray': require('./assets/images/icons/sharegray.png'),
        'achievegray': require('./assets/images/icons/achievegray.png'),        
    },
    'badges': {
        'starter': require('./assets/images/badges/medal1.png'),
        'elite': require('./assets/images/badges/medal2.png'),
        'geek': require('./assets/images/badges/medal3.png'),
        'pro': require('./assets/images/badges/medal4.png'),
    },
    'users':{
        'user1': require('./assets/images/users/596.jpg'),
        'user2': require('./assets/images/users/605.jpg'),
        'user3': require('./assets/images/users/613.jpg'),
        'user4': require('./assets/images/users/622.jpg'),
        'user5': require('./assets/images/users/627.jpg'),
        'user6': require('./assets/images/users/631.jpg'),
    }
};

const Colors = {
  _default:'#FFF',
  primary:'rgba(8,76,48,255)',
  primaryLight:'#000', // background screen
  primaryAccentLight:'rgba(115,191,68,255)',
  primaryAccent: 'rgb(112, 127, 247)',
  secondary:'rgba(8,67,42,255)', // safeareaview
  textPrimary: '#FFF',
  textSecondary: 'rgb(107, 123, 146)',
  separator: 'rgba(107, 123, 146,0.1)',
  separator1: 'rgba(107, 123, 146,0.2)',
  yellowish:'rgb(244, 166, 59)',
  buttonBg: "#1500FF",
  vcb: "rgba(8,77,49,255)",

  activeTabColor: "rgba(8,77,49,255)",
  inactiveTab: "#fff",
  textWhite: "#fff",
  bgFB: "#3b5998",
  bgGG: "#DB4437",
  green: '#37C034',
  greentrans: '#93fe8f',
  gray: '#4d4747',
  opacity: '#dcdbdb',
  cyan: '#00ebc0',
  bgTab: "rgba(1,26,7,255)",
  first: "#5bb322",
  mid: "#2e9829",
  last: "#037e2f"
};



const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary
  },
  safeArea: {
    flex: 1,
    backgroundColor: Colors.secondary,
    justifyContent: 'center',
    // paddingTop: statusBarHeight()
  },
  modalQuestion: {
    flex: 1,
    backgroundColor: Colors.primaryAccentLight
  },
  header: {
    height: 50 + statusBarHeight(),
    //paddingTop: Platform.OS === "android" ? 25 : 0,
    paddingTop: statusBarHeight(),
    backgroundColor: Colors._white,
    elevation: 4,
    justifyContent: 'center',
    paddingHorizontal: 4,

    shadowColor: '#aaa',
    shadowOpacity: 0.3,
    shadowRadius: 8,
    shadowOffset: {
      width: 2,
      height: 2
    }
  },
  appHeader: {
    minHeight: 60,
    // paddingTop: Platform.OS === "android" ? 25 : 0,
    backgroundColor: Colors.bgHeader,
    justifyContent: 'center',
    paddingHorizontal: 6
  },
  appHeaderLogoText: {
    color: Colors.textSecondary,
    fontSize: 25,
    textAlign: 'center',
    // fontFamily: 'BaiJamjuree-SemiBold',
    // fontFamily: 'BaiJamjuree-Medium',
    // textTransform: 'uppercase'
    // fontFamily: 'monospace'
  },
  bgHeader: {
    color: Colors.red,
    flexGrow: 1, alignItems: 'center', paddingVertical: 10
  },
backgroundLogin: {
    flex: 1,
    width: null,
    height: deviceHeight,
    backgroundColor: "rgba(0,0,0,0.1)",
    justifyContent: 'center'
  },
  backgroundView: {
    flex: 1,
    width: null,
    height: null,
    backgroundColor:  Colors.secondary
  },
  containerNoHeader: {
    // paddingTop: 40,
    flex: 1,
    paddingHorizontal: 8,
    backgroundColor: Colors.secondary
  },
  containerNoHeaderImage: {
    // paddingTop: 40,
    flex: 1,
    paddingHorizontal: 8,
  },
  containerAfterHeader: {
    flex: 1,
    paddingHorizontal: 8
  },
  headerTitle: {
    color: Colors._default,
    fontSize: 26,
    // fontFamily: 'BaiJamjuree-SemiBold',
    marginTop: 8,
    paddingBottom: 6,
    // fontFamily: 'BaiJamjuree-SemiBold'
  },
  titleKhoaHoc: {
    color: Colors._default,
    fontSize: 26,
    // fontFamily: 'BaiJamjuree-SemiBold',
    marginTop: 8,
    paddingBottom: 6,
  },
  featuredHolder: {

  },
  featuredHolderImg: {
    height: 160,
    width: 140,
    marginHorizontal: 4,
    borderRadius: 3,
    overflow: 'hidden'
  },
  featuredImage: {
    height: 160,
    width: 140
  },
  featuredHolderTitleHolder: {
    width: 140,
    padding: 4
  },
  featuredHolderTitle: {
    color: '#eee',
    fontSize: 16,
    paddingBottom: 8
  },
  featuredHolderPrice: {
    textAlign: 'center'
  },
  warningText: {
    color: Colors.red,
    fontSize: 16,
    // fontFamily: 'BaiJamjuree-SemiBold',
  },

  //icon style
  iconStyle: {

  },

  /////MY COURSES
  gridContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
  },

  grid2column: {
    width: '50%',
    height: 200,
    justifyContent: 'center',
    alignItems: 'center'
  },

  grid_i_container: {
    margin: 4,
    backgroundColor: '#eee',
  },


  ////SEARCH PAGE
  searchSection: {
    paddingVertical: 10
  },
  searchData: {
    paddingVertical: 10
  },
  searchTC: {

  },
  i_c: {
    marginRight: 20,
    alignItems: 'center'
  },
  i_p: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginBottom: 8
  },
  i_a_o: {
    position: 'absolute',
    width: 18,
    height: 18,
    backgroundColor: Colors.primary,
    top: 0,
    right: 2,
    zIndex: 3,
    borderRadius: 10
  },
  i_a_o_c: {
    position: 'absolute',
    width: 18,
    height: 18,
    backgroundColor: Colors.secondary,
    top: 0,
    right: 0,
    zIndex: 3,
    borderRadius: 10
  },
  i_o: {
    flex: 1,
    margin: 3,
    borderRadius: 8,
    backgroundColor: 'green'
  },
  c_i_o: {
    flex: 1,
    margin: 3,
    borderRadius: 8,
    backgroundColor: 'green'
  },
  c_i_n: {
    flex: 1,
    margin: 3,
    borderRadius: 8,
    backgroundColor: Colors.textSecondary
  },
  i_tc: {
    color: '#FFF',
    // fontFamily: 'BaiJamjuree-SemiBold'
  },
  i_cc: {
    color: '#888'
  },
  gridCategories: {
    width: Dimensions.get('screen').width / 3 - 22,
    height: Dimensions.get('screen').width / 3 - 22,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primaryAccentLight,
    borderRadius: Dimensions.get('screen').width / 3
  },
  gridWrapInnerContainer: {
    margin: 4,
    marginBottom: 10,
    padding: 4
  },
  gridWrapContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start'
  },
  gridCatTitle: {
    color: '#FFF',
    textAlign: 'center',
    // fontFamily: 'BaiJamjuree-SemiBold',
    paddingVertical: 6
  },

  //Homepage Latest Styles
  latestHolder: {
    flexDirection: 'row',
    marginVertical: 6
  },
  latestImage: {
    height: 70,
    width: 100,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: Colors.primaryAccentLight,
    marginTop: 5
  },
  //latest cover style
  latestCover: {
    height: 120,
    width: 130,
  },
  latestContentHolder: {
    marginHorizontal: 8,
    width: Dimensions.get('screen').width - 150,
    justifyContent: 'space-between',
    // paddingVertical: 3,
    marginLeft: 20
  },

  latestTitleUQ: {
    fontSize: 16,
    color: Colors.textPrimary,
    marginBottom: 5,
    // fontFamily: 'BaiJamjuree-SemiBold',
    textAlignVertical: 'top',
    // textAlign: 'right'
  },
  latestTitle: {
    fontSize: 18,
    color: Colors.textPrimary,
    marginBottom: 5,
    // fontFamily: 'BaiJamjuree-SemiBold',
    textAlignVertical: 'top',
    // textAlign: 'right'
  },
  latestListH: {
    fontSize: 18,
    color: Colors.textPrimary,
    textAlign: 'center'
  },
  latestListB: {
    color: Colors.textWhite,
    textAlign: 'center'
  },

  ///Chats
  chatOuter: {

  },

  //badge
  badgeHolder: {
    flexDirection: 'row',
    marginTop: 6
  },
  badge: {
    marginRight: 6
  },
  profilePhoto: {
    width: 100,
    marginRight: 10,
    marginTop: 10
  },
  settingIcon: {
    paddingVertical: 10
  },
  settingContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.separator,
    opacity: 0.8
  },
  settingLabel: {
    color: Colors.textPrimary,
    fontSize: Fonts.size.h6,
    paddingLeft: 6
  },
  c_p: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginBottom: 8
  },
  cri: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  crg: {

  },
  crth: {
    color: Colors.textPrimary,
    fontSize: Fonts.size.h4
  },
  crtp: {
    color: Colors.textSecondary,
    fontSize: Fonts.size.h7
  },
  itm: {
    flex: 1
  },
  itb: {
    position: 'absolute',
    left: 0,
    bottom: 6,
    right: 0,
    borderBottomWidth: 1,
    borderBottomColor: Colors.separator1,
  },
  ptt: {
    color: Colors.textPrimary,
    textAlign: 'center',
    fontSize: Fonts.size.h5,
    // fontFamily: 'BaiJamjuree-SemiBold'
  },
  ptb: {
    color: Colors.textSecondary,
    textAlign: 'center'
  },
  normalText: {
    color: Colors.textPrimary,
    fontSize: 16,
    // fontFamily: 'BaiJamjuree-SemiBold',
  },
  normalTextBlack: {
    color: Colors.primaryLight,
    fontSize: 16,
    // fontFamily: 'BaiJamjuree-SemiBold',
  },
  colorText: {
    color: Colors.textPrimary,
    fontSize: 16,
    // fontFamily: 'BaiJamjuree-SemiBold'
  },
  borderPicker: {
    flexDirection: 'row', justifyContent: 'space-between',
    borderRadius: 5, borderWidth: 1,
    borderColor: '#bdc3c7', overflow: 'hidden',
    flex: 1,
    marginTop: 5
  },
  crazyText: {
    color: '#cfcfcf',
    fontSize: 28,
    padding: 5,
    borderRightColor: '#12ca4a',
    borderLeftColor: '#11bca4',
    borderTopColor: '#22cb00',
    borderBottomColor: '#ffc100',
    borderRadius: 5,
    // fontFamily: 'BaiJamjuree-SemiBold',
    borderWidth: 1
  }
});


export { Styles, Fonts, Colors, Images};