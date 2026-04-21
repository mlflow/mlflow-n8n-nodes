import { BaseCallbackHandler } from '@langchain/core/callbacks/base';
import type { Serialized } from '@langchain/core/load/serializable';
import type { BaseMessage } from '@langchain/core/messages';
import type { LLMResult } from '@langchain/core/outputs';
import * as mlflow from 'mlflow-tracing';
import { SpanType } from 'mlflow-tracing';

export class MlflowCallbackHandler extends BaseCallbackHandler {
	name = 'MlflowCallbackHandler';
	awaitHandlers = true;

	private spans: Record<string, mlflow.LiveSpan> = {};

	constructor(
		private opts: {
			sessionId?: string;
			userId?: string;
			metadata?: Record<string, any>;
		},
	) {
		super();
	}

	async handleChatModelStart(
		_llm: Serialized,
		messages: BaseMessage[][],
		runId: string,
	) {
		const inputs = messages.map((batch) =>
			batch.map((m) => ({ role: m._getType(), content: m.content })),
		);
		const span = mlflow.startSpan({ name: 'ChatOpenAI', spanType: SpanType.CHAT_MODEL, inputs });

		if (this.opts.sessionId) span.setAttribute('mlflow.trace.session', this.opts.sessionId);
		if (this.opts.userId) span.setAttribute('mlflow.trace.user', this.opts.userId);
		if (this.opts.metadata) span.setAttributes(this.opts.metadata);

		this.spans[runId] = span;
	}

	async handleLLMEnd(output: LLMResult, runId: string) {
		this.spans[runId]?.end({ outputs: { generations: output.generations } });
		delete this.spans[runId];
	}

	async handleLLMError(err: unknown, runId: string) {
		const span = this.spans[runId];
		if (span) {
			if (err instanceof Error) span.recordException(err);
			span.setStatus('ERROR');
			span.end();
			delete this.spans[runId];
		}
	}
}
