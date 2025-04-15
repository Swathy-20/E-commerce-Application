import { useEffect, useState } from "react";
import { axiosInstance } from "../config/axiosInstance";

export const useFetch = (url) => {
    
    const [data, setData] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // api call function
    const fetchData = async () => {
        try {
            //console.log("Fetching data from:", url);
            const response = await axiosInstance({ method: "GET", url: url });
            //console.log("API Response:", response.data);
            let extracteddata = response?.data?.data || response?.data || null;
            setData(extracteddata);
            setIsLoading(false);
        } catch (error) {
            console.log(error);
            setError(error);
        }
    };

    //useEffect
    useEffect(() => {
        fetchData();
        
    }, []);

    return [data, isLoading, error];
};