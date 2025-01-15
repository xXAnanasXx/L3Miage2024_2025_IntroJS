import Personne from "./Personne.js";

export default class Directeur extends Personne {
    constructor(nom, prenom, age, service) {
        super(nom, prenom, age);
        this.serviceDirige = service;
    }

    getDescription() {
        return super.getDescription() + ", Service dirige: " + this.serviceDirige;
    }
}