import { Suspense } from "react";
import { Switch, Route } from "react-router-dom";
import routes from "./routes";

export default function Routes({ ...props }) {
  return (
    <Suspense fallback={"...loading"}>
      <Switch>
        {routes.map((route, idx) => {
          return (
            <Route
              key={`route-${idx}`}
              path={route.path}
              exact={route.exact}
              component={() => <route.component {...props} />}
            />
          );
        })}
      </Switch>
    </Suspense>
  );
}
