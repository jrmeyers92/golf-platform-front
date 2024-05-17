const AWS = require("aws-sdk");

AWS.config.update({
  accessKeyId: process.env.S3_ACCESSS_KEY,
  secretAccessKey: process.env.S3_SECRET_KEY,
  region: process.env.S3_REGION,
});

export const s3 = new AWS.S3();
