import { Link } from 'react-router-dom'
import { Trophy } from 'lucide-react';


export default function LogoHeader({ darkMode }) {
    return (
        <Link to="/" className="flex justify-center items-center gap-2 mb-4 pt-6">
            <Trophy className={`h-8 w-8 ${darkMode ? 'text-orange-400' : 'text-orange-600'}`} />
            <span className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Pódio
                <span className={`ml-1 ${darkMode ? 'text-orange-400' : 'text-orange-600'}`}>
                    Digital
                </span>
            </span>
        </Link>
    )
}
