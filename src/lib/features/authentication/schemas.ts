import { z } from 'zod';

import * as m from '$lib/paraglide/messages';

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, m.auth_login_incorrect_password()),
});

export const registerSchema = z
  .object({
    confirmPassword: z.string().min(1, m.auth_register_password_required()),
    email: z.string().email(),
    name: z.string().min(1, m.auth_register_name_required()),
    password: z.string().min(1, m.auth_register_password_required()),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: m.auth_register_passwords_dont_match(),
  });
