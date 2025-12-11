import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { recipesAPI } from '../services/api';
import { Container } from '../components/Container';
import { IngredientList } from '../components/IngredientList';
import { ErrorMessage } from '../components/ErrorMessage';

export function RecipeDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadRecipe();
  }, [id]);

  const loadRecipe = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await recipesAPI.getById(id);
      setRecipe(data);
    } catch (err) {
      setError(
        err.response?.data?.message || 'Ошибка при загрузке рецепта'
      );
    } finally {
      setLoading(false);
    }
  };

  const getDifficultyColor = (difficulty) => {
    const colors = {
      1: 'bg-gradient-to-r from-green-400 to-emerald-500 text-white',
      2: 'bg-gradient-to-r from-blue-400 to-cyan-500 text-white',
      3: 'bg-gradient-to-r from-yellow-400 to-amber-500 text-white',
      4: 'bg-gradient-to-r from-orange-400 to-red-500 text-white',
      5: 'bg-gradient-to-r from-red-500 to-pink-600 text-white',
    };
    return colors[difficulty] || colors[1];
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Не указано';
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return (
      <Container>
        <div className="text-center py-20 mt-8">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-orange-500 border-t-transparent"></div>
          <p className="mt-6 text-gray-600 text-lg font-medium">Загрузка рецепта...</p>
        </div>
      </Container>
    );
  }

  if (error && !recipe) {
    return (
      <Container>
        <div className="mt-8">
          <ErrorMessage message={error} />
          <button
            onClick={() => navigate('/')}
            className="mt-4 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-6 py-3 rounded-xl transition-all shadow-lg hover:shadow-xl font-semibold"
          >
            Вернуться на главную
          </button>
        </div>
      </Container>
    );
  }

  if (!recipe) {
    return (
      <Container>
        <div className="mt-8 text-center">
          <p className="text-gray-600 text-xl font-medium mb-4">Рецепт не найден</p>
          <button
            onClick={() => navigate('/')}
            className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-6 py-3 rounded-xl transition-all shadow-lg hover:shadow-xl font-semibold"
          >
            Вернуться на главную
          </button>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <div className="max-w-3xl mx-auto mt-10 mb-12">
        <button
          onClick={() => navigate('/')}
          className="mb-6 text-orange-600 hover:text-orange-700 flex items-center font-semibold transition-colors group"
        >
          <svg
            className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Назад к рецептам
        </button>

        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-10 border border-orange-100">
          <div className="flex justify-between items-start mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent pr-4">
              {recipe.name}
            </h1>
            <span
              className={`px-4 py-2 rounded-full text-sm font-bold shadow-md ${getDifficultyColor(
                recipe.difficulty
              )}`}
            >
              {recipe.difficulty}/5
            </span>
          </div>

          <div className="mb-8">
            <p className="text-gray-700 text-lg leading-relaxed">
              {recipe.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div className="bg-gradient-to-br from-orange-50 to-red-50 p-5 rounded-xl border border-orange-100">
              <div className="flex items-center text-orange-700">
                <div className="bg-orange-100 p-2 rounded-lg mr-3">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <span className="font-bold block">Время приготовления</span>
                  <span className="text-sm">{recipe.cookingTime} минут</span>
                </div>
              </div>
            </div>

            {recipe.author && (
              <div className="bg-gradient-to-br from-orange-50 to-red-50 p-5 rounded-xl border border-orange-100">
                <div className="flex items-center text-orange-700">
                  <div className="bg-orange-100 p-2 rounded-lg mr-3">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>
                  <div>
                    <span className="font-bold block">Автор</span>
                    <span className="text-sm">
                      {typeof recipe.author === 'object'
                        ? recipe.author.email
                        : recipe.author}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="mb-8 bg-gray-50 p-6 rounded-xl border border-gray-100">
            <IngredientList ingredients={recipe.ingredients || []} />
          </div>

          <div className="border-t border-gray-200 pt-6 text-sm text-gray-500">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {recipe.createdAt && (
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="font-semibold">Создан:</span>{' '}
                  <span className="ml-1">{formatDate(recipe.createdAt)}</span>
                </div>
              )}
              {recipe.updatedAt && (
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  <span className="font-semibold">Обновлен:</span>{' '}
                  <span className="ml-1">{formatDate(recipe.updatedAt)}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}

