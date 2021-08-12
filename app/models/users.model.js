module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      userID: String,
      name: String,
      password: String,
      email: String,
      created: String,
      modified: String,
      archived: Boolean,
      published: Boolean,
      deleted: Boolean,
      topics: String,
      CommentId: String   // id of comment head of list
    },
    { timestamps: true }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Users = mongoose.model("users", schema);
  return Users;
};
