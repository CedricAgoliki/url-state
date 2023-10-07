type StateType = Map<string, string | string[]>;

class URLState {
  private separator: string;

  constructor(seperator = ",") {
    this.separator = seperator;
  }

  set(state: StateType): void {
    const searchParams = new URLSearchParams();
    state.forEach((value, key) => {
      if (Array.isArray(value)) {
        searchParams.append(key, value.join(this.separator));
      } else {
        searchParams.append(key, value);
      }
    });
    const newURL = new URL(globalThis.location.href);
    newURL.search = searchParams.toString();
    globalThis.history.pushState({ path: newURL.href }, "", newURL.href);
  }

  get(): StateType {
    const search = globalThis.location.search;
    const searchParams = new URLSearchParams(search);
    const state: StateType = new Map();
    searchParams.forEach((value, key) => {
      if (value.includes(this.separator)) {
        state.set(key, value.split(this.separator));
      } else {
        state.set(key, value);
      }
    });
    return state;
  }
}

export { URLState };
