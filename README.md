# Тестовое задание на позицию фронтенд-инженера
## Галерея изображений
[![Netlify Status](https://api.netlify.com/api/v1/badges/22a7b562-5c5b-400c-a661-6f4d2ab7dbaa/deploy-status)](https://app.netlify.com/sites/awesome-jang-1c8406/deploys)

## Задача
Галерея изображений на React JS. База данных - Firebase.
## Установка
Устанвока зависимостей:
```sh
npm install
```
Запуск проекта:
```sh
npm run start
```

## Страница должна содержать два компонента:
- Компонент загрузки картинок.
Должен быть реализован в виде поля ввода и кнопки “Загрузить”. В поле можно ввести урл до картинки или загрузить файл со списком картинок. Формат файла —JSON. Можно использовать данный файл, сделать его копию на стороннем сервере или просто сохранить и загружать его с локального компьютера.
- Галерея картинок.
Должен быть реализован в виде упорядоченного набора превью всех картинок, загруженных в галерею.

## Требования к галерее
- Картинки галереи размещены  рядами. Количество рядов не ограничено.
- Ряды одинаковы по ширине. 
- Все картинки в одном ряду одинаковы по высоте.
- У картинок сохранены пропорции.
- Интерфейс должен быть responsive, максимальная ширина контейнера — 860 px, минимальная – 320 px.
- Количество картинок в каждом ряду на максимальной ширине - 3. При сужении/расширении галереи их количество может меняться.
- Добавлен плейсхолдеры на время загрузки.
- Возможно добавить картинку drag-n-drop в уже готовую загруженную галерею.
- Есть возможность удалить картинку из галереи.

## Допольнительные ограничения
- Не допускатеься загрузка битых ссылок на картинки.
- Принимаються только JSON файлы (сам файл называется img.json - находиться в корне проекта).
- В drag-and-drop можно загружать картинки пачками. Допускается только загрузка картинок.