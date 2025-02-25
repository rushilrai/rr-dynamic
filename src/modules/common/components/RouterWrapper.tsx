import { Route, Router } from "@solidjs/router";

import { NotFoundPage } from "../pages/NotFoundPage";
import { DefaultLayout } from "./DefaultLayout";
import { SamplePage } from "../../sample/pages/SamplePage";

export function RouterWrapper() {
  return (
    <Router>
      <Route path="/" component={DefaultLayout}>
        <Route path="/" component={SamplePage} />
        <Route path="*404" component={NotFoundPage} />
      </Route>
    </Router>
  );
}
