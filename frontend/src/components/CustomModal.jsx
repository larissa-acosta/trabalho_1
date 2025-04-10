import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';

const CustomModal = ({ open, onClose, onConfirm }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Confirmar Exclusão</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Tem certeza que deseja excluir este usuário?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary" sx={{ '&:hover': { backgroundColor: '#1976d2', color: 'white' } }}>
          Cancelar
        </Button>
        <Button onClick={onConfirm} color="error" sx={{ '&:hover': { backgroundColor: '#f44336', color: 'white' } }}> 
          Excluir
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CustomModal;