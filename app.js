const express = require('express');

const app = express();

// Start the server
const port = process.env.APP_PORT;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});