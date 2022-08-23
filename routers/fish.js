const Sensors = require('../controllers/sensorsData');

const sensorGroup = new Sensors();
const acceptEndPoint = ['sg']; 
exports.get = async (route) => {
    try{            
           
        let endPointIdx = -1        
        acceptEndPoint.forEach(element => {
            const temp = route.indexOf(element);            
            if(temp>=0) endPointIdx = temp;
        })
        if(endPointIdx<0) {
            return {'code': 400, 'body': 'Bad Request'};
        }
        const endpoint =  route.slice(endPointIdx);
        switch(endpoint[0]){        
            case "sg": 
                if(endpoint.length==2){
                    const r = await sensorGroup.list(endpoint[1]);                                              
                    return  {'code': 200, 'data': r};   
                } else if (endpoint.length==3){
                    const r = await sensorGroup.list(endpoint[1], endpoint[2]);
                    return  {'code': 200, 'data': r};     
                } else if (endpoint.length==4){
                    const r = await sensorGroup.list(endpoint[1], endpoint[2], endpoint[3]);
                    return  {'code': 200, 'data': r};     
                } else if (endpoint.length==5){                        
                    const r = await sensorGroup.list(endpoint[1], endpoint[2], endpoint[3], endpoint[4]);
                    return  {'code': 200, 'data': r};     
                } else {
                    return {'code': 404};
                }                
            default:
                return {'code': 400, 'body': 'Bad Request'};
        }    
    } catch(err) {
        console.log(err)
        return {'code': 500}
    }
}

exports.post =  async (route, body) => {
    const data = JSON.parse(body.toString());            
    switch(route[route.length-1]){
        case "sg":                         
            try{
                await sensorGroup.putBuffer(data.id, JSON.stringify(data.data));     
                //console.log(status)
                //if(status.statusCode == 200) {
                    return {'code': 201, 'body': 'done'};        
                //} else {
                    //return {'code': 406}
                //}
            } catch(err) {
                return {'code': 400, 'body': err};
            }            
        
        default:
            
            return {'code': 400, 'body': 'Bad Request'};
    }
}
