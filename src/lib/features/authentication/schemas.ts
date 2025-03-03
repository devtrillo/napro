import { z } from 'zod';

import * as m from '$lib/paraglide/messages';

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, m.AUTH_LOGIN_INCORRECT_PASSWORD()),
});

export const registerSchema = z
  .object({
    confirmPassword: z.string().min(1, m.AUTH_REGISTER_PASSWORD_REQUIRED()),
    email: z.string().email(),
    name: z.string().min(1, m.AUTH_REGISTER_NAME_REQUIRED()),
    password: z.string().min(1, m.AUTH_REGISTER_PASSWORD_REQUIRED()),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: m.AUTH_REGISTER_PASSWORDS_DONT_MATCH(),
  });

export const editUserSchema = z.object({
  name: z.string().min(1, m.AUTH_REGISTER_NAME_REQUIRED()),
});

export const changePasswordSchema = z
  .object({
    confirmPassword: z.string().min(1, m.AUTH_REGISTER_PASSWORD_REQUIRED()),
    currentPassword: z.string(),
    newPassword: z.string().min(1, m.AUTH_REGISTER_PASSWORD_REQUIRED()),
    signOutOtherPlaces: z.boolean().default(false),
  })
  .refine((data) => data.newPassword !== data.currentPassword, {
    message: m.AUTH_CHANGE_PASSWORD_SAME_PASSWORD(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: m.AUTH_REGISTER_PASSWORDS_DONT_MATCH(),
  });

export const addPasskeySchema = z.object({
  name: z.string().min(1, m.AUTH_ADD_PASSKEY_NAME_REQUIRED()),
});
