import React from "react";
import {
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Toolbar,
} from "@mui/material";
import { ChevronLeft } from "@mui/icons-material";
import { Link } from "react-router-dom";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  return (
    <aside
      className={`relative bg-gray-800 text-white ${isOpen ? "w-60" : "w-0"
        } transition-all duration-200 ease-in-out`}
    >
      <div
        className={`transition-all duration-200 ${isOpen ? "opacity-100" : "opacity-0 hidden"
          }`}
      >
        <SidebarHeader onClose={onClose} />
        <Divider />
        <List>
          <ListItem button component={Link} to="/">
            <ListItemText primary="Inicio" />
          </ListItem>
          <ListItem button component={Link} to="/about">
            <ListItemText primary="Sobre nosotros" />
          </ListItem>
          <ListItem button component={Link} to="/services">
            <ListItemText primary="Servicios" />
          </ListItem>
          <ListItem button component={Link} to="/contact">
            <ListItemText primary="Contacto" />
          </ListItem>
          <Divider />
          <ListItem button component={Link} to="/companies">
            <ListItemText primary="Clientes" />
          </ListItem>
          <ListItem button component={Link} to="/menu">
            <ListItemText primary="Menus" />
          </ListItem>
        </List>
      </div>
    </aside>
  );
};

interface SidebarHeaderProps {
  onClose: () => void;
}

const SidebarHeader: React.FC<SidebarHeaderProps> = ({ onClose }) => (
  <Toolbar className="flex items-center justify-end p-4">
    <IconButton color="inherit" onClick={onClose}>
      <ChevronLeft />
    </IconButton>
  </Toolbar>
);

export default Sidebar;
