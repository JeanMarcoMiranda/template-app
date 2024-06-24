import { fetchCompanies } from "@/services/company";
import { Company } from "@/types";
import { useState, useEffect } from "react";
import CompanyCard from "./CompanyCard";
import { Grid } from "@mui/material";

export const MenuCompany = () => {

  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const getCompanies = async () => {
      try {
        const data = await fetchCompanies();
        setCompanies(data);
      } catch (err) {
        setError('Error al obtener las compañías');
      } finally {
        setLoading(false);
      }
    };

    getCompanies();
  }, []);

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;
  return (
    <>
      <Grid container spacing={2}>
        {companies.map(company => (
          <Grid item xs={12} sm={6} md={4} key={company.id} className="pb-4">
            <CompanyCard key={company.id} company={company} />
          </Grid>
        ))}
      </Grid>
    </>
  )
}
