import proxyFromEnv from 'proxy-from-env';
import { ProxyAgent } from 'undici';

export function getProxyAgent(targetUrl?: string) {
	const proxyUrl = proxyFromEnv.getProxyForUrl(targetUrl ?? 'https://example.nonexistent/');

	if (!proxyUrl) {
		return undefined;
	}

	return new ProxyAgent(proxyUrl);
}
