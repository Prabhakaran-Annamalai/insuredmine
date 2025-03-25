const { workerData, parentPort } = require('worker_threads');
const fs = require('fs');
const csv = require('csv-parser');
const xlsx = require('xlsx');
const mongoose = require('mongoose');
const User = require('../models/user.model');
const PolicyInfo = require('../models/policy_info.model');

// MongoDB Connection
const mongoURI = 'mongodb://localhost:27017/insuredmine';

const connectDB = async () => {
    try {
        await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("Worker Thread: Connected to MongoDB");
    } catch (error) {
        console.error("MongoDB Connection Error:", error);
        parentPort.postMessage({ error: "Database connection failed" });
        process.exit(1);
    }
};

const processCSV = async (filePath) => {
    console.log("filePath ", filePath);
    try {
        await connectDB();        

        const results = [];
        fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', (data) => results.push(data))
            .on('end', async () => {
                try {
                    await User.insertMany(results);
                    mongoose.connection.close();
                    parentPort.postMessage({ message: "CSV data uploaded successfully!" });
                } catch (err) {
                    console.error("Error inserting CSV data:", err);
                    parentPort.postMessage({ error: "Failed to upload CSV data" });
                }
            });
    } catch (error) {
        console.error("CSV Processing Error:", error);
        parentPort.postMessage({ error: "Error processing CSV file" });
    }
};

const originalName = workerData.originalName || '';
const extension = originalName.split('.').pop().toLowerCase();

if (extension === 'csv') {
    processCSV(workerData.filePath);
} else if (extension === 'xlsx') {
    pparentPort.postMessage({ error: "Reading xlsx file still pending" });
} else {
    parentPort.postMessage({ error: "Unsupported file format" });
}