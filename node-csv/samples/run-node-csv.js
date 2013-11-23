var csv = require('csv')
var fs = require('fs')
var f = fs.createReadStream('fbo_data_archive_12_13.csv')
var w = fs.createWriteStream('fbo_data_archive_12_13.txt')

w.write('[');

csv()
.from.stream(f, {columns:true})
.transform(function(row, index) {
    return (index === 0 ? '' : ',\n') + JSON.stringify(row);
})
.to.stream(w, {columns: true, end: false})
.on('end', function() {
     w.write(']');
     w.end();
 });
