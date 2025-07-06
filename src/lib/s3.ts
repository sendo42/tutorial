import crypto from "crypto"

import { Upload } from "@aws-sdk/lib-storage";
import { S3Client, S3 } from "@aws-sdk/client-s3";

type ResourceType = "users" | "products"

const S3_ENDPOINT ="http://localhost:9090"; // Replace with your MinIO endpoint
const S3_BUCKET = "images"

const s3Client = new S3Client({
    region: "ap-northeast-1", // S3Mockは任意のリージョンで動作
    forcePathStyle: true, // Use path-style URLs for S3
    endpoint: S3_ENDPOINT, // Use the S3Mock endpoint
    credentials: {
        accessKeyId: "test",
        secretAccessKey: "test"
    }
})

export const uploadImageToS3 = async (file: File, resourceType: ResourceType) => {
    const extension = file.name.split('.').at(-1)
    const randomId = crypto.randomUUID()
    
    const key = `${resourceType}/${Date.now().toString()}-${randomId}.${extension}`;
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const parallelUploads3 = new Upload({
        client:  s3Client,
        params: { Bucket: S3_BUCKET, Key: key, Body: buffer, ContentType: `image/${extension}` },

    });

  await parallelUploads3.done()

  return `${S3_ENDPOINT}/${S3_BUCKET}/${key}`;// これでimageのURLが返ってくる
}