const express = require('express');
const cors = require('cors');
const fs = require('fs');
const app = express();
const port = 5000;

app.use(cors());

app.use(express.json());

app.post('/saveData', (req, res) => {
    const jsonData = req.body;
    console.log(jsonData)
    const jsonString = JSON.stringify(jsonData, null, 2);
    const filePath = './data/stepInfo.json';
    if (!fs.existsSync(filePath)) {
        try {
            fs.writeFileSync(filePath, `[${jsonString}]`);
            console.log('File created and data saved successfully.');
            res.json({ message: 'File created and data saved successfully' });
        } catch (error) {
            console.error('Error creating file:', error);
            res.status(500).json({ message: 'Error creating file' });
        }
    } else {
        try {
            const existingData = fs.readFileSync(filePath, 'utf8');
            const existingArray = JSON.parse(existingData);
            existingArray.push(jsonData);
            const updatedJsonString = JSON.stringify(existingArray, null, 2);
            fs.writeFileSync(filePath, '');
            fs.writeFileSync(filePath, `${updatedJsonString}`);
            console.log('Data appended to the existing file.');
            res.json({ message: 'Data appended to the existing file' });
        } catch (error) {
            console.error('Error appending data to file:', error);
            res.status(500).json({ message: 'Error appending data to file' });
        }
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
