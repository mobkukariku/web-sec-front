import { Link, useNavigate } from 'react-router-dom';
import {useAuth} from "../context/AuthContext.jsx";

export const Navbar = () => {
  const { userId, logout } = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-linear-to-r from-orange-500 via-red-500 to-pink-500 text-white shadow-xl">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link
            to="/"
            className="text-2xl font-bold hover:text-yellow-200 transition-colors flex items-center gap-2"
          >
            <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
              <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
            </svg>
            Рецепты
          </Link>

          <div className="flex items-center gap-4">
            {userId ? (
              <>
                <Link
                  to="/"
                  className="hover:text-yellow-200 transition-colors font-medium px-3 py-1 rounded-lg hover:bg-white/10"
                >
                  Главная
                </Link>
                <Link
                  to="/create-recipe"
                  className="hover:text-yellow-200 transition-colors font-medium px-3 py-1 rounded-lg hover:bg-white/10"
                >
                  Создать рецепт
                </Link>
                <Link
                  to="/my-recipes"
                  className="hover:text-yellow-200 transition-colors font-medium px-3 py-1 rounded-lg hover:bg-white/10"
                >
                  Мои рецепты
                </Link>
                <Link
                  to="/profile"
                  className="hover:text-yellow-200 transition-colors font-medium px-3 py-1 rounded-lg hover:bg-white/10"
                >
                  Профиль
                </Link>
                <button
                  onClick={handleLogout}
                  className="bg-white/20 hover:bg-white/30 backdrop-blur-sm px-4 py-2 rounded-lg transition-all font-medium shadow-md hover:shadow-lg"
                >
                  Выйти
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="hover:text-yellow-200 transition-colors font-medium px-3 py-1 rounded-lg hover:bg-white/10"
                >
                  Вход
                </Link>
                <Link
                  to="/register"
                  className="bg-white/20 hover:bg-white/30 backdrop-blur-sm px-4 py-2 rounded-lg transition-all font-medium shadow-md hover:shadow-lg"
                >
                  Регистрация
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

