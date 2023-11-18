import axios from "axios";
// import { useEffect, useRef, useState } from "react";

const route_server = axios.create({
    baseURL: import.meta.env.VITE_REACT_APP_SERVER_DOMAIN_ROUTE,
  });

// const payment_server = axios.create({
//     baseURL: import.meta.env.VITE_REACT_APP_SERVER_DOMAIN_PAYMENT,
//   });



export async function GetSelectedRoute(values){
    console.log(values)
    try {
        const { data, status } = await route_server.post('/api/test', 
            values
        )
        return Promise.resolve({ data, status });
    } catch (error) {
        return Promise.reject({ error: "Get route error" })
    }
}

export async function GetTicket(ticket_ref){
    console.log(ticket_ref)
    try {
        const {data, status} = await route_server.get(`/api/ticket?id=${ticket_ref}`)
        console.log(data, 'from handling')
        return Promise.resolve({ data, status });
    } catch (error) {
        return Promise.reject({ error: "Get ticket error", error })
        
    }
}