import "./App.css";
import { useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";

import reactLogo from "./assets/react.svg";

function App() {
  const [greetMsg, setGreetMsg] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function login() {
    setGreetMsg(await invoke("login", { email, password }));
  }

  const onSubmit = (formEvent) => {
    formEvent.preventDefault();
    const isLogged = login();
    if (isLogged) {
      setGreetMsg("Usuário logado com sucesso!");
    } else {
      setGreetMsg("Usuário ou senha inválidos!");
    }
  }

  return (
    <div className="container">
      <div className="row">
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo vite" alt="Vite logo" />
        </a>
        <a href="https://tauri.app" target="_blank">
          <img src="/tauri.svg" className="logo tauri" alt="Tauri logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <form className="column" onSubmit={onSubmit}>
        <input
          id="user-email"
          onChange={(e) => setEmail(e.currentTarget.value)}
          placeholder="Digite seu e-mail..."
        />
        <input
          id="user-password"
          onChange={(e) => setPassword(e.currentTarget.value)}
          placeholder="Digite sua senha..."
        />
        <button type="submit">Greet</button>
      </form>
      <p>{greetMsg}</p>      
    </div>
  );
}

export default App;
