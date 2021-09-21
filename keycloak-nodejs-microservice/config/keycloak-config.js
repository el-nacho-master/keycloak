const session = require('express-session');
const Keycloak = require ('keycloak-connect');

let _keycloak;

var keycloakConfig={
    clientId:'nodejs-microservice',
    bearerOnly:true,
    serverUrl:'http://localhost:8080/auth',
    realm:'Demo-Realm',
    credential:{
        secret:'f92bd9c2-b733-4827-8c42-779f88645fa4'
    }
}

function initKeycloak(){
    if(_keycloak){
        console.warm("Trying to init Keycloak again!")
        return _keycloak
    }
    else{
        console.log("Initializing Keycloak...")
        var memoryStore = new session.MemoryStore();
        _keycloak = new Keycloak({store:memoryStore},keycloakConfig);
        return _keycloak
    }
}

function getKeycloak(){
    if(! _keycloak){
        console.error("Keycloak has not been initialized. Please called init first")
    }
    return _keycloak
}

module.exports={
    initKeycloak,
    getKeycloak
}