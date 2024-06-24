import React from 'react';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import { Company } from '@/types';
import { useNavigate } from 'react-router-dom';

interface CompanyCardProps {
    company: Company;
}

const CompanyCard: React.FC<CompanyCardProps> = ({ company }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/menu/${company.id}`);
    };

    return (
        <Card onClick={handleClick} className="cursor-pointer">
            {company.logo && (
                <CardMedia
                    component="img"
                    alt={`${company.name} logo`}
                    height="140"
                    image={company.logo}
                />
            )}
            <CardContent>
                <Typography variant="h5" component="div">
                    {company.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    RUC: {company.ruc}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Dirección: {company.address}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default CompanyCard;
