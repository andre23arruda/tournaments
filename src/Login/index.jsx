import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { ArrowLeft, Loader2, Lock, LogIn, ShieldCheck, Mail, User } from 'lucide-react';
import { Footer, Loading, LogoHeader } from '../Components';

function LoginForm({ formData, handleChange, handleBlur, errors, loading, handleSubmit, csrfToken, step, setStep }) {
  if (step === 'credentials') {
    return (
      <div className="bg-white rounded-lg shadow-sm p-8 w-full max-w-4xl my-10 border border-gray-100">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-extrabold text-gray-800 uppercase">Hora do Jogo</h2>
          <p className="text-2xl text-gray-500 font-medium mt-2 tracking-tight">Vai criar um torneio?</p>
        </div>

        <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-100">
          <h3 className="text-xl font-bold text-gray-800">Identifique-se</h3>
          {csrfToken ? (
            <div className="flex items-center gap-1.5 text-xs text-green-600 bg-green-50 px-3 py-1.5 rounded-full font-semibold border border-green-100 uppercase tracking-wider">
              <ShieldCheck size={14} /> CONEXÃO SEGURA
            </div>
          ) : (
            <div className="flex items-center gap-1.5 text-xs text-amber-600 bg-amber-50 px-3 py-1.5 rounded-full font-semibold border border-amber-100 uppercase tracking-wider">
              <Loader2 size={14} className="animate-spin" /> VALIDANDO...
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-5 p-6 bg-gray-50 rounded-2xl border border-gray-200">
            <div>
              <label htmlFor="username" className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Usuário</label>
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
                  className={`w-full pl-11 pr-4 py-3 bg-white border rounded-xl focus:ring-4 focus:ring-orange-100 focus:border-orange-500 outline-none transition-all ${errors.username ? 'border-red-500' : 'border-gray-200'}`}
                  placeholder="Ex: adm.torneio"
                />
              </div>
              {errors.username && <p className="text-red-500 text-xs mt-1.5 font-medium ml-1">{errors.username}</p>}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Senha</label>
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
                  className={`w-full pl-11 pr-4 py-3 bg-white border rounded-xl focus:ring-4 focus:ring-orange-100 focus:border-orange-500 outline-none transition-all ${errors.password ? 'border-red-500' : 'border-gray-200'}`}
                  placeholder="••••••••"
                />
              </div>
              {errors.password && <p className="text-red-500 text-xs mt-1.5 font-medium ml-1">{errors.password}</p>}
            </div>
          </div>

          <button
            type="submit"
            disabled={loading || !csrfToken}
            className="group relative w-full bg-orange-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-orange-700 transition-all active:scale-[0.98] disabled:bg-gray-400 disabled:cursor-not-allowed shadow-lg shadow-orange-200 cursor-pointer"
          >
            <div className="flex items-center justify-center gap-2">
              {loading ? (
                <><Loader2 className="animate-spin" size={22} /><span>AUTENTICANDO...</span></>
              ) : (
                <><LogIn size={22} className="group-hover:translate-x-1 transition-transform" /><span>PRÓXIMO PASSO</span></>
              )}
            </div>
          </button>
        </form>
      </div>
    );
  }

  // step CODE
  return (
    <div className="bg-white rounded-lg shadow-sm p-8 w-full max-w-4xl my-10 border border-gray-100 animate-in fade-in zoom-in duration-300">
      <div className="text-center mb-10">
        <div className="flex justify-center mb-4">
          <div className="bg-orange-100 p-4 rounded-full text-orange-600">
            <Mail size={40} />
          </div>
        </div>
        <h2 className="text-3xl font-extrabold text-gray-800 uppercase">Verifique seu e-mail</h2>
        <p className="text-xl text-gray-500 font-medium mt-2">Enviamos um código de acesso de 6 dígitos para você</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="p-8 bg-gray-50 rounded-2xl border border-gray-200 text-center">
          <label htmlFor="otp_code" className="block text-sm font-bold text-gray-700 mb-4 uppercase tracking-widest">Código de Verificação</label>
          <input
            type="text"
            id="otp_code"
            name="otp_code"
            value={formData.otp_code}
            onChange={handleChange}
            required
            maxLength={6}
            autoFocus
            className="w-full max-w-xs mx-auto text-center text-4xl tracking-[1rem] py-4 bg-white border border-gray-200 rounded-xl focus:ring-4 focus:ring-orange-100 focus:border-orange-500 outline-none transition-all shadow-inner"
            placeholder="000000"
          />
          <p className="text-gray-400 text-sm mt-4 italic">O código expira em 5 minutos.</p>
        </div>

        <div className="space-y-3">
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-orange-700 transition-all active:scale-[0.98] disabled:bg-gray-400 shadow-lg shadow-orange-200 cursor-pointer flex items-center justify-center gap-2 uppercase tracking-wide"
          >
            {loading ? <Loader2 className="animate-spin" size={22} /> : <ShieldCheck size={22} />}
            <span>Verificar Código</span>
          </button>

          <button
            type="button"
            onClick={() => setStep('credentials')}
            className="w-full py-2 text-gray-500 hover:text-orange-600 transition-colors text-sm font-bold flex items-center justify-center gap-1 cursor-pointer uppercase tracking-tighter"
          >
            <ArrowLeft size={16} /> Voltar para o início
          </button>
        </div>
      </form>
    </div>
  );
}

export default function Login() {
  const [step, setStep] = useState('credentials');
  const [tempUserId, setTempUserId] = useState(null);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    otp_code: '',
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

  // const API_ROUTE = getApiRoute();
  const API_ROUTE = '/api';

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
    let finalValue = value;
    if (name === 'otp_code')
      finalValue = value.replace(/[^0-9]/g, '');
    setFormData(prev => ({ ...prev, [name]: finalValue }));
    if (errors[name])
      setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    if (!value) {
      setErrors(prev => ({ ...prev, [name]: 'Este campo é obrigatório' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (step === 'credentials') {
      if (!formData.username || !formData.password) {
        toast.error('Preencha todos os campos obrigatórios');
        return;
      }
      await handlePrimaryLogin();
    } else {
      if (formData.otp_code.length !== 6) {
        toast.error('O código deve ter 6 dígitos');
        return;
      }
      await handleVerifyOtp();
    }
  };

  // Etapa 1: Enviar Usuário/Senha e aguardar sinal de OTP
  async function handlePrimaryLogin() {
    setLoading(true);
    try {
      const response = await fetch(`${API_ROUTE}/staff-login`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': csrfToken,
        },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password
        })
      });

      const data = await response.json();
      if (response.ok && data.otp_required) {
        toast.success('Código enviado para o seu e-mail!');
        setTempUserId(data.user_id);
        setStep('otp');
      } else if (response.ok && data.success) {
        window.location.replace = `${API_ROUTE}${data.redirect_url}`;
      } else {
        toast.error(data.message || 'Credenciais inválidas.');
      }
    } catch (error) {
      toast.error('Erro de comunicação. Tente novamente mais tarde.');
    } finally {
      setLoading(false);
    }
  }

  // Etapa 2: Validar o código OTP enviado
  async function handleVerifyOtp() {
    setLoading(true);
    try {
      const response = await fetch(`${API_ROUTE}/check-otp`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': csrfToken,
        },
        body: JSON.stringify({
          user_id: tempUserId,
          otp_code: formData.otp_code
        })
      });

      const data = await response.json();
      if (response.ok && data.success) {
        toast.success('Acesso autorizado!');
        // setTimeout(() => {
        //   window.location.href = `${API_ROUTE}${data.redirect_url}`;
        // }, 1200);

        const link = document.createElement('a');
        link.href = `${API_ROUTE}${data.redirect_url}`;
        document.body.appendChild(link);
        setTimeout(() => {
          link.click();
        }, 1200);
      } else {
        toast.error(data.message || 'Código inválido ou expirado.');
      }
    } catch (error) {
      toast.error('Erro na verificação. Tente novamente.');
    } finally {
      setLoading(false);
    }
  }

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
            step={step}
            setStep={setStep}
          />
        </div>
      </main>

      <Footer />
    </div>
  );
}