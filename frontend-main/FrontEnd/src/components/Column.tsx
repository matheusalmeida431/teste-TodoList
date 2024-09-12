import { AiFillCaretUp, AiFillCaretDown } from "react-icons/ai";
import { useState } from "react";
import { Card } from "./card/card";
import "./Column.css";
import { AtividadeData } from "../interface/AtividadeData";

interface ColumnProps {
  column_id_prop: number;
  title: string;
  tasks: AtividadeData[]; // Tipo correto para tarefas
  onAddTask: (task: AtividadeData) => void; // Função para adicionar tarefas
}

export function Column(this: any, { column_id_prop, title, tasks, onAddTask }: ColumnProps) {
  const [columnTitle, setColumnTitle] = useState(title);
  const [isEditing, setIsEditing] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState("");

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setColumnTitle(event.target.value);
  };
  
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleAddTask()
      setIsEditing(false)
    }
  };
  const handleAddTask = () => {

    if (newTaskTitle.trim()) {
      const newTask = {
        column_id: 0, // Adicionando o ID da coluna à nova tarefa
        title: newTaskTitle,
        description: '',
        date: new Date(),
        deadline: '',
      };
      onAddTask(newTask);
      setNewTaskTitle("");
    }
  };

  return (
    <div className="column" style={{ height: isMinimized ? "10%" : "100%" }}>
    <>
      <div className="column-header">
        {isEditing ? (
          <>
            <input
              type="text"
              value={columnTitle}
              onChange={handleTitleChange}
              onBlur={() => setIsEditing(false)}
              autoFocus
              onKeyDown={handleKeyDown}
            />
          </>
        ) : (
          <h2 onClick={() => setIsEditing(true)}>{columnTitle}</h2>
        )}
        {isMinimized ? (
          <button
            className="minimize-column"
            onClick={() => setIsMinimized(false)}
          >
            <AiFillCaretDown color="Grey" />
          </button>
        ) : (
          <button
            className="minimize-column"
            onClick={() => setIsMinimized(true)}
          >
            <AiFillCaretUp color="Grey" />
          </button>
        )}
      </div>
      <div
        className="add-task"
        style={{ display: isMinimized ? "none" : "flex" }}
      >
        <input
          type="text"
          placeholder="Título da tarefa"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button className="add-task-button" onClick={handleAddTask}>
          Adicionar Tarefa
        </button>
      </div>
      <div
        className="card-grid"
        style={{ display: isMinimized ? "none" : "flex" }}
      >
        {tasks.map((atividade) => (
          <Card
            key={atividade.id} // Chave única para cada componente Card
            id={atividade.id}
            title={atividade.title}
            description={atividade.description}
            date={new Date(atividade.date)} // Convertendo string para objeto Date, se necessário
            column_id={atividade.column_id}
          />
        ))}
      </div>
    </>
  </div>
  );
}