import axios from "axios";
import { useEffect, useRef, useState } from "react";
// import { getUsername } from "../helper/API/handling";


// axios.defaults.baseURL = import.meta.env.VITE_REACT_APP_SERVER_DOMAIN;
// 
const route_server = axios.create({
    baseURL: import.meta.env.VITE_REACT_APP_SERVER_DOMAIN_ROUTE,
  });


export default function useFetch(query, values){
    const [data, setData] = useState({ isLoading : false, apiData: undefined, status : null, serverError: null })
    const isInitialRender = useRef(true);

    // console.log('what is this in reset pass is it createsession? ', query)
    useEffect(()=>{

        if (!isInitialRender.current) {
            fetchData()
        } else {
            isInitialRender.current = false; // Mark initial render as done
        }

    }, [query])

    const fetchData = async () => {
        try {
            setData(prev => ({ ...prev, isLoading: true }))

            // const { username } = !query ? await getUsername() : null;
            const { data, status } = await route_server.get(`/api/${query}`, {values});
            if(status === 200){

                // setData(prev => ({ ...prev, isLoading: false }))
                setData(prev => ({ ...prev, apiData:data, status: status }))
            }
            setData(prev => ({ ...prev, isLoading: false }))

        } catch (error) {
            setData(prev => ({ ...prev, isLoading: false, serverError: error }))
        }
        
    }

    return [data, setData]
}

// export default function FetchDateRoute(query){
//     const [data, setData] = useState({ isLoading : false, apiData: undefined, status : null, serverError: null })
//     const isInitialRender = useRef(true);

//     // console.log('what is this in reset pass is it createsession? ', query)
//     useEffect(()=>{

//         if (!isInitialRender.current) {
//             fetchData()
//         } else {
//             isInitialRender.current = false; // Mark initial render as done
//         }

//     }, [query])

//     const fetchData = async () => {
//         try {
//             setData(prev => ({ ...prev, isLoading: true }))

//             // const { username } = !query ? await getUsername() : null;
//             const { data, status } = await axios.get(`/api/${query}`);

//             if(status === 201){
//                 setData(prev => ({ ...prev, isLoading: false }))
//                 setData(prev => ({ ...prev, apiData : data, status: status }))
//             }
//             setData(prev => ({ ...prev, isLoading: false }))

//         } catch (error) {
//             setData(prev => ({ ...prev, isLoading: false, serverError: error }))
//         }
        
//     }

//     return [data, setData]
// }