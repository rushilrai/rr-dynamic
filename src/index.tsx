/* @refresh reload */
import { render } from "solid-js/web";

import "./index.css";
import { RouterWrapper } from "./modules/common/components/RouterWrapper";
import { initAxios } from "./modules/common/configs/axios.config";

async function main() {
  try {
    initAxios();

    const root = document.getElementById("root");

    if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
      throw new Error("Root element not found");
    }

    render(() => <RouterWrapper />, root!);
  } catch (error) {
    console.error("An error occurred while starting application", error);

    document.body.innerHTML = `
    <div style="display: flex; height: 100vh; align-items: center; justify-content: center; flex-direction: column; text-align: center;">
      <h1 style="color: red;">Application Failed to Load</h1>
      <p>An unexpected error occurred. Please try refreshing the page.</p>
      <button onclick="location.reload()" style="margin-top: 10px; padding: 10px; background-color: #ff4d4d; color: white; border: none; border-radius: 5px; cursor: pointer;">
        Reload Page
      </button>
    </div>
  `;
  }
}

main();
