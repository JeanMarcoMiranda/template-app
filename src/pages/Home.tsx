import React, { useState, SyntheticEvent } from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  Typography,
  IconButton,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';

const daysOfWeek: string[] = [
  'Lunes',
  'Martes',
  'Miércoles',
  'Jueves',
  'Viernes',
  'Sábado',
  'Domingo',
];

const Home: React.FC = () => {
  const [expandedPanels, setExpandedPanels] = useState<{ [key: string]: boolean }>({});

  const handleChange = (panel: string) => (event: SyntheticEvent, isExpanded: boolean) => {
    setExpandedPanels((prev) => ({ ...prev, [panel]: isExpanded }));
  };

  const handleAddMenu = (day: string) => {
    // Aquí puedes agregar la lógica para añadir un nuevo menú
    console.log(`Añadir menú para ${day}`);
  };

  return (
    <div className="p-4">
      <Typography variant="h4" gutterBottom>
        Menús de la Semana
      </Typography>
      {daysOfWeek.map((day, index) => (
        <Accordion
          key={day}
          expanded={!!expandedPanels[`panel${index}`]}
          onChange={handleChange(`panel${index}`)}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`panel${index}bh-content`}
            id={`panel${index}bh-header`}
          >
            <Typography sx={{ flexShrink: 0 }}>
              {day}
            </Typography>
            <IconButton
              color="primary"
              aria-label="add menu"
              onClick={(e) => {
                e.stopPropagation();
                handleAddMenu(day);
              }}
              sx={{ marginLeft: 'auto' }}
            >
              <AddIcon />
            </IconButton>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Aquí puedes listar los menús para {day}. Esta sección puede incluir detalles adicionales sobre los menús.
            </Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
};


export default Home;