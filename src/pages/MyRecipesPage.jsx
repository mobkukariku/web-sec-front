import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { recipesAPI } from '../services/api';
import { Container } from '../components/Container';
import { RecipeCard } from '../components/RecipeCard';
import { ErrorMessage } from '../components/ErrorMessage';
import { useAuth } from '../context/AuthContext';

export function MyRecipesPage() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { userId } = useAuth();

  useEffect(() => {
    if (userId) {
      loadMyRecipes();
    }
  }, [userId]);

  const loadMyRecipes = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await recipesAPI.getMyRecipes();
      setRecipes(Array.isArray(data) ? data : data.recipes || []);
    } catch (err) {
      setError(
        err.response?.data?.error || err.response?.data?.message || 'Ошибка при загрузке рецептов'
      );
    } finally {
      setLoading(false);
    }
  };

  if (!userId) {
    return (
      <Container>
        <div className="mt-8 text-center">
          <p className="text-gray-600 text-lg">Необходимо войти в систему</p>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <div className="mt-10 mb-12">
        <div className="text-center mb-10">
          <h1 className="text-5xl font-bold mb-3">
            <span className="bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 bg-clip-text text-transparent">
              Мои рецепты
            </span>
          </h1>
          <p className="text-gray-600 text-lg">Управляйте своими кулинарными шедеврами</p>
        </div>

        <ErrorMessage message={error} onClose={() => setError('')} />

        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-orange-500 border-t-transparent"></div>
            <p className="mt-6 text-gray-600 text-lg font-medium">Загрузка рецептов...</p>
          </div>
        ) : recipes.length === 0 ? (
          <div className="text-center py-20 bg-white/60 backdrop-blur-sm rounded-2xl border-2 border-dashed border-orange-200">
            <svg className="w-20 h-20 mx-auto text-orange-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p className="text-gray-600 text-xl font-medium mb-4">
              У вас пока нет рецептов
            </p>
            <Link
              to="/create-recipe"
              className="inline-block bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-6 py-3 rounded-xl transition-all shadow-lg hover:shadow-xl font-semibold"
            >
              Создать первый рецепт
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recipes.map((recipe) => (
              <div key={recipe.id} className="relative">
                <RecipeCard recipe={recipe} />
                <Link
                  to={`/edit-recipe/${recipe.id}`}
                  className="absolute top-4 right-4 bg-white/90 hover:bg-white text-orange-600 p-2 rounded-lg shadow-md hover:shadow-lg transition-all"
                  title="Редактировать"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </Container>
  );
}



