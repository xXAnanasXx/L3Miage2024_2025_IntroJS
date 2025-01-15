export default class Personne {
    constructor(nom, prenom, age) {
        this.nom = nom;
        this.prenom = prenom;
        this.age = age;
    }

    getDescription() {
        return "Nom : " + this.nom + ", Prénom : " + 
               this.prenom + ", Age : " + this.age;
    }
}