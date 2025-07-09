import { AlertTriangleIcon, CheckIcon, InfoIcon, XIcon } from "lucide-solid";
import {
  createContext,
  createSignal,
  For,
  JSX,
  Match,
  Switch,
  useContext,
} from "solid-js";
import { z } from "zod";

const ToastSchema = z.object({
  id: z.number(),
  message: z.string(),
  type: z.enum(["success", "error", "warning", "info"]),
  timeout: z.number().min(500).max(10000),
  closeButton: z.boolean(),
});
type Toast = z.infer<typeof ToastSchema>;

type ToasterContextType = {
  createToast: (toast: Pick<Toast, "message" | "type">) => void;
};

const ToasterContext = createContext<ToasterContextType>(undefined);

type ToasterProviderProps = {
  children?: JSX.Element | JSX.Element[];
};

export function ToasterProvider(props: ToasterProviderProps) {
  const [toasts, setToasts] = createSignal<Toast[]>([]);

  function createToast(toast: Pick<Toast, "message" | "type">) {
    try {
      const newToast: Toast = {
        id: Date.now(),
        message: toast.message,
        type: toast.type,
        timeout: 3000,
        closeButton: true,
      };

      ToastSchema.parse(newToast);

      setToasts((prevToasts) => [...prevToasts, newToast]);

      setTimeout(() => {
        deleteToast(newToast.id);
      }, newToast.timeout);
    } catch (error) {
      console.error("Failed to create toast", error);
    }
  }

  function deleteToast(toastId: Toast["id"]) {
    setToasts((prevToasts) =>
      prevToasts.filter((toast) => toast.id !== toastId),
    );
  }

  return (
    <ToasterContext.Provider value={{ createToast: createToast }}>
      <div class="toast-center toast-top toast">
        <For each={toasts()}>
          {(toast) => (
            <div class="alert flex flex-row items-center gap-2 rounded-lg">
              <Switch fallback={<div>Not Found</div>}>
                <Match when={toast.type === "info"}>
                  <InfoIcon size={22} />

                  <span class="text-lg">{toast.message}</span>
                </Match>

                <Match when={toast.type === "success"}>
                  <CheckIcon size={22} class="text-success" />

                  <span class="text-lg">{toast.message}</span>
                </Match>

                <Match when={toast.type === "warning"}>
                  <AlertTriangleIcon size={22} class="text-warning" />

                  <span class="text-lg">{toast.message}</span>
                </Match>

                <Match when={toast.type === "error"}>
                  <XIcon size={22} class="text-error" />

                  <span class="text-lg">{toast.message}</span>
                </Match>
              </Switch>
            </div>
          )}
        </For>
      </div>

      {props.children}
    </ToasterContext.Provider>
  );
}

export function useToaster() {
  const toasterContext = useContext(ToasterContext);

  if (!toasterContext) {
    throw new Error("ToasterProvider must be a direct or indirect child");
  }

  return toasterContext;
}
