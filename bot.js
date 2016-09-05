var Botkit = require('botkit');
var controller = Botkit.slackbot();
var bot = controller.spawn({
 token: "xoxb-73332173719-vgWM9fhXfGVEq64EewfLbjHQ"
})
bot.startRTM(function(err,bot,payload) {
 if (err) {
   throw new Error('Could not connect to Slack');
 }
});


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

        convo.say('Ok débutons le shifumi!');
        premiereValeur = shifumi();
        convo.say('1er joueur: ' + premiereValeur[1]);
        deuxiemeValeur = shifumi();
        convo.say('2eme joueur: ' + deuxiemeValeur[1]);
        resultat = getVainqueur(premiereValeur[0],deuxiemeValeur[0]);
        convo.say(resultat);
    });
});

function getRandomInt(min, max) {
    return Math.floor(Math.random() * 3) + 1;
};
function shifumi(){
    var valeurInt = getRandomInt();
    var valeurRetour = [];
    if (valeurInt==1) {
        valeurRetour[1] = "pierre";
    }else if(valeurInt==2){
        valeurRetour[1] = "papier";
    }else if(valeurInt==3){
        valeurRetour[1] = "ciseaux";
    }
    valeurRetour[0] = valeurInt;
    return valeurRetour;
};
function getVainqueur(MainJoueurUn,MainJoueurDeux){
    if(MainJoueurUn==(parseInt(MainJoueurDeux)+1) || MainJoueurUn==(parseInt(MainJoueurDeux)-2)) {
        resultat = "Victoire du 1er joueur";
    }else if(MainJoueurUn==(parseInt(MainJoueurDeux)-1) || MainJoueurUn==(parseInt(MainJoueurDeux)+2)) {
        resultat = "Victoire du 2eme joueur";
    }else{
        resultat = "Egalité";
    }
    return resultat;
};
