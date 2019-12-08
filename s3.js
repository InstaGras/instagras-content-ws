require('dotenv').config({ path: './.env' })

const AWS = require('aws-sdk');
const uuidv4 = require('uuid/v4')

//configuring the S3 environment
AWS.config.update({
    accessKeyId: process.env['s3.access_key_id'],
    secretAccessKey: process.env['s3.secret_access_key'],
    endpoint: process.env['s3.endpoint'],
    region: process.env['s3.region']
});

const s3 = new AWS.S3();

function getContent(request, response) {
    let params = {
        Bucket: process.env['s3.bucket_name'],
        Key: request.params.id
    };

    s3.getObject(params, function (err, data) {
        if (err) {
            console.log("Error : ", err);
            response.status(404).json({ "message": err.message });
        } else if (data) {
            console.log("Loaded in:", request.params.id);
            response.send(data.Body);
        } else {
            console.log("Something went wrong on getting" + request.params.id);
            response.status(500).json({ "message": "unknown issue" });
        }
    })
}

function postContent(request, response) {

    if (!request.files.file) {
        return response.status(400).send({ "message": "No files were uploaded."});
    }

    const key = uuidv4();
    const params = {
        Bucket: process.env['s3.bucket_name'],
        Body: request.files.file.data,
        Key: key
    };

    s3.upload(params, function (err, data) {
        if (err) {
            console.log("Error : ", err);
            response.status(400).json({ "message": err.message });
        } else if (data) {
            console.log("Saved in:", key);
            response.status(201).json({ "key": key });
        } else {
            console.log("Something went wrong on saving" + key);
            response.status(500).json({ "message": "unknown issue" });
        }
    });
}

module.exports = {
    getContent,
    postContent
}