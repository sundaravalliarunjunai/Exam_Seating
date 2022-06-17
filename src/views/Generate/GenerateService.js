import http from "../Generate/generatecommon";

const create = data =>{
    return http.post('/scenario',data);
};

const getAll = () => {
    return http.get("/scenario");
};

const GenerateService = {
    create,
    getAll
};

export default GenerateService;