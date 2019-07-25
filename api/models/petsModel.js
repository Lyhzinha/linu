const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PetSchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    adoptionDate: {
        type: Date,
        default: null
    },
    kind: {
        type: String,
        enum: [
            'peixe',
            'bonsai'
        ]
    }
});


module.exports = mongoose.model('Pet', PetSchema);
