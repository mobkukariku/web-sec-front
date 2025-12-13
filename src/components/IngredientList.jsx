export const IngredientList = ({ ingredients }) => {
  if (!ingredients || ingredients.length === 0) {
    return (
      <div className="text-gray-500 text-center py-6">
        <svg className="w-12 h-12 mx-auto mb-2 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
        <p className="font-medium">Ингредиенты не указаны</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-4 flex items-center">
        <svg className="w-6 h-6 mr-2 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
        </svg>
        Ингредиенты
      </h3>
      <div className="flex flex-col gap-3">
        {ingredients.map((ingredient, index) => (
          <div
            key={index}
            className="flex items-center bg-white p-3 rounded-lg border border-orange-100 hover:border-orange-300 transition-colors shadow-sm"
          >
            <div className="w-2 h-2 bg-gradient-to-r from-orange-400 to-red-500 rounded-full mr-3"></div>
            <span className="text-gray-700 font-medium">
                {ingredient.name} - {ingredient.amount} грамм
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

