
export const getUserName = () =>{
    const userStr = sessionStorage.getItem("userName");
    if(userStr) return JSON.parse(userStr);
    else return null;
}

export const getUserId = () =>{
    const userId = sessionStorage.getItem("userId");
    if(userId) return JSON.parse(userId);
    else return null;
}

export const getStaffId = () =>{
    const staffId = sessionStorage.getItem("staffId");
    if(staffId) return JSON.parse(staffId);
    else return null;
}

export const getStudentId = () =>{
    const studentId = sessionStorage.getItem("studentId");
    if(studentId) return JSON.parse(studentId);
    else return null;
}


export const getUserType = () =>{
    const userType = sessionStorage.getItem("userType");
    if(userType) return userType;
    else return null;
}

export const getToken = () =>{
    return sessionStorage.getItem("token") || null;
    
}

export const setUserSession = (userName,userId,userType,staffId,studentId) =>{
    sessionStorage.setItem("userName",JSON.stringify(userName));
    // sessionStorage.setItem("password",JSON.stringify(password));
    sessionStorage.setItem("userId",JSON.stringify(userId));
    sessionStorage.setItem("staffId",JSON.stringify(staffId));
    sessionStorage.setItem("userType",JSON.stringify(userType));
    sessionStorage.setItem("studentId",JSON.stringify(studentId));
}

export const removeUserSession = () =>{
    sessionStorage.removeItem("userName");
    sessionStorage.removeItem("password");
    sessionStorage.removeItem("userId");
    sessionStorage.removeItem("staffId");
    sessionStorage.removeItem("studentId");
    sessionStorage.clear();
    localStorage.clear();
}