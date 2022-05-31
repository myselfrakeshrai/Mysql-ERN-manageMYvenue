import { db } from '../../../models';
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
export default {

    /* Add user api start here................................*/

    async index(req, res, next) {
        try {
            const { id, storename, status, shopaddress, shopdesc, ownername, owneraddress, email,password, phone, areaId, accountNo, accountHolderName, IFSC, bankName, branch, adharCardNo, panCardNo, GSTNo } = req.body;
            db.vendor.findOne({ where: { id: id} })
                .then(supplier => {
                    if (supplier) {
                        return db.vendor.update({storename: storename ? storename: supplier.storename, status: status ? status: supplier.status, shopaddress: shopaddress ? shopaddress: supplier.shopaddress, shopdesc: shopdesc ? shopdesc: supplier.shopdesc, ownername: ownername ? ownername: supplier.ownername, owneraddress: owneraddress ? owneraddress : supplier.owneraddress, email: email ? email: supplier.email, phone: phone ? phone: supplier.phone, accountNo: accountNo ? accountNo : supplier.accountNo, accountHolderName: accountHolderName ? accountHolderName: supplier.accountHolderName, IFSC: IFSC ? IFSC: supplier.IFSC, bankName: bankName ? bankName: supplier.bankName, branch: branch ? branch : supplier.branch, adharCardNo: adharCardNo ? adharCardNo: supplier.adharCardNo, panCardNo: panCardNo ? panCardNo: supplier.panCardNo, GSTNo: GSTNo? GSTNo: supplier.GSTNo}, {where:{ id: id}} ) 
                    } 
                    return db.vendor.create({storename: storename,status: status, shopaddress: shopaddress, shopdesc: shopdesc, ownername: ownername, owneraddress: owneraddress, email: email, password: password, phone: phone, accountNo: accountNo, accountHolderName: accountHolderName, IFSC: IFSC, bankName: bankName, branch: branch, adharCardNo: adharCardNo, panCardNo: panCardNo, GSTNo: GSTNo})    

                })
                .then(vendor => {
                    if(areaId){
                        let areaList = [];
                        for(var i = 0; i< areaId.length;i++){
                        areaList.push({
                            vendorId: vendor.id,
                            areaId: areaId[i]
                        })
                    }
                    return db.vendor_area.bulkCreate(areaList)
                    }
                    return true
                    
                })
                .then(success => {
                    res.status(200).json({ 'success': true, msg: "Successfully inserted supplier" });
                })
                .catch(function (err) {
                    console.log(err)
                    next(err)
                });
        }
        catch (err) {
            console.log(err)
            throw new RequestError('Error');
        }
    },
    
    async vendorAddProduct(req, res, next) {
        try {
            const{ supplierId, productId, unitSize, buyerPrice} = req.body;
            let id = productId
            db.vendor_product.findAll({ where: { supplierId: supplierId, productId: productId, unitSize: unitSize } })
                .then(data => {
                    if (!data.length>0) {
                        return db.vendor_product.create({supplierId: supplierId, productId: productId, unitSize: unitSize, price: buyerPrice})  
                    }else{
                        return db.vendor_product.update({ unitSize: unitSize ? unitSize: data.unitSize, price:buyerPrice ? buyerPrice: data.buyerPrice},{ where: { supplierId: supplierId, productId: productId}})  
                    }
                })
                .then(success => {
                    res.status(200).json({ 'success': true, msg: "Successfully inserted product in VendorList" });
                })
                .catch(function (err) {
                    next(err)
                });
        }
        catch (err) {
            throw new RequestError('Error');
        }
    },

    async getAllvendor(req, res, next) {
        try {
            db.vendor.findAll({
                include: [{ model: db.area, attributes: ["id", "name"] , include: [{ model: db.location, attributes: ["id", "name"] }]}]
            })
                .then(list => {
                    res.status(200).json({ 'success': true, data:list });
                })
                .catch(function (err) {
                    next(err)
                });
        }
        catch (err) {
            throw new RequestError('Error');
        }
    },

     async getAllVendorProduct(req, res, next) {
        try {
            db.product.findAll({
                attributes:["id","name","brand"],
                include: [{ model: db.vendor_product, attributes:["id", "supplierId","productId", "unitSize", "price"],  include: [{ model: db.vendor, attributes:["id", "storename", "ownername"] }] }],

            })
                .then(list => {
                    res.status(200).json({ 'success': true, data:list });
                })
                .catch(function (err) {
                    next(err)
                });
        }
        catch (err) {
            throw new RequestError('Error');
        }
    },

    async getProductByVendor(req, res, next) {
        try {
            db.vendor_product.findAll({
                attributes:["id","supplierId","productId","unitSize","price"],
                where:{ supplierId: req.body.id},
                include:[{ model: db.product, attributes:["id", "name", "brand", "photo","status"] }] 
            })
                .then(list => {
                    res.status(200).json({ 'success': true, data:list });
                })
                .catch(function (err) {
                    next(err)
                });
        }
        catch (err) {
            throw new RequestError('Error');
        }
    },

    async vendorUpdate(req, res, next) {
        try {
            const {id, storename, status, shopaddress, shopdesc, ownername, owneraddress, email,password, phone,} = req.body;
            db.vendor.findOne({ where: {id : id}})
            .then(list => {
                if(list){
                    return db.vendor.update({
                        storename: storename, status:parseInt(status)?'active':'inactive', shopaddress: shopaddress?shopaddress:list.shopaddress, shopdesc: shopdesc?shopdesc:list.shopdesc, ownername: ownername?ownername:list.ownername, owneraddress: owneraddress?owneraddress:list.owneraddress, email: email?email:list.email, password: password?password:list.password, phone: phone?phone:list.phone, 
                    },{where: {id: id}})
                }
                throw new RequestError("No data found",409)
            })
            .then(e=>{
                res.status(200).json({ 'success': true , msg:'Updated Successfully'});
            })
            .catch(function (err) {
                next(err)
            });
        }
        catch (err) {
            throw new RequestError('Error');
        }
    },
    
    
    async vendorDelete(req, res, next) {
        try {
            db.vendor.findOne({ where: { id: parseInt(req.query.id) } })
            .then(data => {
                if(data){
                    return db.vendor.destroy({ where: { id: data.id } })
                }
                throw new RequestError('Sellar is not found')
            })
            .then(re => {
                return res.status(200).json({ success: true, 'status': "deleted Product Seccessfully" });
            }).catch(err => {
                next(err)
            })
        }
        catch (err) {
            throw new RequestError('Error');
        }
    },

      async vendorProductDelete(req, res, next) {
        try {
            console.log("hi",req.body)
            db.vendor_product.findOne({ where: { id: req.body.id } })
            .then(data => {
                if(data){
                    return db.vendor_product.destroy({ where: { id: req.body.id } })
                }
                throw new RequestError('Product is not found')
            })
            .then(re => {
                return res.status(200).json({ success: true, 'status': "Seccessfully deleted Product from Vendorlist" });
            }).catch(err => {
                next(err)
            })
        }
        catch (err) {
            throw new RequestError('Error');
        }
    },

}


