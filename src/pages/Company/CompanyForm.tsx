import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { Company, Department, District, Province } from "@/types";
import {
  TextField,
  Button,
  Container,
  Select,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  InputLabel,
  MenuItem,
} from "@mui/material";
import { updateCompany, createCompany } from "@/services/company";
import { fetchDepartments } from "@/services/department";
import { fetchDistricts } from "@/services/district";
import { fetchProvinces } from "@/services/province";

interface CompanyFormProps {
  company?: Company | null;
  onSubmitSuccess: () => void;
}

const CompanyForm: React.FC<CompanyFormProps> = ({
  company,
  onSubmitSuccess,
}) => {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [districts, setDistricts] = useState<District[]>([]);
  const [selectedDepartment, setSelectedDepartment] = useState<number | null>(
    null
  );
  const [selectedProvince, setSelectedProvince] = useState<number | null>(null);

  const {
    handleSubmit,
    control,
    register,
    formState: { errors },
    reset,
  } = useForm<Company>({
    defaultValues: {
      country: 1, // Default value for country
      ...company,
    },
  });

  const onSubmit: SubmitHandler<Company> = async (data) => {
    try {
      if (company && company.id) {
        await updateCompany(company.id, data);
      } else {
        await createCompany(data);
      }
      onSubmitSuccess();
    } catch (error) {
      console.error("Failed to submit company form", error);
    }
  };

  const handleDepartmentChange = async (departmentId: number) => {
    setSelectedDepartment(departmentId);
    reset({
      ...company,
      department: departmentId,
      province: undefined,
      district: undefined,
    });
    setProvinces([]);
    setDistricts([]);

    try {
      const provincesData = await fetchProvinces(departmentId);
      setProvinces(provincesData);
    } catch (error) {
      console.error("Failed to fetch provinces", error);
    }
  };

  const handleProvinceChange = async (provinceId: number) => {
    setSelectedProvince(provinceId);
    reset({ ...company, province: provinceId, district: undefined });
    setDistricts([]);

    try {
      const districtsData = await fetchDistricts(provinceId);
      setDistricts(districtsData);
    } catch (error) {
      console.error("Failed to fetch districts", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const departmentsData = await fetchDepartments();
        setDepartments(departmentsData);

        if (company?.department) {
          setSelectedDepartment(company.department);
          const provincesData = await fetchProvinces(company.department);
          setProvinces(provincesData);

          if (company.province) {
            setSelectedProvince(company.province);
            const districtsData = await fetchDistricts(company.province);
            setDistricts(districtsData);
          }
        }
      } catch (error) {
        console.error("Failed to fetch location data", error);
      }
    };

    fetchData();
  }, [company]);

  return (
    <Container>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 pt-2">
        {/* {errors && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
              <span className="block sm:inline">{errors.message}</span>
            </div>
          )} */}
        <TextField
          {...register("name", { required: "El nombre es obligatorio" })}
          label="Nombre"
          fullWidth
          error={!!errors.name}
          helperText={errors.name?.message}
          variant="outlined"
        />
        <TextField
          {...register("ruc", { required: "El RUC es obligatorio" })}
          label="RUC"
          fullWidth
          error={!!errors.ruc}
          helperText={errors.ruc?.message}
          variant="outlined"
        />
        <FormControl
          fullWidth
          variant="outlined"
          error={!!errors.pay_condition}
        >
          <InputLabel id={"pay_condition"}>Condición de Pago</InputLabel>
          <Controller
            control={control}
            name="pay_condition"
            rules={{ required: "La condición de pago es obligatoria" }}
            render={({ field }) => (
              <Select
                {...field}
                labelId={"pay_condition"}
                label={"pay_condition"}
              >
                <MenuItem value="V007">Crédito 7 días</MenuItem>
                <MenuItem value="V015">Crédito 15 días</MenuItem>
                <MenuItem value="V030">Crédito 30 días</MenuItem>
                <MenuItem value="V045">Crédito 45 días</MenuItem>
                <MenuItem value="V060">Crédito 60 días</MenuItem>
                <MenuItem value="V090">Crédito 90 días</MenuItem>
                <MenuItem value="V120">Crédito 120 días</MenuItem>
                <MenuItem value="V180">Crédito 180 días</MenuItem>
                <MenuItem value="V360">Crédito 360 días</MenuItem>
              </Select>
            )}
          />
          {errors.pay_condition && (
            <FormHelperText>{errors.pay_condition.message}</FormHelperText>
          )}
        </FormControl>
        <TextField
          {...register("slug", { required: "El slug es obligatorio" })}
          label="Slug"
          fullWidth
          error={!!errors.slug}
          helperText={errors.slug?.message}
          variant="outlined"
        />
        <TextField
          {...register("address", { required: "La dirección es obligatoria" })}
          label="Dirección"
          fullWidth
          error={!!errors.address}
          helperText={errors.address?.message}
          variant="outlined"
        />
        <FormControl fullWidth variant="outlined" error={!!errors.department}>
          <InputLabel id={"department"}>Departamento</InputLabel>
          <Select
            {...register("department", {
              required: "El departamento es obligatorio",
            })}
            value={selectedDepartment || ""}
            labelId={"department"}
            label={"department"}
            onChange={(e) => handleDepartmentChange(parseInt(e.target.value))}
          >
            {departments.map((department) => (
              <MenuItem key={department.id} value={department.id}>
                {department.name}
              </MenuItem>
            ))}
          </Select>
          {errors.department && (
            <FormHelperText>{errors.department.message}</FormHelperText>
          )}
        </FormControl>
        <FormControl fullWidth variant="outlined" error={!!errors.province}>
          <InputLabel id={"province"}>Provincia</InputLabel>
          <Select
            {...register("province", {
              required: "La provincia es obligatoria",
            })}
            onChange={(e) => handleProvinceChange(parseInt(e.target.value))}
            labelId={"province"}
            label={"province"}
            disabled={!selectedDepartment}
          >
            {provinces.map((province) => (
              <MenuItem key={province.id} value={province.id}>
                {province.name}
              </MenuItem>
            ))}
          </Select>
          {errors.province && (
            <FormHelperText>{errors.province.message}</FormHelperText>
          )}
        </FormControl>
        <FormControl fullWidth variant="outlined" error={!!errors.district}>
          <InputLabel id={"district"}>Distrito</InputLabel>
          <Select
            {...register("district", {
              required: "El distrito es obligatorio",
            })}
            disabled={!selectedProvince}
            labelId={"district"}
            label={"district"}
          >
            {districts.map((district) => (
              <MenuItem key={district.id} value={district.id}>
                {district.name}
              </MenuItem>
            ))}
          </Select>
          {errors.district && (
            <FormHelperText>{errors.district.message}</FormHelperText>
          )}
        </FormControl>
        <TextField
          {...register("country", { required: "El país es obligatorio" })}
          label="País"
          fullWidth
          error={!!errors.country}
          helperText={errors.country?.message}
          variant="outlined"
        />
        <TextField
          {...register("phone")}
          label="Teléfono"
          fullWidth
          variant="outlined"
        />
        <TextField
          {...register("mobile")}
          label="Móvil"
          defaultValue={company?.mobile || ""}
          fullWidth
          variant="outlined"
        />
        <FormControlLabel
          control={
            <Checkbox
              {...register("status")}
              defaultChecked={company?.status || true}
              color="primary"
            />
          }
          label="Estado"
        />
        <Button type="submit" variant="contained" color="primary">
          {company ? "Actualizar" : "Crear"} Empresa
        </Button>
      </form>
    </Container>
  );
};

export default CompanyForm;
