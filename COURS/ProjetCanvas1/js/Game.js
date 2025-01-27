export default class Game {
    constructor(canvas) {
        this.canvas = canvas;
    }

   async init(canvas) {
        this.ctx = this.canvas.getContext("2d");

        console.log("Game initialisé");
    }

    start() {
        console.log("Game démarré");

        //this.drawGrid(10, 10, "red", 5);

        // on dessine un rectangle rouge (la couleur = syntaxe CSS)
        this.ctx.fillStyle = "red";
        this.ctx.fillRect(10, 10, 100, 100);

        // on dessine un rectangle vert
        this.ctx.fillStyle = "green";
        this.ctx.fillRect(120, 10, 150, 10);
        this.ctx.fillRect(120, 100, 10, 150);

        // utilsation de la fonction drawCircleImmediat
        this.drawCircleImmediat(500, 200, 200, "blue");

        // un rectangle en fil de fer, on remplac "fill" par "stroke"
        this.ctx.strokeStyle = "blue";
        this.ctx.lineWidth = 5;
        this.ctx.strokeRect(10, 120, 100, 100);

        // un arc de cercle, nous ne sommes plus en mode "direct"
        // mais en mode "bufferise" ou comme le nomme l'API
        // en mode "path"

        this.ctx.beginPath();
        this.ctx.arc(200, 200, 50, 0, Math.PI * 2);
        // un autre cercle plus petit, mais de 0 à PI seulement 
        this.ctx.arc(500, 200, 40, 0, Math.PI);

        // Pour ordonner le dessin, utilise la méthode
        // ctx.fill() ou ctx.stroke() qui dessineront tout
        // ce qui est bufferise (c'est à dire "dans le path/chemin");
        this.ctx.fill();
        this.ctx.stroke();

        // Même exemple mais avec deux cercles "bien séparés", pour cela
        // il faut utiliser beginPath() pour "vider" le path entre
        // les deux dessins
        this.ctx.fillStyle = "yellow";

        this.ctx.beginPath();
        this.ctx.arc(200, 100, 50, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.stroke();

        this.ctx.beginPath();
        this.ctx.arc(500, 400, 40, 0, Math.PI);
        this.ctx.fill();
        this.ctx.closePath();
        this.ctx.stroke();

        // dessine le monstre (le joueur)
        this.drawMonstre(600, 100);

        // On démarre une animation à 60 images par seconde
        requestAnimationFrame(this.mainAnimationLoop.bind(this));
    }

    x = 200;
    direction = true;

    l = 20;
    langue = true;
    mainAnimationLoop() {
        // 1 - on efface le canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // 2 - on dessine les objets à animer dans le jeu
        // ici on dessine le monstre   
        this.drawMonstre(this.x, 250);

        // 3 - On regarde l'état du clavier, manette, souris et on met à jour
        // l'état des objets du jeu en conséquence
        //this.update();
        //this.updateLangue();

        // 4 - on demande au navigateur d'appeler la fonction mainAnimationLoop
        // à nouveau dans 1/60 de seconde
        requestAnimationFrame(this.mainAnimationLoop.bind(this));
    }

    vitesse = 1;
    update() {
        if(this.x >= 600 || this.x < 100) {
            this.direction = !this.direction;
        }  
        this.x = this.direction ? this.x + this.vitesse : this.x - this.vitesse;
    }

    vlangue = 1;
    updateLangue() {
        if(this.l >= 100 || this.l <= 10) {
            this.langue = !this.langue;
        }
        this.l = this.langue ? this.l + this.vlangue : this.l - this.vlangue;
    }

    drawCircleImmediat(x, y, r, color) {
        // BONNE PRATIQUE : on sauvegarde le contexte
        // des qu'une fonction ou un bout de code le modifie
        // couleur, épaisseur du trait, systeme de coordonnées etc.
        this.ctx.save();

        // AUTRE BONNE PRATIQUE : on dessine toujours
        // en 0, 0 !!!! et on utilise les transformations
        // géométriques pour placer le dessin, le tourner, le rescaler
        // etc.
        this.ctx.fillStyle = color;
        this.ctx.beginPath();

        // on translate le systeme de coordonnées pour placer le cercle
        // en x, y
        this.ctx.translate(x, y);     
        this.ctx.arc(0, 0, r, 0, Math.PI * 2);
        this.ctx.fill();

        // on restore le contexte à la fin
        this.ctx.restore();
    }

    drawGrid(nbLignes, nbColonnes, couleur, largeurLignes) {
        // dessine une grille de lignes verticales et horizontales
        // de couleur couleur
        this.ctx.save();

        this.ctx.strokeStyle = couleur;
        this.ctx.lineWidth = largeurLignes;

        let largeurColonnes = this.canvas.width / nbColonnes;
        let hauteurLignes = this.canvas.height / nbLignes;

        this.ctx.beginPath();

        // on dessine les lignes verticales
        for (let i = 1; i < nbColonnes; i++) {
            this.ctx.moveTo(i * largeurColonnes, 0);
            this.ctx.lineTo(i * largeurColonnes, this.canvas.height);
        }

        // on dessine les lignes horizontales
        for (let i = 1; i < nbLignes; i++) {
            this.ctx.moveTo(0, i * hauteurLignes);
            this.ctx.lineTo(this.canvas.width, i * hauteurLignes);
        }

        // gpu call pour dessiner d'un coup toutes les lignes
        this.ctx.stroke();

        this.ctx.restore();
    }

    drawMonstre(x, y) {
        // Ici on dessine un monstre
        this.ctx.save();

        // on déplace le systeme de coordonnées pour placer
        // le monstre en x, y.Tous les ordres de dessin
        // dans cette fonction seront par rapport à ce repère
        // translaté
        this.ctx.translate(x, y);
        //this.ctx.rotate(0.3);
        //this.ctx.scale(0.5, 0.5);

        // tete du monstre
        this.ctx.fillStyle = "brown";
        this.ctx.fillRect(0, 0, 100, 100);
        
        // yeux
        this.drawYeux();

        // Les bras
        this.drawCouteau();
        this.drawBrasGauche();
        this.drawBrasDroit();

        // les jambes
        this.drawJambeGauche();
        this.drawJambeDroite();

        // la bouche
        this.drawBouche(this.l);

        // restore
        this.ctx.restore();
    }

    drawYeux() {
        this.ctx.save();

        this.drawCircleImmediat(20, 20, 10, "white");
        this.drawCircleImmediat(23, 23, 5, "black");

        this.drawCircleImmediat(80, 20, 10, "white");
        this.drawCircleImmediat(77, 23, 5, "black");

        // les sourcils
        this.ctx.fillStyle = "black";
        this.ctx.rotate(0.3);
        this.ctx.fillRect(15, 2, 20, 10);
        this.ctx.rotate(-0.6);
        this.ctx.fillRect(60, 30, 20, 10);
        this.ctx.rotate(0.3);

        this.ctx.restore();
    }

    drawCouteau() {
        this.ctx.save();

        this.ctx.translate(-55, 12);
        this.ctx.rotate(-0.3);

        // manche
        this.ctx.fillStyle = "grey";
        this.ctx.fillRect(-10, 0, 50, 20);

        // lame
        this.ctx.fillStyle = "darkgrey";
        this.ctx.beginPath();
        this.ctx.moveTo(-10, -2);
        this.ctx.lineTo(-80, -2);
        this.ctx.lineTo(-10, 30);
        this.ctx.closePath();
        this.ctx.fill();

        this.ctx.restore();
    }

    drawBrasGauche() {
        this.ctx.save();

        this.ctx.translate(-40, 60);
        this.ctx.rotate(-0.3);

        // on dessine le bras gauche
        this.ctx.fillStyle = "brown";
        this.ctx.fillRect(0, -50, 20, 50);
        // on dessine l'avant bras gauche
       this.drawAvantBrasGauche();

        this.ctx.restore();
    }

    drawAvantBrasGauche() {
        this.ctx.save();

    this.ctx.translate(0, 0);

        this.ctx.fillStyle = "brown";
        this.ctx.fillRect(0, 0, 50, 10);

        this.ctx.restore();
    }

    drawBrasDroit() {
        this.ctx.save();

        this.ctx.translate(100, 50);
        //this.ctx.rotate(-0.7);

        // on dessine le bras droit
        this.ctx.fillStyle = "brown";
        this.ctx.fillRect(0, 0, 30, 10);

        // on dessine l'avant bras droit
        this.drawAvantBrasDroit();

        this.ctx.restore();
    }

    drawAvantBrasDroit() {
        this.ctx.save();

        this.ctx.translate(30, 0);

        this.ctx.fillStyle = "brown";
        this.ctx.fillRect(0, 0, 20, 50);

        this.ctx.restore();
    }

    drawJambeGauche() {
        this.ctx.save();

        this.ctx.translate(-30, 100);
        this.ctx.fillStyle = "brown";
        this.ctx.rotate(-0.3);
        this.ctx.fillRect(0, 0, 70, 20);

        this.ctx.translate(0, 20);
        this.ctx.fillStyle = "brown";
        this.ctx.rotate(-0.3);
        this.ctx.fillRect(0, 0, 20, 50);

        this.ctx.translate(20, 40);
        this.ctx.fillStyle = "brown";
        this.ctx.rotate(90);
        this.ctx.fillRect(0, 0, 20, 50);

        this.ctx.restore();
    }

    drawJambeDroite() {
        this.ctx.save();

        this.ctx.translate(70, 80);
        this.ctx.fillStyle = "brown";
        this.ctx.rotate(0.4);
        this.ctx.fillRect(0, 0, 70, 20);

        this.ctx.translate(51, 0);
        this.ctx.fillStyle = "brown";
        this.ctx.rotate(0.2);
        this.ctx.fillRect(0, 0, 20, 50);

        this.ctx.translate(10, 60);
        this.ctx.fillStyle = "brown";
        this.ctx.rotate(-90);
        this.ctx.fillRect(0, 0, 20, 50);

        this.ctx.restore();
    }

    drawBouche(l) {
        this.ctx.save();

        this.ctx.translate(50, 60);
        this.ctx.arc(0, 0, 30, 0, Math.PI*2);
        this.ctx.fillStyle = "black";
        this.ctx.fill();

        // les dents
        this.ctx.translate(0, -20);

        this.ctx.fillStyle = "white";

        this.ctx.rotate(-1)
        this.ctx.beginPath();
        this.ctx.moveTo(-25, -20);
        this.ctx.lineTo(-10, -20);
        this.ctx.lineTo(-17.5, -10);
        this.ctx.closePath();
        this.ctx.fill();
        this.ctx.rotate(1);

        this.ctx.rotate(1);
        this.ctx.beginPath();
        this.ctx.moveTo(10, -20);
        this.ctx.lineTo(25, -20);
        this.ctx.lineTo(17.5, -10);
        this.ctx.closePath();
        this.ctx.fill();
        this.ctx.rotate(-1);
        
        // la langue

        this.ctx.translate(0, 30);
        this.ctx.fillStyle = "pink";
        this.ctx.fillRect(-10, 0, 20, l);

        this.ctx.restore();
    }
}