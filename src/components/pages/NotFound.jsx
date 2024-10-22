import React from "react";

const NotFound = () => {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>404 - Pagina nu a fost gasita</h1>
      <p>Ne pare rau, dar pagina pe care o cauti nu exista.</p>
      <p>
        Te poti intoarce la <a href="/">pagina principala</a>.
      </p>
    </div>
  );
};

export default NotFound;
