const { Schema } = require("mongoose");

const createSchema = (schemaObject, collection) => {
  schemaObject = {
    ...schemaObject,
    createAt: {
      type: Date,
      default: Date.now(),
    },
    updateAt: {
      type: Date,
    },
  };
  const schema = new Schema(schemaObject, { collection });
  schema.set("toJSON", { virtuals: true });
  schema.set("toObject", { virtuals: true });
  // Common query
  schema.statics.list = async function (populate, select) {
    let result = this.find({});
    if (populate) {
      populate.foreach((i) => result.populate(i));
    }
    if (select) {
      result.select(select);
    }
    result = await result.exec();
    return result ? result : [];
  };
  // Build common CRUD
  schema.statics.getById = async function (id, populate) {
    let result = this.findOne({ _id: id });
    if (populate) {
      if (Array.isArray(populate)) {
        populate.forEach((i) => result.populate(i));
      } else {
        result.populate(populate);
      }
    }
    result = await result.exec();
    return result ? result.toObject() : null;
  };
  schema.statics.getByQuery = async function (query, populate) {
    let result = null;
    if (query.id) {
      const id = query.id || query._id;
      delete query.id;
      query = {
        ...query,
        _id: id,
      };
    }
    result = this.find(query);
    if (populate) {
      populate.forEach((item) => result.populate(item));
    }
    result = await result.exec();
    result = result.map((item) => item.toObject());
    return result ? result : [];
  };
  return schema;
};

module.exports = createSchema;
