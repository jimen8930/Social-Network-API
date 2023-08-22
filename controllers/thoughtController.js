const { Thoughts, User } = require('../models');

module.exports = {
    // Get all thoughts
    async getThoughts(req, res) {
        try {
            const thoughts = await Thoughts.find();
            
        } catch (error) {
            
        }
    }
};