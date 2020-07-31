import React, { useState, useEffect } from "react";

import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([])

  useEffect(() => {
      loadRepositories()
  }, [])

  async function loadRepositories() {
    const { data } = await api.get('repositories');

    return setRepositories(data);
  }

  async function handleAddRepository() {
    const { data } =  await api.post('repositories', {
      title: `Repositório ${Math.random().toString(36).substring(7)}`,
      url: `https://github.com/ruandersonvieira/${Math.random().toString(36).substring(7)}`,
      techs:['React', 'NodeJs'], 
    });

    return setRepositories([...repositories, data]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);

    return setRepositories(repositories.filter((repository)=>(repository.id !== id)));
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repository)=>(
           <li key={repository.title}>
           {repository.title}
          
           <button onClick={() => handleRemoveRepository(repository.id)}>
             Remover
           </button>
         </li>
        ))}
      </ul>

      <form>

  <button onClick={handleAddRepository}>Adicionar</button>

</form>
    </div>
  );
}

export default App;
