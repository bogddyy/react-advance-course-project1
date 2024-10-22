import React from "react";

const NotFound = ({ background, color }) => {
  return (
    <div
      style={{
        backgroundColor: background,
        color: color,
        minHeight: "100vh",
        textAlign: "center",
        padding: "20px",
      }}
    >
      <h1>Pagina nu a fost găsită</h1>
      <p>Ne pare rău, dar pagina pe care o căutați nu există.</p>
      <p>
        Mergeti inapoi la <a href="/">pagina principala</a>.
      </p>
    </div>
  );
};

export default NotFound;
