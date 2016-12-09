var ws = new WebSocket("ws://your.domain.com/somePathIfYouNeed?args=any");
ws.onmessage = function (evt)
{
  var message = evt.data;
  //decode message (with JSON or something) and do the needed
  
};
