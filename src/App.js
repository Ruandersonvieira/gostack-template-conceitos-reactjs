import React, { useState, useEffect } from "react";

import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([])

  useEffect(() => {
      loadRepositories()
  }, [])

  async function loadRepositories() {
    const response = await api.get('repositories');
    console.log(response.data)

    setRepositories(response.data);
  }

  async function handleAddRepository() {
    const response =  await api.post('repositories');

    setRepositories([...repositories, response.data]);
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`repositories/${id}`);

    console.log(response);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repository)=>(
           <li key={repository.id}>
           {repository.id}
          
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
