const StorageService = require('../services/StorageService');

const storageService = new StorageService();

async function getAllItems(req, res, next) {
    const prints = await storageService.getAllItems();

    res.json({ success: true, data: prints });
}

async function addItem(req, res, next) {
    const data = req.body;
    const blueprint = await storageService.addItem(req.body);

    res.json({ success: true, data: blueprint });
}

async function deleteItem(req, res, next) {
    const id = req.params.id;
    const blueprint = await storageService.deleteItem(id);

    res.json({ success: true, data: blueprint });
}

module.exports = {
    GET: [
        ['/api/v1/storage/items', getAllItems],
    ],
    POST: [
        ['/api/v1/storage/item/create', addItem]
    ],
    DELETE: [
        ['/api/v1/storage/item/delete/:id', deleteItem]
    ],
};
