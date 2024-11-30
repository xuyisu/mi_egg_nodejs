// 文件路径: models/product.js

module.exports = app => {
    const DataTypes = app.Sequelize;

    const Model = app.model.define('product', {
        // 主键
        id: {
            type: DataTypes.BIGINT.UNSIGNED,
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
            onUpdate: DataTypes.NOW, // 注意：这里 Sequelize 可能不会直接支持 ON UPDATE CURRENT_TIMESTAMP，
            // 需要在数据库层面保证该行为，或者在每次更新前手动设置该字段
            comment: '创建时间',
            field: 'create_time'
        },

        // 更新时间
        updateTime: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
            onUpdate: DataTypes.NOW, // 同上
            comment: '更新时间',
            field: 'update_time'
        },

        // 创建人
        createUser: {
            type: DataTypes.BIGINT,
            allowNull: false,
            defaultValue: 0,
            comment: '创建人',
            field: 'create_user'
        },

        // 更新人
        updateUser: {
            type: DataTypes.BIGINT,
            allowNull: false,
            defaultValue: 0,
            comment: '更新人',
            field: 'update_user'
        },

        // 删除标志
        deleteFlag: {
            type: DataTypes.TINYINT,
            allowNull: false,
            defaultValue: 0,
            comment: '删除标志',
            field: 'delete_flag'
        },

        // 商品id（这里可能有些冗余，因为已经有一个id作为主键了，确认是否需要这个字段）
        productId: {
            type: DataTypes.BIGINT,
            allowNull: true,
            defaultValue: 0,
            comment: '商品id',
            field: 'product_id'
        },

        // 品类id
        categoryId: {
            type: DataTypes.BIGINT,
            allowNull: true,
            defaultValue: 0,
            comment: '品类id',
            field: 'category_id'
        },

        // 商品名称
        name: {
            type: DataTypes.STRING(60),
            allowNull: true,
            defaultValue: '',
            comment: '商品名称',
            field: 'name'
        },

        // 简要描述
        subTitle: {
            type: DataTypes.STRING(100),
            allowNull: true,
            defaultValue: '',
            comment: '简要描述',
            field: 'sub_title'
        },

        // 商品图片地址
        mainImage: {
            type: DataTypes.STRING(100),
            allowNull: true,
            defaultValue: '',
            comment: '商品图片地址',
            field: 'main_image'
        },

        // 子图片列表
        subImages: {
            type: DataTypes.STRING(100), // 注意：这里存储子图片列表可能不是最佳实践，通常建议使用关联表
            allowNull: true,
            defaultValue: '',
            comment: '子图片列表',
            field: 'sub_images'
        },

        // 活动id
        activityId: {
            type: DataTypes.BIGINT,
            allowNull: true,
            comment: '活动id',
            field: 'activity_id'
        },

        // 商品状态
        status: {
            type: DataTypes.TINYINT,
            allowNull: false,
            defaultValue: 1,
            comment: '商品状态',
            field: 'status'
        },

        // 商品单价
        price: {
            type: DataTypes.DECIMAL(20, 2),
            allowNull: false,
            defaultValue: 0.00,
            comment: '商品单价',
            field: 'price'
        },

        // 库存数
        stock: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
            comment: '库存数',
            field: 'stock'
        }
    }, {
        tableName: 'product',
        comment: '商品',
        collate: 'utf8mb4_general_ci',
        timestamps: false, // 因为已经定义了 createTime 和 updateTime 字段，所以禁用 Sequelize 默认的 timestamps
        underscored: true, // 启用下划线命名匹配
        modelName: 'Product',
        // 如果需要可以添加其他 Sequelize 配置，比如索引、外键约束等
    });

    // 注意：对于 ON UPDATE CURRENT_TIMESTAMP 的行为，你可能需要在迁移脚本或数据库层面进行设置
    // Sequelize 本身不直接支持在模型定义中设置 ON UPDATE

    return Model;
};
