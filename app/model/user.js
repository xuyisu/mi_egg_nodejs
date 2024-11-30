/* indent size: 2 */
const { md5Encrypt } = require('../utils/md5');

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('user', {
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
      field: 'create_time', // 如果字段名与属性名不同，使用 field 属性指定
      comment: '创建时间',
    },
    updateTime: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
      field: 'update_time',
      comment: '更新时间',
      onUpdate: DataTypes.NOW,
    },
    createUser: {
      type: DataTypes.BIGINT,
      defaultValue: 0,
      allowNull: false,
      field: 'create_user',
      comment: '创建人',
    },
    updateUser: {
      type: DataTypes.BIGINT,
      defaultValue: 0,
      allowNull: false,
      field: 'update_user',
      comment: '更新人',
    },
    deleteFlag: {
      type: DataTypes.TINYINT,
      defaultValue: 0,
      allowNull: false,
      field: 'delete_flag',
      comment: '删除标志',
    },
    status: {
      type: DataTypes.TINYINT,
      defaultValue: 1,
      allowNull: false,
      comment: '启用标志',
    },
    userName: {
      type: DataTypes.STRING(50),
      defaultValue: '',
      allowNull: false,
      field: 'user_name',
      comment: '用户名',
    },
    email: {
      type: DataTypes.STRING(50),
      defaultValue: '',
      allowNull: false,
      comment: '邮箱',
      unique: true, // Sequelize 中的唯一约束
    },
    phone: {
      type: DataTypes.STRING(20),
      defaultValue: '',
      allowNull: false,
      comment: '手机号',
      unique: 'union_phone_idx', // 指定唯一约束的名称（与 SQL 中的约束名相同，但 Sequelize 可能不总是需要这个）
    },
    password: {
      type: DataTypes.STRING(100),
      defaultValue: '',
      allowNull: false,
      comment: '密码',
      set(val) {
        // 在设置 password 属性的时候，对密码进行加密
        this.setDataValue('password', md5Encrypt(val));
      }
    },
  }, {
    // 模型的配置选项
    tableName: 'user', // 指定数据库中的表名
    timestamps: false, // 自动添加 createdAt 和 updatedAt 字段
    comment: '用户表',
    underscored: true, // 数据库字段是下划线命名，模型使用驼峰命名
    paranoid: false // 使用 deleteFlag 字段进行软删除
  });

  return Model;ß
};
