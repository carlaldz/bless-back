import axios from "axios"; 

const http = axios.create({
    baseURL: "http://localhost:3000/api/v1/",
    withCredentials: true, 
}); 

http.interceptors.response.use(
    (response) => response.data,
    (error) => {
        if (error.response) {
            console.error("Response Error: ", error.response);
        } else if (error.request) {
            console.error("Request Error: ", error.request);
        } else {
            console.error("General Error: ", error.message);
        }
        return Promise.reject(error);
    }
);

const profile = () => http.get("/users/me"); 

const register = (user) => http.post("/users", user); 

const login = (user) => http.post("/sessions", user); 

const listEvents = ({ page, date, limit = 10 }) => {
    limit = Number.isNaN(Number(limit)) || Number(limit) <= 0 ? 1 : limit;
    page = Number.isNaN(Number(page)) || Number(page) <= 0 ? undefined : page;

    date =
    typeof date === "string" && !isNaN(Date.parse(date)) ? date : undefined;
    console.log("Parámetros enviados:", { limit, page, date })

    return http.get("/eventos", {
        params: {limit, page, date },
      });
};

const getEvent = (id) => http.get(`/eventos/${id}`); 

const deleteEvent = (id) => http.delete(`/eventos/${id}`); 

export default { login, listEvents, getEvent, deleteEvent, register, profile}; 
