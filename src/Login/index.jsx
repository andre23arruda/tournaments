import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { User, Lock, LogIn, ShieldCheck, Loader2 } from 'lucide-react';
import { Footer, Loading, LogoHeader } from '../Components';

function LoginForm({ formData, handleChange, handleBlur, errors, loading, handleSubmit, csrfToken }) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-8 w-full max-w-4xl my-10 border border-gray-100">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-extrabold text-gray-800">
          Acesso Restrito
        </h2>

        <p className="text-2xl text-gray-500 font-medium mt-2">
          Área Administrativa
        </p>
      </div>

      <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-100">
        <h3 className="text-xl font-bold text-gray-800">Identifique-se</h3>

        {csrfToken ? (
          <div className="flex items-center gap-1.5 text-xs text-green-600 bg-green-50 px-3 py-1.5 rounded-full font-semibold border border-green-100">
            <ShieldCheck size={14} />

            CONEXÃO SEGURA
          </div>
        ) : (
          <div className="flex items-center gap-1.5 text-xs text-amber-600 bg-amber-50 px-3 py-1.5 rounded-full font-semibold border border-amber-100">
            <Loader2 size={14} className="animate-spin" />

            VALIDANDO...
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-5 p-6 bg-gray-50 rounded-2xl border border-gray-200">
          <div>
            <label htmlFor="username" className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">
              Usuário
            </label>

            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />

              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                onBlur={handleBlur}
                required
                className={`w-full pl-11 pr-4 py-3 bg-white border rounded-xl focus:ring-4 focus:ring-orange-100 focus:border-orange-500 outline-none transition-all ${
                  errors.username ? 'border-red-500' : 'border-gray-200'
                }`}
                placeholder="Ex: admin.torneio"
              />
            </div>

            {errors.username && (
              <p className="text-red-500 text-xs mt-1.5 font-medium ml-1">{errors.username}</p>
            )}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">
              Senha
            </label>

            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />

              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                onBlur={handleBlur}
                required
                className={`w-full pl-11 pr-4 py-3 bg-white border rounded-xl focus:ring-4 focus:ring-orange-100 focus:border-orange-500 outline-none transition-all ${
                  errors.password ? 'border-red-500' : 'border-gray-200'
                }`}
                placeholder="••••••••"
              />
            </div>

            {errors.password && (
              <p className="text-red-500 text-xs mt-1.5 font-medium ml-1">{errors.password}</p>
            )}
          </div>
        </div>

        <button
          type="submit"
          disabled={loading || !csrfToken}
          className="group relative w-full bg-orange-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-orange-700 transition-all active:scale-[0.98] disabled:bg-gray-400 disabled:cursor-not-allowed shadow-lg shadow-orange-200 cursor-pointer"
        >
          <div className="flex items-center justify-center gap-2">
            {loading ? (
              <>
                <Loader2 className="animate-spin" size={22} />

                <span>AUTENTICANDO...</span>
              </>
            ) : (
              <>
                <span>ENTRAR NO PAINEL</span>

                <LogIn size={22} className="group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </div>
        </button>
      </form>
    </div>
  );
}


export default function Login() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [csrfToken, setCsrfToken] = useState('');

  const getApiRoute = () => {
    try {
      // @ts-ignore
      return (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_APP_ROUTE_API)
        ? import.meta.env.VITE_APP_ROUTE_API
        : 'http://localhost:8000';
    } catch (e) {
      return 'http://localhost:8000';
    }
  };

  const API_ROUTE = getApiRoute();

  useEffect(() => {
    const init = async () => {
      await new Promise(resolve => setTimeout(resolve, 800));
      await fetchCsrfToken();
      setIsLoading(false);
    };
    init();
  }, []);

  async function fetchCsrfToken() {
    try {
      const response = await fetch(`${API_ROUTE}/csrf`, {
        method: 'GET',
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        setCsrfToken(data.token);
      }
    } catch (error) {
      console.error('Erro ao buscar CSRF token:', error);
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    if (!value) {
      setErrors(prev => ({ ...prev, [name]: 'Este campo é obrigatório' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.password) {
      toast.error('Preencha todos os campos obrigatórios');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API_ROUTE}/staff_login`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': csrfToken,
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      if (response.ok && data.success) {
        toast.success('Acesso autorizado! Redirecionando...');

        setTimeout(() => {
          window.location.href = `${API_ROUTE}${data.redirect_url}`;
        }, 1200);
      } else {
        toast.error(data.message || 'Credenciais inválidas ou sem permissão de Staff.');
      }
    } catch (error) {
      console.error('Erro no login:', error);
      toast.error('Erro de comunicação. Tente novamente mais tarde.');
    } finally {
      setLoading(false);
    }
  };

  if (isLoading) {
    return <Loading pageTitle="Acessar Painel" />;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <main className="flex-grow flex flex-col items-center justify-center p-4">
        <LogoHeader />

        <div className="w-full max-w-4xl flex justify-center">
          <LoginForm
            formData={formData}
            handleChange={handleChange}
            handleBlur={handleBlur}
            errors={errors}
            loading={loading}
            handleSubmit={handleSubmit}
            csrfToken={csrfToken}
          />
        </div>
      </main>

      <Footer />
    </div>
  );
}