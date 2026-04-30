# n8n-nodes-openai-mlflow

An n8n community node that integrates OpenAI-compatible chat models with **MLflow Tracing**, giving you full observability into every LLM call directly from your n8n workflows.

npm package: [https://www.npmjs.com/package/n8n-nodes-openai-mlflow](https://www.npmjs.com/package/n8n-nodes-openai-mlflow)

## Features

- Support for OpenAI-compatible chat models (e.g., `gpt-4.1-mini`, `gpt-4o`, and any LiteLLM/LocalAI endpoint)
- Automatic MLflow tracing for every LLM request and response
- Chat session grouping — traces are linked by `sessionId` for multi-turn conversation tracking
- Custom metadata injection: `sessionId`, `userId`, and arbitrary structured JSON
- Compatible with self-hosted MLflow and Databricks-hosted MLflow 

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/reference/license/) workflow automation platform.

[Installation](#installation)  
[Credentials](#credentials)  
[Operations](#operations)  
[Compatibility](#compatibility)  
[Resources](#resources)  
[Version history](#version-history)  

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the official n8n documentation for community nodes.

### Community Nodes (Recommended)

For **n8n v0.187+**, install directly from the UI:

1. Go to **Settings → Community Nodes**
2. Click **Install**
3. Enter `n8n-nodes-openai-mlflow` in the npm package name field
4. Agree to the risks of using community nodes
5. Select **Install**

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

### Manual Installation

```bash
# Go to your n8n installation directory
cd ~/.n8n
# Install the node
npm install n8n-nodes-openai-mlflow
# Restart n8n to apply the node
n8n start
```

## Credentials

This credential authenticates your OpenAI-compatible LLM endpoint and configures where MLflow traces are sent.

### OpenAI Settings

| Field | Required | Description | Example |
|-------|----------|-------------|---------|
| OpenAI API Key | Yes | API key for your OpenAI-compatible endpoint | `sk-abc123...` |
| OpenAI Base URL | No | Override the default endpoint base URL | `https://api.openai.com/v1` |

### MLflow Settings

| Field | Required | Description | Example |
|-------|----------|-------------|---------|
| MLflow Tracking URI | Yes | Your MLflow tracking server URI | `http://localhost:5000` or `databricks` |
| MLflow Experiment ID | Yes | Experiment ID where traces will be logged | `1234567890` |

> **Databricks users:** Set the Tracking URI to `databricks` and provide your Databricks personal access token as the MLflow Tracking Token.

## Operations

The node exposes MLflow tracing fields that attach structured context to every trace span logged to your MLflow experiment.

### MLflow Tracing Fields

| Field | Type | Description |
|-------|------|-------------|
| `sessionId` | `string` | Groups related traces into a single chat session (`mlflow.trace.session`) |
| `userId` | `string` | Identifies the end user making the request (`mlflow.trace.user`) |
| `customMetadata` | `object` | Arbitrary JSON attached to the trace as span metadata |

### Example Setup

| Field | Example Value         |
|-------|-----------------------|
| Session ID | `{{$json.sessionId}}` |
| User ID | `test-user`           |
| Custom Metadata (JSON) | Any JSON value |


### Visual Examples

1. **Node Configuration UI**: Sample n8n workflow using the OpenAI MLflow node.

![node-example](assets/node-example.png?raw=true)

2. **Workflow Setup**: A typical workflow using this node.

![workflow-example](assets/workflow-example.png?raw=true)

3. **n8n Chat**: An example chat interaction in n8n.

![n8n-chat-example](assets/n8n-chat-example.png?raw=true)

4. **MLflow Trace**: The resulting trace logged in MLflow.

![mlflow-trace1](assets/mlflow-trace1.png?raw=true)

![mlflow-trace2](assets/mlflow-trace2.png?raw=true)

5. **MLflow Session Grouping**: Traces grouped by chat session in MLflow.

![mlflow-chat-session-example](assets/mlflow-chat-session-example.png?raw=true)

## Compatibility

- Requires n8n version 1.0.0 or later
- Requires Node.js >= 20.15
- Compatible with:
  - OpenAI official API (`https://api.openai.com`)
  - Any OpenAI-compatible LLM (e.g. via LiteLLM, LocalAI, Azure OpenAI)
  - MLflow Cloud, Databricks-hosted MLflow, and self-hosted MLflow instances

## Resources

- [n8n Community Node Docs](https://docs.n8n.io/integrations/community-nodes/)
- [MLflow Tracing Documentation](https://mlflow.org/docs/latest/genai/tracing/app-instrumentation/typescript-sdk)
- [MLflow GitHub](https://github.com/mlflow/mlflow)
- [n8n Community Forum](https://community.n8n.io/)

## Version History

- **v0.1.0** — Initial release with OpenAI + MLflow tracing integration, session grouping, and custom metadata support

## License

Apache 2.0 © 2025
