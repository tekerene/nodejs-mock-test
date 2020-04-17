const http = require('http');
const fs = require('fs');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
   
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    var contentStyle = fs.readFileSync('css/style.css', {encoding: "utf8"});
    const routeMap = {
        '': 'home.html',
        'home': 'home.html',
        'about': 'about.html',
        'services': 'services.html'
    }
    
    render(res, routeMap[req.url.slice(1)]);
});
var addData = {"GET": (req, res)=> {
    console.log(req.body);
    res.end("form app");
}};

function render(res, htmlFile) {
    fs.stat(`./${htmlFile}`, (err, stats) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        // res.setStyle('Content-Type', 'text/css');
        if(stats) {
            fs.createReadStream(htmlFile).pipe(res);
        } else {
            res.statusCode = 404;
            res.end('sorry, page not found!');
        }
    });
}
server.listen(port, hostname, ()=>{
    console.log(`server running at http://${hostname}:${port}/`);
});