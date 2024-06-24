import { Typography } from "@mui/material"
import { MenuCompany } from "./MenuCompany"

export const MenuScreen = () => {
  return (
    <div className='flex flex-col gap-4'>
      <Typography variant="h6" gutterBottom className='pt-4'>
        Menu - Compañías
      </Typography>
      <MenuCompany />
    </div>
    )
}
