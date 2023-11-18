import { S3Client, PutObjectCommand, DeleteObjectCommand, GetObjectCommand  } from '@aws-sdk/client-s3';
import {getSignedUrl} from '@aws-sdk/s3-request-presigner'
import dotenv from "dotenv";
// import fs from 'fs'

dotenv.config();


const bucket_name = process.env.AWS_BUCKET_NAME
const region = process.env.AWS_BUCKET_REGION
const acc_id = process.env.AWS_ACCESS_KEY
const sk = process.env.AWS_SECRET_KEY

const s3 = new S3Client({
    region: region,
    credentials: {
      accessKeyId: acc_id,
      secretAccessKey: sk,
    },
  });

export async function uploadToS3(values, res){
    // console.log(values)
    const {
        BodyBuffer,
        // S3_BUCKET_FOLDER,
        // ref_id,
        key,
    } = values
    // console.log(imageBuffer, 'imageBuffer')
    // console.log(S3_BUCKET_FOLDER, 'folder_name')
    // console.log(ref_id, 'ref_id')
    // const fileStream = fs.createReadStream(file.path)

    const uploadParams = {
        Bucket:bucket_name,
        Body: BodyBuffer,
        // Key: `${S3_BUCKET_FOLDER}/${ref_id}.png`,
        Key: key,
        ContentType: 'image/png'
    }
    try {
        const s3UploadResult = await s3.send(new PutObjectCommand(uploadParams));
        console.log('Image uploaded to S3: Success!!');
        // res.send({imagesID: `/ticket/${ref_id}`})
        // return res.status(200).json({message:"Image uploaded to S3: Success!!"})
    } catch (error) {
        console.error('Error uploading image to S3:', error);
        // Handle errors appropriately, send response, etc.
        // return res.status(500).send({message: error });
    }
}

// export async function getFromS3(values, res){
//     // console.log(values)
//     const {
//         key,
//         // S3_BUCKET_FOLDER,
//         // ref_id,
//     } = values
//     // console.log(S3_BUCKET_FOLDER, 'bucket')
//     // console.log(ref_id, 'bucket')
//     const getParams = {
//         Bucket: process.env.AWS_BUCKET_NAME,
//         // Key: `${S3_BUCKET_FOLDER}/${ref_id}.png`,
//         Key: key,
//     };

//     try {
//         const s3GetResult = await s3.send(new GetObjectCommand(getParams));

//         // const imageBase64 = s3GetResult.Body.transformToString('base64');
//         // console.log(imageBase64, 'get res log body base64');
//         // console.log(s3GetResult.Body.transformToString(), 'get res log body str')
//         // console.log(s3GetResult.Body.transformToWebStream(), 'get res log body ws')
//         // console.log(s3GetResult.Body.transformToByteArray(), 'get res log body byteArr')
//         // Send the image data in the response
//         // return imageBase64
//         // console.log(
//         //     s3GetResult.createReadStream().pipe(),
//         //     'pip create steam'
//         // )
//         return s3GetResult;
//         // return s3GetResult.Body;
//         // return s3GetResult.Body.transformToString('base64');
//         // res.status(200).json({ success: true, data: s3GetResult.Body.toString('base64') });
//     } catch (error) {
//         console.error('Error downloading image from S3:', error);
//         // res.status(500).json({ success: false, error: 'Internal Server Error' });
//     }


// }


export async function getObjectURL(values){

    const {
        // Bucket,
        key
    } = values

    const command = new GetObjectCommand({
        Bucket: "natrans",
        Key: key,
        ResponseContentType: 'image/png',
    })

    const url = await getSignedUrl(s3, command)
    // const url = await getSignedUrl(s3, command, { expiresIn: 60})
    return url
}

// async function init(){
//     console.log('url?', await getObjectURL({key: "ticket-qr-img/1117235-35-59.png"}))
// }

// init()