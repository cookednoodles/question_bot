function getRandomInt(min, max) {
    return Math.floor(Math.random() * 3)
};
function shifumi(){
    var valeurInt = getRandomInt();
    return valeurInt;
};
function getVainqueur(mainJoueurUn,mainJoueurDeux){
    if(mainJoueurUn == (parseInt(mainJoueurDeux)+1) || mainJoueurUn == (parseInt(mainJoueurDeux)-2)) {
        resultat = "Victoire du 1er joueur";
    }else if(mainJoueurUn == (parseInt(mainJoueurDeux)-1) || mainJoueurUn == (parseInt(mainJoueurDeux)+2)) {
        resultat = "Victoire du 2eme joueur";
    }else{
        resultat = "Egalité";
    }
    return resultat;
};
