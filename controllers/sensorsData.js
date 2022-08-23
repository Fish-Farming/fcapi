'use strict'

const OSS = require('ali-oss');
const config = require('../auth/config.json');

/**
 * Sensors Management with OSS
 * @class
 */
class Sensors {
    client = {};

    constructor (){
        this.client = new OSS (config);
    }

    /**
     * @method putBuffer
     * Update data retrieve from designated sensor group to OSS. Timestamp will autogen while invoke.
     * @param {string} sensorGroup - The Sensor Group ID
     * @param {string} content - The Values
     * 
     * @returns {Object} status codew
     * @throws {Expection} Error
     */
    async putBuffer(sensorGroup, content) {                
        try {                     
            const result = await this.client.put(`${sensorGroup}/${this.returnCurrentDateTime()}.json`, Buffer.from(content));            
            if(result.res.statusCode == 200) {                
                return JSON.stringify({"statusCode": result.res.statusCode})
            } else {
                return ;
            }
        } catch (e) {
            console.log(e)
            return;
        }
    }

    async readObject(obj) {    
        try {
            const result = await this.client.get(obj);
            return result.content.toString('utf8')
        } catch(err) {
            throw err;
        }
    }

    /**
     * @method list
     * Retrieve the data based on sensor group ID. Period query is optional.
     * 
     * @param {string} sensorGroup - Sensor Group ID
     * @param {number} y - Year (Optional)
     * @param {number} m - Month (Optional)
     * @param {number} d - Day (Optional)
     * @returns {Object} JSON Data
     */
    async list(sensorGroup, y, m, d){    
        const data = [];
        let item = {};
        if (y===undefined) { y=''; }
        if (m===undefined) { m=''; }
        if (d===undefined) { d=''; }

        const listFiles = await this.client.list({prefix: `${sensorGroup}/${y}${m}${d}`});
        for(const obj of listFiles.objects){
            item = await this.readObject(obj.name);            
            data.push(JSON.parse(item));
        }                
        return data;

        //Error return
    }


    returnCurrentDateTime() {
        const dateOb = new Date();
        const date = ("0" + dateOb.getDate()).slice(-2);
        const month = ("0" + (dateOb.getMonth() + 1)).slice(-2);
        const year = dateOb.getFullYear();
        const hours = ("0" + dateOb.getHours()).slice(-2);
        const minutes = ("0" + dateOb.getMinutes()).slice(-2);
        const seconds = ("0"+ dateOb.getSeconds()).slice(-2);
        return (year + month + date + "_" + hours + minutes + seconds);
    }
}


module.exports = Sensors;
