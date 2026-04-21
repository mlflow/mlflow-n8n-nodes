FROM docker.n8n.io/n8nio/n8n AS builder

USER root

WORKDIR /build

COPY package.json tsconfig.json gulpfile.js ./
COPY credentials/ ./credentials/
COPY nodes/ ./nodes/

RUN --mount=type=cache,target=/root/.npm \
    npm config set registry https://npm-proxy.dev.databricks.com && \
    npm config set cache /root/.npm && \
    npm install --verbose --legacy-peer-deps && \
    npm run build


FROM docker.n8n.io/n8nio/n8n

USER root

RUN mkdir -p /opt/n8n-custom-nodes/node_modules/n8n-nodes-openai-mlflow && \
    chown -R node:node /opt/n8n-custom-nodes

COPY --from=builder /build/package.json /opt/n8n-custom-nodes/node_modules/n8n-nodes-openai-mlflow/
COPY --from=builder /build/dist/ /opt/n8n-custom-nodes/node_modules/n8n-nodes-openai-mlflow/dist/
COPY --from=builder /build/node_modules/ /opt/n8n-custom-nodes/node_modules/

ENV N8N_CUSTOM_EXTENSIONS="/opt/n8n-custom-nodes"

USER node

ENTRYPOINT ["tini", "--", "/docker-entrypoint.sh"]
