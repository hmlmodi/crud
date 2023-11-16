const express = require('express');
const appController = require('../../controller/app/appController');

const appRouter = express.Router();
appRouter.post('/create/order', appController.createOrder);

appRouter.post('/update/order', appController.updateOrder);

appRouter.post('/list/order', appController.listOrder);

appRouter.post('/search/order', appController.searchOrder);

appRouter.get('/delete/order', appController.deleteOrder);

module.exports = appRouter;
