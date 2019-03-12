var http = require('http');
var fs = require('fs');
var url = require('url');
var querystring = require('querystring');
var template = require('./lib/template.js');
var path = require('path');
var sanitizeHtml = require('sanitize-html');

var app = http.createServer(function(request, response){
  var _url = request.url;
  var queryData = url.parse(_url, true).query;
  var pathname = url.parse(_url, true).pathname;
  console.log(_url);
  console.log(pathname);

  // Routing defines the applicaton end point ( URI ),
  // and how the URI responds to client requests.
  if(pathname === '/'){
    if(queryData.id === undefined){
      fs.readdir('./data', function(error, filelist){
        var title = 'Welcome';
        var description = 'Hello, Node.js!';
        
        // data list
        // var list = templateList(filelist);
        var list = template.list(filelist);

        // add css/footer
        fs.readFile('css/footer', 'utf-8', function(err, footer_desc){
          var footer = footer_desc;
          var html = template.HTML(title, list, `<h2>${title}</h2>${description}`, footer, '<a href="/create">create</a>');
          // response.end(fs.readFileSync(__dirname + _url));
          response.writeHead(200);
          response.end(html);
        });
      });
    }
    else {
      fs.readdir('./data', function(error, filelist){
        var filteredId = path.parse(queryData.id).base;
        fs.readFile(`data/${filteredId}`, 'utf-8', function(err, description){
          fs.readFile('css/footer', 'utf-8', function(err, footer_desc){
            var footer = footer_desc;
            var title = queryData.id;
            var sanitizedTitle = sanitizeHtml(title);
            var sanitizedDescription = sanitizeHtml(description, {
              allowedTags:['h1']
            });
            var list = template.list(filelist);
            var html = template.HTML(sanitizedTitle, list, `<h2>${sanitizedTitle}</h2>${sanitizedDescription}`, footer, `
            <a href="/create">create</a> 
            <a href="/update?id=${sanitizedTitle}">update</a> 
            <form action="delete_process" method="post">
              <input type="hidden" name="id" value="${sanitizedTitle}">
              <input type="submit" value="delete">
            </form>`);
            // response.end(fs.readFileSync(__dirname + _url));
            response.writeHead(200);
            response.end(html);
          });
        });
      });
    }
  }
  else if(pathname === '/create') {
    if(queryData.id === undefined){
      fs.readdir('./data', function(error, filelist){
        var title = 'WEB - create';
        
        // data list
        var list = template.list(filelist);

        // add css/footer
        fs.readFile('css/footer', 'utf-8', function(err, footer_desc){
          var footer = footer_desc;
          var html = template.HTML(title, list, `
          <form action="/create_process" method="post">
            <p>
              <input type="text" name="title" placeholder="title">
            </p>
            <p>
              <textarea name="description" placeholder="description"></textarea>
            </p>
            <p>
              <input type="submit">
            </p>
          </form>
          `, footer, '');
          // response.end(fs.readFileSync(__dirname + _url));
          response.writeHead(200);
          response.end(html);
        });
      });
    }
  }
  else if(pathname === '/create_process') {
    var body = '';

    // web browser가 post방식으로 data를 전송할 때 data가 엄청 많으면 한 번에 처리할 때
    // 컴퓨터가 못 버틸수도 있기 때문에 서버에 수신할 때마다
    // data라는 인자를 통해 수신한 정보를 제공
    request.on('data', function(data){
      body += data;

      // data의 양이 너무 많으면 접속을 끊어버린다.
      //if(body.length > 1e6) {
      //  request.connection.destroy;
      //}
    });
    request.on('end', function(){
      var post = querystring.parse(body);
      var title = post.title;
      var description = post.description;
      fs.writeFile(`data/${title}`, description, 'utf-8', function(err){
        // 302 : 일시적으로 page를 다른 곳으로 이동
        response.writeHead(302, {Location: `/?id=${title}`});
        response.end();
      });
    });
  }
  else if(pathname === '/update'){
    fs.readdir('./data', function(error, filelist){
      var filteredId = path.parse(queryData.id).base;
      fs.readFile(`data/${filteredId}`, 'utf-8', function(err, description){
        fs.readFile('css/footer', 'utf-8', function(err, footer_desc){
          var footer = footer_desc;
          var title = queryData.id;
          var list = template.list(filelist);
          var html = template.HTML(title, list, `
        <form action="/update_process" method="post">
          <input type="hidden" name="id" value="${title}">
          <p>
            <input type="text" name="title" placeholder="title" value="${title}">
          </p>
          <p>
            <textarea name="description" placeholder="description">${description}</textarea>
          </p>
          <p>
            <input type="submit">
          </p>
        </form>`
        , footer, `<a href="/create">create</a> <a href="/update?id=${title}">update</a>`);
          // response.end(fs.readFileSync(__dirname + _url));
          response.writeHead(200);
          response.end(html);
        });
      });
    });
  }
  else if(pathname === '/update_process') {
    var body = '';
    request.on('data', function(data){
      body += data;
    });
    request.on('end', function(){
      var post = querystring.parse(body);
      var id = post.id;
      var title = post.title;
      var description = post.description;
      fs.rename(`data/${id}`, `data/${title}`, function(error){
        fs.writeFile(`data/${title}`, description, 'utf-8', function(err){
          // 302 : 일시적으로 page를 다른 곳으로 이동
          response.writeHead(302, {Location: `/?id=${title}`});
          response.end();
        });
      });
    });
  }
  else if(pathname === '/delete_process') {
    var body = '';
    request.on('data', function(data){
      body += data;
    });
    request.on('end', function(){
      var post = querystring.parse(body);
      var id = post.id;
      var filteredId = path.parse(id).base;
      fs.unlink(`data/${filteredId}`, function(error){
        response.writeHead(302, {Location: `/`});
        response.end();
      });
    });
  }
  else {
    response.writeHead(404);
    response.end('Not Found');
  }
});
app.listen(3000);
