var express = require('express');
var cors = require('cors');
require('dotenv').config()

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html')
});

/* My code */
const multer  = require("multer");

// Speficies where file should be stored
const uploads = multer({ dest: "uploads/" });

// Displays file information of the submitted file  
function middleware(req, res, next) {
  // Displays file info
  res.json({ 
    name: req.file.originalname,
    mimetype: req.file.mimetype,
    size: req.file.size
  })
  
  next();
}

// Allows information of the submitted file to be 
// displayed when the form is submitted
app.post("/api/fileanalyse", uploads.single("upfile"), middleware);

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
