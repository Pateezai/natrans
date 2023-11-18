import dotenv from "dotenv"
import omise from 'omise'
import axios from 'axios'
import QRCode, { create } from 'qrcode'
import generatePayload from 'promptpay-qr'
dotenv.config() 

// const writeFile = util.promisify(fs.writeFile)
// const filePath = path.join()

const omiseClient = new omise({
    publicKey: process.env.OMISE_PUBLIC_KEY,
    secretKey: process.env.OMISE_SECRET_KEY,
})


export async function checkoutCreditCard(req, res, next){
    const { 
        method,
        issue_date,
        routeId,
        periodId,
        // accept, 
        amount, 
        date, 
        desc, 
        duration, 
        email, 
        end_time, 
        fare,
        from,
        identnumber,
        note,
        passenger,
        phone,
        pname,
        start_time,
        to,
        token
    } = req.body
    // console.log(method, 'method')
    try {
        const customer = await omiseClient.customers.create({
            email,
            description: pname,
            card: token
        });
    
        const charges = await omiseClient.charges.create({
            amount,
            currency: 'thb',
            customer: customer.id,
            return_uri: `http://127.0.0.1:5173/ticket`,
            // return_uri: 'http://127.0.0.1:5173/ticket/:id',

        });
        // console.log(charges)
        // console.log(charges.amount, charges.status,)
        const values = {
            routeId:routeId,
            periodId:periodId,
            pname: pname,
            passenger: passenger,
            from:from,
            to:to,
            issue_date:issue_date,
            fare: (amount/100),
            charges: charges
        }
        // console.log(charges)
        const rate_trans = charges.transaction_fees
        const card = charges.card
        const payment_value = {
            payment_method:method,
            transaction_id:charges.id,
            transaction_date:charges.paid_at,
            transaction_name:pname,
            transaction_status:charges.status,
            name_oncard:card.name,
            amount:charges.amount,
            net:charges.net,
            fee:charges.fee,
            fee_vat:charges.fee_vat,
            fee_rate:rate_trans.fee_rate,
            vat_rate:rate_trans.vat_rate,
            currency:charges.currency,
            country:card.country,
            card_brand:card.brand,
            bank:card.bank,

        }
        // console.log(payment_value)
        let ticket_ref;
        let ticket_qr;
        // console.log(charges.paid_at)
        if(charges.status == 'successful'){
            try {
                
                // console.log('Hello??')
                const { data, status } = await axios.post('http://localhost:4000/api/ticket', {
                    // amount, 
                    // availableSeat, 
                    routeId:routeId,
                    periodId:periodId,
                    issue_date:issue_date,
                    // fare: (amount/100),
                    // charges: charges,
                    // transaction_date:charges.paid_at,
                    date, 
                    email, 
                    // desc, 
                    duration, 
                    // email, 
                    end_time, 
                    fare,
                    from,
                    identnumber,
                    note,
                    passenger,
                    phone,
                    pname,
                    start_time,
                    to,
                    payment_value,
                    return_uri: charges.return_uri,
                })
                ticket_ref = data.ref
                // ticket_qr = data.qr
                console.log(data, status, 'data, status')
                
            } catch (error) {
                console.error({error:error, message:'ticket generating error'});
            }
            
            // console.log(ticket_ref, 'its still return')
        }
        // console.log(ticket_ref, 'ticket id')
        return res.status(200).send({
            ticket_ref,
            // ticket_qr,
            // return_uri: charges.return_uri,
            authorizeUri: charges.authorize_uri,
            // amount: charges.amount,
            status: charges.status,
            // values:values,
            // charges:charges,
        })
    } catch (error) {
        return res.status(500).send({
            error:error
        })
        // console.error(error)

    }

    // next()
}

export async function checkoutInternetBanking(req, res, next){
    const {email, pname, amount, token} = req.body
    // console.log(req.body)
    try {
        const charges = await omiseClient.charges.create({
            amount,
            'source':     token,
            'currency':   'thb',
            'return_uri': 'http://127.0.0.1:5173/ticket',
          });
        // console.log('Net BAnk ->', charges)
        return res.send({
            authorizeUri: charges.authorize_uri
        })
    } catch (error) {
        console.error(error)
    }

    next()
}

export async function checkoutMobileBanking(req, res, next){
    const {email, pname, amount, token} = req.body
    // console.log(req.body)
    try {
        const charges = await omiseClient.charges.create({
            amount,
            'source':     token,
            'currency':   'thb',
            'return_uri': 'http://127.0.0.1:5173/ticket',
          });
        // console.log('Mobile ->', charges)
        return res.send({
            authorizeUri: charges.authorize_uri
        })
    } catch (error) {
        console.error(error)
    }

    next()
}


export async function checkoutSuccess(req, res, next){
    {
        from, 
        to, 
        date, 
        duration,
        fare,
        passenger, 
        desc,
        start_time,
        end_time,
        identnumber,
        phone,
        note,
        accept,
        email, 
        pname, 
        amount
    }




    
}

// export async function checkoutOtherPayment(req, res, next){
//     const {email, pname, amount, token} = req.body
//     try {
//         const charges = await omiseClient.charges.create({
//             amount,
//             'source':     token,
//             'currency':   'thb',
//             'return_uri': 'http://127.0.0.1:5173/ticket',
//           });
//         return res.send({
//             authorizeUri: charges.authorize_uri
//         })
//     } catch (error) {
//         console.log(error)
//     }

// }
// export async function checkoutQRpromtpay(req, res, next){
//     const {email, pname, amount, token} = req.body
//     try {
//         const charges = await omiseClient.charges.create({
//             amount,
//             'source':     token,
//             'currency':   'thb',
//             'return_uri': 'http://127.0.0.1:5173/ticket',
//           });
//           console.log('QR ->',charges)
//         return res.send({
//             authorizeUri: charges.authorize_uri
//         })
//     } catch (error) {
//         console.error(error)
//     }
//     next()

// }
export async function checkoutQRpromtpay(req, res, next){
    const {email, pname, amount, token} = req.body
    try {
        const charges = await omiseClient.charges.create({
            amount,
            'source':     token,
            'currency':   'thb',
          });

        //   console.log('QR ->',charges)
        //   console.log(charges.source.scannable_code.image.download_uri, 'scannablecode')
        
        return res.send({
            QR_Image: charges.source.scannable_code.image.download_uri,
        })
    } catch (error) {
        console.error(error)
    }
    next()

}

export async function omiseHooks(req, res, next){
    try {
        const { data } = req.body;
        console.log(data)
        // if (data.status === "successful" || data.status === "failed") {
        //   const charge = {
        //     id: data.id,
        //     status: data.status,
        //     amount: data.funding_amount
        //   }
        // //   console.log('charge -->', charge)
        // }
      } catch (err) {
        return res.status(500).send({message:'asdasda', error:err})
      }
    next()

}

export async function generateQRpayment(req, res){
    console.log('work?')
    const {amount} = parseInt(req.body)
    const payload = generatePayload(process.env.PP_QR, {amount})
    const option = {
        color: {
            dark: '#000',
            light: '#fff'
        }
    }
    QRCode.toDataURL(payload, option, )
    try {
        const url = await QRCode.toDataURL(payload, option)
        return res.status(201).send({
            message:'Generate QR Success',
            url
        })
    } catch (error) {
        return res.status(400).send({message:'Generate QR Fail', error: error})
    }
}