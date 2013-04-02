Game = new Meteor.Collection('game');

if (Meteor.isClient) {

  function createMyFunction(position) {
    return function() {
      var temp = Game.findOne({position: position});
      if (temp) {
        return new Handlebars.SafeString('<a class="spot' + position + '" href="#">' + temp.content + '</a>');
      } else {
        return new Handlebars.SafeString('<a href="#"> </a>');
      }
    }
  }

  for (var i = 0; i < 9; i++) {
    Template.ticTacToe['spot' + i] = createMyFunction(i);
  }

  var lookup = {
    spot0: 0,
    spot1: 1,
    spot2: 2,
    spot3: 3,
    spot4: 4,
    spot5: 5,
    spot6: 6,
    spot7: 7,
    spot8: 8
  };

  Template.ticTacToe.events({
    'click a': function() {
      console.log(lookup[event.target.className]);
      var temp = Game.findOne({position: lookup[event.target.className]});
      if (temp) {
        console.log(temp._id);
        Game.update({_id: temp._id}, {$set: {content: 'X'}});
        console.log(temp);
      }
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function() {
    if (Game.find().count() === 0) {
      var values = ['_', '_', '_', '_', '_', '_', '_', '_', '_'];
      for (var i = 0; i < values.length; i++) {
        Game.insert({position: i, content: values[i]});
      }

      // code to run on server at startup
    }
  });
}
