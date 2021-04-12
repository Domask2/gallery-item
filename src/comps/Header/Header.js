import React from "react";
import Form from "./Form";

const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <div className="header__banner">
          <div className="header__title">
            <h2 className="header__title__h2">Галерея изображений</h2>
            <p className="header__title__p">
              Вы можете загрузить изображение в формате JPG, PNG указав в поле
              URL картинки, или загрузив файл в формате - JSON. Присутствует
              возможность добавить картинку drag-n-drop в уже готовую
              загруженную галерею.
            </p>
          </div>
          <Form />
        </div>
      </div>
    </header>
  );
};

export default Header;
