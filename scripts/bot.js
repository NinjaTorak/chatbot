var name = getCookie("hbot-name");

function sendmsg() {
  $('.msgbox').append("<b>" + name + ":</b> " + $('.inputmsg').val() + '<br>');
  recv($('.inputmsg').val());
  $('.inputmsg').val("")
}

function post(msg) {
  $(".msgbox").append("<b>HOGSbot:</b> " + msg + "<br />");
}

function meme(srch) {
  var reqUrl = "http://api.pixplorer.co.uk/image?amount=1&size=tb&word=meme";
  var memesrch = "";
  while (srch) {
    memesrch += "+" + srch[0];
    srch = srch.slice(1);
  }
  reqUrl += memesrch;
  var memeUrl = "";

  return $.get(reqUrl, function( result ) {
    memeUrl = result['images'][0]['imageurl'];
    post("<a href='" + memeUrl + "' target='_blank'><img src='" + memeUrl + "' style='height: 130px;' /></a>");
  });
}

function joke() {
  $.get("https://gist.githubusercontent.com/neelusb/559916bf7ff7091a20c818e86534f4cc/raw/917c8baba74f6e3d323e95f14d7b681a0dfae5c3/jokes.json", function( result ) {
    post("<p>" + eval(result)[Math.floor((Math.random() * 9) + 1)]['joke'] + "</p>");
  });
}

function gif(srch) {
    if (srch) {
      $.get("http://api.giphy.com/v1/gifs/search?api_key=dc6zaTOxFJmzC&q=" + srch, function( result ) {
        gifv = result['data'][0];
        gifImg = "https://media.giphy.com/media/" + gifv['id'] + "/giphy.gif";
        gifUrl = gifv['url'];
        post("<a href='" + gifUrl + "' target='_blank'><img src='" + gifImg + "' style='height: 130px;' /></a>");
      });
    }
    else {
      $.get("http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC", function( result ) {
        gifv = result['data'];
        gifImg = gifv['image_original_url'];
        gifUrl = gifv['url'];
        post("<a href='" + gifUrl + "' target='_blank'><img src='" + gifImg + "' style='height: 130px;' /></a>");
      });
    }
}

function inA(ele, arr) {
  if (arr.indexOf(ele) > -1) {
    return true;
  }
  else {
    return false;
  }
}

var hbsrch = "";

function recv(m) {
  var mstr = m;
  m = m.toLowerCase();
  m = m.split(" ");
  if (inA("joke", m)) {
    joke();
  }
  else if (inA("jokes", m)) {
    post("Sorry, I can only tell one joke at a time. Here it is:");
    joke();
  }

  else if (inA("gif", m)) {
    if (inA("about", m)) {
      while (m[0] != "about") {
        m = m.slice(1);
      }
      m = m.slice(1);
      var gifsrch = "";
      while (m.length > 0) {
        gifsrch += m[0] + "+";
        m = m.slice(1);
      }
      gifsrch = gifsrch.slice(0, -1);
      gif(gifsrch);
    }
    else if (inA("of", m)) {
      while (m[0] != "of") {
        m = m.slice(1);
      }
      m = m.slice(1);
      var gifsrch = "";
      while (m.length > 0) {
        gifsrch += m[0] + "+";
        m = m.slice(1);
      }
      gifsrch = gifsrch.slice(0, -1);
      gif(gifsrch);
    }
    else {
      gif();
    }
  }
  else if (inA("meme", m)) {
    if (inA("about", m)) {
      while (m[0] != "about") {
        m = m.slice(1);
      }
      m = m.slice(1);
      var memesrch = "";
      while (m.length > 0) {
        memesrch += m[0] + "+";
        m = m.slice(1);
      }
      memesrch = memesrch.slice(0, -1);
      meme(memesrch);
    }
    else if (inA("of", m)) {
      while (m[0] != "of") {
        m = m.slice(1);
      }
      m = m.slice(1);
      var memesrch = "";
      while (m.length > 0) {
        memesrch += m[0] + "+";
        m = m.slice(1);
      }
      memesrch = memesrch.slice(0, -1);
      meme(memesrch);
    }
    else {
      meme();
    }
  }
  else if (inA("yes", m) && hbsrch) {
    var search = hbsrch.split(" ");
    var searchout = "";
    for (i = 0; i < search.length; i++) {
      searchout += search[i] + "%20";
    }
    searchout = searchout.slice(0, -3);
    var searchoutinp = searchout;
    searchout = "";
    for (i = 0; i < searchoutinp.length; i++) {
      if (searchoutinp[i] == "+") {
        searchout += "%2B";
      }
      else {
        searchout += searchoutinp[i];
      }
    }
    post("Okay.");
    window.open('https://www.google.com/search?q=' + searchout, '_blank');
    hbsrch = false;
  }
  else if (inA("no", m) && hbsrch) {
    post("Okay.");
    hbsrch = false;
  }
  else {
    post("I do not know what you mean by " + mstr + ". Would you like to search the web for "+ mstr +"?");
    hbsrch = mstr;
  }
}
