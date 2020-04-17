const http = require('http');
const fs = require('fs');
const request = require('request')



const hostname = '127.0.0.1';
const port = 3030;

const server = http.createServer((req, res) => {
   
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    var contentStyle = fs.readFileSync('voters.txt', {encoding: "utf8"});
    const routeMap = {
        '': 'home.html',
        'home': 'home.html',
        'parties': 'parties.html',
        'votersInfo': 'votersInfo.html'
    }
    
    render(res, routeMap[req.url.slice(1)]);

var addData = {"GET": (req, res)=> {
    console.log(req.body);
    res.end("form app");
}};

// REGISTERED NEW VOTERS
 http.server = request.post('/votersInfo', (req, res, body)=>{
    
        // let votersName = req.body.name;
        // let card = req.body.cardNumber;
        // let age = req.body.age;
        // let party = req.body.party;
       
        //var results = fs.writeFile('voters.txt', (req, res)=>{
        //    res.end(`${votersName}: ${card}: ${age}: ${party}`) ;
        //    console.log(votersName);

        } );

    });
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