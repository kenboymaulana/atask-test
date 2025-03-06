"use client";

import { Provider as ReduxProvider } from "react-redux";
import { store } from "@/store";
import UserGit from "@/modules/UserGit";
import { ToastContainer } from "react-toastify";

export default function Home() {
  return (
    <ReduxProvider store={store}>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        // limit={1}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
        // theme="colored"
      />
      <UserGit />
    </ReduxProvider>
  );
}
