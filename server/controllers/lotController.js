const ApiError = require('../error/ApiError');
const {Lot, User} = require('../models/models');
const {where, BLOB} = require("sequelize");
const bcrypt = require("bcrypt");
class LotController {
    async checkForLots (){
        const lots = await Lot.findAll();
        for (let i = 0; i < lots.length; i++) {
            if (new Date(lots[i].endTime) < new Date()){
                lots[i].status = 1;
                await lots[i].save();
            }
        }
    }

    async getAll(req, res, next){
        const {id, userid} = req.body;
        if (id == null && userid == null){
            const lots = await Lot.findAll();
            if (lots){
                lots.sort(function(a, b) {
                    return a.endTime - b.endTime;
                });
            }
            return res.json(lots);

        }
        if (userid != null){
            const userLots = await Lot.findOne({where: {userId: userid, status: 1}});
            if (!userLots){
                return next(ApiError.badRequest('User has not lots'));
            }
            return res.json(userLots);
        }
        const lot = await Lot.findOne({where: {id}});
        if (!lot){
            return next(ApiError.badRequest('There is no Lot with this id'));
        }
        return res.json(lot);
    }

    async create(req, res, next){
        const {name, description, image, startTime, endTime, startPrice, step} = req.body;
        const lot = await Lot.create({name, description, image, startTime, endTime, startPrice, step});
        return res.json(lot.id);
    }

    async delete(req, res, next){
        const {lotId} = req.body;
        await Lot.destroy({where: {id: lotId}});
        return res.json({'message': 'ok'});
    }

    async update(req, res, next){
        const {lotId, name, description, image, startTime, endTime, startPrice, step} = req.body;
        const lot = await Lot.findOne({where: {id: lotId}});
        if (!lot) {
            return next(ApiError.badRequest('Лот с данным ID не найден'));
        }
        lot.name = name;
        lot.description = description;
        lot.image = image;
        lot.startTime = startTime;
        lot.endTime = endTime;
        lot.startPrice = startPrice;
        lot.step = step;
        await lot.save();
        return res.json({message: 'Успешно обновлено'});
    }

    async doBet(req, res, next){
        const {id, step, userId} = req.body;
        const lot = await Lot.findOne({where: {id}});
        if (!lot){
            return next(ApiError.badRequest('Лот с данным ID не найден'));
        }
        if (new Date(lot.endTime) < new Date()){
            return next(ApiError.badRequest('Время ставок на данный лот закончилось'));
        }
        const diff = new Date(lot.endTime.getTime()) - new Date();
        console.log(diff);
        if (diff < 600000 && diff > 0){
            console.log('yes');
            lot.endTime = new Date(lot.endTime.getTime() + 5 * 60000);
        }
        lot.currentStep = Number(lot.currentStep) + Number(step);
        lot.currentPrice = Number(lot.startPrice) + Number(lot.currentStep) * Number(lot.step);
        lot.userId = userId;
        await lot.save();
        return res.json({message: 'Успешно сделана ставка'});
    }

    async getWinLots(req, res, next) {
        const {userId} = req.body;
        const lots = await Lot.findAll({where: {userId: userId, status: 1}});
        if (lots){
            lots.sort(function(a, b) {
                return a.endTime - b.endTime;
            });
        }
        return res.json(lots);
    }
}

module.exports = new LotController();
