#!/bin/bash

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies and build
cd ../frontend
npm install
npm run build

# Copy build files to backend for serving
cp -r build/* ../backend/public/

echo "Build completed successfully!"
