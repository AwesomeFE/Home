class BasicController {
  
  BasicModel = null;

  constructor(BasicModel) {
    this.BasicModel = BasicModel;

    if(!BasicModel) {
      throw 'Controller should have a Model.'
    }
  }

  async create(data) {

  }

  async find(query) {
    const { BasicModel } = this;

    const docs = await BasicModel.find(query);
  }

  async findById(_id) {

  }

  async updateById(_id) {

  }

  async deleteById(_id) {

  }
}

export default BasicController;
