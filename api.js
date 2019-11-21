require('dotenv').config({ path: './.env' })

const AWS = require('aws-sdk');
const fs = require('fs');
const path = require('path');

//configuring the AWS environment
AWS.config.update({
    accessKeyId: process.env['s3.access_key_id'],
    secretAccessKey: process.env['s3.secret_access_key']
  });

var s3 = new AWS.S3();
var filePath = "./test.txt";

//configuring parameters
var params = {
  Bucket: process.env['s3.bucket_name'],
  Body : fs.createReadStream(filePath),
  Key : "folder/"+Date.now()+"_"+path.basename(filePath)
};  

s3.upload(params, function (err, data) {
  //handle error
  if (err) {
    console.log("Error", err);
  }

  //success
  if (data) {
    console.log("Uploaded in:", data.Location);
  }
});