

const serverApiBaseUrl = 'http://10.10.171.190/AGMService/Help';


import AsyncStorage from '@react-native-community/async-storage';

//CoDong
export const url_CoDong_MACD = async () => {
    var ipserver = await AsyncStorage.getItem("ipserver");
    var url = "http://" + ipserver + "/AGMService/api/v1/agm/codong/getinfo/bymacd";
    return url;
}
export const url_CoDong_SODKSH = async () => {
    var ipserver = await AsyncStorage.getItem("ipserver");
    var url = "http://" + ipserver + "/AGMService/api/v1/agm/codong/getinfo/bydksh";
    return url;
}

// Uy quyen
export const url_UyQuyen_List = async () => {
    var ipserver = await AsyncStorage.getItem("ipserver");
    var url = "http://" + ipserver + "/AGMService/api/v1/agm/uyquyen/list";
    return url;
}
export const url_UyQuyen_Them = async () => {
    var ipserver = await AsyncStorage.getItem("ipserver");
    var url = "http://" + ipserver + "/AGMService/api/v1/agm/uyquyen/add";
    return url;
}


// Checkin
export const url_Checkin_List = async () => {
    var ipserver = await AsyncStorage.getItem("ipserver");
    var url = "http://" + ipserver + "/AGMService/api/v1/agm/checkin/list";
    return url;
}
export const url_Checkin_Them_BySoDKSH = async () => {
    var ipserver = await AsyncStorage.getItem("ipserver");
    var url = "http://" + ipserver + "/AGMService/api/v1/agm/checkin/bycmt/add";
    return url;
}

export const url_Checkin_Them_ByMaCD = async () => {
    var ipserver = await AsyncStorage.getItem("ipserver");
    var url = "http://" + ipserver + "/AGMService/api/v1/agm/checkin/bymacd/add";
    return url;
}
export const url_Checkin_InLai = async () => {
    var ipserver = await AsyncStorage.getItem("ipserver");
    var url = "http://" + ipserver + "/AGMService/api/v1/agm/checkin/reprint";
    return url;
}
export const url_Checkin_MACD = async () => {
    var ipserver = await AsyncStorage.getItem("ipserver");
    var url = "http://" + ipserver + "/AGMService/api/v1/agm/checkin/getinfo/bymacd";
    return url;
}
export const url_Checkin_SODKSH = async () => {
    var ipserver = await AsyncStorage.getItem("ipserver");
    var url = "http://" + ipserver + "/AGMService/api/v1/agm/checkin/getinfo/bydksh";
    return url;
}
export const url_Checkin_HASHCODE = async () => {
    var ipserver = await AsyncStorage.getItem("ipserver");
    var url = "http://" + ipserver + "/AGMService/api/v1/agm/checkin/getinfo/byhash";
    return url;
}


export const url_BauCu_SODKSH = async () => {
    var ipserver = await AsyncStorage.getItem("ipserver");
    var url = "http://" + ipserver + "/AGMService/api/v1/agm/baucu/getinfo/bydksh";
    return url;
}
export const url_BauCu_MACD = async () => {
    var ipserver = await AsyncStorage.getItem("ipserver");
    var url = "http://" + ipserver + "/AGMService/api/v1/agm/baucu/getinfo/bymacd";
    return url;
}

// Câu hỏi biểu quyết
export const url_Question_List = async () => {
    var ipserver = await AsyncStorage.getItem("ipserver");
    var url = "http://" + ipserver + "/AGMService/api/v1/agm/question/list";
    return url;
}
export const url_Answer_ThemLo = async () => {
    var ipserver = await AsyncStorage.getItem("ipserver");
    var url = "http://" + ipserver + "/AGMService/api/v1/agm/answer/addList";
    return url;
}
export const url_Answer_ThemLe = async () => {
    var ipserver = await AsyncStorage.getItem("ipserver");
    var url = "http://" + ipserver + "/AGMService/api/v1/agm/answer/add";
    return url;
}

// Bầu cử nhân sự
export const url_NhanSu_List = async () => {
    var ipserver = await AsyncStorage.getItem("ipserver");
    var url = "http://" + ipserver + "/AGMService/api/v1/agm/vote/people/list";
    return url;
}
export const url_NhanSu_ThemLo = async () => {
    var ipserver = await AsyncStorage.getItem("ipserver");
    var url = "http://" + ipserver + "/AGMService/api/v1/agm/vote/addList";
    return url;
}
export const url_NhanSu_DaBau = async () => {
    var ipserver = await AsyncStorage.getItem("ipserver");
    var url = "http://" + ipserver + "/AGMService/api/v1/agm/answer/addList";
    return url;
}
export const url_DanhSachPhieuBau_List = async () => {
    var ipserver = await AsyncStorage.getItem("ipserver");
    var url = "http://" + ipserver + "/AGMService/api/v1/agm/vote/list";
    return url;
}





export const urlApiLogin = `${serverApiBaseUrl}/Account/LoginAGM`;
export const urlApiRegister = `${serverApiBaseUrl}/api/Account/Register`;
export const urlApiExternalLoginCallback = (email, name) => `${serverApiBaseUrl}/api/Account/ExternalLoginCallback/${email}/${name}`;
export const urlApiCheckLogin= (UserName, AccessFailedCount) => `${serverApiBaseUrl}/api/Account/CheckLogin/${UserName}/${AccessFailedCount}`;

export const urlApiGetDanhMucKhoaHoc = `${serverApiBaseUrl}/api/Language5/GetDanhMucKhoaHoc`;
export const urlApiGetKhoaHoc = (keyWord) => `${serverApiBaseUrl}/api/Language5/GetKhoaHoc/${keyWord}`;
export const urlApiGetThongTinUser = (userName) => `${serverApiBaseUrl}/api/Language5/GetThongTinUser/${userName}`
export const urlApiChangeAvatar = `${serverApiBaseUrl}/api/User/ChangeAvatar`;
export const urlApiGetBangXepHang = (userId, courseId, week) => `${serverApiBaseUrl}/api/BangXepHang/GetBangXepHang/${userId}/${courseId}/${week}`; 
export const urlApiGetAllCourseOfStudentByLanguageId = (userId, languageId) => `${serverApiBaseUrl}/api/Language5/GetAllCourseOfStudentByLanguageId/${userId}/${languageId}`; 
export const urlApiGetCurrentWeekNumber = () => `${serverApiBaseUrl}/api/BangXepHang/GetCurrentWeekNumber`;
export const urlApiNhanXetByLanguageIdAndCourseId = (userId, languageId, courseId) => `${serverApiBaseUrl}/api/Result/NhanXetByLanguageIdAndCourseId/${userId}/${languageId}/${courseId}`; 
export const urlApiNhanXetByParentKnowledgeId = (userId, knowledgeId, languageId) => `${serverApiBaseUrl}/api/Result/NhanXetByParentKnowledgeId/${userId}/${knowledgeId}/${languageId}`; 
export const urlApiGetAllPagingByNotebookId = (userId, languageId, knowledgeId) => `${serverApiBaseUrl}/api/Vocabulary/GetAllPagingByNotebookId/${userId}/${languageId}/${knowledgeId}`; 
export const urlApiGetAllQuestionPagingByNotebookId = (userId, languageId, knowledgeId) => `${serverApiBaseUrl}/api/Bookmark/GetAllQuestionPagingByNotebookId/${userId}/${languageId}/${knowledgeId}`; 


export const urlApiChiTietKhoaHoc = (id) => `${serverApiBaseUrl}/api/Course/ChiTietKhoaHoc/${id}`
export const urlApiThongTinGiangVien = (id) => `${serverApiBaseUrl}/api/Teacher/ThongTinGiangVien/${id}`
export const urlApiGetQuestionsByExamId = (userId, id) => `${serverApiBaseUrl}/api/Lesson/GetQuestionsByExamId/${userId}/${id}`
export const urlApiGetLessonById = (id) => `${serverApiBaseUrl}/api/Lesson/GetLessonById/${id}`
export const urlApiChamDiem = `${serverApiBaseUrl}/api/Result/ChamDiem`;

export const urlApiGetBaiTapChua = (userId) => `${serverApiBaseUrl}/api/Exercise/GetBaiTapChua/${userId}`
export const urlApiGuiBaiTap = `${serverApiBaseUrl}/api/Exercise/GuiBaiTap`;
export const urlApiGetDebai = (courseId) => `${serverApiBaseUrl}/api/Language5/GetDebai/${courseId}`

export const urlApiGetCommentBaiGiang = (id) => `${serverApiBaseUrl}/GetCommentBaiGiang/${id}`
export const urlApiSendComment = `${serverApiBaseUrl}/SendComment`;

export const urlApiGetAllKnowledgeByCourseId = (courseId) => `${serverApiBaseUrl}/api/Language5/GetAllKnowledgeByCourseId/${courseId}`
export const urlApiGetAllByLanguageId = (userId, languageId) => `${serverApiBaseUrl}/api/Language5/GetAllByLanguageId/${userId}/${languageId}`
export const urlApiPractice = (userId, Knowledges, CourseId) => `${serverApiBaseUrl}/api/Lesson/Practice/${userId}/${Knowledges}/${CourseId}`
export const urlApiGetAllActiveByCourseId_V2 = (courseId, userId) => `${serverApiBaseUrl}/api/Lesson/GetAllActiveByCourseId_V2/${courseId}/${userId}`

export const urlApiPostFeedBack = `${serverApiBaseUrl}/Messages`;
export const urlApiPostUserDevice = `${serverApiBaseUrl}/UserDevices/InsertOrUpdate`;

export const urlApiChangepass = `${serverApiBaseUrl}/api/Account/updatepass`;


export const urlApiAddQuestion = (userId, id, userName) => `${serverApiBaseUrl}/api/Bookmark/AddQuestion/${userId}/${id}/${userName}`
export const urlApiRemoveQuestion = (userId, id) => `${serverApiBaseUrl}/api/Bookmark/RemoveQuestion/${userId}/${id}`
export const urlApiRemoveVocabularyFromNotebook = (userId, id) => `${serverApiBaseUrl}/api/Vocabulary/RemoveVocabularyFromNotebook/${userId}/${id}`

export const urlApiCountChuaBaiTap = (courseId, userId) => `${serverApiBaseUrl}/api/Course/CountChuaBaiTap/${courseId}/${userId}`