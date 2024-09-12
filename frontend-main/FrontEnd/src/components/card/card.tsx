import { useState } from "react";
import "./Card.css";
import { CirclePicker } from "react-color";
import {
  AiFillTag,
  AiFillEdit,
  AiOutlineCheckCircle,
  AiFillCloseCircle,
  AiOutlineLeft,
  AiOutlineRight,
} from "react-icons/ai";

import { editData } from "../../hooks/EditAtividadeData";
import { AtividadeData } from "../../interface/AtividadeData";

import { deleteData } from "../../hooks/DeleteAtividadeData";

import { EditAtividadeData } from "../../hooks/EditAtividadeData";

interface CardProps {
  column_id: number;
  id?: number;
  title: string;
  description: string;
  date: Date;
  deadline?: Date;
}


export function Card({ column_id, id, title, description, date, deadline }: CardProps) {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };
  const [currentColor, setCurrentColor] = useState("grey");
  const [isEditing, setIsEditing] = useState(false);
  const [isTagging, setIsTagging] = useState(false);
  const [newTitle, setNewTitle] = useState(title);
  const [newDescription, setNewDescription] = useState(description);
  const [newDeadline, setNewDeadline] = useState(deadline);
  const [newColumn_Id, setNewColumn_Id] = useState(Number);
  const [newId] = useState(id)
  const [newDate] = useState(date);
  const [isDeleted, setisDeleted] = useState(false);

  const goLeft = ( /*newColumn_Id: number | undefined*/ ) => {
    if ( column_id ){
      column_id = (column_id - 1);
      //alert("column_id: " + column_id)
     handleSave()
    }
  }

  const goRight = ( /*newColumn_Id: number | undefined*/ ) => {
    if ( column_id ){
      column_id = (column_id + 1);
      //alert("column_id: " + column_id)
      handleSave()
    }
  }

  const edditedAtividade: AtividadeData = {
    id: newId,
    title: newTitle,
    column_id: newColumn_Id,
    description: newDescription,
    date: newDate
  };

  const handleSave = () => {

    /*alert("Column_Id:" + newColumn_Id);
    alert("Id: " + newId)
    alert("column_id: " + column_id)*/

    // newColumn_ID == 0 acontece ao editar a task e não escolher uma opção de nova coluna do select.
    // Caso aconteça, a task permanecerá na mesma coluna
    if ( newColumn_Id == 0 ) { edditedAtividade.column_id =  column_id }

    //alert("Column_Id:" + newColumn_Id);

    // salvando as atividade editada no banco de dados.
   editData(edditedAtividade);

    setIsEditing(false);
    setIsTagging(false);
    
    parent.location.reload()
    //window.location.reload()

  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSave();
    }
  };

  const handleChangeComplete = (color: any) => {
    setCurrentColor(color.hex);
    setIsEditing(false);
    setIsTagging(false);
  };

  const deleteTask = () => {
    deleteData(edditedAtividade)
    setisDeleted(true)
  }

  return (

    <div className="card" style= {isDeleted ? { display: "none" } : { display: "flex" , borderLeft: `4px solid ${currentColor}` }}>
      {isEditing ? (
        <div className="editContainer">
          <input
            required
            style={{ fontSize: "14px", fontWeight: "bold" }}
            type="text"
            placeholder="Título"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <input
            style={{ height: "32px" }}
            placeholder="Descrição"
            type="text"
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <p style={{margin:'0', fontSize:14, justifySelf: 'left'}}>Data limite:</p>
          <input
            style={{ padding: "4px" }}
            type="datetime-local"
            value={date.toISOString().split("T")[0]}
            onChange={(e) => setNewDeadline(new Date(e.target.value))}
            onKeyDown={handleKeyDown}
          />
          <select onChange={(e) => setNewColumn_Id(e.target.selectedIndex + 1)} defaultValue={column_id}>
            <option value={1}> Afazeres </option>
            <option value={2}> Fazendo </option>
            <option value={3}> Feito </option>
          </select>

          <button onClick={handleSave} className="saveButton">
            <AiOutlineCheckCircle
              color="white"
              size={20}
              style={{ position: "absolute", left: 20 }}
            />
            Salvar
          </button>
        </div>
      ) : (
        <div className="infoContainer">
          <div className="buttons">
            <button onClick={() => setIsEditing(true)}>
              <AiFillEdit color="grey" size={16} />
            </button>
            <button onClick={() => setIsTagging(true)}>
              <AiFillTag color="grey" size={16} />
            </button>
            <button onClick={() => deleteTask() /*setisDeleted(true)*/}>
              <AiFillCloseCircle color="grey" size={16} />
            </button>
          </div>
        
          <h4 style={{ marginBlock: 0 }}>{newTitle}</h4>
          {newDescription && <p className="card-description" style={{ marginBlock: 4 }}>
            {newDescription} 
          </p>}
          {!newDescription && <p className="card-description" style={{ marginBlock: 4, color:'grey'}}>
            Edite para criar uma descrição! 
          </p>}
          {!newDeadline && <p style={{ fontSize: 12, marginBlock: 0, color: "gray" }}>
            <strong>Criado:</strong> {date.toLocaleTimeString("pt-BR", options)}
          </p>}
          {newDeadline && <p style={{ fontSize: 12, marginBlock: 0, color: "gray" }}>
            <strong>Criado:</strong> {date.toLocaleTimeString("pt-BR", options)} <strong>Até:</strong> {newDeadline.toLocaleDateString("pt-BR", options)}
          </p>}

          {isTagging ? (
            <div className="colorPicker">
              <CirclePicker
                width="240px"
                color={currentColor}
                onChangeComplete={handleChangeComplete}
                circleSize={20}
                circleSpacing={10}
                colors={[
                  "red",
                  "#f44336",
                  "#e91e63",
                  "#9c27b0",
                  "#673ab7",
                  "#3f51b5",
                  "#2196f3",
                  "#00bcd4",
                  "#009688",
                  "#4caf50",
                  "#8bc34a",
                  "#ffeb3b",
                  "#ffc107",
                  "#ff9800",
                  "#795548",
                  "grey",
                ]}
              />
            </div>
          ) : null}
          <div className="navarrows">
            <button onClick={() => goLeft() }
              style={column_id == 1 ? { display: "none" } : { display: "grid" }}
            >
              <AiOutlineLeft color="grey" size={16} />
            </button>
            <button onClick={() => goRight()}>
              <AiOutlineRight
                color="grey"
                size={16}
                style={
                  column_id == 3 ? { display: "none" } : { display: "grid" }
                }
              />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Card;
