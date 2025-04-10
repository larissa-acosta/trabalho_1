import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Typography, Button, Box } from '@mui/material';
import '../App.css';

function UserDetail() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:8800/${id}`)
      .then(response => response.json())
      .then(data => setUser(data));
  }, [id]);

  if (!user) return <div>Carregando...</div>;

  return (
    <Box sx={{ padding: 2, textAlign: 'center', backgroundColor: '#f9f9f9', borderRadius: 2, boxShadow: 3 }}>
      <Typography variant="h4">{user.nome}</Typography>
      <Typography variant="h6"><strong>Idade:</strong> {user.idade}</Typography>
      <Typography variant="h6"><strong>CPF:</strong> {user.cpf}</Typography>
      <Typography variant="h6"><strong>Email:</strong> {user.email}</Typography>
      <Typography variant="h6"><strong>Telefone:</strong> {user.telefone}</Typography>
      <Typography variant="h6"><strong>Gênero:</strong> {user.genero}</Typography>
      <Button variant="contained" color="primary" onClick={() => navigate('/')}>
        Fechar
      </Button>
    </Box>
  );
}

export default UserDetail;