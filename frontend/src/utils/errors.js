export function getErrorMessage(error, fallback = 'Something went wrong') {
  if (!error) return fallback;
  if (typeof error === 'string') return error;

  const data = error?.response?.data;
  if (typeof data === 'string' && data.trim()) return data;
  if (data?.message) return data.message;
  if (Array.isArray(data?.errors) && data.errors[0]?.msg) return data.errors[0].msg;
  if (error?.message) return error.message;
  return fallback;
}

export function isNetworkError(error) {
  return !error?.response && Boolean(error?.request || error?.message?.includes('Network'));
}
