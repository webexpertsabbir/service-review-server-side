const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Photography car server in running');
});

app.listen(port, () =>{
    console.log(`Photography car server running on ${port}`)
})