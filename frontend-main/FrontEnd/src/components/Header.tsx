
import './Header.css';
import { IoSearch } from "react-icons/io5";

export function Header() {
  return (
    
    <header className="header">
      <input 
        type="text" 
        placeholder="Pesquisar tarefas..." 
        className="search-bar" 
      />
      <IoSearch color='white' size={20}/>
    </header>
  );
}
