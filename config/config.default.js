'use strict';

module.exports = appInfo => {
  const config = {};

  // should change to your own
  config.keys = appInfo.name + '_sequelize-example';

  config.sequelize = {
    dialect: 'mysql', // support: mysql, mariadb, postgres, mssql
    database: 'mi_mall',
    host: '127.0.0.1',
    port: 3306,
    username: 'root',
    password: '123456',
    timezone: '+08:00',
      define: {
        timestamps: false, // add createAt and updateAt timestamp fields
        underscored: true, // use camelCase for model, but snake_case for database
      }
  };
  //关闭csrf
  config.security = {
    csrf: {
      enable: false,
    },
  };

  config.cluster = {
    listen: {
      port: 8081,
      hostname: '127.0.0.1', // 或 '0.0.0.0' 以监听所有网络接口
      path: '', // 如果不是Unix socket，可以留空
    },
  };

  return config;
};
