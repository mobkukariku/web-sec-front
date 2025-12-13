import { Link } from 'react-router-dom';

export const RecipeCard = ({ recipe }) => {


  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 border border-orange-100 hover:border-orange-300 hover:-translate-y-1">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-2xl font-bold text-gray-800 pr-2">{recipe.title}</h3>
      </div>
      
      <p className="text-gray-600 mb-5 line-clamp-2 leading-relaxed">{recipe.description}</p>
      
      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div className="flex items-center text-orange-600 text-sm font-medium">
          <svg
            className="w-5 h-5 mr-2"
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
          <span>{recipe.duration} мин</span>
        </div>
        
        <Link
          to={`/recipes/${recipe.id}`}
          className="bg-linear-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-5 py-2 rounded-lg transition-all font-semibold shadow-md hover:shadow-lg transform hover:scale-105"
        >
          Посмотреть
        </Link>
      </div>
    </div>
  );
};

