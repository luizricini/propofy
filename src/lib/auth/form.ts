// Shared shape returned by auth Server Actions to their forms (via
// useActionState). On success the action redirects, so it never returns.

export type ActionState = {
  error?: string;
  fieldErrors?: Record<string, string>;
  values?: Record<string, string>;
  notice?: string;
};

export const emptyState: ActionState = {};
