import { JSX } from "solid-js";

import { useToaster } from "../../common/components/Toaster";

export function SamplePage(): JSX.Element {
  const toaster = useToaster();

  function handleClick() {
    toaster.createToast({
      message: "Company Created",
      type: "success",
    });
  }

  return (
    <div class="flex h-full w-full flex-col items-center justify-center gap-2">
      <span class="text-2xl font-bold">Sample</span>

      <button onClick={handleClick} class="btn btn-primary">
        Click me
      </button>
    </div>
  );
}
