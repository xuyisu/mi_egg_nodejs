// 文件路径: models/orderDetail.js


module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('orderDetail', {
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
    orderNo: {
      type: DataTypes.STRING(60),
      defaultValue: '',
      allowNull: false,
      comment: '订单编号',
      field: 'order_no' // 数据库中对应的字段名
    },
    orderDetailNo: {
      type: DataTypes.STRING(60),
      defaultValue: '',
      allowNull: false,
      comment: '订单明细编号',
      field: 'order_detail_no' // 数据库中对应的字段名
    },
    activityId: {
      type: DataTypes.BIGINT,
      defaultValue: 0,
      allowNull: true,
      comment: '活动id',
      field: 'activity_id' // 数据库中对应的字段名
    },
    activityName: {
      type: DataTypes.STRING(50),
      defaultValue: '',
      allowNull: true,
      comment: '活动名称',
      field: 'activity_name' // 数据库中对应的字段名
    },
    activityMainImage: {
      type: DataTypes.STRING(100),
      defaultValue: '',
      allowNull: true,
      comment: '活动图片地址',
      field: 'activity_main_image' // 数据库中对应的字段名
    },
    productId: {
      type: DataTypes.BIGINT,
      defaultValue: 0,
      allowNull: false,
      comment: '商品id',
      field: 'product_id' // 数据库中对应的字段名
    },
    productName: {
      type: DataTypes.STRING(50),
      defaultValue: '',
      allowNull: false,
      comment: '商品名称',
      field: 'product_name' // 数据库中对应的字段名
    },
    productMainImage: {
      type: DataTypes.STRING(100),
      defaultValue: '',
      allowNull: false,
      comment: '商品图片地址',
      field: 'product_main_image' // 数据库中对应的字段名
    },
    currentUnitPrice: {
      type: DataTypes.DECIMAL(20, 2),
      defaultValue: 0.00,
      allowNull: true,
      comment: '单价',
      field: 'current_unit_price' // 数据库中对应的字段名
    },
    quantity: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: true,
      comment: '数量',
    },
    totalPrice: {
      type: DataTypes.DECIMAL(20, 2),
      defaultValue: 0.00,
      allowNull: true,
      comment: '总价',
      field: 'total_price' // 数据库中对应的字段名
    },
    userId: {
      type: DataTypes.BIGINT,
      defaultValue: 0,
      allowNull: false,
      comment: '购买人id',
      field: 'user_id' // 数据库中对应的字段名
    },
    status: {
      type: DataTypes.TINYINT,
      defaultValue: 0,
      allowNull: false,
      comment: '订单状态',
    },
    statusDesc: {
      type: DataTypes.STRING(20),
      defaultValue: '',
      allowNull: true,
      comment: '状态描述',
      field: 'status_desc' // 数据库中对应的字段名
    },
    cancelTime: {
      type: DataTypes.DATE,
      allowNull: true,
      comment: '取消时间',
      field: 'cancel_time' // 数据库中对应的字段名
    },
    cancelReason: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: true,
      comment: '取消原因',
      field: 'cancel_reason' // 数据库中对应的字段名
    },
    sendTime: {
      type: DataTypes.DATE,
      allowNull: true,
      comment: '发货时间',
      field: 'send_time' // 数据库中对应的字段名
    },
    receiveTime: {
      type: DataTypes.DATE,
      allowNull: true,
      comment: '签收时间',
      field: 'receive_time' // 数据库中对应的字段名
    }
  }, {
    modelName: 'OrderDetail', // 模型名称
    tableName: 'order_detail', // 数据库中的表名
    comment: '订单明细',
    timestamps: false, // 因为我们手动定义了createTime和updateTime，所以不需要sequelize的默认时间戳
    collate: 'utf8mb4_general_ci',
    underscored: true // Sequelize默认会使用下划线风格，因为我们手动指定了field，所以需要开启这个选项来匹配数据库中的字段名
  });

  return Model;
};