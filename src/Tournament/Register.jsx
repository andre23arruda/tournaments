import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import toast from 'react-hot-toast';
import { cpf } from 'cpf-cnpj-validator';
import { Footer, Loading, LogoHeader } from '../Components';
import { formatDate } from '../utils';


function Form({ tipo, formData, handleChange, handleBlur, errors }) {
    return (
        <div className="space-y-6">
            <div className={`grid grid-cols-1 gap-6 ${tipo === 'D' ? 'md:grid-cols-2' : ''}`}>
                {/* Jogador 1 */}
                <div className="space-y-4 p-4 bg-gray-100 rounded-lg">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">
                        {tipo === 'D' ? 'Jogador 1' : 'Jogador'}
                    </h3>

                    <div>
                        <label htmlFor="player1" className="block text-sm font-medium text-gray-700 mb-2">
                            Nome Completo *
                        </label>
                        <input
                            type="text"
                            id="player1"
                            name="player1"
                            value={formData.player1}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            required
                            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition ${
                                errors.player1 ? 'border-red-500' : 'border-gray-300'
                            }`}
                            placeholder="João Silva"
                        />
                        {errors.player1 && (
                            <p className="text-red-500 text-sm mt-1">{errors.player1}</p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="cpfPlayer1" className="block text-sm font-medium text-gray-700 mb-2">
                            CPF (apenas números) *
                        </label>
                        <input
                            type="text"
                            id="cpfPlayer1"
                            name="cpfPlayer1"
                            value={formData.cpfPlayer1}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            required
                            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition ${
                                errors.cpfPlayer1 ? 'border-red-500' : 'border-gray-300'
                            }`}
                            placeholder="12345678900"
                            maxLength="14"
                        />
                        {errors.cpfPlayer1 && (
                            <p className="text-red-500 text-sm mt-1">{errors.cpfPlayer1}</p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="phonePlayer1" className="block text-sm font-medium text-gray-700 mb-2">
                            Telefone *
                        </label>
                        <input
                            type="tel"
                            id="phonePlayer1"
                            name="phonePlayer1"
                            value={formData.phonePlayer1}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            required
                            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition ${
                                errors.phonePlayer1 ? 'border-red-500' : 'border-gray-300'
                            }`}
                            placeholder="31 999999999"
                            maxLength="15"
                        />
                        {errors.phonePlayer1 && (
                            <p className="text-red-500 text-sm mt-1">{errors.phonePlayer1}</p>
                        )}
                    </div>
                </div>

                {/* Jogador 2 - Apenas para tipo 'D' (Dupla) */}
                {tipo === 'D' && (
                    <div className="space-y-4 p-4 bg-gray-100 rounded-lg">
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">Jogador 2</h3>

                        <div>
                            <label htmlFor="player2" className="block text-sm font-medium text-gray-700 mb-2">
                                Nome Completo *
                            </label>
                            <input
                                type="text"
                                id="player2"
                                name="player2"
                                value={formData.player2}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                required
                                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition ${
                                    errors.player2 ? 'border-red-500' : 'border-gray-300'
                                }`}
                                placeholder="Maria Santos"
                            />
                            {errors.player2 && (
                                <p className="text-red-500 text-sm mt-1">{errors.player2}</p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="cpfPlayer2" className="block text-sm font-medium text-gray-700 mb-2">
                                CPF (apenas números) *
                            </label>
                            <input
                                type="text"
                                id="cpfPlayer2"
                                name="cpfPlayer2"
                                value={formData.cpfPlayer2}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                required
                                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition ${
                                    errors.cpfPlayer2 ? 'border-red-500' : 'border-gray-300'
                                }`}
                                placeholder="12345678900"
                                maxLength="14"
                            />
                            {errors.cpfPlayer2 && (
                                <p className="text-red-500 text-sm mt-1">{errors.cpfPlayer2}</p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="phonePlayer2" className="block text-sm font-medium text-gray-700 mb-2">
                                Telefone *
                            </label>
                            <input
                                type="tel"
                                id="phonePlayer2"
                                name="phonePlayer2"
                                value={formData.phonePlayer2}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                required
                                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition ${
                                    errors.phonePlayer2 ? 'border-red-500' : 'border-gray-300'
                                }`}
                                placeholder="31 999999999"
                                maxLength="15"
                            />
                            {errors.phonePlayer2 && (
                                <p className="text-red-500 text-sm mt-1">{errors.phonePlayer2}</p>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}


function RegisterForm({ csrfToken, tournamentData, formData, setFormData, setStep, tournamentId }) {
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const validateField = (name, value) => {
        switch (name) {
            case 'player1':
            case 'player2':
                if (!value || value.trim().length < 3) {
                    return 'Nome deve ter pelo menos 3 caracteres';
                }
                if (value.trim().length > 100) {
                    return 'Nome deve ter no máximo 100 caracteres';
                }
                // Validar se tem pelo menos nome e sobrenome
                if (value.trim().split(' ').length < 2) {
                    return 'Digite nome e sobrenome';
                }
                return '';

            case 'cpfPlayer1':
            case 'cpfPlayer2':
                if (!value) {
                    return 'CPF é obrigatório';
                }
                // Remove caracteres não numéricos
                const cleanCpf = value.replace(/\D/g, '');
                if (cleanCpf.length !== 11) {
                    return 'CPF deve ter 11 dígitos';
                }
                if (!cpf.isValid(value)) {
                    return 'CPF inválido';
                }
                // Verifica se os CPFs são diferentes (apenas para duplas)
                if (name === 'cpfPlayer2' && tournamentData?.tipo === 'D') {
                    const cpf1 = formData.cpfPlayer1.replace(/\D/g, '');
                    const cpf2 = value.replace(/\D/g, '');
                    if (cpf1 === cpf2) {
                        return 'Os CPFs dos jogadores devem ser diferentes';
                    }
                }
                return '';

            case 'phonePlayer1':
            case 'phonePlayer2':
                if (!value) {
                    return 'Telefone é obrigatório';
                }
                // Remove caracteres não numéricos
                const cleanPhone = value.replace(/\D/g, '');
                if (cleanPhone.length < 10) {
                    return 'Telefone deve ter pelo menos 10 dígitos';
                }
                if (cleanPhone.length > 11) {
                    return 'Telefone deve ter no máximo 11 dígitos';
                }
                return '';

            default:
                return '';
        }
    };

    function validateAll() {
        const newErrors = {};
        const fieldsToValidate = tournamentData?.tipo === 'D'
            ? ['player1', 'cpfPlayer1', 'phonePlayer1', 'player2', 'cpfPlayer2', 'phonePlayer2']
            : ['player1', 'cpfPlayer1', 'phonePlayer1'];

        fieldsToValidate.forEach(field => {
            const error = validateField(field, formData[field]);
            if (error) {
                newErrors[field] = error;
            }
        });

        return newErrors;
    }

    function isFormValid() {
        if (tournamentData?.tipo === 'D') {
            return (
                formData.player1.trim().split(' ').length > 1 &&
                cpf.isValid(formData.cpfPlayer1) &&
                formData.phonePlayer1 &&
                formData.player2.trim().split(' ').length > 1 &&
                cpf.isValid(formData.cpfPlayer2) &&
                formData.phonePlayer2 &&
                formData.cpfPlayer1.replace(/\D/g, '') !== formData.cpfPlayer2.replace(/\D/g, '')
            );
        } else {
            return (
                formData.player1 &&
                cpf.isValid(formData.cpfPlayer1) &&
                formData.phonePlayer1
            );
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        let newValue = value; // Variável para armazenar o valor filtrado

        if (name === 'cpfPlayer1' || name === 'cpfPlayer2') {
            newValue = value.replace(/[^0-9]/g, '');
        }

        setFormData({
            ...formData,
            [name]: newValue // Usa o newValue (filtrado ou original)
        });

        // Limpa o erro do campo ao digitar
        if (errors[name]) {
            setErrors({
                ...errors,
                [name]: ''
            });
        }
    };

    const handleBlur = (e) => {
        const { name, value } = e.target;
        const error = validateField(name, value);
        if (error) {
            setErrors({
                ...errors,
                [name]: error
            });
        }
    };

    async function handleSubmit(e) {
        e.preventDefault();

        // Validar todos os campos antes de enviar
        const validationErrors = validateAll();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            toast.error('Por favor, corrija os erros no formulário');
            return;
        }

        setLoading(true);

        try {
            const API_ROUTE = import.meta.env.VITE_APP_ROUTE_API
            const response = await fetch(`${API_ROUTE}/torneio/${tournamentId}/register`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrfToken,
                },
                body: JSON.stringify(formData)
            });
            const data = await response.json();

            if (response.ok) {
                toast.success(data.msg || 'Inscrição realizada com sucesso!');
                const newUrl = `${window.location.pathname}?status=success`
                window.history.replaceState({}, '', newUrl)
                setStep('success');
            } else {
                toast.error(data.msg || 'Erro ao realizar inscrição');
                if (data.msg.includes('CPF')) {
                    setFormData({
                        ...formData,
                        cpfPlayer1: '',
                        cpfPlayer2: ''
                    });
                }
                // setStep('error');
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error('Erro de conexão. Tente novamente.');
            setStep('error');
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-4xl mt-10">
            <h2 className="text-4xl font-bold text-gray-800 text-center">
                {tournamentData?.nome}
                <br />
                <span className="text-2xl text-gray-600">
                    {formatDate(tournamentData?.data)}
                </span>
            </h2>

            <br />

            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Faça sua inscrição</h2>
                {csrfToken && (
                    <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded">
                        🔒 Seguro
                    </span>
                )}
            </div>

            {!csrfToken && (
                <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 px-4 py-3 rounded-lg mb-4 text-sm">
                    Carregando dados...
                </div>
            )}

            <div className="space-y-6">
                <Form
                    tipo={tournamentData?.tipo}
                    formData={formData}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    errors={errors}
                />

                <button
                    onClick={handleSubmit}
                    disabled={loading || !csrfToken || !isFormValid()}
                    className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                    {loading ? 'Enviando...' : 'Enviar Inscrição'}
                </button>
            </div>
        </div>
    );
}


function Success() {
    document.title = 'Inscrição realizada com sucesso!';

    return (
        <div className="bg-green-50 border border-green-200 text-green-700 p-10 rounded-lg">
            <h2 className="text-3xl font-semibold">
                ✓ Inscrição enviada com sucesso!
            </h2>
        </div>
    );
}


function Error() {
    document.title = 'Erro ao enviar inscrição!';

    return (
        <div className="bg-red-50 border border-red-200 text-red-700 p-10 rounded-lg">
            <h2 className="text-3xl font-semibold">
                ✗ Erro ao enviar inscrição!
            </h2>
        </div>
    );
}


export default function Register() {
    const { tournamentId } = useParams();
    const [tournamentData, setTournamentData] = useState({
        nome: '',
        data: '',
        tipo: '',
    });
    const [formData, setFormData] = useState({
        player1: '',
        cpfPlayer1: '',
        phonePlayer1: '',
        player2: '',
        cpfPlayer2: '',
        phonePlayer2: '',
    });
    const [error, setError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [csrfToken, setCsrfToken] = useState('');
    const [step, setStep] = useState('form');
    const darkMode = false;
    const navigate = useNavigate();

    useEffect(() => {
        setTimeout(async () => {
			const params = new URLSearchParams(window.location.search)
			const status = params.get('status') || ''
			if (status === 'success') {
				setStep('success')
                setIsLoading(false);
			} else {
                await loadData();
                fetchCsrfToken();
            }
		}, 500)
        // eslint-disable-next-line
    }, []);

    async function loadData() {
        setIsLoading(true);
        const API_ROUTE = import.meta.env.VITE_APP_ROUTE_API
        const resp = await fetch(`${API_ROUTE}/torneio/${tournamentId}/register`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        const data = await resp.json()

        if (resp.status === 301) {
            toast.error(data.msg)
            navigate(`/torneio/${tournamentId}`);
            return
        }

        if (!resp.ok) {
            try {
                toast.error(data.msg || 'Erro ao carregar os dados do torneio!')
            } catch (error) {
                console.error('Erro ao carregar os dados do torneio:', error);
            }
            setError(true);
            setIsLoading(false);
            return;
        }

        setTournamentData(data);
        document.title = `Faça sua inscrição em ${data.nome}`;
        setIsLoading(false);
    }

    async function fetchCsrfToken() {
        try {
            const API_ROUTE = import.meta.env.VITE_APP_ROUTE_API
            const response = await fetch(`${API_ROUTE}/csrf`, {
                method: 'GET',
                credentials: 'include',
            });

            if (response.ok) {
                const data = await response.json();
                setCsrfToken(data.token);
            } else {
                console.error('Failed to fetch CSRF token');
            }
        } catch (error) {
            console.error('Error fetching CSRF token:', error);
        }
    }

    if (isLoading) {
        return (
            <Loading
                darkMode={darkMode}
                pageTitle="Carregando dados..."
            >
                Carregando dados...
            </Loading>
        );
    } else if (error) {
        return (
            <Loading
                darkMode={darkMode}
                pageTitle="Erro ao carregar!"
            >
                <p className="text-center">
                    Erro ao carregar o torneio.
                    <br />
                    Não é possível fazer inscrição.
                </p>
            </Loading>
        );
    }

    const render = {
        form: (
            <RegisterForm
                csrfToken={csrfToken}
                tournamentData={tournamentData}
                formData={formData}
                setFormData={setFormData}
                setStep={setStep}
                tournamentId={tournamentId}
            />
        ),
        success: <Success />,
        error: <Error />,
    }

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-between p-4 flex-col">
            <LogoHeader />

            {render[step]}

            <Footer />
        </div>
    );
}