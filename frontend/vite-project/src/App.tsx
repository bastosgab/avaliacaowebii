import { useEffect } from "react";
import { api } from "./services/api.ts";

function App() {
  useEffect(() => {
    api.get("/teste")
      .then((res: any) => {
        console.log("RESPOSTA DO BACKEND:", res.data);
      })
      .catch((err: any) => {
        console.error("ERRO:", err);
      });
  }, []);

  return <h1>Conectando Front e Back</h1>;
}

export default App;