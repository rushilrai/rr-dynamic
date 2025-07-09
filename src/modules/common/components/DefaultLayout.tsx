import { JSX } from "solid-js";

import { ToasterProvider } from "./Toaster";

type DefaultLayoutProps = {
  children?: JSX.Element | JSX.Element[];
};

export function DefaultLayout(props: DefaultLayoutProps) {
  return (
    <ToasterProvider>
      <div class="flex h-screen flex-col">{props.children}</div>
    </ToasterProvider>
  );
}
