import React from 'react';
import { Box, Typography, AppBar, Toolbar, Button } from '@mui/material';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <AppBar position="static" sx={{ backgroundColor: '#4287f5' }}>
      <Toolbar>
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h6" sx={{ color: 'white' }}>
            <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>
              Listagem de Usuários
            </Link>
          </Typography>
          <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
            Desenvolvido por Larissa Costa
          </Typography>
        </Box>
        <Button color="inherit" component={Link} to="/add">
          Adicionar Usuário
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default Header;