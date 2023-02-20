const client = require("../configs/db");

exports.addNote = (req, res) => {
  const { heading, content } = req.body;

  client
    .query(
      `INSERT INTO notes (email, heading, content) VALUES ('${req.email}','${heading}','${content}');`
    )
    .then((data) => {
      res.status(200).json({
        message: "Note added successfully",
      });
    })
    .catch((err) => {
      // console.log(err);
      res.status(500).json({
        message: "DB error occurred",
      });
    });
};

exports.getAllNotes = (req, res) => {
  client
    .query(`SELECT * FROM notes WHERE email = '${req.email}' ORDER BY noteid;`)
    .then((data) => {
      const noteData = data.rows;
      const filteredData = noteData.map((note) => {
        return {
          noteId: note.noteid,
          heading: note.heading,
          content: note.content,
        };
      });
      res.status(200).json({
        messaage: "Success",
        data: filteredData,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({
        message: "DB error occurred",
      });
    });
};

exports.displayNote = (req, res) => {
  const noteId = req.params.noteId;

  client
    .query(`SELECT heading,content FROM notes WHERE noteid = '${noteId}';`)
    .then((data) => {
      const noteData = data.rows;
      const filteredData = noteData.map((note) => {
        return {
          noteId: note.noteid,
          heading: note.heading,
          content: note.content,
        };
      });
      res.status(200).json({
        messaage: "Success",
        data: filteredData,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({
        message: "DB error occurred",
      });
    });
};

exports.updateNote = (req, res) => {
  const noteId = req.params.noteId;

  const { heading, content } = req.body;

  client
    .query(
      `UPDATE notes SET heading = '${heading}', content = '${content}' WHERE noteid = '${noteId}';`
    )
    .then((data) => {
      res.status(200).json({
        message: "Success",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({
        message: "DB error occurred",
      });
    });
};

exports.deleteNote = (req, res) => {
  const noteId = req.params.noteId;
  client
    .query(`DELETE FROM notes WHERE noteid = '${noteId}';`)
    .then((data) => {
      res.status(200).json({
        message: "Successfully Note Deleted",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({
        message: "DB error occurred",
      });
    });
};
