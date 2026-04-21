import type {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class OpenAiApiWithMlflowApi implements ICredentialType {
	name = 'openAiApiWithMlflowApi';
	icon = 'file:OpenAiApiWithMlflowApi.credentials.svg' as const;

	displayName = 'OpenAI With MLflow API';
	documentationUrl = 'https://mlflow.org/docs/latest/genai/tracing/app-instrumentation/typescript-sdk';

	properties: INodeProperties[] = [
		{
			displayName: 'OpenAI API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: { password: true },
			required: true,
			default: '',
		},
		{
			displayName: 'OpenAI Organization ID (optional)',
			name: 'organizationId',
			type: 'string',
			default: '',
			hint: 'Only required if you belong to multiple organisations',
			description:
				"For users who belong to multiple organizations, you can set which organization is used for an API request. Usage from these API requests will count against the specified organization's subscription quota.",
		},
		{
			displayName: 'OpenAI Base URL',
			name: 'url',
			type: 'string',
			default: 'https://api.openai.com/v1',
			description: 'Override the default base URL for the API',
		},
		{
			displayName: 'MLflow Tracking URI',
			name: 'mlflowTrackingUri',
			type: 'string',
			default: 'http://localhost:5000',
			required: true,
			description: 'MLflow tracking server URI (e.g. http://localhost:5000 or "databricks")',
		},
		{
			displayName: 'MLflow Experiment ID',
			name: 'mlflowExperimentId',
			type: 'string',
			default: '',
			required: true,
			description: 'The MLflow experiment ID where traces will be logged',
		},
		{
			displayName: 'MLflow Tracking Token',
			name: 'mlflowTrackingToken',
			type: 'string',
			typeOptions: { password: true },
			default: '',
			description: 'Bearer token for MLflow tracking server authentication (optional)',
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				Authorization: '=Bearer {{$credentials.apiKey}}',
				'OpenAI-Organization': '={{$credentials.organizationId}}',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: '={{$credentials?.url}}',
			url: '/models',
		},
	};
}
