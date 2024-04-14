const { PutObjectCommand, S3Client } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

exports.createPresignedUrl = async (key) => {
  const client = new S3Client({
    region: process.env.S3_DEFAULT_REGION,
    credentials: {
      secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
      accessKeyId: process.env.S3_ACCESS_KEY_ID,
    },
  });
  const command = new PutObjectCommand({
    Bucket: process.env.S3_BUCKET_NAME,
    Key: key,
  });
  return await getSignedUrl(client, command, { expiresIn: 3600 });
};
