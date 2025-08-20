import { Loading } from './Components';

export default function NotFound() {
  return (
    <Loading
      darkMode={true}
      pageTitle="Página não encontrada"
    >
      Ooops, página não encontrada!
    </Loading>
  )
}