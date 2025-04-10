import { useEffect, useState, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button, List, ListItem, Typography, CircularProgress } from '@mui/material';
import CustomModal from './CustomModal';
import CustomSnackbar from './CustomSnackbar'; 
import '../App.css';

function UserList() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [openModal, setOpenModal] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState(null);
  
  const location = useLocation();

  const fetchUsers = useCallback(() => {
    setLoading(true);
    fetch("http://localhost:8800")
      .then(response => {
        if (!response.ok) {
          throw new Error('Erro ao carregar usuários');
        }
        return response.json();
      })
      .then(data => {
        setData(data);
        setLoading(false);
      })
      .catch(error => {
        setSnackbarMessage(error.message);
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
        setLoading(false);
      });
  }, []); 

  useEffect(() => {
    if (location.state && location.state.snackbarMessage) {
      setSnackbarMessage(location.state.snackbarMessage);
      setSnackbarOpen(true);
    }
    fetchUsers(); 
  }, [location.state, fetchUsers]); 

  const handleDelete = (id) => {
    setUserIdToDelete(id);
    setOpenModal(true);
  };

  const confirmDelete = () => {
    fetch(`http://localhost:8800/${userIdToDelete}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Erro ao excluir usuário');
        }
        fetchUsers(); 
        setSnackbarMessage('Usuário excluído com sucesso!');
        setSnackbarSeverity('success');
        setSnackbarOpen(true);
        setOpenModal(false); 
      })
      .catch(error => {
        setSnackbarMessage('Erro ao excluir usuário: ' + error.message);
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
        setOpenModal(false); 
      });
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleModalClose = () => {
    setOpenModal(false);
  };

  if (loading) return <CircularProgress />;

  return (
    <div>
      <List>
        {data.length === 0 ? (
          <ListItem>
            <Typography variant="body1" color="textSecondary" align="center">
              Não há usuários cadastrados
            </Typography>
          </ListItem>
        ) : (
          data.map((usuario) => (
            <ListItem key={usuario.idusuarios} divider>
              <Typography variant="body1" style={{ flexGrow: 1 }}>
                <strong>Nome:</strong> {usuario.nome} | <strong>Idade:</strong> {usuario.idade}
              </Typography>
              <div>
                <Link to={`/details/${usuario.idusuarios}`}>
                  <Button variant="outlined" color="info" sx={{ '&:hover': { backgroundColor: '#1976d2', color: 'white' } }} style={{ marginRight: '10px' }}>Ver detalhes</Button>
                </Link>
                <Link to={`/edit/${usuario.idusuarios}`}>
                  <Button variant="outlined" color="success" sx={{ '&:hover': { backgroundColor: '#4caf50', color: 'white' } }} style={{ marginRight: '10px' }}>Editar</Button>
                </Link>
                <Button variant="outlined" color="error" sx={{ '&:hover': { backgroundColor: '#f44336', color: 'white' } }} onClick={() => handleDelete(usuario.idusuarios)}>Excluir</Button>
              </div>
            </ListItem>
          ))
        )}
      </List>

      <CustomSnackbar 
        open={snackbarOpen} 
        onClose={handleSnackbarClose} 
        message={snackbarMessage} 
        severity={snackbarSeverity} 
      />

      <CustomModal 
        open={openModal} 
        onClose={handleModalClose} 
        onConfirm={confirmDelete} 
      />
    </div>
  );
}

export default UserList;