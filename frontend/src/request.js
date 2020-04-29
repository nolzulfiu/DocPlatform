export const APIURL = "http://localhost:3000";
const axios = require("axios");
export const getDocuments = () => axios.get(`${APIURL}/lib`);
export const addDocument = data => axios.post(`${APIURL}/lib`, data);
export const editDocument = data => axios.put(`${APIURL}/lib/${data.id}`, data);
export const deleteDocument = id => axios.delete(`${APIURL}/lib/${id}`);
export const generatePDF = id => axios.get(`${APIURL}/lib/generatePdf/${id}`);