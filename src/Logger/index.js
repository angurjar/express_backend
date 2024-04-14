const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, prettyPrint } = format;



const management=()=>{

    // create the  logger
 return createLogger({
    level:info,
    format: combine(
        label({lebel:'rightnow'}),
    timestamp(),
prettyPrint()
    ),
defaultMeta:
{services:'services' } ,
transport:[
    new winston.transports.file({filename:'combine.log'}),
    new winston.transports.File({filename:'error',level:'error'}),
    new transports.console()
],
 


 });

}


module.exports=management