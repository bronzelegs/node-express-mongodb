module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      hashId: String,     // unique hash id for comment thread
      title: String,
      name: String,
      author: String,
      created: String,
      modified: String,
      archived: Boolean,
      published: Boolean,
      deleted: Boolean,
      topics: String,
    },
    { timestamps: true }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Comments = mongoose.model("comments", schema);
  return Comments;
};
