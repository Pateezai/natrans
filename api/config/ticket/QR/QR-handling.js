import QRCode, { create } from "qrcode";
// import fs from 'fs'
// import path from 'path';


export async function GenerateTicketQR(values){
    const {
      ref_id,
      return_uri,
    } = values;

    const option = {
        color: {
            dark: '#000',
            light: '#fff'
        }
      }

    try {

    const url = await QRCode.toDataURL(`${return_uri}?id=${ref_id}`, option)

    const imageBuffer = Buffer.from(url.split(',')[1], 'base64');

    // const GeneratedFolder = path.join(new URL('.', import.meta.url).pathname, 'GeneratedQR');
    
    // const imagePath = '../config/ticket/QR/' + `ticket-qr-${ref_id}.png`;
    // const imagePath = path.join(GeneratedFolder, `ticket-qr-${ref_id}.png`);

    // fs.writeFileSync(imagePath, imageBuffer);

    return imageBuffer
    // console.log(url)
    } catch (error) {
    console.error(error)
    }



}