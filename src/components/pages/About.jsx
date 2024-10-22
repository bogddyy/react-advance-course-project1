import React from "react";

const About = ({ background, color }) => {
  return (
    <div
      style={{
        backgroundColor: background,
        minHeight: "100vh",
        padding: "20px",
        color: color,
      }}
    >
      <h2>Despre mine</h2>
      Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptate quae
      nisi, veritatis quod assumenda, explicabo voluptatibus quisquam temporibus
      sunt voluptatem placeat perferendis alias saepe beatae inventore illum
      dolorem fuga exercitationem!
      <p>
        Mergeti inapoi la <a href="/">pagina principala</a>.
      </p>
    </div>
  );
};

export default About;
