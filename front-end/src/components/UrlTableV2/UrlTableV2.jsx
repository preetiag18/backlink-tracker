import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { useNavigate } from "react-router-dom";
import { visuallyHidden } from "@mui/utils";
import { Button } from "@mui/material";

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// with exampleArray.slice().sort(exampleComparator)
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: "name",
    numeric: false,
    disablePadding: true,
    label: "Website",
  },
  {
    id: "dr",
    numeric: false,
    disablePadding: false,
    label: "DR",
  },
  {
    id: "email",
    numeric: false,
    disablePadding: false,
    label: "Contact Email",
  },
  {
    id: "price",
    numeric: false,
    disablePadding: false,
    label: "Price paid (Euro)",
  },
  {
    id: "linkUrl",
    numeric: false,
    disablePadding: false,
    label: "Url of the link",
  },
  {
    id: "anchorText",
    numeric: false,
    disablePadding: false,
    label: "Anchor text",
  },
  {
    id: "targetUrl",
    numeric: false,
    disablePadding: false,
    label: "Target Url in the link",
  },
  {
    id: "added",
    numeric: false,
    disablePadding: false,
    label: "Added on",
  },
  {
    id: "status",
    numeric: false,
    disablePadding: false,
    label: "Status",
  },
];

function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
};

const EnhancedTableToolbar = ({ onAddNew }) => {
  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
      }}
    >
      <Typography
        sx={{ flex: "1 1 80%" }}
        variant="h6"
        id="tableTitle"
        component="div"
      >
        List of Urls
      </Typography>
      <Button sx={{ flex: "1 0 20%" }} variant="contained" onClick={onAddNew}>
        Add new
      </Button>
    </Toolbar>
  );
};

export default function EnhancedTable() {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("status");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [rows, setRows] = React.useState([]);

  React.useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((resBody) => {
        setRows(resBody.data);
      })
      .catch((_error) => setRows([]));
  }, []);

  const navigate = useNavigate();

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const visibleRows = React.useMemo(
    () =>
      stableSort(rows, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage,
      ),
    [order, orderBy, page, rowsPerPage, rows],
  );

  return (
    <Box sx={{ width: "98%", margin: "auto", padding: "2rem" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <EnhancedTableToolbar onAddNew={() => navigate("/addnew")} />
        <TableContainer sx={{ padding: "2rem" }}>
          <Table aria-labelledby="tableTitle">
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
            />
            <TableBody>
              {visibleRows.map((row, index) => {
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    role="table"
                    tabIndex={-1}
                    key={row.targetUrl}
                  >
                    <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      padding="none"
                    >
                      {row.name}
                    </TableCell>
                    <TableCell>{row.dr}</TableCell>
                    <TableCell>{row.email}</TableCell>
                    <TableCell>{row.price}</TableCell>
                    <TableCell>{row.linkUrl}</TableCell>
                    <TableCell>{row.anchorText}</TableCell>
                    <TableCell>{row.targetUrl}</TableCell>
                    <TableCell>{row.added}</TableCell>
                    <TableCell>{row.status}</TableCell>
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 53 * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}
