import nodemailer from "nodemailer";
import Mailgen from "mailgen";
import dotenv from "dotenv";
// import e, { text } from "express";
// import { getFromS3 } from "../config/Cloud/S3/S3-api-handling.js";
// import htmlToImage from "html-to-image";

dotenv.config();

//POST: http://localhost:8000/api/mailregister
// * @param : {
//     'username': 'exampleuser',
//     'userEmail': '1234',
//     'text': '',
//     'subject': '',
// }
export const mailing = async (req, res) => {
  // const { userEmail } = req.body;

  const ticket = req.ticket; // Access the data passed from createTicket
  console.log(ticket,'fukcting ticket form mailing')
  const data = req.body
  const {
    ref_id,
    from,
    to,
    identnumber,
    fare,
    note,
    duration,
    p_name,
    email,
    phone,
    depart_date,
    start_time,
    end_time,
    seat,
    transaction_date,
    return_uri,
  } = data;

  // console.log(ticket, 'ticket')
  // console.log(email, 'ticket')
  

  let config = {
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  };

  // const req_date = new Date(date);
  // const pres_date = new Date();
  // const options = { year: "numeric", month: "short", day: "numeric" };
  // const formatDate = req_date.toLocaleDateString("en-US", options);
  // const TimeStamp = pres_date.toLocaleDateString("en-US", options);
  let transporter = nodemailer.createTransport(config);

  let MailGenerator = new Mailgen({
    theme: "default",
    product: {
      name: "Pateezai", //username
      link: "https://mailgen.js/", //link to our web in the buttom of email //TODO
    },
  });

  let response = {
    body: {
      name: `test`, //or can be name too up to the data we sent from 3rd step and the sign up page info design
      intro: "Welcome to Pateezai",
      outro: "Looking forward to do more business",
    },
  };

  // let mail = MailGenerator.generate(response);
    // Get the image from S3
    // const s3Object = await getFromS3({
    //   S3_BUCKET_FOLDER:"ticket-img", 
    //   ref_id:ref_id,
    // });

    // const s3Object = await getFromS3({
    //   S3_BUCKET_FOLDER:"ticket-img",
    //   ref_id
    // })
    

    // console.log(s3Object)
    // console.log(ticket, 'ticket mailing')
    // const imageBase64 = ticket.Body.transformToString('base64');
    // const imageSrc = `data:image/png;base64,`+ ticket;
    
    // Attach the image to the email
    // const attachments = [
    //   {
    //     filename: `${ref_id}.png`,
    //     content: s3Object,
    //     encoding: 'base64',
    //   },
    // ];

    // console.log(ticket, 'ticket')

  let message = {
    from: process.env.EMAIL,
    to: email,
    subject: "Ticket Na-trans",
    // html: mail, //this type "mail would sent standard mail form with"
    // attachments: [
    //   {
    //     filename: `${ref_id}.png`,
    //     path: ticket, // Assuming `ticket` is the path to your PNG file
    //   },
    // ],
    html:`
    <img src="${ticket}" alt="Ticket Image" style="max-width: 100%; height: auto;">
    `
    // html: `
    //   <p>Here is your ticket:</p>
    //   <embed src="data:application/pdf;base64,${ticket_url}" type="application/pdf" width="100%" height="600px"/>
    // `,
  //   html: `
  //   <p>Here is your ticket:</p>
  //   <img src="${imageSrc}" alt="Ticket Image">
  // `,

    //with some standard text and it's would ref to above materials
    //below is custom our own mail style may be one page html
    // html: 'test bro'
  };

  //convert those html ticket to png image

  try {
    // const toPng = await htmlToImage.toPng(message)
    // const encodePng = btoa(String.fromCharCode.apply(null, new Uint8Array(toPng)))
    // console.log(encodePng)
    await transporter.sendMail(message);
    // console.log('mailing prob?')
    // return res.status(200).send('mailing success');

  } catch (error) {
    return res.status(500).send({ error:error, message: 'failing sending email' });
  }

  // res.status(201).json("getBill Successfully...!");
};
