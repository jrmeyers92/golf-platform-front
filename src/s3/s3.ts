const AWS = require("aws-sdk");

AWS.config.update({
  region: process.env.NEXT_AWS_S3_REGION,
  credentials: {
    accessKeyId: process.env.NEXT_AWS_S3_ACCESS_KEY,
    secretAccessKey: process.env.NEXT_AWS_S3_SECRET_KEY,
  },
});

export const s3 = new AWS.S3();
