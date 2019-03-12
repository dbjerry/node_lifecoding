/* express 적용 전 */
//모듈
var http = require('http');
var querystring = require('querystring');

var movieList = [{title: '라라랜드', director: '데미언 샤젤', actor: '라이언 고슬링'}];

//Node.js의 웹서버 생성
//var server = http.createServer(function(request, response) {
    if(request.method.toLowerCase() == 'post') {
        addNewMovie(request, response);
    }
    //요청방식이 GET이면 목록 출력
    else {
        showList(request, response);
    }
//});
//포트번호 : 3000
//server.listen(3000);

function showList(request, response) {
    response.writeHeader(200, {'Content-Type': 'text/html; charset=UTF-8'});
    response.write('<html>');
    response.write('<meta charset="UTF-8">');
    response.write('<body>');
    response.write('<h3>Favorite Movie</h3>');
    response.write('<div><ul>');

    movieList.forEach(function(item) {
        response.write('<li>' + item.title + '(' + item.director + ')</li>');
    }, this);
    response.write('</ul></div>');

    response.write(
        '<form method="post" action="."><h4>새 영화 입력</h4>' +
        '<div><input type="text" name="title" placeholder="영화제목"></div>' +
        '<div><input type="text" name="director" placeholder="감독"></div>' +
        '<div><input type="text" name="actor" placeholder="기억에 남는 배우"></div>' +
        '<input type="submit" value="upload">' +
        '</form>'
        );
    response.write('</body>');
    response.write('</html>');
    response.end();
}

function addNewMovie(request, response) {
    var body = '';
    request.on('data', function(chunk){
        body += chunk;
    });
    request.on('end', function() {
        var data = querystring.parse(body);
        var title = data.title;
        var director = data.director;

        movieList.push({title:title, director:director, actor:actor});

        //PRG패턴
        response.statusCode = 302;
        response.setHeader('Location', '.');
        response.end();
    });
}