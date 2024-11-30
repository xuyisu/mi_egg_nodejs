// 文件路径: models/userAddress.js

module.exports = app => {
    const DataTypes = app.Sequelize;

    const Model = app.model.define('userAddress', {
        id: {
            type: DataTypes.BIGINT.UNSIGNED,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
            comment: '主键',
            field: 'id'
        },
        addressId: {
            type: DataTypes.BIGINT.UNSIGNED,
            allowNull: false,
            defaultValue: 0,
            comment: '地址id',
            field: 'address_id'
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
        defaultFlag: {
            type: DataTypes.TINYINT,
            allowNull: true,
            defaultValue: 0,
            comment: '默认标志',
            field: 'default_flag'
        },
        receiveName: {
            type: DataTypes.STRING(60),
            allowNull: false,
            defaultValue: '',
            comment: '收货人',
            field: 'receive_name'
        },
        receivePhone: {
            type: DataTypes.STRING(20),
            allowNull: false,
            defaultValue: '',
            comment: '联系号码',
            field: 'receive_phone'
        },
        province: {
            type: DataTypes.STRING(20),
            allowNull: false,
            defaultValue: '',
            comment: '省份',
            field: 'province'
        },
        provinceCode: {
            type: DataTypes.STRING(10),
            allowNull: false,
            defaultValue: '',
            comment: '省份编码',
            field: 'province_code'
        },
        city: {
            type: DataTypes.STRING(20),
            allowNull: false,
            defaultValue: '',
            comment: '城市',
            field: 'city'
        },
        cityCode: {
            type: DataTypes.STRING(10),
            allowNull: false,
            defaultValue: '',
            comment: '城市编码',
            field: 'city_code'
        },
        area: {
            type: DataTypes.STRING(20),
            allowNull: false,
            defaultValue: '',
            comment: '区',
            field: 'area'
        },
        areaCode: {
            type: DataTypes.STRING(10),
            allowNull: false,
            defaultValue: '',
            comment: '区编码',
            field: 'area_code'
        },
        street: {
            type: DataTypes.STRING(100),
            allowNull: true,
            defaultValue: '',
            comment: '详细地址',
            field: 'street'
        },
        postalCode: {
            type: DataTypes.STRING(10),
            allowNull: true,
            defaultValue: '',
            comment: '邮编',
            field: 'postal_code'
        },
        addressLabel: {
            type: DataTypes.TINYINT,
            allowNull: true,
            defaultValue: 0,
            comment: '地址标签',
            field: 'address_label'
        }
    }, {
        tableName: 'user_address',
        comment: '用户地址',
        collate: 'utf8mb4_general_ci',
        timestamps: false, // 因为我们手动定义了 createTime 和 updateTime
        underscored: true, // 数据库字段是下划线命名，模型使用驼峰命名
        paranoid: false // 使用 deleteFlag 字段进行软删除
    });

    return Model;
};