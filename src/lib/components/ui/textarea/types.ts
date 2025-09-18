import type { HTMLTextareaAttributes } from 'svelte/elements';

import type { WithElementRef, WithoutChildren } from '$lib/utils';

export type TextAreaProps = WithoutChildren<WithElementRef<HTMLTextareaAttributes>>;
