import crypto from 'crypto';
import { Role, User } from '../../models';
import { projectionTypes } from '../../constants';

const {
  SERVER_ADMIN_USERNAME,
  SERVER_ADMIN_PASSWORD,
  SERVER_ADMIN_EMAIL,
  SERVER_PASSWORD_SECRET
} = process.env;

const password = crypto
  .createHmac('md5', SERVER_PASSWORD_SECRET)
  .update(SERVER_ADMIN_PASSWORD)
  .digest('base64');

class AdminService {
  constructor() {
    this.adminRole = null;
    this.adminUser = null;

    this.init();
  }

  async init() {
    await this.initRoles();
    await this.initAdmin();
  }

  async initRoles() {
    this.adminRole = await Role.findOne({isAdmin: true});

    if(!this.adminRole) {
      this.adminRole = await Role.create({names: [{ lang: 'zh-cn', title: '超级管理员'}], isAdmin: true, auth: ['*']});
    }
  }

  async initAdmin() {
    this.adminUser = await User.findOne({roles: {$in: [this.adminRole._id]}});

    if(!this.adminUser) {
      this.adminUser = await User.create({ email: SERVER_ADMIN_EMAIL, password });
      this.adminUser.roles.push(this.adminRole);
      this.adminUser.projections.push({type: projectionTypes.SELF});
      await this.adminUser.save();
    }
  }
}

export default AdminService;