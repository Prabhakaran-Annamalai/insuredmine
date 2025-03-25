# Project: MongoDB API with Worker Threads & Scheduled Messages

## Description
This project includes:
- Uploading XLSX/CSV data into MongoDB using worker threads.
- Searching policy information by username.
- Aggregating policies by each user.
- Storing different entities in separate MongoDB collections.
- A scheduled message service that inserts messages at a specific day and time.

## Prerequisites
Ensure you have the following installed:
- **Node.js** (v16+ recommended)
- **MongoDB** (Running on `localhost:27017`)

## Installation
1. **Clone the repository**:
   ```sh
   git clone <repository-url>
   cd <project-folder>
   ```

2. **Install dependencies**:
   ```sh
   npm install
   ```

3. **Start MongoDB** (if not running already):
   ```sh
   mongod --dbpath <your-db-path>
   ```

4. **Set up environment variables**:
   - Create a `.env` file in the root directory.
   - Add the following values:
     ```env
     MONGO_URI=mongodb://localhost:27017/insuredmine
     PORT=5000
     ```

## Running the Project
Start the Node.js server:
```sh
npm start
```

## API Endpoints

### **Task 1: Upload & Fetch Policy Data**

#### **1. Upload XLSX/CSV Data (Using Worker Threads)**
**Endpoint:** `POST /api/upload/upload`
**Body:** FormData with XLSX/CSV file.
**Description:** Uploads and processes policy data using worker threads.

#### **2. Search Policy by Username**
**Endpoint:** `GET http://localhost:5000/api/policy/search/:username`
**Description:** Fetches policy details based on the username.

#### **3. Aggregate Policies by User**
**Endpoint:** `GET /api/policy/aggregate`
**Description:** Aggregates policies grouped by each user.

### **Task 2: Scheduled Message Service**

#### **4. Schedule a Message**
**Endpoint:** `POST /api/posts/schedule`
**Body (JSON):**
```json
{
  "message": "Hello, this is a scheduled message!",
  "day": "2025-03-25",
  "time": "14:30"
}
```
**Description:** Saves a message in MongoDB, scheduled for the specified day and time.

## Testing the APIs

### Using **Postman** or **cURL**

1. **Upload a CSV File:**
   ```sh
   curl -X POST -F "file=@sample.csv" http://localhost:5000/api/upload
   ```

2. **Search for a Policy by Username:**
   ```sh
   curl -X GET "http://localhost:5000/api/policies/search?username=prabhu"
   ```

3. **Get Aggregated Policy Data:**
   ```sh
   curl -X GET "http://localhost:5000/api/policies/aggregate"
   ```

4. **Schedule a Message:**
   ```sh
   curl -X POST "http://localhost:5000/api/schedule" -H "Content-Type: application/json" -d '{"message":"Test Message","day":"2025-03-25","time":"14:30"}'
   ```

------------------------------ End of the document ----------------------------------

