import { magicLinkClient, organizationClient } from 'better-auth/client/plugins';
import { createAuthClient } from 'better-auth/react';

const authClient = createAuthClient({
	plugins: [magicLinkClient(), organizationClient()]
});

export default authClient;
