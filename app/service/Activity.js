'use strict';

const { DELETE_FLAG } = require('../extend/constant');

const Service = require('egg').Service;

class Activity extends Service {
  async list({ offset = 0, limit = 10 }) {
    return this.ctx.model.Activity.findAndCountAll({
      offset,
      limit,
      order: [['id', 'desc']],
    });
  }

  async find(id) {
    const activity = await this.ctx.model.Activity.findByPk(id);
    if (!activity) {
      this.ctx.throw(404, 'activity not found');
    }
    return activity;
  }

  // 通过活动id查找活动
  async findByActivityId(activityId) {
    return await this.ctx.model.Activity.findOne({ where: { activityId: activityId, deleteFlag: DELETE_FLAG.NO } });
  }

  async create(activity) {
    return this.ctx.model.Activity.create(activity);
  }

  async update({ id, updates }) {
    const activity = await this.ctx.model.Activity.findByPk(id);
    if (!activity) {
      this.ctx.throw(404, 'activity not found');
    }
    return activity.update(updates);
  }

  async del(id) {
    const activity = await this.ctx.model.Activity.findByPk(id);
    if (!activity) {
      this.ctx.throw(404, 'activity not found');
    }
    return activity.destroy();
  }
}

module.exports = Activity;
