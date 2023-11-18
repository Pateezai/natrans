import nodemailer from 'nodemailer';
import Mailgen from 'mailgen';
import dotenv from "dotenv"
// import { text } from 'express';
// import htmlToImage from 'html-to-image';

dotenv.config() 



//POST: http://localhost:8000/api/mailregister
// * @param : {
//     'username': 'exampleuser',
//     'userEmail': '1234',
//     'text': '',
//     'subject': '',
// }
export const mailing = async (req, res) => {

    // const { userEmail } = req.body;
    const { 
        amount, 
        availableSeat, 
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
     } = req.body;

    let config = {
        service : 'gmail',
        auth : {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        }
    }

    const req_date = new Date(date)
    const pres_date = new Date()
    const options = {year: 'numeric', month: 'short', day: 'numeric'}
    const formatDate = req_date.toLocaleDateString('en-US', options)
    const TimeStamp = pres_date.toLocaleDateString('en-US', options)
    let transporter = nodemailer.createTransport(config);

    let MailGenerator = new Mailgen({
        theme: "default",
        product : {
            name: "Pateezai", //username
            link : 'https://mailgen.js/' //link to our web in the buttom of email //TODO
        }
    })

    let response = {
        body: {
            name : `test`, //or can be name too up to the data we sent from 3rd step and the sign up page info design
            intro:  "Welcome to Pateezai",
            outro: "Looking forward to do more business"
        }
    }

    let mail = MailGenerator.generate(response)

    let message = {
        from : process.env.EMAIL,
        to : email, 
        subject: 'Ticket Na-trans',
        html: mail //this type "mail would sent standard mail form with"
        //with some standard text and it's would ref to above materials

        //below is custom our own mail style may be one page html
        // html: 'test bro'
    }

    //convert those html ticket to png image

    try {
        // const toPng = await htmlToImage.toPng(message)
        // const encodePng = btoa(String.fromCharCode.apply(null, new Uint8Array(toPng)))
        // console.log(encodePng)
        await transporter.sendMail(message)
        // console.log('mailing prob?')
        return res.status(200).send(message.html)
    } catch (error) {
        return res.status(500).send({error})
    }

    // res.status(201).json("getBill Successfully...!");
}