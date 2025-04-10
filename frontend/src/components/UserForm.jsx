import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, TextField, Typography, Box, MenuItem, Select, InputLabel, FormControl, Snackbar, Alert } from '@mui/material';
import '../App.css';

function UserForm() {
  const [user, setUser] = useState({
    nome: "",
    idade: "",
    cpf: "",
    email: "",
    telefone: "",
    genero: ""
  });
  const { id } = useParams();
  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:8800/${id}`)
        .then(response => response.json())
        .then(data => setUser(data));
    }
  }, [id]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const validateCPF = (cpf) => {
    const re = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
    return re.test(cpf);
  };

  const validatePhone = (phone) => {
    const re = /^\(\d{2}\) \d{5}-\d{4}$/;
    return re.test(phone);
  };

  const validateName = (name) => {
    const re = /^[A-Za-zÀ-ÖØ-ÿ\s]+$/; // Aceita apenas letras e espaços
    return re.test(name);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateName(user.nome)) {
      setErrorMessage('Nome inválido. Apenas letras são permitidas.');
      setSnackbarOpen(true);
      return;
    }

    if (!validateEmail(user.email)) {
      setErrorMessage('Email inválido.');
      setSnackbarOpen(true);
      return;
    }

    if (!validateCPF(user.cpf)) {
      setErrorMessage('CPF inválido. Formato esperado: 000.000.000-00');
      setSnackbarOpen(true);
      return;
    }

    if (!validatePhone(user.telefone)) {
      setErrorMessage('Telefone inválido. Formato esperado: (00) 00000-0000');
      setSnackbarOpen(true);
      return;
    }

    const method = id ? 'PUT' : 'POST';
    const url = id ? `http://localhost:8800/${id}` : `http://localhost:8800`;

    fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })
      .then(() => {
        const message = `Usuário ${id ? 'atualizado' : 'criado'} com sucesso!`;
        navigate('/', { state: { snackbarMessage: message } });
      })
      .catch(error => {
        console.error('Erro ao salvar usuário:', error);
      });
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Box sx={{ maxWidth: 400, margin: '0 auto', padding: 2, backgroundColor: '#f9f9f9', borderRadius: 2, boxShadow: 3 }}>
      <Typography variant="h5" align="center" gutterBottom>
        {id ? "Editar Usuário" : "Adicionar Usuário"}
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Nome"
          variant="outlined"
          fullWidth
          margin="normal"
          name="nome"
          value={user.nome}
          onChange={handleChange}
          required
        />
        <TextField
          label="Idade"
          variant="outlined"
          fullWidth
          margin="normal"
          type="number"
          name="idade"
          value={user.idade}
          onChange={handleChange}
          required
        />
        <TextField
          label="CPF"
          variant="outlined"
          fullWidth
          margin="normal"
          name="cpf"
          value={user.cpf}
          onChange={handleChange}
          required
        />
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          name="email"
          value={user.email}
          onChange={handleChange}
          required
        />
        <TextField
          label="Telefone"
          variant="outlined"
          fullWidth
          margin="normal"
          name="telefone"
          value={user.telefone}
          onChange={handleChange}
          required
        />
        <FormControl fullWidth margin="normal">
          <InputLabel id="genero-label">Gênero</InputLabel>
          <Select
            labelId="genero-label"
            name="genero"
            value={user.genero}
            onChange={handleChange}
            required
          >
            <MenuItem value="masculino">Masculino</MenuItem>
            <MenuItem value="feminino">Feminino</MenuItem>
            <MenuItem value="outro">Outro</MenuItem>
          </Select>
        </FormControl>
        <Box sx={{ textAlign: 'center', marginTop: 2 }}>
          <Button type="submit" variant="contained" color="primary" sx={{ marginRight: 1 }}>
            {id ? "Atualizar" : "Salvar"}
          </Button>
          <Button variant="outlined" color="error" sx={{ '&:hover': { backgroundColor: '#f44336', color: 'white' } }} onClick={() => navigate('/')}>
            Cancelar
          </Button>
        </Box>
      </form>
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity="error" sx={{ width: '100%' }}>
          {errorMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default UserForm;