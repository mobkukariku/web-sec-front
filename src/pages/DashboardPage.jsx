import { useState, useEffect } from 'react';
import { recipesAPI } from '../services/api';
import { Container } from '../components/Container';
import { RecipeCard } from '../components/RecipeCard';
import { ErrorMessage } from '../components/ErrorMessage';

export function DashboardPage() {
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadRecipes();
  }, []);

  const loadRecipes = async (searchQuery = '') => {
    try {
      setLoading(true);
      setError('');
      const data = await recipesAPI.getAll(searchQuery);
      setRecipes(Array.isArray(data) ? data : data.recipes || []);
    } catch (err) {
      setError(
        err.response?.data?.message || 'Ошибка при загрузке рецептов'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    loadRecipes(search);
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    if (e.target.value === '') {
      loadRecipes('');
    }
  };

  return (
    <Container>
      <div className="mt-10 mb-12">
        <div className="text-center mb-10">
          <h1 className="text-5xl font-bold mb-3">
            <span className="bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 bg-clip-text text-transparent">
              Рецепты
            </span>
          </h1>
          <p className="text-gray-600 text-lg">Найдите свой идеальный рецепт</p>
        </div>

        <form onSubmit={handleSearch} className="mb-8">
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                value={search}
                onChange={handleSearchChange}
                placeholder="Поиск по названию рецепта..."
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all outline-none bg-white shadow-sm"
              />
            </div>
            <button
              type="submit"
              className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-8 py-3 rounded-xl transition-all shadow-lg hover:shadow-xl font-semibold transform hover:scale-105"
            >
              Поиск
            </button>
          </div>
        </form>

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
            <p className="text-gray-600 text-xl font-medium">
              {search
                ? 'Рецепты не найдены'
                : 'Рецепты пока не добавлены'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        )}
      </div>
    </Container>
  );
}

