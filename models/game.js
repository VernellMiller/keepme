const mongoose = ("mongoose");
const Schema = mongoose.Schema;

const gameSchema = new mongoose.Schema({
        teamName: {type: String, required: true},
        teamCaptain: {type: String},
        teamColor: {type: String, required: true},
        division: {type: Number},
        gameTime: {type: Number, required: true},
        gameField: {type: String, required: true},
});

const Game = mongoose.model("Game", bookSchema)

module.exports = Game