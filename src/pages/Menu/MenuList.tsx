// src/pages/Menu/MenuList.tsx
import React, { useState, useEffect } from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  IconButton,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  CircularProgress,
  Alert,
  Grid,
  Card,
  CardContent,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';
import { useParams } from 'react-router-dom';
import { MenuForm } from './MenuForm';
import { Category, Item } from '@/types';
import { fetchCategories } from '@/services/category';
import { Close } from '@mui/icons-material';

export const MenuList: React.FC = () => {
  const { companyId } = useParams<{ companyId: string }>();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);

  const handleClickOpen = (item?: Item) => {
    setSelectedItem(item || null);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedItem(null);
  };

  const handleFormSubmitSuccess = () => {
    setOpen(false);
    setSelectedItem(null);
    // const fetchData = async () => {
    //   try {
    //     const data = await fetchItems();
    //     setItems(data);
    //   } catch (err) {
    //     setError('Error al obtener los productos');
    //   }
    // };
    // fetchData();
  };

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await fetchCategories();
        setCategories(data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch categories");
        setLoading(false);
      }
    };

    loadCategories();
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  return (
    <div className="p-4">
      <Typography variant="h4" gutterBottom>
        Menús de la Semana para Compañía {companyId}
      </Typography>
      {categories.map((category) => (
        <Accordion key={category.id}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`panel${category.id}-content`}
            id={`panel${category.id}-header`}
          >
            <Typography className='flex items-center' sx={{ flexGrow: 1 }}>
              {category.id} - 06/24/2024
            </Typography>
            <IconButton
              aria-label="more"
              onClick={(event) => {
                event.stopPropagation();
                handleClickOpen()
              }}
            >
              <AddIcon />
            </IconButton>
          </AccordionSummary>
          <AccordionDetails>
          <Grid container spacing={2}>
              {category.items.map((item) => (
                <Grid item xs={12} sm={6} md={4} key={item.id}>
                  <Card className="h-40 flex flex-col">
                    <CardContent className="flex-grow overflow-auto">
                      <Typography variant="h6">{item.name}</Typography>
                      <Typography variant="body2">{item.description}</Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </AccordionDetails>
        </Accordion>
      ))}
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>
          {selectedItem ? 'Actualizar Menu' : 'Añadir Menu'}
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
          <MenuForm item={selectedItem} onSubmitSuccess={handleFormSubmitSuccess} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};