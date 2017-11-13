"use strict";
const firebase = require("firebase");
class FirebaseService {
    constructor(app) {
        const config = {
            apiKey: "AIzaSyAHkiAkPceE3OzontGXc88vvbGwaoiMuWc",
            authDomain: "atp-ws.firebaseapp.com",
            databaseURL: "https://atp-ws.firebaseio.com",
            projectId: "atp-ws",
            storageBucket: "atp-ws.appspot.com",
            messagingSenderId: "385394053795"
        };
        this._firebaseInstance = firebase;
        firebase.initializeApp(config);
        this._fb = firebase.database();
    }
    get fb() {
        return this._fb;
    }
}
exports.FirebaseService = FirebaseService;
//# sourceMappingURL=firebase.service.js.map