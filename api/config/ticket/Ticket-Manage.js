import fs from 'fs'
import dotenv from "dotenv";
import puppeteer from "puppeteer";
import path from 'path';
// import { S3, PutObjectCommand, DeleteObjectCommand, GetObjectCommand  } from '@aws-sdk/client-s3';
import { getObjectURL, uploadToS3 } from '../Cloud/S3/S3-api-handling.js';
import { GenerateTicketQR } from './QR/QR-handling.js';
import { convertImageToPdf } from '../Converter/pdf-converter.js';
import nodemailer from "nodemailer";
import Mailgen from "mailgen";


dotenv.config();


// const bucket_name = process.env.AWS_BUCKET_NAME
// const region = process.env.AWS_BUCKET_REGION
// const acc_id = process.env.AWS_ACCESS_KEY
// const sk = process.env.AWS_SECRET_KEY

// const s3 = new S3({
//     region: region,
//     credentials: {
//       accessKeyId: acc_id,
//       secretAccessKey: sk,
//     },
//   });
  



export const TicketMailing = async (req, res, next) => {
    try {
    const ticket_data = req.ticket_data; // Access the data passed from createTicket

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
        qr_code,
    } = ticket_data

    //-------------------------------------------------------------------------image-pdf-------------------
    // const qr = await GenerateTicketQR({
    //     ref_id:ref_id,
    //     return_uri:return_uri,
    // })

    // console.log(qr, 'qr')
    // console.log(typeof(qr), 'type qr')

    //-------------------------------------------------------------------------image-pdf-------------------
    // const S3_BUCKET_FOLDER = 'ticket-img';
        
    // const ticket_qr = await uploadToS3({
    //         BodyBuffer:qr,
    //         key:`ticket-qr-img/${ref_id}.png`,
    //         // S3_BUCKET_FOLDER:"ticket-qr-img",
    //         // ref_id
    //     })

        // console.log(ticket_qr, 'ticket qr')
    console.log(qr_code)
        const get_ticket_qr = await getObjectURL({
            // key:`${S3_BUCKET_FOLDER}/${ref_id}.png`,
            key:qr_code,
            // S3_BUCKET_FOLDER:"ticket-qr-img",
            // ref_id
        })

        // console.log(get_ticket_qr, 'ticket qr')
        // console.log(object)
        // console.log(get_ticket_qr, 'get ticket qr')
    //-------------------------------------------------------------------------image-pdf-------------------

    const ticket_template = `
    <!DOCTYPE html>
    <html lang="en">
    
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
      <style>
      body {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 100vh;
      }
      </style>
    </head>
    
    <body>
    
    
    
        <div style="border-radius: 0.375rem; overflow: hidden; border: 1px solid #60A5FA; min-width: max-content; max-width: max-content;">
    
          <div style="background-color: #60A5FA; padding: 0.5rem 1rem; display: flex; justify-content: space-between; align-items: center;">
    
            <div style="font-size: 1rem; color: white;">
              <h1 style="font-weight: bold;">Natrans</h1>
            </div>
    
            <div style="color: white; text-align: center;">
              <p style="font-size: 0.75rem;">Reference ID</p>
              <h1 style="font-weight: bold;">${ref_id}</h1>
            </div>
    
          </div>
    
          <div style="padding: 0.5rem 1rem; border-bottom: 1px dashed #CBD5E0; display: flex;">
    
            <div style="width: 100%; padding: 0 0.5rem;">
    
              <div style="border-bottom: 1px solid #CBD5E0; padding-bottom: 0.5rem; display: flex; gap: 0.25rem; align-items: center;">
    
                <h1 style="font-size: 1rem; font-weight: bold;">${from} ${start_time}</h1>
                >>>
                <h1 style="font-size: 1rem; font-weight: bold;">${to} ${end_time},</h1>
                <h1 style="font-size: 1rem; font-weight: bold;">${depart_date}</h1>
    
              </div>
    
              <div style="padding: 0.5rem 0; display: flex; justify-content: space-between; gap: 0.25rem;">
    
                <div style="flex-direction: column; gap: 0.25rem;">
    
                  <h1 style="font-size: 0.875rem; font-weight: bold;">Name:
                    <span style="padding-left: 0.25rem; font-weight: normal;">${p_name}</span>
                  </h1>
                  <h1 style="font-size: 0.875rem; font-weight: bold;">Seat:
                    <span style="padding-left: 0.25rem; font-weight: normal;">${seat}</span>
                  </h1>
                  <h1 style="font-size: 0.875rem; font-weight: bold;">Email:
                    <span style="padding-left: 0.25rem; font-weight: normal;">${email}</span>
                  </h1>
    
                </div>
    
                <div style="flex-direction: column; gap: 0.25rem;">
    
                  <h1 style="font-size: 0.875rem; font-weight: bold;">Passport/ID:
                    <span style="padding-left: 0.25rem; font-weight: normal;">${identnumber}</span>
                  </h1>
                  <h1 style="font-size: 0.875rem; font-weight: bold;">Duration:
                    <span style="padding-left: 0.25rem; font-weight: normal;">${duration}</span>
                  </h1>
                  <h1 style="font-size: 0.875rem; font-weight: bold;">Phone:
                    <span style="padding-left: 0.25rem; font-weight: normal;">${phone}</span>
                  </h1>
    
                </div>
    
              </div>
    
              <div style="padding: 0.25rem 0;">
    
                <h1 style="font-size: 0.875rem; font-weight: bold;">Note:</h1>
                <span style="padding-left: 0.25rem; font-weight: normal;">${note}</span>
    
              </div>
    
            </div>
    
            <div style="width: max-content; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 0 0.5rem;">
    
              <img src=${get_ticket_qr} alt="" style="width: 100%;"/>
              <span style="font-size: 0.625rem;">Scan</span>
    
            </div>
    
          </div>
    
          <div style="padding: 0.125rem; text-align: center;">
    
            <p style="font-size: 0.625rem; color: #718096;">Transaction date: ${transaction_date}</p>
    
          </div>
    
        </div>
    
    </body>
    
    </html>
        `;

    //-------------------------------------------------------------------------image-pdf-------------------
    // pdf or image convert
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    
    await page.setViewport({ width: 800, height: 400 });

    await page.setContent(ticket_template);


    // const GeneratedFolder = path.join(new URL('.', import.meta.url).pathname, 'Generated');
    // const GeneratedFolder = path.join(__dirname, 'Generated'); // Path to the output folder

    // Ensure the output folder exists, create it if not
    // if (!fs.existsSync(GeneratedFolder)) {
    //     fs.mkdirSync(GeneratedFolder);
    // }

    // // Generate a screenshot (image) of the HTML content
    const imageBuffer = await page.screenshot();
    // fs.writeFileSync(path.join(GeneratedFolder, `${ref_id}.png`), imageBuffer);
    // // Generate a screenshot (image) of the HTML content
    await browser.close();

    //-------------------------------------------------------------------------image-pdf-------------------
        const putticket = await uploadToS3({
            BodyBuffer:imageBuffer,
            key:`ticket-img/${ref_id}.png`
        })
        // console.log(putticket, 'put ticket')

        const getticket = await getObjectURL({
            key:`ticket-img/${ref_id}.png`,
        })

        console.log(getticket, 'get ticket')
        // const getticket = await getFromS3({
        //     S3_BUCKET_FOLDER: 'ticket-img',
        //     ref_id,
        //   });
      
        // console.log(getticket, 'get ticket')
        // console.log(typeof(getticket.Body), 'get ticket')
    //-------------------------------------------------------------------------image-pdf-------------------
    // await GenerateTicketQR({
    //     ref_id:ref_id,
    //     return_uri:return_uri,
    // })
    //-------------------------------------------------------------------------image-pdf-------------------
    //-------------------------------------------------------------------------image-pdf-------------------

    
    // const ticket = await getFromS3({
    //     S3_BUCKET_FOLDER,
    //     ref_id
    // })

    //-------------------------------------------------------------------------image-pdf-------------------

    // const pdfOptions = {
    //   format: "Letter", // Page format, e.g., 'A4', 'Letter', etc.
    //   margin: {
    //     top: "20px",
    //     right: "20px",
    //     bottom: "20px",
    //     left: "20px",
    //   },
    // };
    // const pdfBuffer = await page.pdf(); ////not work well
    // const pdfBuffer = await  convertImageToPdf(imageBuffer);
    // fs.writeFileSync(path.join(GeneratedFolder, `${ref_id}.pdf`), pdfBuffer);
    // const putticket = await uploadToS3({
    //     imageBuffer:pdfBuffer,
    //     key:`ticket-img/${ref_id}.pdf`,
    // })

    // const ticket_url = await getFromS3({
    //     imageBuffer:pdfBuffer,
    //     S3_BUCKET_FOLDER:"ticket-img",
    //     ref_id
    // })

    // Convert the image buffer to base64
    // const imageDataBase64 = imageBuffer.toString('base64');
    // console.log(imageDataBase64)
    console.log(typeof(getticket), 'type of ticket')



    // console.log(getticket.Body.transformToString('base64'))
    // console.log(ticket.Body.transformToString('base64'))
    // console.log(getticket, 'ticket manages')
    req.ticket = getticket
    next()
    return res.status(200).json({ ref: ref_id});

    // pdf or image convert
    //-------------------------------------------------------------------------image-pdf-------------------
  
    } catch (error) {
        console.error(error);
        // Handle errors and send an appropriate response
        return res.status(500).json({ error: 'Fail Generating Ticket' });
    }
}