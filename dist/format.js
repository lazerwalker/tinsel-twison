window.storyFormat({
  "name": "Twison",
  "version": "0.0.2",
  "author": "Mike Lazer-Walker",
  "description": "Export your Twine 2 story as a JSON document",
  "proofing": false,
  "source": "<html>\r\n\t<head>\r\n\t\t<title>{{STORY_NAME}}</title>\r\n\t\t<script type=\"text/javascript\">\r\n/**\r\n * Twison - Twine 2 JSON Export Story Format\r\n * \r\n * Copyright (c) 2015 Mike Walker\r\n * https://lazerwalker.com\r\n *\r\n * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and\r\n * associated documentation files (the \"Software\"), to deal in the Software without restriction,\r\n * including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense,\r\n * and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so,\r\n * subject to the following conditions:\r\n *\r\n * The above copyright notice and this permission notice shall be included in all copies or substantial\r\n * portions of the Software.\r\n *\r\n * THE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT\r\n * LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.\r\n * IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,\r\n * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE\r\n * SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.\r\n */\r\nvar Twison={extractLinksFromText:function(n){var t=n.match(/\\[\\[.+?\\]\\]/g);return t?t.map(function(n){var t=n.match(/\\[\\[(.*?)\\-\\&gt;(.*?)\\]\\]/);return t?{name:t[1],link:t[2]}:(n=n.substring(2,n.length-2),{name:n,link:n})}):void 0},convertPassage:function(n){var t={text:n.innerHTML},e=Twison.extractLinksFromText(t.text);if(e&&(t.links=e),[\"name\",\"pid\",\"position\",\"tags\"].forEach(function(e){var a=n.attributes[e].value;a&&(t[e]=a)}),t.position){var a=t.position.split(\",\");t.position={x:a[0],y:a[1]}}return t.tags&&(t.tags=t.tags.split(\" \")),t},convertStory:function(n){var t=n.getElementsByTagName(\"tw-passagedata\"),e=Array.prototype.slice.call(t).map(Twison.convertPassage),a={passages:e};[\"name\",\"startnode\",\"creator\",\"creator-version\",\"ifid\"].forEach(function(t){var e=n.attributes[t].value;e&&(a[t]=e)});var s={};return a.passages.forEach(function(n){s[n.name]=n.pid}),a.passages.forEach(function(n){n.links&&n.links.forEach(function(n){n.pid=s[n.link],n.pid||(n.broken=!0)})}),a},jsonPassageToTinsel:function(n){var t={},e=n.text;e=e.replace(/\\[\\[.+?\\]\\]/g,\"\"),e=e.split(\"\\n\\n\"),e=e.filter(function(n){return\"\"!=n}),e=e.map(function(n){var t=n.match(/^\\{\\{js\\}\\}([\\s\\S]*?)\\{\\{\\/js\\}\\}$/);return t?\"js:\"+t[1]:n}),t.content=e;var a={};return n.links||(n.links=[]),n.links.forEach(function(n){a[n.name]=n.link}),Object.keys(a).length>0&&(t.routes=a),t},jsonStoryToTinsel:function(n){var t={},e={},a={};return n.passages.forEach(function(n){e[n.name]=Twison.jsonPassageToTinsel(n),a[n.pid]=n.name}),t.start=a[n.startnode],t.story=e,t},convert:function(){var n=document.getElementsByTagName(\"tw-storydata\")[0],t=Twison.convertStory(n),e=JSON.stringify(t,null,2);document.getElementById(\"output\").innerHTML=e;var a=Twison.jsonStoryToTinsel(t);e=JSON.stringify(a,null,2),document.getElementById(\"output\").innerHTML=e}};window.Twison=Twison;\t\t\r\n\t\t</script>\r\n\t</head>\r\n\t<body>\r\n\t\t<pre id=\"output\">\r\n\t\t\r\n\t\t</pre>\r\n\t\t<div id=\"storyData\" style=\"display: none;\">\r\n\t\t\t{{STORY_DATA}}\r\n\t\t</div>\r\n\t\t<script>\r\n\t\t\tTwison.convert()\r\n\t\t</script>\r\n\t</body>\r\n</html>"
});