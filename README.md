# README.md for BusPlanApp

## Overview
This README provides instructions for setting up and running the BusPlanApp, which consists of a backend server and a client application. The backend utilizes OpenSSL for secure communications, while the client is built with Node.js.

## Prerequisites
- **Node.js**: Ensure you have Node.js installed on your machine.
- **OpenSSL**: Download and install OpenSSL from [Win32OpenSSL](https://slproweb.com/products/Win32OpenSSL.html). Make sure to add OpenSSL to your system's PATH if it is not already included.

## Backend Setup

### Step 1: Import Database
Import the database from `busapp_final.sql` into your preferred SQL database management system.

### Step 2: Configure OpenSSL
1. Open Command Prompt and navigate to the server directory:
   ```bash
   cd /BusPlanApp/server/
2. Create a directory for certificates:
    ```bash
    mkdir certificates
    cd certificates

3. Generate a private key:
    ```bash
    openssl genpkey -algorithm RSA -out server.key

4. Create a Certificate Signing Request (CSR):
    ```bash
    openssl req -new -key server.key -out server.csr

Note: Fill in the prompts with any data you prefer.

5. Generate a self-signed certificate:
    ```bash
    openssl x509 -req -in server.csr -signkey server.key -out server.crt -days 365

6. Install the certificate by double-clicking on server.crt.
### Step 3: Run the Backend Server

In the backend directory, run:

    npm run dev

## Client Setup
### Step 1: Navigate to Client Directory
Open Command Prompt and navigate to the client directory:

    cd client

### Step 2: Run the Client Application
Run the client application using:

    npm run dev

## Sample User Credentials
Here are some sample users to get you started:

| Role         | Username | Password  |
|--------------|----------|-----------|
| Admin        | admin    | admin123  |
| Entrepreneur | test     | test123   |
| User         | user     | user1234  |
