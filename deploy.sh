#!/bin/bash

# Configuration
PROJECT_ID="ethereal-zodiac-495112-g4"
SERVICE_NAME="rushi-portfolio-3d"
REGION="us-central1"
IMAGE_TAG="gcr.io/$PROJECT_ID/$SERVICE_NAME"

echo "🚀 Deploying $SERVICE_NAME to Google Cloud Run..."

# 1. Build the Docker image
echo "📦 Building Docker image..."
docker build -t $IMAGE_TAG .

# 2. Push the image to Google Container Registry
echo "⬆️ Pushing image to GCR..."
docker push $IMAGE_TAG

# 3. Deploy to Cloud Run
echo "☁️ Deploying to Cloud Run..."
gcloud run deploy $SERVICE_NAME \
  --image $IMAGE_TAG \
  --platform managed \
  --region $REGION \
  --allow-unauthenticated \
  --port 8080 \
  --min-instances 1

echo "✅ Deployment complete!"
