const getRawBody = require('raw-body');
const fishroute = require('./routers/fish');

module.exports.handler = function(req, resp) {    
    console.log(req.url);
    resp.setHeader('content-type', 'application/json');
    const uri = (req.url).split('/')
    if(uri.length == 0) {
     resp.send(JSON.stringify({'code': 400, 'body': 'Bad Request'}, null, ''))
    } else {     
     //console.log(uri)
     switch(req.method) {
      case 'GET':
        fishroute.get(uri).then((data)=> {
            //console.log(data)
            resp.send(JSON.stringify(data));
        })       
       break
      case 'POST': 
        getRawBody(req, (err, data)=> {
          if(!err){
            fishroute.post(uri, data).then((status)=>{
              resp.send(JSON.stringify(status));
            }).catch((err)=>{
              resp.send({"status": 400, "description": err.toString()})
            })
          } else {
            resp.send({"status": 400, "description": err.toString()})
          }
        })
       break;
      default:
        resp.send({"status": 400, "description": "Bad Request"});
        break;
     }
    }
   }
   
