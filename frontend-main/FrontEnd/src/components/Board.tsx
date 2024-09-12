import { useState } from "react";
import { Column } from "./Column";
import "./Board.css";
import { AiOutlinePlus } from "react-icons/ai";
import { useAtividadeData } from "../hooks/useAtividadeData";
import { postData } from "../hooks/ChangeAtividadeData";
import { AtividadeData } from "../interface/AtividadeData";

export function Board() {
  const [afazeres, setAfazeres] = useState<any[]>([]); // Tarefas na coluna 'Afazeres'
  const [fazendo, setFazendo] = useState<any[]>([]); // Tarefas na coluna 'Fazendo'
  const [feito, setFeito] = useState<any[]>([]); // Tarefas na coluna 'Feito'

  const LoadToBD = (task: AtividadeData) => {
    let load = true;

    //alert(typeof(task.column_id))

    if (task.column_id == 1) {
      for (let i = 0; i < afazeres.length; i++) {
        if (task.id == afazeres[i].id) {
          load = false;
        }
      }
      if (load) {
        postData(task);
      }
    } else if (task.column_id == 2) {
      for (let i = 0; i < fazendo.length; i++) {
        if (task.id == fazendo[i].id) {
          load = false;
        }
      }
      if (load) {
        postData(task);
      }
    } else if (task.column_id == 3) {
      for (let i = 0; i < feito.length; i++) {
        if (task.id == feito[i].id) {
          load = false;
        }
      }
      if (load) {
        postData(task);
      }
    }
  };

  // Função para adicionar tarefa à coluna 'Afazeres'
  const addTaskToAfazeres = (task: any) => {
    task.column_id = 1;
    setAfazeres([...afazeres, task]);
    LoadToBD(task);
  };

  const addTaskToFazendo = (task: any) => {
    task.column_id = 2;
    setFazendo([...fazendo, task]);
    LoadToBD(task);
  };

  const addTaskToFeito = (task: any) => {
    task.column_id = 3;
    setFeito([...feito, task]);
    LoadToBD(task);
  };

  const { data } = useAtividadeData();

  let run = true;
  let add = true;

  // Rotina para carregar as atividades do back-end e exibir nas colunas.
  {
    do {
      if (data != undefined) {
        for (let i = 0; i < data?.length; i++) {
          //alert(data[i])
          if (data[i].column_id == 1) {
            for (let k = 0; k < afazeres.length; k++) {
              if (afazeres[k].id == data[i].id) {
                add = false;
              }
            }
            if (add) {
              afazeres.push(data[i]);
            }
          } else if (data[i].column_id == 2) {
            for (let k = 0; k < fazendo.length; k++) {
              if (fazendo[k].id == data[i].id) {
                add = false;
              }
            }
            if (add) {
              fazendo.push(data[i]);
            }
          } else if (data[i].column_id == 3) {
            for (let k = 0; k < feito.length; k++) {
              if (feito[k].id == data[i].id) {
                add = false;
              }
            }
            if (add) {
              feito.push(data[i]);
            }
          } else {
            for (let k = 0; k < afazeres.length; k++) {
              if (afazeres[k].id == data[i].id) {
                add = false;
              }
            }
            if (add) {
              afazeres.push(data[i]);
              alert(
                "Atividade '" +
                  data[i].title +
                  "' não possuí índice de coluna válido e foi alocada para primeira coluna."
              );
            }
          }
        }
      }
      run = false;
    } while (run);
  }

  return (
    <div className="board">
      <Column
        column_id_prop={1}
        title="Afazeres"
        tasks={afazeres}
        onAddTask={addTaskToAfazeres}
      />

      <Column
        column_id_prop={2}
        title="Fazendo"
        tasks={fazendo}
        onAddTask={addTaskToFazendo} /* Função para adicionar em 'Fazendo' */
      />

      <Column
        column_id_prop={3}
        title="Feito"
        tasks={feito}
        onAddTask={addTaskToFeito} /* Função para adicionar em 'Feito'*/
      />

      <div className="add-column">
        <button className="add-column-button">
          <AiOutlinePlus color="white" />
        </button>
      </div>
    </div>
  );
}
