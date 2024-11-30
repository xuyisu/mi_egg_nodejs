// 文件路径: models/orderStatusRecord.js

module.exports = app => {
    const DataTypes = app.Sequelize;

    const Model = app.model.define('orderStatusRecord', {
        // 主键
        id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
            comment: '主键',
            field: 'id'
        },

        // 创建时间
        createTime: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
            comment: '创建时间',
            field: 'create_time'
        },

        // 订单编号
        orderNo: {
            type: DataTypes.STRING(60),
            allowNull: false,
            defaultValue: '',
            comment: '订单编号',
            field: 'order_no'
        },

        // 订单明细编号
        orderDetailNo: {
            type: DataTypes.STRING(60),
            allowNull: false,
            defaultValue: '',
            comment: '订单明细编号',
            field: 'order_detail_no'
        },

        // 商品id
        productId: {
            type: DataTypes.BIGINT,
            allowNull: false,
            defaultValue: 0,
            comment: '商品id',
            field: 'product_id'
        },

        // 商品名称
        productName: {
            type: DataTypes.STRING(60),
            allowNull: true,
            defaultValue: '',
            comment: '商品名称',
            field: 'product_name'
        },

        // 订单状态
        status: {
            type: DataTypes.TINYINT,
            allowNull: false,
            defaultValue: 0,
            comment: '订单状态',
            field: 'status'
        },

        // 状态描述
        statusDesc: {
            type: DataTypes.STRING(60),
            allowNull: true,
            defaultValue: '',
            comment: '状态描述',
            field: 'status_desc'
        }
    }, {
        tableName: 'order_status_record',
        comment: '订单记录',
        collate: 'utf8mb4_general_ci',
        timestamps: false, // 因为已经有创建时间了，所以禁用 Sequelize 默认的 timestamps
        underscored: true, // 数据库字段是下划线命名，模型使用驼峰命名
        modelName: 'OrderStatusRecord',
        // 如果需要可以添加其他 Sequelize 配置
    });

    return Model;
};