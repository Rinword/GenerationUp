const BlueprintService = require('../services/BlueprintService');

const blueprintService = new BlueprintService();

async function getAllBlueprints(req, res, next) {
    const prints = await blueprintService.getAllBlueprints();

    res.json({ success: true, data: prints });
}

async function addBlueprint(req, res, next) {
    const data = req.body;
    const blueprint = await blueprintService.addBlueprint(req.body);

    res.json({ success: true, data: blueprint });
}

async function deleteBlueprint(req, res, next) {
    const id = req.params.id;
    const blueprint = await blueprintService.deleteBlueprint(id);

    res.json({ success: true, data: blueprint });
}

module.exports = {
    GET: [
        ['/api/v1/blueprints', getAllBlueprints],
    ],
    POST: [
        ['/api/v1/blueprint/create', addBlueprint]
    ],
    DELETE: [
        ['/api/v1/blueprint/delete/:id', deleteBlueprint]
    ],
};
