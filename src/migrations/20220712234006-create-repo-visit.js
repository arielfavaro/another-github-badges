'use strict';
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('RepoVisits', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.BIGINT.UNSIGNED
            },
            RepoId: {
                allowNull: false,
                type: Sequelize.BIGINT.UNSIGNED,
                references: {
                    model: {
                        tableName: 'Repos',
                        // schema: 'schema',
                    },
                    key: 'id',
                },
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('RepoVisits');
    }
};