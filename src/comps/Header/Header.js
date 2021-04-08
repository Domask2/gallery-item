import React from "react";
import Title from "../Title";

const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <div className="header__banner">
          <div className="title">
            <h2>
              Галерея изображений
              {/* <span className="blue">Serg</span> <span className="green">Gordeev</span>  */}
            </h2>
            <p>
              Вы можете загрузить изображение в формате JPG, PNG указав в поле
              URL картинки, или загрузив файл в формате - JSON. Присутствует возможность добавить картинку drag-n-drop в уже готовую загруженную галерею.
            </p>
          </div>
          <Title />
        </div>
      </div>
    </header>
  );
};

export default Header;
