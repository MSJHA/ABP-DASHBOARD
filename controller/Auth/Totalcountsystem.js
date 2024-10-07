const express = require('express');
const cors = require('cors');
const User = require('../../models/UserModel');
const app = express();
app.use(express.json());
app.use(cors());

const totalCountSystem = async (req, res) => {
  try {
    // Extract the "page" query parameter from the request
    const page = req.query.page || 1;

    const recordsPerPage = 2;
    const totalCount = await User.count();

    const response = {
      totalCount,
      recordsPerPage,
      currentPage: page,  // Include the current page in the response
    };

    // Update the response using the provided res parameter
    res.json(response);
  } catch (err) {
    // Handle the error and send it as JSON
    res.status(500).json({ error: err.message });
  }
};

module.exports.totalCountSystem = totalCountSystem;