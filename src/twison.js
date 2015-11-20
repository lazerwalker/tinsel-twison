var Twison = {
  extractLinksFromText: function(text) {
    var links = text.match(/\[\[.+?\]\]/g)
    if (links) {
      return links.map(function(link) {
        var differentName = link.match(/\[\[(.*?)\-\&gt;(.*?)\]\]/);
        if (differentName) {
          // [[name->link]]
          return {
            name: differentName[1],
            link: differentName[2]
          };
        } else {
          // [[link]]
          link = link.substring(2, link.length-2)
          return {
            name: link,
            link: link
          }
        }
      });
    }
  },

  convertPassage: function(passage) {
  	var dict = {text: passage.innerHTML};

    var links = Twison.extractLinksFromText(dict.text);
    if (links) {
      dict.links = links;
    }

    ["name", "pid", "position", "tags"].forEach(function(attr) {
      var value = passage.attributes[attr].value;
      if (value) {
        dict[attr] = value;
      }
    });

    if(dict.position) {
      var position = dict.position.split(',')
      dict.position = {
        x: position[0],
        y: position[1]
      }
    }

    if (dict.tags) {
      dict.tags = dict.tags.split(" ");
    }

    return dict;
	},

  convertStory: function(story) {
    var passages = story.getElementsByTagName("tw-passagedata");
    var convertedPassages = Array.prototype.slice.call(passages).map(Twison.convertPassage);

    var dict = {
      passages: convertedPassages
    };

    ["name", "startnode", "creator", "creator-version", "ifid"].forEach(function(attr) {
      var value = story.attributes[attr].value;
      if (value) {
        dict[attr] = value;
      }
    });

    // Add PIDs to links
    var pidsByName = {};
    dict.passages.forEach(function(passage) {
      pidsByName[passage.name] = passage.pid;
    });

    dict.passages.forEach(function(passage) {
      if (!passage.links) return;
      passage.links.forEach(function(link) {
        link.pid = pidsByName[link.link];
        if (!link.pid) {
          link.broken = true;
        }
      });
    });

    return dict;
  },

  jsonPassageToTinsel: function(passage) {
    var tinselNode = {};

    var content = passage.text;

    // Remove routes
    content = content.replace(/\[\[.+?\]\]/g, "")

    // Split separate content
    content = content.split("\n\n")

    content = content.filter(function(string) {
      return string != "";
    });

    content = content.map(function(string) {
      var js = string.match(/^\{\{js\}\}([\s\S]*?)\{\{\/js\}\}$/);
      if (js) {
        return "js:" + js[1];
      } else {
        return string;
      }
    });

    tinselNode.content = content;

    var routes = {};
    if (!passage.links) passage.links = [];
    passage.links.forEach(function(link) {
      routes[link.name] = link.link;
    });
    if (Object.keys(routes).length > 0) {
      tinselNode.routes = routes;
    };    

    return tinselNode;
  },

  jsonStoryToTinsel: function(json) {
    var tinsel = {};

    var story = {};
    var namesByPid = {};
    json.passages.forEach(function(passage) {
      story[passage.name] = Twison.jsonPassageToTinsel(passage);
      namesByPid[passage.pid] = passage.name;
    });

    tinsel.start = namesByPid[json.startnode];
    tinsel.story = story;

    return tinsel;
  },

  convert: function() {
    var storyData = document.getElementsByTagName("tw-storydata")[0];
    var converted = Twison.convertStory(storyData);
    var json = JSON.stringify(converted, null, 2);
    document.getElementById("output").innerHTML = json;

    var tinsel = Twison.jsonStoryToTinsel(converted);
    json = JSON.stringify(tinsel, null, 2);
    document.getElementById("output").innerHTML = json;    
  }
}

window.Twison = Twison;