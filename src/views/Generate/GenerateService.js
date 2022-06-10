import http from "../Generate/generatecommon";

const create = data =>{
    return http.post('/scenario',data);
};

const GenerateService = {
    create
};

export default GenerateService;