// 文件路径: models/productDetail.js

module.exports = app => {
    const DataTypes = app.Sequelize;

    const Model = app.model.define('productDetail', {
        id: {
            type: DataTypes.BIGINT.UNSIGNED,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
            comment: '主键',
            field: 'id'
        },
        createTime: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
            onUpdate: DataTypes.NOW,
            comment: '创建时间',
            field: 'create_time'
        },
        updateTime: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
            onUpdate: DataTypes.NOW,
            comment: '更新时间',
            field: 'update_time'
        },
        createUser: {
            type: DataTypes.BIGINT,
            allowNull: false,
            defaultValue: 0,
            comment: '创建人',
            field: 'create_user'
        },
        updateUser: {
            type: DataTypes.BIGINT,
            allowNull: false,
            defaultValue: 0,
            comment: '更新人',
            field: 'update_user'
        },
        deleteFlag: {
            type: DataTypes.TINYINT,
            allowNull: false,
            defaultValue: 0,
            comment: '删除标志',
            field: 'delete_flag'
        },
        productId: {
            type: DataTypes.BIGINT,
            allowNull: false,
            comment: '商品id',
            field: 'product_id'
        },
        detail: {
            type: DataTypes.JSON,
            allowNull: true,
            comment: '商品详情',
            field: 'detail'
        },
        param: {
            type: DataTypes.JSON,
            allowNull: true,
            comment: '商品参数',
            field: 'param'
        },
        rotation: {
            type: DataTypes.JSON,
            allowNull: true,
            comment: '轮播图片',
            field: 'rotation'
        }
    }, {
        tableName: 'product_detail',
        comment: '商品明细',
        collate: 'utf8mb4_general_ci',
        timestamps: false, // 因为我们手动定义了 createTime 和 updateTime
        underscored: true, // 因为数据库字段是下划线命名，但模型使用驼峰命名，需要开启此选项以自动映射
        paranoid: false, // 因为我们有自定义的 deleteFlag 字段来处理软删除
        rowFormat: 'DYNAMIC' // 这个选项 Sequelize 不直接支持，但可以在迁移文件中指定
    });

    return Model;
};