// var template = {
module.exports = {
    HTML:function (title, list, body, footer, control){
      return `
      <!doctype html>
      <html>
      <head>
      <title>Node.js - ${title}</title>
      <meta charset = "utf-8">
      <link type='text/css' rel='stylesheet' href='/css/footer.css'>
      </head>
      <body>
        <div id='wrapper'>
          <div id='header'>
            <h1><a href='/'>Node.js</a></h1>
          </div>
          <div id='container'>
            ${list}
            ${control}
            ${body}
          </div>
        </div>
      </body>
      <footer>
        <div id='footer'>
          ${footer}
        </div>
      </footer>
      </html>`;
    },
    list:function (filelist){
      var list = '<ul>';
      var i = 0;
      while(i < filelist.length){
        list = list + `<li><a href='/?id=${filelist[i]}'>${filelist[i]}</a></li>`;
        i += 1;
      }
      list += '</ul>';
      return list;
    }
}

// module.exports = template;
