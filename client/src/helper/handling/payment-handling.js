import axios from "axios";

// axios.defaults.baseURL = import.meta.env.VITE_REACT_APP_SERVER_DOMAIN;

const payment_server = axios.create({
    baseURL: import.meta.env.VITE_REACT_APP_SERVER_DOMAIN_PAYMENT,
  });

const ticket_server = axios.create({
    baseURL: import.meta.env.VITE_REACT_APP_SERVER_DOMAIN_TICKET
})
// console.log(import.meta.env.VITE_REACT_APP_SERVER_DOMAIN_TICKET)
// console.log(import.meta.env.VITE_REACT_APP_SERVER_DOMAIN_PAYMENT)


//payment
export async function CreateCreditCharge(values){
    console.log(values)
    console.log(values.token)
    console.log(values.amount)
    console.log(values.pname)
    try {
        const { data } = await payment_server.post('/payment/checkout-credit-card', 
            values
        )
        console.log(data, 'data from pmhandling')
        console.log(data.status)
        // if(data.status == 'successful'){
        //     console.log(data)
        // const response =  await ticket_server.post('/ticket/generateTicket', data)
        // console.log(response.data)
        //  return Promise.resolve({ data, ticket: response.data });
        // }
        return Promise.resolve({ data });
    } catch (error) {
        return Promise.reject({ error: "Credit Card Error" })
    }
}

export async function CreateInternetBankingCharge({email, pname, amount, token}){
    try {
        const { data } = await payment_server.post('/payment/checkout-internet-banking', {
            email,
            pname,
            amount,
            token
        })
        return Promise.resolve({ data });
    } catch (error) {
        return Promise.reject({ error: "Interenet Banking Error" })
    }
}
export async function CreateMobileBankingCharge({email, pname, amount, token}){
    try {
        const { data } = await payment_server.post('/payment/checkout-mobile-banking', {
            email,
            pname,
            amount,
            token
        })
        return Promise.resolve({ data });
    } catch (error) {
        return Promise.reject({ error: "Interenet Banking Error" })
    }
}

// export async function CreateOtherPaymentCharge({email, pname, amount, token}){
//     try {
//         const { data } = await axios.post('/payment/checkout-qr-promtpay', {
//             email,
//             pname,
//             amount,
//             token
//         })
//         return Promise.resolve({ data });
//     } catch (error) {
//         return Promise.reject({ error: "QR Promtpoay Error" })
//     }
// }
export async function CreateQRCharge({email, pname, amount, token}){
    try {
        const { data } = await payment_server.post('/payment/checkout-qr-promtpay', {
            email,
            pname,
            amount,
            token
        })
        return Promise.resolve({ data });
    } catch (error) {
        return Promise.reject({ error: "QR Promtpoay Error" })
    }
}

export async function generateQRpayment({amount}){
    try {
        const { data } = await payment_server.post('/payment/generate-qr-payment', {
            amount
        })
        return Promise.resolve({ data });
    } catch (error) {
        return Promise.reject({ error: "Credit Card Error" })
    }
}
