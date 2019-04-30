const moment = require('moment');


const date1 = moment();
date1.subtract(5, 's');
const date2 = moment();
if(date2.diff(date1, 'y') > 0){
    console.log(date2.diff(date1, 'y') + ' Years');
}else if(date2.diff(date1, 'M') > 0){
    console.log(date2.diff(date1, 'M') + ' Months');
}else if(date2.diff(date1, 'd')){
    console.log(date2.diff(date1, 'd') + ' Days');
}else if(date2.diff(date1, 'h') > 0){
    console.log(date2.diff(date1, 'h') + ' Hours');
}else{
    console.log(date2.diff(date1, 'm') + ' Minutes');
}