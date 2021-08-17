module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      title: String,
      name: String,
      author: String,
      body: String,
      created: String,
      modified: String,
      archived: Boolean,
      archivedDate: Date,
      published: Boolean,
      publishedDate: Date,
      hidden: Boolean,
      meta: {
        votes: Number,
        favs:  Number
      },
      deleted: Boolean,
      topics: [{ key: String, value: String }],
      CommentHash: String
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
