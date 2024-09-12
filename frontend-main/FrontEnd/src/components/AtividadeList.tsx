// src/components/AtividadeList.tsx

import { useAtividadeData } from "../hooks/useAtividadeData";

const AtividadeList: React.FC = () => {
  const { data, isLoading, isError } = useAtividadeData();

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  if (isError) {
    return <div>Erro ao carregar as atividades</div>;
  }

  return (
    <div className="atividade-list">
      {data?.map((atividade) => (
        <div key={atividade.id} className="atividade">
          <h3>{atividade.title}</h3>
          <p>{atividade.description}</p>
        </div>
      ))}
    </div>
  );
};

export default AtividadeList;
