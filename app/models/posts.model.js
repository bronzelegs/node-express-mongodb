module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      title: String,
      name: String,
      author: String,
      created: String,
      modified: String,
      archived: Boolean,
      published: Boolean,
      deleted: Boolean,
      topics: String,
      CommentHash: String   // id of comment hash key
    },
    { timestamps: true }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Posts = mongoose.model("posts", schema);
  return Posts;
};
