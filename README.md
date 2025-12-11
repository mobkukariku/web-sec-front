# Приложение рецептов - Frontend

Веб-приложение для управления рецептами, построенное на React, Tailwind CSS и Axios.

## Функционал

- **Регистрация и авторизация пользователей**
- **Просмотр списка рецептов** с поиском по названию
- **Создание новых рецептов** с выбором ингредиентов
- **Просмотр деталей рецепта** с полной информацией
- **Адаптивный дизайн** с использованием Tailwind CSS

## Технологии

- React 19
- React Router DOM
- Tailwind CSS
- Axios
- Vite

## Установка и запуск

1. Установите зависимости:
```bash
npm install
```

2. Создайте файл `.env` в корне проекта и укажите URL вашего API:
```env
VITE_API_URL=http://localhost:3000/api
```

3. Запустите dev-сервер:
```bash
npm run dev
```

4. Откройте браузер по адресу `http://localhost:5173`

## Структура проекта

```
src/
├── components/          # Переиспользуемые компоненты
│   ├── Container.jsx
│   ├── Navbar.jsx
│   ├── RecipeCard.jsx
│   ├── IngredientList.jsx
│   ├── ErrorMessage.jsx
│   ├── SuccessMessage.jsx
│   └── ProtectedRoute.jsx
├── contexts/            # React контексты
│   └── AuthContext.jsx
├── pages/               # Страницы приложения
│   ├── LoginPage.jsx
│   ├── RegisterPage.jsx
│   ├── DashboardPage.jsx
│   ├── CreateRecipePage.jsx
│   └── RecipeDetailsPage.jsx
├── services/            # API сервисы
│   └── api.js
├── App.jsx
└── main.jsx
```

## API Endpoints

Приложение ожидает следующие endpoints от бэкенда:

- `POST /api/auth/register` - Регистрация пользователя
- `POST /api/auth/login` - Вход пользователя
- `GET /api/recipes` - Получить список рецептов (с опциональным параметром `search`)
- `GET /api/recipes/:id` - Получить детали рецепта
- `POST /api/recipes` - Создать новый рецепт
- `GET /api/ingredients` - Получить список ингредиентов

## Формат данных

### Регистрация/Вход
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

### Создание рецепта
```json
{
  "name": "Название рецепта",
  "description": "Описание рецепта",
  "cookingTime": 30,
  "difficulty": 3,
  "ingredientIds": [1, 2, 3]
}
```

## Защищенные маршруты

Следующие страницы требуют авторизации:
- `/` - Главная страница (Dashboard)
- `/create-recipe` - Создание рецепта
- `/recipes/:id` - Детали рецепта

Неавторизованные пользователи будут перенаправлены на страницу входа.

## Сборка для production

```bash
npm run build
```

Собранные файлы будут в папке `dist/`.
