var Botkit = require('botkit');
var controller = Botkit.slackbot();
var fs = require("fs")
var vm = require('vm')
vm.runInThisContext(fs.readFileSync(__dirname + "/fonctions.js"));

var bot = controller.spawn({
 token: "xoxb-73332173719-vgWM9fhXfGVEq64EewfLbjHQ"
})
bot.startRTM(function(err,bot,payload) {
 if (err) {
   throw new Error('Could not connect to Slack');
 }
});
var tabCorrespondance = ["pierre","papier","ciseaux"];


controller.hears(["keyword","^pattern$"],["direct_message","direct_mention","mention","ambient"],function(bot,message) {
 // do something to respond to message
 // all of the fields available in a normal Slack message object are available
 // https://api.slack.com/events/message
 bot.reply(message,'You used a keyword!');
});

controller.hears(['fin'], 'direct_message,direct_mention,mention', function(bot, message) {

    bot.startConversation(message, function(err, convo) {

        convo.ask('Tu es sur?', [
            {
                //pattern: bot.utterances.yes,
                pattern: "oui",
                callback: function(response, convo) {
                    convo.say('Au revoir!');
                    convo.next();
                    setTimeout(function() {
                        process.exit();
                    }, 3000);
                }
            },
        {
            pattern: bot.utterances.no,
            default: true,
            callback: function(response, convo) {
                convo.say('*Phew!*');
                convo.next();
            }
        }
        ]);
    });
});

controller.hears(["bonjour", "salut"],["direct_message","direct_mention","mention","ambient"],function(bot,message) {
    bot.reply(message,'Bonjour!');
});

controller.hears(["shifumi"],["direct_message","direct_mention","mention","ambient"],function(bot,message){
    bot.startConversation(message,function(err,convo) {
        var premiereValeur = shifumi();
        var deuxiemeValeur = shifumi();
        var resultat = getVainqueur(premiereValeur,deuxiemeValeur);

        convo.say('Ok débutons le shifumi!');
        convo.say('1er joueur: ' + tabCorrespondance[premiereValeur]);
        convo.say('2eme joueur: ' + tabCorrespondance[deuxiemeValeur]);
        convo.say(resultat);
    });
});