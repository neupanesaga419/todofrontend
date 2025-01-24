import { Box } from "@mui/material";
import CustomDrawer from "../../components/Drawer";
import { Navbar } from "../../components/Navbar";
import { useSetUserContext } from "../Authentication/hooks/setUserContext";

type BasePageProps = {
  Contents: React.ReactNode;
};
export function BasePage({ Contents }: BasePageProps) {
  const navbarHeight = 69; // Adjust to match your AppBar's height
  useSetUserContext();
  return (
    <Box sx={{}}>
      {/* Navbar */}
      <Navbar />

      <Box sx={{ display: "flex", flex: 1 }}>
        <CustomDrawer navbarHeight={navbarHeight} />

        {Contents}
      </Box>
    </Box>
  );
}
