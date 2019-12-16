# Instagras Content Web Services

This project can be used to access an AWS S3 compatible object storage, allowing to insert file and to retrieve them in a specific bucket.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

Before installing, [download and install Node.js](https://nodejs.org/en/download/).
Node.js 0.10 or higher is required.

Installation is done using the command :

```
npm install
```

### Installing

In order to configure the application, you have to create a `.env` file containing all the configuration of the application : 
```
app.hostname = 
app.port = 

s3.access_key_id = 
s3.secret_access_key = 
s3.bucket_name = 
s3.endpoint = 
s3.region =
```

To launch the application, you just have to run the command:

```
npm start
```

### Utilisation

#### POST

* /contentws/contents : store a content
  * 201 : Content stored
  * 400 : No content
  * 500 : Internal Error

#### GET

* /contentws/contents/{id} : retrieve the specified content
  * 200 : Content retrieved
  * 404 : Content not found
  * 500 : Internal Error

## Deployment

To deploy the application, the hostname should be set to 0.0.0.0.

## Built With

* [aws-sdk](https://www.npmjs.com/package/aws-sdk)
* [body-parser](https://www.npmjs.com/package/body-parser)
* [cors](https://www.npmjs.com/package/cors)
* [dotenv](https://www.npmjs.com/package/dotenv)
* [express](https://www.npmjs.com/package/express)
* [express-fileupload](https://www.npmjs.com/package/express-fileupload)
* [express-mongo-sanitize](https://www.npmjs.com/package/express-mongo-sanitize)
* [express-rate-limit](https://www.npmjs.com/package/express-rate-limit)
* [helmet](https://www.npmjs.com/package/helmet)
* [uuid](https://www.npmjs.com/package/uuid)
* [xss-clean](https://www.npmjs.com/package/xss-clean)


## Authors

* [**Alban Guillet**](https://github.com/AlbanGuillet) - *Initial work*

See also the list of [contributors](https://github.com/orgs/InstaGras/people) who participated in this project.

## Acknowledgments

* Enki Michel
* Théo Levalet
* Maxime Garry
