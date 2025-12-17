import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Container } from '../components/Container';
import { ErrorMessage } from '../components/ErrorMessage';
import {useAuth} from "../context/AuthContext.jsx";

export function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { register } = useAuth();


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');


    if (!name || !email || !password || !confirmPassword) {
      setError('Пожалуйста, заполните все поля');
      return;
    }

    setLoading(true);
    try {
      const result = await register(name, email, password);
      if(result && result.userId) {
        navigate('/dashboard');
      } else {
        setError(result?.error || 'Ошибка регистрации');
      }
    } catch (err) {
      setError(err.response?.data?.error || err.message || 'Ошибка регистрации');
    } finally {
      setLoading(false);
    }
  }




  return (
    <Container>
      <div className="max-w-md mx-auto mt-12 mb-12">
        <div className="bg-white/90 backdrop-blur-sm p-10 rounded-3xl shadow-2xl border border-orange-100">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-400 to-red-500 rounded-2xl mb-4 shadow-lg">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold bg-linear-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              Создать аккаунт
            </h2>
            <p className="text-gray-500 mt-2">Присоединяйтесь к нам!</p>
          </div>

          <ErrorMessage message={error} onClose={() => setError('')} />

          <form  onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Имя *
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all outline-none"
                placeholder="Ваше имя"
                disabled={loading}
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Email *
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all outline-none"
                placeholder="example@mail.com"
                disabled={loading}
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Пароль *
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all outline-none"
                placeholder="Минимум 6 символов"
                disabled={loading}
              />
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Подтвердите пароль *
              </label>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all outline-none"
                placeholder="Повторите пароль"
                disabled={loading}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-3 px-4 rounded-xl transition-all shadow-lg hover:shadow-xl transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Регистрация...
                </span>
              ) : 'Зарегистрироваться'}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600">
            Уже есть аккаунт?{' '}
            <Link to="/login" className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700">
              Войти
            </Link>
          </p>
        </div>
      </div>
    </Container>
  );
}

