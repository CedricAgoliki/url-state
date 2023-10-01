function set(state: Map<string, string>): void {
  const searchParams = new URLSearchParams();
  state.forEach((value, key) => {
    searchParams.append(key, value);
  });
  const origin = globalThis.location.origin;
  const pathname = globalThis.location.pathname;
  const search = searchParams.toString();
  globalThis.location.href = `${origin}${pathname}?${search}`;
}

function get(): Map<string, string> {
  const search = globalThis.location.search;
  const searchParams = new URLSearchParams(search);
  const state = new Map<string, string>();
  searchParams.forEach((value, key) => {
    state.set(key, value);
  });
  return state;
}

export { set, get };
