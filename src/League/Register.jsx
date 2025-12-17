import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import toast from 'react-hot-toast';
import { cpf } from 'cpf-cnpj-validator';
import { Footer, Loading, LogoHeader, ShareLinkButton } from '../Components';
import { formatDate } from '../utils';


function ParticipantsList({ participants }) {
    if (!participants || participants.length === 0) {
        return (
            <div className="bg-white rounded-lg shadow-sm p-8 w-full max-w-4xl">
                <div className="text-center py-6 text-gray-500 bg-gray-100 rounded-xl mt-8 border border-dashed border-gray-300">
                    <p className="font-semibold">Ainda não há inscritos neste torneio.</p>
                    <p className="text-sm">Seja o primeiro a garantir sua vaga!</p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-lg shadow-sm p-8 w-full max-w-4xl">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b border-gray-200 pb-2">
                Inscritos ({participants.length})
            </h2>

            <div className="space-y-3 max-h-96 overflow-y-auto p-2 mb-4">
                {participants.map((p, index) => (
                    <div
                        key={index}
                        className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm flex flex-col justify-between items-start transition duration-150 ease-in-out hover:shadow-md max-w-md"
                    >
                        <div className="font-medium text-gray-800 flex flex-row">
                            <span className="text-orange-600 font-bold mr-2">{index + 1}.</span>
                            <div className="flex flex-col sm:flex-row sm:items-center">
                                <span className="truncate max-w-xs">{p}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}


function Form({ formData, handleChange, handleBlur, errors }) {
    return (
        <div className="space-y-6">
            <div className={`grid grid-cols-1`}>
                <div className="space-y-4 p-4 bg-gray-100 rounded-lg">
                    <div>
                        <label htmlFor="player" className="block text-sm font-medium text-gray-700 mb-2">
                            Nome e Sobrenome *
                        </label>
                        <input
                            type="text"
                            id="player"
                            name="player"
                            value={formData.player}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            required
                            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-200 focus:border-transparent outline-none transition ${
                                errors.player ? 'border-red-500' : 'border-gray-300'
                            }`}
                            placeholder="João Silva"
                        />
                        {errors.player && (
                            <p className="text-red-500 text-sm mt-1">{errors.player}</p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="cpfPlayer" className="block text-sm font-medium text-gray-700 mb-2">
                            CPF *
                        </label>
                        <input
                            type="text"
                            id="cpfPlayer"
                            name="cpfPlayer"
                            value={formData.cpfPlayer}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            required
                            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-200 focus:border-transparent outline-none transition ${
                                errors.cpfPlayer ? 'border-red-500' : 'border-gray-300'
                            }`}
                            placeholder="12345678900"
                            maxLength="14"
                        />
                        {errors.cpfPlayer && (
                            <p className="text-red-500 text-sm mt-1">{errors.cpfPlayer}</p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="phonePlayer" className="block text-sm font-medium text-gray-700 mb-2">
                            Telefone *
                        </label>
                        <input
                            type="tel"
                            id="phonePlayer"
                            name="phonePlayer"
                            value={formData.phonePlayer}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            required
                            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-200 focus:border-transparent outline-none transition ${
                                errors.phonePlayer ? 'border-red-500' : 'border-gray-300'
                            }`}
                            placeholder="(31) 99999-9999"
                            maxLength="15"
                        />
                        {errors.phonePlayer && (
                            <p className="text-red-500 text-sm mt-1">{errors.phonePlayer}</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}


function RegisterForm({ csrfToken, tournamentData, setTournamentData, formData, setFormData, setStep, tournamentId }) {
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const validateField = (name, value) => {
        switch (name) {
            case 'player':
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

            case 'cpfPlayer':
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
                return '';

            case 'phonePlayer':
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
        const fieldsToValidate = ['player', 'cpfPlayer', 'phonePlayer'];

        fieldsToValidate.forEach(field => {
            const error = validateField(field, formData[field]);
            if (error) {
                newErrors[field] = error;
            }
        });

        return newErrors;
    }

    function isFormValid() {
        return (
            formData.player &&
            cpf.isValid(formData.cpfPlayer) &&
            formData.phonePlayer
        );
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        let newValue = value; // Variável para armazenar o valor filtrado

        if (name === 'cpfPlayer') {
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
            const response = await fetch(`${API_ROUTE}/rei-rainha/${tournamentId}/register`, {
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
                setTournamentData({
                    ...tournamentData,
                    jogadores: [...tournamentData.jogadores, data.data]
                })
                const newUrl = `${window.location.pathname}?status=success`
                window.history.replaceState({}, '', newUrl)
                setStep('success');
            } else {
                toast.error(data.msg || 'Erro ao realizar inscrição');
                if (data.msg.includes('CPF')) {
                    setFormData({
                        ...formData,
                        cpfPlayer: '',
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
        <div className="bg-white rounded-lg shadow-sm p-8 w-full max-w-4xl my-10">
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
                    formData={formData}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    errors={errors}
                />

                <button
                    onClick={handleSubmit}
                    disabled={loading || !csrfToken || !isFormValid()}
                    className="w-full bg-orange-600 text-white py-3 rounded-lg font-semibold hover:bg-orange-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                    {loading ? 'Enviando...' : 'Enviar Inscrição'}
                </button>
            </div>
        </div>
    );
}


function Success({ tournamentData }) {
    document.title = 'Inscrição realizada com sucesso!';

    return (
        <div className="bg-white rounded-lg shadow-sm p-8 w-full max-w-4xl mb-10">
            <h2 className="text-3xl font-semibold text-center">
                {tournamentData?.nome}
                <br />
                <span className="text-2xl text-gray-600">
                    {formatDate(tournamentData.data)}
                </span>
            </h2>

            <div className="mt-6 text-center">
                <p className="text-lg text-green-600">
                    Sua inscrição foi realizada com sucesso!
                </p>
            </div>
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
        jogadores: [],
    });
    const [formData, setFormData] = useState({
        player: '',
        cpfPlayer: '',
        phonePlayer: '',
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
			}
            await loadData();
            fetchCsrfToken();
		}, 500)
        // eslint-disable-next-line
    }, []);

    async function loadData() {
        setIsLoading(true);
        const API_ROUTE = import.meta.env.VITE_APP_ROUTE_API
        const resp = await fetch(`${API_ROUTE}/rei-rainha/${tournamentId}/register`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        let data = {}
        try {
            data = await resp.json()
        } catch (error) {
            console.error('Erro ao carregar os dados do torneio:', error);
            setError(true);
            setIsLoading(false);
            return;
        }

        if (resp.status === 301) {
            toast.error(data.msg)
            navigate(`/rei-rainha/${tournamentId}`);
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
                setTournamentData={setTournamentData}
                formData={formData}
                setFormData={setFormData}
                setStep={setStep}
                tournamentId={tournamentId}
            />
        ),
        success: <Success tournamentData={tournamentData} />,
        error: <Error />,
    }

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-between p-4 flex-col">
            { step === 'form' && (
                <ShareLinkButton
                    pageName={tournamentData?.nome}
                    text="Faça sua inscrição em"
                />
            )}

            <LogoHeader />

            <div className="w-full max-w-4xl">
                {render[step]}

                <ParticipantsList participants={tournamentData.jogadores} />
            </div>

            <Footer />
        </div>
    );
}