import { useEffect, useState } from "react";
import { get, set } from "../../dist/url-state";
import { createBrowserHistory } from "history";
// import type { URLStateType } from "../../lib/main";
// type URLStateType = Map<string, string | string[]>;
const history = createBrowserHistory();

const useURLState = () => {
  const [state, setState] = useState(get());

  useEffect(() => {
    if (typeof window != "undefined") {
      const unlisten = history.listen(() => {
        console.log("route change");
        setState(get());
      });
      return () => {
        unlisten();
      };
    }
  }, []);

  return [state, set];
};

export { useURLState };
