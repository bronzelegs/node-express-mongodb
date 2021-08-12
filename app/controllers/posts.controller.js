const db = require("../models");
const Posts = db.posts;

// Create and Save a new posts document
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a Posts
  const posts = new Posts({

    title: req.body.title,
    name: req.body.name,
    author: req.body.author,
    created: req.body.created,
    modified: req.body.modified,
    archived: req.body.archived,
    published: req.body.published ? req.body.published : false,
    deleted: req.body.deleted ? req.body.deleted : false,
    topics: "",
    CommentHash: ""   // id of comment hash key
  });

  // Save Posts in the database
  posts
    .save(posts)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Posts."
      });
    });
};

// Retrieve all Posts from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};

  Posts.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving posts."
      });
    });
};

// Find a single Post with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Posts.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Post with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Post with id=" + id });
    });
};

// Update a Posts by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Posts.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Post with id=${id}. Maybe Posts was not found!`
        });
      } else res.send({ message: "Posts was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Posts with id=" + id
      });
    });
};

// Delete a Posts with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Posts.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Posts with id=${id}. Maybe Posts was not found!`
        });
      } else {
        res.send({
          message: "Posts was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Posts with id=" + id
      });
    });
};

// Delete all Posts from the database.
exports.deleteAll = (req, res) => {
  Posts.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Posts were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Posts."
      });
    });
};

// Find all published Posts
exports.findAllPublished = (req, res) => {
  Posts.find({ published: true })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Posts."
      });
    });
};