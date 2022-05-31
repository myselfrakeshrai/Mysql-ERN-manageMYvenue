import { db } from '../../../models';
export default {

    /* Add user api start here................................*/

    async index(req, res, next) {
        try {
            const { zipcode, name, status } = req.body;
            db.location.findOne({ where: { name: name } })
                .then(data => {
                    if (data) {
                        return db.location.update({ zipcode: zipcode, name:name ,status:parseInt(status)?'active':'inactive' }, { where: { id: data.id } })
                    }
                    return db.location.create({ name: name, status:parseInt(status)?'active':'inactive'})
                })
                .then(location => {
                    res.status(200).json({ 'success': true, msg: "Successfully inserted location" });
                })
                .catch(function (err) {
                    next(err)
                });
        }
        catch (err) {
            throw new RequestError('Error');
        }
    },

    async List(req, res, next) {
        try {
            db.location.findAll()
            .then(list => {
                res.status(200).json({ 'success': true,data:list});
            })
            .catch(function (err) {
                next(err)
            });
        }
        catch (err) {
            throw new RequestError('Error');
        }
    },
    
    async getLocationDelete(req, res, next) {
        try {
            db.location.findOne({ where: { id: parseInt(req.query.id) } })
            .then(location => {
                if (location) {
                    return db.location.destroy({ where: { id: location.id } })
                }
                throw new RequestError('location is not found')
            })
            .then(re => {
                return res.status(200).json({'msg':'success','status': "deleted location Seccessfully" });
            }).catch(err => {
                next(err)
            })
        }
        catch (err) {
            throw new RequestError('Error');
        }
    },

    async getLocationUpdate(req, res, next) {
        try {
            const{ id, zipcode, name, status} = req.body
            db.location.findOne({ where: { id: parseInt(id) } })
            .then(location => {
                if (location) {
                    return db.location.update({
                        id: id, zipcode: zipcode, name: name, status:parseInt(status)?'active':'inactive' 
                    },{where: {id: location.id}})
                }
                throw new RequestError('No data found')
            })
            .then(re => {
                return res.status(200).json({'msg':'success','status': "Update location Seccessfully" });
            }).catch(err => {
                next(err)
            })
        }
        catch (err) {
            throw new RequestError('Error');
        }
    },
    //area list
    async areaCreate(req, res, next) {
        try {
            const { name, zipcode, locationId, status } = req.body;
            db.area.findOne({ where: { name: name } })
                .then(data => {
                    if (data) {
                        return db.area.update({ locationId: locationId, zipcode: zipcode, name:name , status:parseInt(status)?'active':'inactive' }, { where: { id: data.id } })
                    }
                    return db.area.create({ locationId: locationId, zipcode: zipcode, name: name, status:parseInt(status)?'active':'inactive'})
                })
                .then(area => {
                    res.status(200).json({ 'success': true, msg: "Successfully inserted area" });
                })
                .catch(function (err) {
                    next(err)
                });
        }
        catch (err) {
            throw new RequestError('Error');
        }
    },

    async areaList(req, res, next) {
        try {
            db.area.findAll({
                include: [{ model: db.location, attributes: ["id", "name"], }]
            })
            .then(list => {
                res.status(200).json({ 'success': true,data:list});
            })
            .catch(function (err) {
                next(err)
            });
        }
        catch (err) {
            throw new RequestError('Error');
        }
    },
    async getAreaDeleteById(req, res, next) {
        try {
            db.area.findOne({ where: { id: parseInt(req.query.id) } })
            .then(area => {
                if (area) {
                    return db.area.destroy({ where: { id: area.id } })
                }
                throw new RequestError('area is not found')
            })
            .then(re => {
                return res.status(200).json({'msg':'success','status': "deleted area Seccessfully" });
            }).catch(err => {
                next(err)
            })
        }
        catch (err) {
            throw new RequestError('Error');
        }
    },
    async getAreaUpdate(req, res, next) {
        try {
            const{ id, zipcode, name, locationId,status} = req.body
            db.area.findOne({ where: { id: parseInt(id) } })
            .then(area => {
                if (area) {
                    return db.area.update({
                        zipcode: zipcode, name: name, status:parseInt(status)?'active':'inactive', locationId: locationId? locationId: area.locationId 
                    },{where: {id: area.id}})
                }
                throw new RequestError('No data found')
            })
            .then(re => {
                return res.status(200).json({'msg':'success','status': "Update area Seccessfully" });
            }).catch(err => {
                next(err)
            })
        }
        catch (err) {
            throw new RequestError('Error');
        }
    },
    async getAreaList(req, res, next) {
        try {
            db.area.findAll({
                where: { locationId: req.query.locationId },
                include: [{ model: db.location, attributes: ["id", "name"] }]
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

    async getAreaListById(req, res, next) {
        try {
            db.area.findAll({
                where: { locationId: req.query.id },
                include: [{ model: db.location, attributes: ["id", "name"] }]
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

}


