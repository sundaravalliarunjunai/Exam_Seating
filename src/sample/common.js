
export const getUser = () =>{
    const userStr = sessionStorage.getItem("user");
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

export const getDepartmentId = () =>{
    const departmentId = sessionStorage.getItem("departmentId");
    if(departmentId) return JSON.parse(departmentId);
    else return null;
}



export const getUserType = () =>{
    const userType = sessionStorage.getItem("userType");
    if(userType) return JSON.parse(userType);
    else return null;
}

export const getToken = () =>{
    return sessionStorage.getItem("token") || null;
    
}

export const setUserSession = (emailId,userId,staffId,userType,departmentId) =>{
    sessionStorage.setItem("emailId",emailId);
    sessionStorage.setItem("user",JSON.stringify(userId));
    sessionStorage.setItem("userId",JSON.stringify(userId));
    sessionStorage.setItem("staffId",JSON.stringify(staffId));
    sessionStorage.setItem("userType",JSON.stringify(userType));
    sessionStorage.setItem("departmentId",JSON.stringify(departmentId));
}

export const removeUserSession = () =>{
    sessionStorage.removeItem("emailId");
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("userId");
    sessionStorage.removeItem("staffId");
    sessionStorage.clear();
    localStorage.clear();
}