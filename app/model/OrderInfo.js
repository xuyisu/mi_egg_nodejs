// 文件路径: models/OrderInfo.js


module.exports = app => {
    const DataTypes = app.Sequelize;

    const Model = app.model.define('orderInfo', {
        // 主键
        id: {
            type: DataTypes.BIGINT.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
            comment: '主键',
        },

        // 创建时间
        createTime: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            allowNull: false,
            comment: '创建时间',
            field: 'create_time' // 数据库中对应的字段名
        },

        // 更新时间
        updateTime: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            allowNull: false,
            onUpdate: DataTypes.NOW,
            comment: '更新时间',
            field: 'update_time' // 数据库中对应的字段名
        },

        // 创建人
        createUser: {
            type: DataTypes.BIGINT,
            defaultValue: 0,
            allowNull: false,
            comment: '创建人',
            field: 'create_user' // 数据库中对应的字段名
        },

        // 更新人
        updateUser: {
            type: DataTypes.BIGINT,
            defaultValue: 0,
            allowNull: false,
            comment: '更新人',
            field: 'update_user' // 数据库中对应的字段名
        },

        // 删除标志
        deleteFlag: {
            type: DataTypes.TINYINT,
            defaultValue: 0,
            allowNull: false,
            comment: '删除标志',
            field: 'delete_flag' // 数据库中对应的字段名
        },

        // 订单编号
        orderNo: {
            type: DataTypes.STRING(60),
            defaultValue: '',
            allowNull: false,
            comment: '订单编号',
            field: 'order_no' // 数据库中对应的字段名
        },

        // 支付金额
        payment: {
            type: DataTypes.DECIMAL(20, 2),
            defaultValue: 0.00,
            allowNull: true,
            comment: '支付金额',
            field: 'payment' // 数据库中对应的字段名
        },

        // 支付类型
        paymentType: {
            type: DataTypes.TINYINT,
            defaultValue: 0,
            allowNull: true,
            comment: '支付类型',
            field: 'payment_type' // 数据库中对应的字段名
        },

        // 支付类型描述
        paymentTypeDesc: {
            type: DataTypes.STRING(20),
            defaultValue: '',
            allowNull: true,
            comment: '支付类型描述',
            field: 'payment_type_desc' // 数据库中对应的字段名
        },

        // 邮费
        postage: {
            type: DataTypes.DECIMAL(20, 2),
            defaultValue: 0.00,
            allowNull: true,
            comment: '邮费',
            field: 'postage' // 数据库中对应的字段名
        },

        // 订单状态
        status: {
            type: DataTypes.TINYINT,
            defaultValue: 0,
            allowNull: false,
            comment: '订单状态',
            field: 'status' // 数据库中对应的字段名
        },

        // 状态描述
        statusDesc: {
            type: DataTypes.STRING(20),
            defaultValue: '',
            allowNull: false,
            comment: '状态描述',
            field: 'status_desc' // 数据库中对应的字段名
        },

        // 支付时间
        paymentTime: {
            type: DataTypes.DATE,
            allowNull: true,
            comment: '支付时间',
            field: 'payment_time' // 数据库中对应的字段名
        },

        // 地址id
        addressId: {
            type: DataTypes.BIGINT,
            defaultValue: 0,
            allowNull: true,
            comment: '地址id',
            field: 'address_id' // 数据库中对应的字段名
        },

        // 收货人
        receiveName: {
            type: DataTypes.STRING(50),
            defaultValue: '',
            allowNull: true,
            comment: '收货人',
            field: 'receive_name' // 数据库中对应的字段名
        },

        // 联系号码
        receivePhone: {
            type: DataTypes.STRING(20),
            defaultValue: '',
            allowNull: true,
            comment: '联系号码',
            field: 'receive_phone' // 数据库中对应的字段名
        },

        // 省份
        province: {
            type: DataTypes.STRING(20),
            defaultValue: '',
            allowNull: true,
            comment: '省份',
            field: 'province' // 数据库中对应的字段名
        },

        // 城市
        city: {
            type: DataTypes.STRING(20),
            defaultValue: '',
            allowNull: true,
            comment: '城市',
            field: 'city' // 数据库中对应的字段名
        },

        // 区
        area: {
            type: DataTypes.STRING(20),
            defaultValue: '',
            allowNull: true,
            comment: '区',
            field: 'area' // 数据库中对应的字段名
        },

        // 详细地址
        street: {
            type: DataTypes.STRING(50),
            defaultValue: '',
            allowNull: true,
            comment: '详细地址',
            field: 'street' // 数据库中对应的字段名
        },

        // 邮编
        postalCode: {
            type: DataTypes.STRING(255),
            defaultValue: '',
            allowNull: true,
            comment: '邮编',
            field: 'postal_code' // 数据库中对应的字段名
        },

        // 购买人id
        userId: {
            type: DataTypes.BIGINT,
            defaultValue: 0,
            allowNull: false,
            comment: '购买人id',
            field: 'user_id' // 数据库中对应的字段名
        },
    }, {
        tableName: 'order_info',
        comment: '订单',
        underscored: true, // 数据库字段是下划线命名，模型使用驼峰命名
        collate: 'utf8mb4_general_ci',
        timestamps: false, // 因为已经定义了createTime和updateTime，所以禁用默认的时间戳字段
    });

    return Model;
};