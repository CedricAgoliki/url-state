type StateType = Map<string, string | string[]>;

const separator = ",";

const set = (state: StateType): void => {
  const searchParams = new URLSearchParams();
  state.forEach((value, key) => {
    if (Array.isArray(value)) {
      searchParams.append(key, value.join(separator));
    } else {
      searchParams.append(key, value);
    }
  });
  const newURL = new URL(globalThis.location.href);
  newURL.search = searchParams.toString();
  globalThis.history.pushState({ path: newURL.href }, "", newURL.href);
};

const get = (): StateType => {
  const search = globalThis.location.search;
  const searchParams = new URLSearchParams(search);
  const state: StateType = new Map();
  searchParams.forEach((value, key) => {
    if (value.includes(separator)) {
      state.set(key, value.split(separator));
    } else {
      state.set(key, value);
    }
  });
  return state;
};

export { get, set };
