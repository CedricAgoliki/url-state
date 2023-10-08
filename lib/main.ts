type URLStateType = Map<string, string | string[]>;

const separator = ",";

const set = (state: URLStateType): void => {
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
  window.history.pushState({ path: newURL.href }, "", newURL.href);
};

const get = (): URLStateType => {
  const search = window.location.search;
  const searchParams = new URLSearchParams(search);
  const state: URLStateType = new Map();
  searchParams.forEach((value, key) => {
    if (value.includes(separator)) {
      state.set(key, value.split(separator));
    } else {
      state.set(key, value);
    }
  });
  return state;
};

const map: URLStateType = new Map();


export { set, get };
