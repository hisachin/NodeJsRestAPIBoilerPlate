import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';

module.exports = () => {
    
    let server = express(),
        create,
        start;

    create = async (config,db) => {
        let routes = require('routes/index')
        
        // set all the server things
        server.set('env', config.config_id);
        server.set('port', config.node_port);
        server.set('hostname', config.API_URL);
        
        // add middleware to parse the json
        server.use(cors());
        server.use(bodyParser.json());
        server.use(bodyParser.urlencoded({
            extended: false
        }));
        
        try{
            //connect the database
            await mongoose.connect(db.database,{ useNewUrlParser: true ,useUnifiedTopology: true});

             // Set up routes
            routes.init(server);
        }catch(error){
            console.log(error.message);
        }
    };

    
    start = () => {
        let hostname = server.get('hostname'),
            port = server.get('port');
        server.listen(port, function () {
            console.log('Express server listening on - http://' + hostname + ':' + port);
        });
    };
    return {
        create: create,
        start: start
    };
};