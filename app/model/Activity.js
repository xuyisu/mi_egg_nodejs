module.exports = app => {
    const DataTypes = app.Sequelize;

    const Model = app.model.define('activity', {
        id: {
            type: DataTypes.BIGINT.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
            comment: '主键',
        },
        create_time: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            allowNull: false,
            onUpdate: DataTypes.NOW,
            comment: '创建时间',
            field: 'create_time', // 指定数据库中的字段名
        },
        update_time: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            allowNull: false,
            onUpdate: DataTypes.NOW,
            comment: '更新时间',
            field: 'update_time', // 指定数据库中的字段名
        },
        createUser: {
            type: DataTypes.BIGINT,
            defaultValue: 0,
            allowNull: false,
            comment: '创建人',
            field: 'create_user', // 指定数据库中的字段名
        },
        updateUser: {
            type: DataTypes.BIGINT,
            defaultValue: 0,
            allowNull: false,
            comment: '更新人',
            field: 'update_user', // 指定数据库中的字段名
        },
        deleteFlag: {
            type: DataTypes.TINYINT,
            defaultValue: 0,
            allowNull: false,
            comment: '删除标志',
            field: 'delete_flag', // 指定数据库中的字段名
        },
        activityId: {
            type: DataTypes.BIGINT,
            defaultValue: 0,
            allowNull: false,
            comment: '活动id',
            field: 'activity_id', // 指定数据库中的字段名
        },
        name: {
            type: DataTypes.STRING(60),
            defaultValue: '',
            allowNull: true,
            comment: '活动名称',
            field: 'name', // 指定数据库中的字段名
        },
        status: {
            type: DataTypes.TINYINT,
            defaultValue: 0,
            allowNull: false,
            comment: '活动状态',
            field: 'status', // 指定数据库中的字段名
        },
        mainImage: {
            type: DataTypes.STRING(100),
            defaultValue: '',
            allowNull: true,
            comment: '活动图片地址',
            field: 'main_image', // 指定数据库中的字段名
        },
        startTime: {
            type: DataTypes.DATE,
            allowNull: true,
            comment: '开始时间',
            field: 'start_time', // 指定数据库中的字段名
        },
        endTime: {
            type: DataTypes.DATE,
            allowNull: true,
            comment: '结束时间',
            field: 'end_time', // 指定数据库中的字段名
        },
    }, {
        tableName: 'activity',
        comment: '活动',
        collate: 'utf8mb4_general_ci',
        rowFormat: 'DYNAMIC',
        underscored: true, // 数据库字段是下划线命名，模型使用驼峰命名
        timestamps: false, // 因为我们已经定义了 create_time 和 update_time
    });
    return Model;
};