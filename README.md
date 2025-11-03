# AION Multi-AI Coordinator

## Railway Deployment

This project is configured for immediate deployment on Railway.

### Quick Start on Railway:

1. **Create New Project** on Railway
2. **Connect GitHub Repository** or upload this folder
3. **Add Variables** in Railway dashboard:
   - `REDIS_URL`: Your Redis connection string (from Railway Redis plugin)
   - `PORT`: 4100 (optional)

4. **Add Services** from Railway marketplace:
   - Redis (required)
   - PostgreSQL (optional)

5. **Deploy** - Automatic deployment will start

### Local Development:

```bash
# Install dependencies
npm install

# Start core system
npm start

# Start worker (in separate terminal)
AGENT_ID=AION-Support npm run worker
