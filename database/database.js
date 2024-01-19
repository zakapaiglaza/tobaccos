module.exports = {
    userRegistration:'INSERT INTO users (name, password) VALUES (?, ?)',
    userLogin:'SELECT * FROM users WHERE name=? AND password=?',
    userAddPreferencesTobaccos:'INSERT INTO user_preferences (user_id, tobacco_id) VALUE (?, ?)',
    userGetPreferencesTobaccos:'SELECT t.* FROM user_preferences ut JOIN tobaccos t ON ut.tobacco_id = t.id WHERE ut.user_id = ?',
    userAddPreferencesMix:'INSERT INTO user_preferences (user_id, mix_id) VALUE (?, ?)',
    userGetPreferencesMix:'SELECT m.* FROM user_preferences um JOIN mixes m ON um.mix_id = m.id WHERE um.user_id = ?',
    userGetTobaccos:'SELECT * FROM tobaccos',
    userGetTobaccosFlavor:'SELECT * FROM tobaccos WHERE flavor = ?',
    userGetMix:'SELECT * FROM mixes',
    userGetMixName:'SELECT * FROM mixes WHERE name = ?',
    userGetPriceTobaccos:'SELECT * FROM tobaccos WHERE price <= ?'
}