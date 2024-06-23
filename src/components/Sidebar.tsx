import { Divider, IconButton, List, ListItem, ListItemText, Toolbar } from "@mui/material"
import { ChevronLeft } from "@mui/icons-material";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  return (
    <aside className={`relative bg-gray-800 text-white ${isOpen ? 'w-60' : 'w-0'} transition-all duration-200 ease-in-out`}>
      <div className={`transition-all duration-200 ${isOpen ? 'opacity-100' : 'opacity-0 hidden'}`}>
        <SidebarHeader onClose={onClose} />
        <Divider />
        <List>
          {['inicio', 'sobre nosotros', 'servicios', 'contacto'].map((text, index) => (
            <ListItem key={index}>
              <ListItemText primary={text} />
            </ ListItem>
          ))}
        </List>
      </div>
    </aside>
  )
}

interface SidebarHeaderProps {
  onClose: () => void
}

const SidebarHeader: React.FC<SidebarHeaderProps> = ({ onClose }) => (
  <Toolbar className="flex items-center justify-end p-4">
    <IconButton color="inherit" onClick={onClose}>
      <ChevronLeft />
    </IconButton>
  </Toolbar>
)

export default Sidebar