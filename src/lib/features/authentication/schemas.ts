import { z } from 'zod';

import * as m from '$lib/paraglide/messages';

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, m.auth_login_incorrect_password()),
});
