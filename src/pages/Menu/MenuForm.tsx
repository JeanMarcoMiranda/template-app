import React, { useEffect } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import {
  Button,
  TextField,
  Container,
  FormControl,
  FormControlLabel,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Switch,
} from '@mui/material';
import { Item } from '@/types';
import { updateItem, createItem } from '@/services/item';

interface MenuFormProps {
  item?: Item | null;
  onSubmitSuccess: () => void;
}

export const MenuForm: React.FC<MenuFormProps> = ({ item, onSubmitSuccess }) => {
  const {
    handleSubmit,
    control,
    register,
    formState: { errors },
    reset,
  } = useForm<Item>({
    defaultValues: {
      ...item,
    },
  });

  const onSubmit: SubmitHandler<Item> = async (data) => {
    try {
      if (item && item.id) {
        await updateItem(item.id, data);
      } else {
        await createItem(data);
      }
      onSubmitSuccess();
    } catch (error) {
      console.error("Failed to submit item form", error);
    }
  };

  useEffect(() => {
    reset(item || {});
  }, [item, reset]);

  return (
    <Container>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 pt-2">
        <TextField
          {...register("name", { required: "El nombre es obligatorio" })}
          label="Nombre"
          fullWidth
          error={!!errors.name}
          helperText={errors.name?.message}
          variant="outlined"
        />
        <TextField
          {...register("description")}
          label="Descripción"
          fullWidth
          error={!!errors.description}
          helperText={errors.description?.message}
          variant="outlined"
        />
        <TextField
          {...register("price", { required: "El precio es obligatorio" })}
          label="Precio"
          fullWidth
          error={!!errors.price}
          helperText={errors.price?.message}
          variant="outlined"
          type="number"
        />
        <TextField
          {...register("discount_price")}
          label="Precio de Descuento"
          fullWidth
          error={!!errors.discount_price}
          helperText={errors.discount_price?.message}
          variant="outlined"
          type="number"
        />
        <TextField
          {...register("category", { required: "La categoría es obligatoria" })}
          label="Categoría"
          fullWidth
          error={!!errors.category}
          helperText={errors.category?.message}
          variant="outlined"
          type="number"
        />
        <TextField
          {...register("company", { required: "La compañía es obligatoria" })}
          label="Compañía"
          fullWidth
          error={!!errors.company}
          helperText={errors.company?.message}
          variant="outlined"
          type="number"
        />
        <FormControl fullWidth variant="outlined" margin="normal" error={!!errors.product}>
          <InputLabel>Producto</InputLabel>
          <Controller
            name="product"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                label="Producto"
              >
                <MenuItem value="DIETA">Dieta</MenuItem>
                <MenuItem value="VEGET">Vegetariano</MenuItem>
                <MenuItem value="CONVE">Convencional</MenuItem>
              </Select>
            )}
          />
          <FormHelperText>{errors.product?.message}</FormHelperText>
        </FormControl>
        <FormControl fullWidth variant="outlined" margin="normal" error={!!errors.product_type}>
          <InputLabel>Tipo de Producto</InputLabel>
          <Controller
            name="product_type"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                label="Tipo de Producto"
              >
                <MenuItem value="DESAY">Desayuno</MenuItem>
                <MenuItem value="ALMUE">Almuerzo</MenuItem>
                <MenuItem value="CENAC">Cena</MenuItem>
              </Select>
            )}
          />
          <FormHelperText>{errors.product_type?.message}</FormHelperText>
        </FormControl>
        <TextField
          {...register("image")}
          label="Imagen URL"
          fullWidth
          error={!!errors.image}
          helperText={errors.image?.message}
          variant="outlined"
        />
        <TextField
          {...register("stock", { required: "El stock es obligatorio" })}
          label="Stock"
          fullWidth
          error={!!errors.stock}
          helperText={errors.stock?.message}
          variant="outlined"
          type="number"
        />
        <FormControlLabel
          control={
            <Controller
              name="status"
              control={control}
              render={({ field }) => <Switch {...field} checked={field.value} />}
            />
          }
          label="Estado"
        />
        <FormControlLabel
          control={
            <Controller
              name="deliverable"
              control={control}
              render={({ field }) => <Switch {...field} checked={field.value} />}
            />
          }
          label="Entregable"
        />
        <TextField
          {...register("order")}
          label="Orden"
          fullWidth
          error={!!errors.order}
          helperText={errors.order?.message}
          variant="outlined"
          type="number"
        />
        <Button type="submit" variant="contained" color="primary">
          {item ? "Actualizar" : "Crear"} Producto
        </Button>
      </form>
    </Container>
  );
};
