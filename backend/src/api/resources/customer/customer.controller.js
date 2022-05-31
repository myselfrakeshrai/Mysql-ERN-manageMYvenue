import { db } from '../../../models';
import JWT from 'jsonwebtoken';
import mailer from '../../../mailer';
import config from '../../../config';
import bcrypt from 'bcrypt-nodejs';
import speakeasy from 'speakeasy';
import { validateEmail } from './../../../functions'

var JWTSign = function (user, date) {
    return JWT.sign({
        iss: config.app.name,
        sub: user.id,
        iam : user.type,
        iat: date.getTime(),
        exp: new Date().setMinutes(date.getMinutes() + 30)
    }, config.app.secret);
}

function generateOtp() {
    let token = speakeasy.totp({
        secret: process.env.OTP_KEY,
        encoding: 'base32',
        step: (30 - Math.floor((new Date().getTime() / 1000.0 % 30)))
    });
    return token;
}

function verifyOtp(token) {
    let expiry = speakeasy.totp.verify({
        secret: process.env.OTP_KEY,
        encoding: 'base32',
        token: token,
        step: (30 - Math.floor((new Date().getTime() / 1000.0 % 30))),
        window: 0
    });
    return expiry
}


export default {
    async addUser(req, res, next) {
        const { firstName, lastName, phone, email, address, password } = req.body;
        var passwordHash = bcrypt.hashSync(password);
        var token = generateOtp();
        var otp = verifyOtp(token);
        db.customer.findOne({ where: { email: email }, paranoid: false })
            .then(find => {
                if (find) {
                    throw new RequestError('Email is already in use', 409);
                }
                return db.customer.create({
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    phone: phone,
                    address: address,
                    password: passwordHash
                })

            })
            .then(user => {
                if (user) {
                    mailer.sendEmployeePassword(email, token);
                    return res.status(200).json({ success: true, key: otp, msg: "New Registration added and password has been sent to " + email + " ." });
                }
                else
                    res.status(500).json({ 'success': false });
            })
            .catch(err => {
                console.log(err)
                next(err);
            })
    },

    async findUser(req,res,next){
        db.customer.findOne({ 
            where: { email: req.query.email }, paranoid: false,
            include: [{ model: db.Address }]
         })
        .then(user => {
            if (user) {
                return res.status(200).json({ success: true, data:user});
            }
            else
                res.status(500).json({ 'success': false });
        })
        .catch(err => {
            console.log(err)
            next(err);
        })
    },

    async login(req, res, next) {
        var date = new Date();
        var token = JWTSign(req.user, date);
        res.cookie('XSRF-token',     token, {
            expire: new Date().setMinutes(date.getMinutes() + 30),
            httpOnly: true, secure: config.app.secure
        });
        
        return res.status(200).json({ success: true ,token});
    },

    async rootUserCheck(req, res) {
        if (validateEmail(req.body.email)) {
            db.user.findOne({
                where: {
                    email: req.body.email
                }
            })
                .then(user => {
                    if (user) return res.status(200).json({
                        success: true,
                        redirect: false,
                        email: req.body.email
                    });
                    return res.status(401).json({
                        success: false,
                        redirect: false,
                        msg: "Jankpur Grocerry account with that sign-in information does not exist. Try again or create a new account."
                    })
                })
        }
    },

    async sendReset(req, res) {
        const { email } = req.body;
        mailer.sendResetPassword(email)
            .then(r => {
                return res.status(200).json({ success: true });
            })
            .catch(err => {
                console.log(err);
                return res.status(500).json({ errors: ['Error Sending Email!'] });
            });
    },

    async resetPassword(req, res) {
        const { email, verificationCode, password } = req.body;
        db.user.findOne({
            where: { email: email, verf_key: verificationCode }
        })
            .then(result => {
                if (result) {
                    var hash = bcrypt.hashSync(password);
                    db.user.update({ password: hash, verf_key: null, attempt: 0 ,isVerify: 1}, { where: { email: email } });
                    return res.status(200).json({ success: true });
                } else {
                    return res.status(500).json({ errors: ['Invalid verification code!'] });
                }
            })
            .catch(err => {
                console.log(err);
                return res.status(500).json({ errors: ['Error Updating Password!'] });
            })

    },
    
    async getAllCustomer(req,res,next){
        db.customer.findAll()
        .then(user => {
            if (user) {
                return res.status(200).json({ success: true, data:user});
            }
            else
                res.status(500).json({ 'success': false });
        })
        .catch(err => {
            console.log(err)
            next(err);
        })
    },

    async deleteCustomer(req, res, next) {
        try {
            db.customer.findOne({ where: { id: parseInt(req.query.id) } })
            .then(customer => {
                if (customer) {
                    return db.customer.destroy({ where: { id: customer.id } })
                }
                throw new RequestError('Customer is not found')
            })
            .then(re => {
                return res.status(200).json({'msg':'success','status': "deleted Customer Seccessfully" });
            }).catch(err => {
                next(err)
            })
        }
        catch (err) {
            throw new RequestError('Error');
        }
    },

    //Api customer update 
    async getCustomerUpdate(req, res, next) {
        try {
            const{ id, firstName, lastName, phone, gender }= req.body.data;
            db.customer.findOne({ where: { id: id } })
            .then(customer => {
                if (customer) {
                    return db.customer.update({ 
                        firstName: firstName, lastName: lastName, phone: phone, gender: gender
                     },{where: {id: customer.id}})
                }
                throw new RequestError('Customer is not found')
            })
            .then(re => {
                return res.status(200).json({'msg':'success','status': "deleted Customer Seccessfully" });
            }).catch(err => {
                next(err)
            })
        }
        catch (err) {
            throw new RequestError('Error');
        }
    },

}




