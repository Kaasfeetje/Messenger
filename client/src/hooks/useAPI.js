import axios from "axios";
import { useState } from "react";

export const useAPI = () => {
    const [response, setResponse] = useState({
        data: null,
        hasError: false,
    });

    const makeRequest = async ({ url, data, method }) => {
        try {
            setResponse({ loading: true });

            const response = await axios({
                method,
                url: `http://localhost:3001/api/v1${url}`,
                data,
                withCredentials: true,
            });
            setResponse({
                data: response.data.data,
                hasError: false,
                loading: false,
            });
            return data;
        } catch (err) {
            setResponse({
                data: null,
                hasError: err.response ? err.response.data.error : err,
                loading: false,
            });
        }
    };

    return [response, makeRequest];
};
