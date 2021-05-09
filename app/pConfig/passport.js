const LocalStrategy = require('passport-local').Strategy
const db = require('../config/connection')
const bcrypt = require('bcrypt')


function init(passport) {
    passport.use(new LocalStrategy({ usernameField: 'email', passwordField: 'password' }, async (email, password, done) => {
        try {
        
            //login
            //cheak if email exist 
            const user = await db.query('SELECT * FROM users WHERE email=?', [email], (err, user) => {
                if (!user) {
                    return done(null, false, { message: 'No user with this email' })
                }
                //password matching with database 
                bcrypt.compare(password, user[0].password).then(match => {
                    if (match) {
                        return done(null, user, { message: 'Logeed in successfully..' })
                    }
                    return done(null, false, { message: 'Wrong username or password' })
                }).catch(err => {
                    return done(null, false, { message: 'Something went wrong' })
                })
            })

        } catch (error) {
            console.log(error);
        }

   //to serialize - userinformation store in session
        passport.serializeUser((user, done) => {
            done(null, user[0].id)
        })
        //deserialize the data
        passport.deserializeUser((id, done) => {
            db.query('SELECT * FROM users Where id = ?', [id], (err, user) => {
                done(err, user)
            })
        })
    }))
}




module.exports = init