import { magicLinkClient, organizationClient } from 'better-auth/client/plugins';
import { createAuthClient } from 'better-auth/svelte';

const authClient = createAuthClient({
	plugins: [magicLinkClient(), organizationClient()],
});

export default authClient;
