import axios from "axios";
import { apiCallBegan } from "../api";

const api =
    ({ dispatch }) =>
    (next) =>
    async (action) => {
        if (action.type !== apiCallBegan.type) return next(action);

        let { url, method, data } = action.payload;

        if(!data) data = {}

        try {
            const response = await axios.request({
                baseURL: "http://localhost:9000/",
                url,
                method,
                data
            });

        } catch (error) {
            console.log(error)
        }
    };

export default api;
