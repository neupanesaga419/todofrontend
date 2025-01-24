import {
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useTheme,
  Box,
  Stack,
  useMediaQuery,
} from "@mui/material";
import {
  ArrowUpward,
  People,
  AttachMoney,
  BarChart,
  Notifications,
} from "@mui/icons-material";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Theme } from "@mui/material/styles";
import { useUserContext } from "../pages/Home/UserContext";

interface ChartData {
  name: string;
  value: number;
}

const chartData: ChartData[] = [
  { name: "Jan", value: 4000 },
  { name: "Feb", value: 3000 },
  { name: "Mar", value: 5000 },
  { name: "Apr", value: 2780 },
  { name: "May", value: 1890 },
  { name: "Jun", value: 2390 },
];

export const HomeContents: React.FC = () => {
  const theme = useTheme<Theme>();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { permissions } = useUserContext();

  const hasAddTodo = permissions.filter(
    (value) => value === "todos.delete_todo"
  );
  const isOrdersPermitted = hasAddTodo.length !== 0;

  return (
    <Box
      component="main"
      sx={{
        p: 5,

        width: { md: `calc(100% - 200px)` },
      }}
    >
      <Box sx={{ ...theme.mixins.toolbar }} />

      {/* Stats Cards */}
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={3}
        sx={{ mb: 3 }}
        useFlexGap
        flexWrap="wrap"
      >
        {[
          {
            title: "Total Users",
            value: "1,234",
            icon: <People color="secondary" sx={{ fontSize: 40 }} />,
            change: "12%",
            color: "secondary",
          },
          {
            title: "Revenue",
            value: "$23,450",
            icon: <AttachMoney color="success" sx={{ fontSize: 40 }} />,
            change: "8%",
            color: "success",
          },
          {
            title: "Conversion Rate",
            value: "3.6%",
            icon: <BarChart color="info" sx={{ fontSize: 40 }} />,
            change: "2%",
            color: "error",
          },
        ].map((stat) => (
          <Paper
            key={stat.title}
            sx={{
              p: 2,
              display: "flex",
              justifyContent: "space-between",
              border: 1,
              borderColor: "divider",
              flexGrow: 1,
              minWidth: isMobile ? "100%" : "300px",
            }}
          >
            <div>
              <Typography variant="overline" color="text.secondary">
                {stat.title}
              </Typography>
              <Typography variant="h4" component="div">
                {stat.value}
              </Typography>
              <Typography
                variant="caption"
                color={`${stat.color}.main`}
                sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
              >
                <ArrowUpward fontSize="small" />
                {stat.change}
              </Typography>
            </div>
            {stat.icon}
          </Paper>
        ))}
      </Stack>

      {/* Chart Section */}
      <Stack spacing={3} sx={{ mb: 3 }}>
        <Paper
          variant="outlined"
          sx={{
            p: 2,
            height: { xs: 250, md: 300 },
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography variant="h6" gutterBottom>
            Monthly Sales
          </Typography>
          <Box sx={{ flex: 1 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke={theme.palette.primary.main}
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </Box>
        </Paper>
      </Stack>

      {/* Recent Orders & Activity */}
      {isOrdersPermitted && (
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={3}
          alignItems="stretch"
        >
          <Box sx={{ flexGrow: 1 }}>
            <Paper variant="outlined" sx={{ p: 2, height: "100%" }}>
              <Typography variant="h6" gutterBottom>
                Recent Orders
              </Typography>
              <TableContainer>
                <Table size="medium">
                  <TableHead>
                    <TableRow>
                      <TableCell>Order ID</TableCell>
                      <TableCell>Customer</TableCell>
                      <TableCell align="right">Amount</TableCell>
                      <TableCell>Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {[1, 2, 3].map((row) => (
                      <TableRow key={row} hover>
                        <TableCell>#ORD{row}00</TableCell>
                        <TableCell>Customer {row}</TableCell>
                        <TableCell align="right">${row * 100}</TableCell>
                        <TableCell sx={{ color: "success.main" }}>
                          Completed
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Box>

          <Box sx={{ flexBasis: { md: "30%" } }}>
            <Paper variant="outlined" sx={{ p: 2, height: "100%" }}>
              <Typography variant="h6" gutterBottom>
                Recent Activity
              </Typography>
              <List dense>
                {[1, 2, 3].map((item) => (
                  <ListItem key={item} disablePadding>
                    <ListItemIcon sx={{ minWidth: 40 }}>
                      <Notifications color="primary" fontSize="small" />
                    </ListItemIcon>
                    <ListItemText
                      primary="New order received"
                      secondary={
                        <>
                          <Typography
                            component="span"
                            variant="caption"
                            color="text.secondary"
                          >
                            2 hours ago
                          </Typography>
                          <Typography
                            component="span"
                            display="block"
                            variant="caption"
                          >
                            Order #ORD{item}00
                          </Typography>
                        </>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Box>
        </Stack>
      )}
    </Box>
  );
};
