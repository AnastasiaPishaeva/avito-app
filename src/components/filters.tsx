import { useState } from "react";
import { Box, TextField, MenuItem, Button, Typography, Grid } from "@mui/material";
import { useTheme } from "@mui/material/styles";

type FiltersProps = {
  onChange: (filters: Record<string, any>) => void;
  categories: {id : number, name : string}[];
};


const Filters: React.FC<FiltersProps> = ({ onChange, categories }) => {
  const theme = useTheme();
  const [filters, setFilters] = useState({
    status: [] as string[],
    categoryId: "",
    minPrice: "",
    maxPrice: "",
    search: "",
    sortBy: "createdAt",
    sortOrder: "desc",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleApply = () => {
    onChange(filters);
  };

  const handleReset = () => {
    const cleared = {
      status: [] as string[],
      categoryId: "",
      minPrice: "",
      maxPrice: "",
      search: "",
      sortBy: "createdAt",
      sortOrder: "desc",
    };
    setFilters(cleared);
    onChange(cleared);
  };

  return (
    <Box p={2} sx={{ backgroundColor: theme.palette.background.paper, borderRadius: 2, boxShadow: 1, marginBottom : 3, width : "100%" }}>
      <Typography sx = {{fontWeight: "bold", color: theme.palette.purple.light}}> Фильтры </Typography>
      <Grid container direction="column" spacing={2} flexWrap="wrap" sx={{textAlign : "left"}}>
        <Grid container>
            <Grid size={{xs: 12, sm: 4 }}>
            {/* Поиск */}
            <Typography >Поиск по названию</Typography>
            <TextField
            name="search"
            value={filters.search}
            onChange={handleChange}
            size="small"
            sx={{ width: "100%"}}
            />
            </Grid>
            <Grid size={{xs: 12, sm: 4 }}>
            {/* Статус */}
            <Typography >Статус</Typography>
            <TextField
            name="status"
            select
            value={filters.status}
            onChange={handleChange}
            size="small"
            SelectProps={{
              multiple: true
            }}
            sx={{ width: "100%" }}
            >
            <MenuItem value="pending">На модерации</MenuItem>
            <MenuItem value="approved">Одобрено</MenuItem>
            <MenuItem value="rejected">Отклонено</MenuItem>
            {/* <MenuItem value="draft">Черновик</MenuItem> */}
            </TextField>
            </Grid>
            <Grid size={{xs: 12, sm: 4 }}>
            {/* Категория */}
            <Typography >Категория</Typography>
            <TextField
            name="categoryId"
            select
            type="string"
            value={filters.categoryId}
            onChange={handleChange}
            size="small"
            sx={{ width: "100%" }}
            >
              {categories && categories.map(({ id, name }) => 
                <MenuItem value = {id} >{name}</MenuItem>
              )}
            </TextField>
            </Grid>
        </Grid>
        {/* Цена */}
        <Typography>Цена</Typography>
        <Grid container>
        <Grid size ={{xs : 4, sm : 3}}>
        <TextField
            name="minPrice"
            type="number"
            placeholder="От"
            value={filters.minPrice}
            onChange={handleChange}
            size="small"
            sx={{ width: "100%" }}
        />
        </Grid>
        <Grid size ={{xs : 4, sm : 3}}>
        <TextField
            placeholder="До"
            name="maxPrice"
            type="number"
            value={filters.maxPrice}
            onChange={handleChange}
            size="small"
            sx={{ width: "100%" }}
        />
        </Grid>
        </Grid>
        <Typography>Сортировка</Typography>
        <Grid container>
            {/* Сортировка */}
            <Grid size = {{xs: 12, sm: 3 }} >
            <TextField
            name="sortBy"
            select
            value={filters.sortBy}
            onChange={handleChange}
            size="small"
            sx ={{width : "100%"}}
            >
            <MenuItem value="createdAt">Сортировать по дате</MenuItem>
            <MenuItem value="price">Сортировать по цене</MenuItem>
            <MenuItem value="priority">Сортировать по приоритету</MenuItem>
            </TextField>
            </Grid>

            <Grid size = {{xs: 12, sm: 3 }} >
            <TextField
            name="sortOrder"
            select
            value={filters.sortOrder}
            onChange={handleChange}
            size="small"
            sx ={{width : "100%"}}
            >
            <MenuItem value="asc">По возрастанию</MenuItem>
            <MenuItem value="desc">По убыванию</MenuItem>
            </TextField>
            </Grid>
            </Grid>

            <Grid container sx ={{mt : 2}}>
            <Button variant="contained" onClick={handleApply}   >
            Применить
            </Button>
            <Button variant="outlined" onClick={handleReset}>
            Сбросить
            </Button>
        </Grid>
        
      </Grid>
    </Box>
  );
}
export default Filters;
