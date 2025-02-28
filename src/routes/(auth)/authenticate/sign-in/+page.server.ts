import { LoginAction, LoginLoad } from '$lib/features/authentication/server/login';

import type { Actions, PageServerLoad } from './$types';

export const load = (async () => {
  return {
    form: await LoginLoad(),
  };
}) satisfies PageServerLoad;

export const actions: Actions = {
  login: LoginAction,
};
