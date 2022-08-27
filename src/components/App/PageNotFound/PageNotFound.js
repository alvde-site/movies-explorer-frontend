import React from "react";

import "./PageNotFound.css";

function PageNotFound({ onBack }) {
  function handleBack() {
    onBack();
  }
  return (
    <div className="not-found">
      <h3 className="not-found__title">404</h3>
      <p className="not-found__text">Страница не найдена</p>
      <button className="not-found__to-main" onClick={handleBack}>
        Назад
      </button>
    </div>
  );
}

export default PageNotFound;
