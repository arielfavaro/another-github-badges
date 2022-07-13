'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class RepoVisit extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            this.belongsTo(models.Repo);
        }
    }
    RepoVisit.init({
        RepoId: DataTypes.BIGINT.UNSIGNED
    }, {
        sequelize,
        modelName: 'RepoVisit',
    });
    return RepoVisit;
};