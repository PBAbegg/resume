
'use strict';

const util=require('util');
const Hapi=require('hapi');
//const Joi=require('joi');
const mysql=require('mysql');

const conPool = mysql.createPool ({
    connectionLimit: 5, 
    host: "us-cdbr-iron-east-01.cleardb.net",
    user: "b54bc836d2ac9e",
    password: "9d4940bf",
    database: "heroku_d496cf0d958e167",
    debug: false
})

// Create a server with a host and port
const server=Hapi.server({
    host:'localhost',
    port:9000,
    routes: {
        cors: true
    }
});

// Add the route
server.route({
    method:`GET`,
    path:`/jobs`,
    handler:(request,h) => {

        let strsql = '*'

        return new Promise(function(resolve, reject)
        {
            conPool.getConnection(function(err,connection){
                if(err){
                    reject(err)
                }
            connection.query('SELECT ID, companyname, dateapplied, contactinfo, additionalinfo FROM jobs', function (error, results, fields) {
                connection.release();
                if (error){
                    console.error(error)
                    reject(error);

                } else {

                    resolve(results);
                }
            }
           )
        })
    })
    }
});

server.route({
    method:`PUT`,
    path:`/jobs/{ID}`,
    handler:(request,h) => {

        let strsql = '*'
        let jobId = request.perams.ID

        return new Promise(function(resolve, reject)
        {
            conPool.getConnection(function(err,connection){
                if(err){
                    reject(err)
                }
                const {
                    companyname, dateapplied, contactinfo, additionalinfo} = request.payload;
                const arrList = [companyname, dateapplied, contactinfo, additionalinfo, jobId];
            const query = connection.query(`UPDATE jobs 
                    SET companyname=?, dateapplied=?, contactinfo=?, additionalinfo=?
                    WHERE ID=?`, arrList, function (error, results, fields) {
                connection.release();
                if (error){

                    reject(error);

                } else {

                    resolve(results);
                }
            }
           )
        })
    })
    }
});

server.route({
    method:'POST',
    path:'/jobs',
    handler:(request,h) => {
        console.log(request.payload)

        return new Promise(function(resolve, reject)
        {
            conPool.getConnection(function(err,connection){
                if(err){
                    reject(err)
                }
            const post = {
                companyname: request.payload.companyName,
                dateapplied: request.payload.dateApplied,
                contactinfo: request.payload.contactInfo,
                additionalinfo: request.payload.additionalInfo,
            }    
            const query = connection.query(`INSERT INTO jobs SET ?`, post,
            function (error, results, fields) {
                connection.release();
                if (error){

                    reject(error);

                } else {

                    resolve(results);
                }
            }
           )
        })
    })
    }
});

server.route({
    method:`DELETE`,
    path:`/jobs/{ID}`,
    handler:(request,h) => {

        const jobId = request.params.ID;
        return new Promise(function(resolve, reject)
        {
            conPool.getConnection(function(err,connection){
                if(err){
                    reject(err)
                }
            connection.query(`DELETE FROM jobs WHERE ID=?`, jobId, function (error, results, fields) {
                connection.release();
                if (error){

                    reject(error);

                } else {

                    resolve(results);
                }
            }
           )
        })
    })
    }
});



// Start the server
async function start() {

    try {
        await server.start();
    }
    catch (err) {
        console.log(err);
        process.exit(1);
    }

    console.log('Server running at:', server.info.uri);
};

start();