import { db } from '../../../models';
const { Op } = require("sequelize");
import { queue } from '../../../kue';
import config from '../../../config';
import AWS from 'aws-sdk';

const s3 = new AWS.S3({
    accessKeyId: config.app.AWS_ACCESS_KEY,
    secretAccessKey: config.app.AWS_SECRET_KEY,
})

var deleteFileFromS3 = (async (imgUrl) => {
    try {
        const lastItem = imgUrl.substring(imgUrl.lastIndexOf('/') + 1)
        var params = {
            Bucket: 'photoabhi',
            Key: lastItem,
        };
        s3.deleteObject(params, (error, data) => {
            if (error) {
                console.log(error, error.stack)
            }
            return data
        });
    } catch (error) {
        assert.isNotOk(error, 'Promise error');
        done();
    }
})

export default {

    /* Add user api start here................................*/

    async addProduct(req, res, next) {
        try {
            const { categoryId, subCategoryId, childCategoryId, name, slug, brand, status, unitSize, sortDesc, desc, buyerPrice, price, qty, discount, discountPer, total, netPrice } = req.body;
            db.product.findOne({
                where: { name: name }
            })
                .then(product => {
                    if (!product) {
                        return db.product.create({
                            categoryId: categoryId,
                            subCategoryId: subCategoryId,
                            childCategoryId: childCategoryId,
                            name: name,
                            slug: slug,
                            status: parseInt(status) ? 'active' : 'inactive',
                            brand: brand,
                            unitSize: unitSize,
                            sortDesc: sortDesc,
                            desc: desc,
                            buyerPrice: buyerPrice,
                            price: price,
                            qty: qty,
                            discount: discount,
                            discountPer: discountPer,
                            total: total,
                            netPrice: netPrice,
                            photo: req.file ? req.file.location : '',
                        })
                    }
                    throw new RequestError('Already exist product', 409);
                })
                .then(product => {
                    res.status(200).json({ 'success': true, msg: "Successfully inserted product" });
                })
                .catch(function (err) {
                    next(err)
                });
        }
        catch (err) {
            throw new RequestError('Error');
        }
    },

    async index(req, res, next) {
        try {
            const { supplierId, categoryId, subCategoryId } = req.query
            db.product.findAll({
                order: [['createdAt', 'DESC']],
                where: { supplierId: supplierId, categoryId: categoryId, subCategoryId: subCategoryId }
            })
                .then(product => {
                    res.status(200).json({ 'success': true, product });
                })
                .catch(function (err) {
                    next(err)
                });
        }
        catch (err) {
            throw new RequestError('Error');
        }
    },

    async getAllProductList(req, res, next) {
        try {
            db.product.findAll({
                order: [['createdAt', 'DESC']],
                include: [{ model: db.SubCategory, attributes: ["id", "sub_name"], include: [{ model: db.category, attributes: ["id", "name"] }] }]
            })
                .then(product => {
                    res.status(200).json({ 'success': true, product });
                })
                .catch(function (err) {
                    next(err)
                });
        }
        catch (err) {
            throw new RequestError('Error');
        }
    },

    async update(req, res, next) {
        try {
            const { productId, categoryId, subCategoryId, childCategoryId, name, slug, brand, status, unitSize, desc, buyerPrice, price, qty, discount, discountPer, total, netPrice } = req.body;
            db.product.findOne({ where: { id: productId } })
                .then(product => {
                    if (product) {
                        return db.product.update({
                            categoryId: categoryId ? categoryId : product.categoryId,
                            subCategoryId: subCategoryId ? subCategoryId : product.subCategoryId,
                            childCategoryId: childCategoryId ? childCategoryId : product.childCategoryId,
                            name: name,
                            slug: slug,
                            status: parseInt(status) ? 'active' : 'inactive',
                            brand: brand,
                            unitSize: unitSize,
                            desc: desc,
                            buyerPrice: buyerPrice,
                            price: price,
                            qty: qty,
                            discount: discount,
                            discountPer: discountPer,
                            total: total,
                            netPrice: netPrice,
                            photo: req.file ? req.file.location : product.photo,
                        }, { where: { id: product.id } })
                    }
                    throw new RequestError('Not Found Product', 409);
                })
                .then((p) => {
                    res.status(200).json({ 'success': true, msg: 'Updated Successfully' });
                })
                .catch(function (err) {
                    next(err)
                });
        }
        catch (err) {
            throw new RequestError('Error');
        }
    },
    async getProductListByCategory(req, res, next) {
        try {
            db.product.findAll({
                order: [['createdAt', 'DESC']],
                where: { categoryId: req.query.categoryId, subCategoryId: req.query.subCategoryId }
            })
                .then(list => {
                    res.status(200).json({ 'success': true, data: list });
                })
                .catch(function (err) {
                    next(err)
                });
        }
        catch (err) {
            throw new RequestError('Error');
        }
    },
    async getProductListById(req, res, next) {
        try {
            db.product.findAll({
                where: { id: req.query.id },
                include: [{ model: db.productphoto, attributes: ["id", "imgUrl"] }],
                order: [['createdAt', 'DESC']],
            })
                .then(list => {
                    res.status(200).json({ 'success': true, data: list });
                })
                .catch(function (err) {
                    next(err)
                });
        }
        catch (err) {
            throw new RequestError('Error');
        }
    },

    async getWebProductListById(req, res, next) {
        try {
            db.product.findOne({
                where: { id: req.query.id },
                include: [{ model: db.productphoto, attributes: ["id", "imgUrl"] }],
                order: [['createdAt', 'DESC']],
            })
                .then(list => {
                    res.status(200).json({ 'success': true, data: list });
                })
                .catch(function (err) {
                    next(err)
                });
        }
        catch (err) {
            throw new RequestError('Error');
        }
    },
    async addProductOffer(req, res, next) {
        try {
            const { productId, qty, discount_per, discount_price, total, net_price } = req.body;
            db.ProductOffer.findOne({ where: { id: productId } })
                .then(list => {
                    if (!list) {
                        return db.ProductOffer.create({
                            productId: productId,
                            image: req.file ? req.file.location : '',
                            qty: qty,
                            discount_per: discount_per,
                            discount_price: discount_price,
                            total: total,
                            net_price: net_price
                        })
                    }
                    else {
                        return db.ProductOffer.update({
                            qty: qty,
                            discount_per: discount_per,
                            discount_price: discount_price,
                            total: total,
                            net_price: net_price
                        }, { where: { id: list.id } })
                    }
                })
                .then(p => {
                    res.status(200).json({ 'success': true, msg: "Successfully" });
                })
                .catch(function (err) {
                    next(err)
                });
        }
        catch (err) {
            throw new RequestError('Error');
        }
    },

    async getProductOffer(req, res, next) {
        try {
            db.ProductOffer.findAll({
                include: [{ model: db.product, attributes: ['id', 'categoryId', 'price', 'item_name', 'description', 'brand'], include: [{ model: db.category, attributes: ["id", "name"] }] }]
            })
                .then(list => {
                    res.status(200).json({ 'success': true, data: list });
                })
                .catch(function (err) {
                    next(err)
                });
        }
        catch (err) {
            throw new RequestError('Error');
        }
    },

    async searchProductBySubCat(req, res, next) {
        try {
            db.SubCategory.findOne({
                where:{ sub_name: req.body.subCat},
            })
            .then(data=>{
                if(data){
                    return db.product.findAll({
                        where:{ subCategoryId: data.id},
                    })
                }
            })
            .then(list=>{
                console.log(JSON.stringify(list))
                res.status(200).json({ 'success': true, data: list });
            })
        }
        catch (err) {
            throw new RequestError('Error');
        }
    },

    async productDelete(req, res, next) {
        db.product.findOne({ where: { id: parseInt(req.query.id) } })
            .then(product => {
                if (product) {
                    return db.product.destroy({ where: { id: product.id } })
                }
                throw new RequestError('Product is not found')
            })
            .then(re => {
                return res.status(200).json({ 'status': "deleted Product Seccessfully" });
            }).catch(err => {
                next(err)
            })
    },

    async productOfferDelete(req, res, next) {
        db.ProductOffer.findOne({ where: { id: parseInt(req.params.id) } })
            .then(product => {
                if (product) {
                    return db.ProductOffer.destroy({ where: { id: product.id } })
                }
                throw new RequestError('Product is not found')
            })
            .then(re => {
                return res.status(200).json({ 'status': "deleted Product Seccessfully" });
            }).catch(err => {
                next(err)
            })
    },

    async multiplePhotoUpload(req, res, next) {
        let attachmentEntries = [];
        var productId = req.body.productId;
        for (var i = 0; i < req.files.length; i++) {
            attachmentEntries.push({
                productId: productId,
                name: req.files[i].filename,
                mime: req.files[i].mimetype,
                imgUrl: req.files[i].location,
            })
        }

        db.product.findOne({
            where: { id: productId },
        }).then(r => {
            if (r) {
                return queue.create('img-upload', {
                    productId: productId,
                    productName: r.item_name,
                    attachmentEntries: attachmentEntries,
                }).save();
            }
            throw new RequestError('ProductId is not found')
        }).then(r => {
            res.status(200).json({ success: r });
        })
            .catch(function (error) {
                console.log(error);
                res.status(500).json({ 'errors': ['Error insert photo'] });
            });
    },

    async getAllPhoto(req, res, next) {
        try {
            db.product.findAll({
                order: [['createdAt', 'DESC']],
                attributes: ['id', 'name', 'brand'],
                include: [{ model: db.productphoto, attributes: ['id', 'imgUrl'] }]
            })
                .then(data => {
                    res.status(200).json({ 'success': true, data });
                })
                .catch(function (err) {
                    next(err)
                });
        }
        catch (err) {
            throw new RequestError('Error');
        }
    },
    async deleteSliderPhoto(req, res, next) {
        db.productphoto.findOne({ where: { id: parseInt(req.query.id) } })
            .then(product => {
                if (product) {
                    return db.productphoto.destroy({ where: { id: req.query.id } })
                }
                throw new RequestError('Product is not found')
            })
            .then(re => {
                return res.status(200).json({ 'status': "deleted Product Seccessfully" });
            }).catch(err => {
                next(err)
            })
    },
    //All GroceryStample product
    async getAllGrocerryStaples(req, res, next) {
        try {
            db.category.findOne({
                attributes: ["id", "slug"],
                where: { slug: 'grocery-staple' },
                include: [{ model: db.product, order: [['createdAt', 'DESC']], include: [{ model: db.productphoto, attributes: ["id", "imgUrl"] }] }],

            })
                .then(product => {
                    res.status(200).json({ 'success': true, data: product });
                })
                .catch(function (err) {
                    next(err)
                });
        }
        catch (err) {
            throw new RequestError('Error');
        }
    },

    async getAllProductBySlug(req, res, next) {
        try {
            db.category.findOne({
                attributes: ["id", "slug"],
                where: { slug: req.params.slug },
                include: [{ model: db.product, order: [['createdAt', 'DESC']], include: [{ model: db.productphoto, attributes: ["id", "imgUrl"] }] }]
            })
                .then(product => {
                    res.status(200).json({ 'success': true, data: product });
                })
                .catch(function (err) {
                    next(err)
                });
        }
        catch (err) {
            throw new RequestError('Error');
        }
    },

    // filter product

    async getFilterbyProduct(req, res, next) {
        try {
            let search = '%%';
            if (req.query.search) {
                search = '%' + req.query.search + '%';
            }
            db.SubCategory.findAll({
                attributes: ['id', 'sub_name'],
                include: [{
                    model: db.product, order: [['createdAt', 'DESC']], required: true, where: {
                        [Op.or]: [{ name: { [Op.like]: search }, slug: { [Op.like]: search } }],
                    }
                }]
            })

                .then(product => {
                    res.status(200).json({ 'success': true, data: product });
                })
                .catch(function (err) {
                    next(err)
                });
        }
        catch (err) {
            throw new RequestError('Error');
        }
    },

    async GetAllByCategory(req, res, next) {
        try {
            db.SubCategory.findOne({
                where: { sub_name: req.body.name },
                include: [{ model: db.SubChildCategory, include: [{ model: db.product, order: [['createdAt', 'DESC']], include: [{ model: db.productphoto, attributes: ["id", "imgUrl"] }] }] }]

            })
                .then(product => {
                    res.status(200).json({ 'success': true, data: product });
                })
                .catch(function (err) {
                    next(err)
                });
        }
        catch (err) {
            throw new RequestError('Error');
        }
    },

    // aws image delete 
    async awsProductPhotoDelete(req, res, next) {
        try {
            const { id, imgUrl } = req.body;
            deleteFileFromS3(imgUrl)
                .then((data) => {
                    if (!data) {
                        return db.productphoto.destroy({ where: { id: id } })
                    }
                    throw new RequestError('error');
                })
                .then((success) => {
                    res.status(200).json({ 'success': true, msg: "Successflly deleted image from s3 Bucket" });
                })

        }
        catch (err) {
            next(err)
            // res.status(500).json({ 'success':false, msg: err})
        }
    },

    async getProductSubChildCat(req, res, next) {
        try {
            const{ subCategoryId, childCategoryId } = req.body;
            db.product.findAll({
                where: { childCategoryId: childCategoryId, subCategoryId: childCategoryId },
            })
                .then(product => {
                    res.status(200).json({ 'success': true, data: product });
                })
                .catch(function (err) {
                    next(err)
                });

        }
        catch (err) {
            next(err)
            // res.status(500).json({ 'success':false, msg: err})
        }
    },

}


