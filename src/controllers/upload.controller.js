const { Worker } = require('worker_threads');
const path = require('path');

const uploadFile = async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
    }

    // taking correct file format
    const filePath = path.resolve(req.file.path);
    const workerPath = path.resolve(__dirname, '../workers/process_file.js');

    try {
        const worker = new Worker(workerPath, {
            workerData: { 
                filePath, 
                originalName: req.file.originalname
            }
        });
        

        worker.on('message', (message) => {
            res.status(200).json({ message });
        });

        worker.on('error', (error) => {
            console.error("Worker Error:", error);
            res.status(500).json({ message: "Error processing file", error });
        });

        worker.on('exit', (code) => {
            if (code !== 0) {
                console.error(`Worker stopped with exit code ${code}`);
            }
        });

    } catch (error) {
        console.error("Worker Thread Initialization Error:", error);
        res.status(500).json({ message: "Failed to initialize worker thread", error });
    }
};

module.exports = { uploadFile };
