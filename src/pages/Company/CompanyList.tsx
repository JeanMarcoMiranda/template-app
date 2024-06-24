import React, { useEffect, useState } from 'react';
import { Company } from '@/types';
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  TablePagination,
  TextField,
  IconButton,
  InputAdornment,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import { Search, Edit, Delete, Add, Close } from '@mui/icons-material';
import usePagination from '@/hooks/usePagination';
import CompanyForm from './CompanyForm';
import { fetchCompanies } from '@/services/company';

const CompanyList: React.FC = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState<string>('');
  const [open, setOpen] = useState<boolean>(false);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);

  const { page, rowsPerPage, handleChangePage, handleChangeRowsPerPage } = usePagination();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchCompanies();
        setCompanies(data);
      } catch (err) {
        setError('Error al obtener las compañías');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleDelete = async (id: number) => {
    try {
      // await deleteCompany(id);
      setCompanies(companies.filter((company) => company.id !== id));
    } catch (error) {
      console.error('Error al eliminar la compañía', error);
    }
  };

  const handleClickOpen = (company?: Company) => {
    setSelectedCompany(company || null);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedCompany(null);
  };

  const handleFormSubmitSuccess = () => {
    setOpen(false);
    setSelectedCompany(null);
    // Re-fetch companies to reflect the changes
    const fetchData = async () => {
      try {
        const data = await fetchCompanies();
        setCompanies(data);
      } catch (err) {
        setError('Error al obtener las compañías');
      }
    };
    fetchData();
  };

  const filteredCompanies = companies.filter(
    (company) =>
      company.name.toLowerCase().includes(search.toLowerCase()) ||
      company.ruc.toLowerCase().includes(search.toLowerCase()) ||
      company.address.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <TextField
          label="Buscar"
          variant="outlined"
          size="small"
          value={search}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
          sx={{ width: '300px' }}
        />
        <Button
          variant="contained"
          color="primary"
          startIcon={<Add />}
          onClick={() => handleClickOpen()}
        >
          Añadir Compañía
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>RUC</TableCell>
              <TableCell>Dirección</TableCell>
              <TableCell>Teléfono</TableCell>
              <TableCell>Móvil</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredCompanies
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((company) => (
                <TableRow key={company.id}>
                  <TableCell>{company.name}</TableCell>
                  <TableCell>{company.ruc}</TableCell>
                  <TableCell>{company.address}</TableCell>
                  <TableCell>{company.phone}</TableCell>
                  <TableCell>{company.mobile}</TableCell>
                  <TableCell>
                    <IconButton color="primary" onClick={() => handleClickOpen(company)}>
                      <Edit />
                    </IconButton>
                    <IconButton color="error" onClick={() => handleDelete(company.id!)}>
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredCompanies.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage="Filas por página"
      />

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>
          {selectedCompany ? 'Actualizar Compañía' : 'Añadir Compañía'}
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <CompanyForm company={selectedCompany} onSubmitSuccess={handleFormSubmitSuccess} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CompanyList;
