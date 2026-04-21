
### Docker Installation
A preconfigured Docker setup is available in the `docker/` directory:

1. Build the Docker image
    ```bash
    cd docker
    docker build --progress=plain -f docker/Dockerfile -t n8n-nodes-openai-mlflow .
    ```
2. Run the container
    ```bash
		docker run -it --rm \
		 --name n8n-mlflow \
		 -p 5678:5678 \
		 -e GENERIC_TIMEZONE="America/New_York" \
		 -e TZ="America/New_York" \
		 -e N8N_ENFORCE_SETTINGS_FILE_PERMISSIONS=true \
		 -e N8N_RUNNERS_ENABLED=true \
		 -v n8n_data:/home/node/.n8n \
		 n8n-nodes-openai-mlflow:latest
    ```
You can now access n8n at http://localhost:5678

### Visual Example

1. **Node Configuration UI**: This shows a sample n8n workflow using the Langfuse Chat Node.

![node-example](assets/node-example.png?raw=true)

2. **Workflow Setup**: A typical workflow using this node.

![workflow-example](assets/workflow-example.png?raw=true)
