import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { recipesAPI, ingredientsAPI } from '../services/api';
import { Container } from '../components/Container';
import { ErrorMessage } from '../components/ErrorMessage';
import { SuccessMessage } from '../components/SuccessMessage';
import { useAuth } from '../context/AuthContext';

export function CreateRecipePage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const [selectedIngredients, setSelectedIngredients] = useState([]); // массив объектов {id, amount}
  const [loading, setLoading] = useState(false);
  const [loadingIngredients, setLoadingIngredients] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();
  const { userId } = useAuth();

  useEffect(() => {
    loadIngredients();
  }, []);

  const loadIngredients = async () => {
    try {
      setLoadingIngredients(true);
      const data = await ingredientsAPI.getAll();
      setIngredients(Array.isArray(data) ? data : data.ingredients || []);
    } catch (err) {
      setError(
        err.response?.data?.message || 'Ошибка при загрузке ингредиентов'
      );
    } finally {
      setLoadingIngredients(false);
    }
  };

  const handleIngredientChange = (ingredientId, checked) => {
    if (checked) {
      setSelectedIngredients((prev) => {
        if (!prev.find(item => item.id === ingredientId)) {
          return [...prev, { id: ingredientId, amount: '' }];
        }
        return prev;
      });
    } else {
      setSelectedIngredients((prev) => 
        prev.filter((item) => item.id !== ingredientId)
      );
    }
  };

  const handleAmountChange = (ingredientId, amount) => {
    setSelectedIngredients((prev) =>
      prev.map((item) =>
        item.id === ingredientId ? { ...item, amount } : item
      )
    );
  };

  const getIngredientAmount = (ingredientId) => {
    const item = selectedIngredients.find(item => item.id === ingredientId);
    return item ? item.amount : '';
  };

  const isIngredientSelected = (ingredientId) => {
    return selectedIngredients.some(item => item.id === ingredientId);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!title || !description || !duration) {
      setError('Пожалуйста, заполните все поля');
      return;
    }

    if (!userId) {
      setError('Необходимо войти в систему');
      return;
    }

    if (selectedIngredients.length === 0) {
      setError('Пожалуйста, выберите хотя бы один ингредиент');
      return;
    }

    // Проверяем, что для всех ингредиентов указано количество
    const ingredientsWithAmounts = selectedIngredients.map(item => ({
      id: item.id,
      amount: parseInt(item.amount, 10)
    }));

    const hasInvalidAmount = ingredientsWithAmounts.some(item => 
      isNaN(item.amount) || item.amount <= 0
    );

    if (hasInvalidAmount) {
      setError('Пожалуйста, укажите корректное количество для всех ингредиентов');
      return;
    }

    const durationNum = parseInt(duration, 10);
    if (isNaN(durationNum) || durationNum <= 0) {
      setError('Время приготовления должно быть положительным числом');
      return;
    }

    setLoading(true);
    try {
      await recipesAPI.create({
        title,
        description,
        duration: durationNum,
        author_id: userId,
        ingredients: ingredientsWithAmounts,
      });
      setSuccess('Рецепт успешно создан!');
      setTimeout(() => {
        navigate('/dashboard');
      }, 1500);
    } catch (err) {
      setError(
        err.response?.data?.error || err.response?.data?.message || 'Ошибка при создании рецепта'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <div className="max-w-2xl mx-auto mt-10 mb-12">
        <div className="bg-white/90 backdrop-blur-sm p-10 rounded-3xl shadow-2xl border border-orange-100">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-400 to-red-500 rounded-2xl mb-4 shadow-lg">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              Создать новый рецепт
            </h2>
            <p className="text-gray-500 mt-2">Поделитесь своим кулинарным шедевром</p>
          </div>

          <ErrorMessage message={error} onClose={() => setError('')} />
          <SuccessMessage message={success} onClose={() => setSuccess('')} />

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Название рецепта *
              </label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all outline-none"
                placeholder="Название рецепта"
                disabled={loading}
              />
            </div>

            <div>
              <label
                htmlFor="description"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Описание *
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows="4"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all outline-none resize-none"
                placeholder="Описание рецепта"
                disabled={loading}
              />
            </div>

            <div>
              <label
                htmlFor="duration"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Время приготовления (мин) *
              </label>
              <input
                id="duration"
                type="number"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                min="1"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all outline-none"
                placeholder="30"
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Ингредиенты * {loadingIngredients && '(загрузка...)'}
              </label>
              {loadingIngredients ? (
                <div className="text-center py-8 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
                  <div className="inline-block animate-spin rounded-full h-8 w-8 border-2 border-orange-500 border-t-transparent"></div>
                  <p className="mt-2 text-gray-500">Загрузка ингредиентов...</p>
                </div>
              ) : ingredients.length === 0 ? (
                <div className="text-center py-8 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
                  <p className="text-gray-500">Ингредиенты не найдены</p>
                </div>
              ) : (
                <div className="border-2 border-gray-200 rounded-xl p-4 max-h-96 overflow-y-auto bg-gray-50">
                  <div className="space-y-3">
                    {ingredients.map((ingredient) => {
                      const isSelected = isIngredientSelected(ingredient.id);
                      const amount = getIngredientAmount(ingredient.id);
                      
                      return (
                        <div
                          key={ingredient.id}
                          className={`p-3 rounded-lg transition-all ${
                            isSelected ? 'bg-white border-2 border-orange-300' : 'border-2 border-transparent hover:bg-white'
                          }`}
                        >
                          <div className="flex items-center space-x-3 mb-2">
                            <input
                              type="checkbox"
                              checked={isSelected}
                              onChange={(e) => handleIngredientChange(ingredient.id, e.target.checked)}
                              className="w-5 h-5 text-orange-600 focus:ring-orange-500 border-gray-300 rounded focus:ring-2"
                              disabled={loading}
                            />
                            <span className="text-gray-700 font-medium flex-1">
                              {ingredient.name}
                            </span>
                          </div>
                          {isSelected && (
                            <div className="mt-2 ml-8">
                              <label className="block text-xs font-medium text-gray-600 mb-1">
                                Количество (грамм) *
                              </label>
                              <input
                                type="number"
                                value={amount}
                                onChange={(e) => handleAmountChange(ingredient.id, e.target.value)}
                                min="1"
                                placeholder="100"
                                className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all outline-none text-sm"
                                disabled={loading}
                              />
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
              {selectedIngredients.length > 0 && (
                <p className="mt-3 text-sm font-semibold text-orange-600">
                  Выбрано ингредиентов: {selectedIngredients.length}
                </p>
              )}
            </div>

            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-3 px-4 rounded-xl transition-all shadow-lg hover:shadow-xl transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Создание...
                  </span>
                ) : 'Создать рецепт'}
              </button>
              <button
                type="button"
                onClick={() => navigate('/dashboard')}
                disabled={loading}
                className="px-6 py-3 border-2 border-gray-300 rounded-xl hover:bg-gray-50 transition-colors disabled:opacity-50 font-semibold"
              >
                Отмена
              </button>
            </div>
          </form>
        </div>
      </div>
    </Container>
  );
}

