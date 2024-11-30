// 文件路径: models/category.js
module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('category', {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
      comment: '主键',
    },
    createTime: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
      onUpdate: DataTypes.NOW,
      comment: '创建时间',
      field: 'create_time' // 数据库中对应的字段名
    },
    updateTime: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
      onUpdate: DataTypes.NOW,
      comment: '更新时间',
      field: 'update_time' // 数据库中对应的字段名
    },
    createUser: {
      type: DataTypes.BIGINT,
      defaultValue: 0,
      allowNull: false,
      comment: '创建人',
      field: 'create_user' // 数据库中对应的字段名
    },
    updateUser: {
      type: DataTypes.BIGINT,
      defaultValue: 0,
      allowNull: false,
      comment: '更新人',
      field: 'update_user' // 数据库中对应的字段名
    },
    deleteFlag: {
      type: DataTypes.TINYINT,
      defaultValue: 0,
      allowNull: false,
      comment: '删除标志',
      field: 'delete_flag' // 数据库中对应的字段名
    },
    parentId: {
      type: DataTypes.BIGINT,
      defaultValue: 0,
      allowNull: true,
      comment: '父id',
      field: 'parent_id' // 数据库中对应的字段名
    },
    name: {
      type: DataTypes.STRING(100),
      defaultValue: '',
      allowNull: true,
      comment: '名称',
    },
    status: {
      type: DataTypes.TINYINT,
      defaultValue: 0,
      allowNull: true,
      comment: '启用禁用状态 1启用 0禁用',
    },
    sortOrder: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: true,
      comment: '排序',
      field: 'sort_order' // 数据库中对应的字段名
    }
  }, {
    modelName: 'Category', // 模型名称
    tableName: 'category', // 数据库中的表名
    comment: '类目',
    timestamps: false, // 因为我们手动定义了createTime和updateTime，所以不需要sequelize的默认时间戳
    collate: 'utf8mb4_general_ci',
    underscored: true // Sequelize默认会使用下划线风格，因为我们手动指定了field，所以需要开启这个选项来匹配数据库中的字段名
  });

  return Model;
};