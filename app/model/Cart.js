// User.js
module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('cart', {
    // 定义模型的字段
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
      comment: '创建时间',
      field: 'create_time', // 指定数据库中的字段名
    },
    updateTime: {
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
    userId: {
      type: DataTypes.BIGINT,
      defaultValue: 0,
      allowNull: true,
      comment: '用户id',
      field: 'user_id', // 指定数据库中的字段名
    },
    activityId: {
      type: DataTypes.BIGINT,
      defaultValue: 0,
      allowNull: true,
      comment: '活动id',
      field: 'activity_id', // 指定数据库中的字段名
    },
    activityName: {
      type: DataTypes.STRING(255),
      defaultValue: '',
      allowNull: true,
      comment: '活动名称',
      field: 'activity_name', // 指定数据库中的字段名
    },
    productId: {
      type: DataTypes.BIGINT,
      defaultValue: 0,
      allowNull: false,
      comment: '商品id',
      field: 'product_id', // 指定数据库中的字段名
    },
    productName: {
      type: DataTypes.STRING(255),
      defaultValue: '',
      allowNull: false,
      comment: '商品名称',
      field: 'product_name', // 指定数据库中的字段名
    },
    productSubtitle: {
      type: DataTypes.STRING(255),
      defaultValue: '',
      allowNull: true,
      comment: '商品简要描述',
      field: 'product_subtitle', // 指定数据库中的字段名
    },
    productMainImage: {
      type: DataTypes.STRING(255),
      defaultValue: '',
      allowNull: true,
      comment: '商品图片地址',
      field: 'product_main_image', // 指定数据库中的字段名
    },
    quantity: {
      type: DataTypes.INTEGER.UNSIGNED,
      defaultValue: 0,
      allowNull: false,
      comment: '数量',
    },
    productUnitPrice: {
      type: DataTypes.DECIMAL(20, 2).UNSIGNED,
      defaultValue: 0.00,
      allowNull: false,
      comment: '单价',
      field: 'product_unit_price', // 指定数据库中的字段名
    },
    selected: {
      type: DataTypes.TINYINT,
      defaultValue: 1,
      allowNull: false,
      comment: '是否已选择 1是 0 否',
    },
    productTotalPrice: {
      type: DataTypes.DECIMAL(20, 2),
      defaultValue: 0.00,
      allowNull: false,
      comment: '总价格',
      field: 'product_total_price', // 指定数据库中的字段名
    },
  }, {
    // 模型的配置选项
    tableName: 'cart', // 指定数据库中的表名
    timestamps: false, // 自动添加 createdAt 和 updatedAt 字段
    comment: '购物车',
    underscored: true, // 数据库字段是下划线命名，模型使用驼峰命名
    paranoid: false // 使用 deleteFlag 字段进行软删除
  });

  return Model;
};