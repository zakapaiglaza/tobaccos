const database = require('../database/database');
const md5 = require('md5');

class Connect {
    constructor(connection) {
        this.connection = connection;
    }

    query(sql,params) {
        return new Promise((resolve,reject) => {
            this.connection.query(sql,params,(err,result) => {
                if(err) {
                    reject(err)
                } else {
                    resolve(result)
                }
            })
        })
    }
}

class UserController extends Connect{

    registration(name, password) {
        const hashPassword = md5(password);
        return this.query(database.userRegistration, [name, hashPassword]);
    }

    login(name, password) {
        const hashPassword = md5(password);
        return this.query(database.userLogin, [name, hashPassword]);
    }
}

class PreferencesUsers extends Connect {
  
    addPreferencesTobacco(userId, tobaccoId) {
      return this.query(database.userAddPreferencesTobaccos, [userId, tobaccoId]);
    }
  
    getPreferencesTobacco(userId) {
      return this.query(database.userGetPreferencesTobaccos, [userId]);
    }
  
    addPreferenceMix(userId, mixId) {
      return this.query(database.userAddPreferencesMix, [userId, mixId]);
    }
  
    getPreferenceMix(userId) {
      return this.query(database.userGetPreferencesMix, [userId]);
    }
}

class TobaccoController  extends Connect {
    getTobaccos() {
      return this.query(database.userGetTobaccos);
    }
    
    getTobaccoFlavor(flavor) {
      return this.query(database.userGetTobaccosFlavor, [flavor]);
    }
    
    getMix() {
      return this.query(database.userGetMix);
    }
    
    getMixName(brand) {
      return this.query(database.userGetMixName, [brand]);
    }
    
    getPriceTobaccos(price) {
      return this.query(database.userGetPriceTobaccos, [price]);
    }
}

module.exports = { UserController, PreferencesUsers ,TobaccoController };
