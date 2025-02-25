import { JSX } from "solid-js";

type DefaultLayoutProps = {
  children?: JSX.Element | JSX.Element[];
};

export function DefaultLayout(props: DefaultLayoutProps) {
  return <div class="flex h-screen flex-col">{props.children}</div>;
}
