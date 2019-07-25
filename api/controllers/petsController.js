const petsModel = require('../models/petsModel');

function getPetByID(req, res, next) {
    console.log(req.body);
    petsModel.findById(req.params.petId, (err, petInfo) => {
        if (err) {
            next(err);
        }
        else {
            res.json({
                status: 'Success!',
                message: 'Pet found!',
                data: { petsModel: petInfo }
            });
        }
    });
}

module.exports = {
    getPetByID
};
