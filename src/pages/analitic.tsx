import { useState, useEffect } from 'react';
import {Grid, Typography, Box, Card, CardContent, Button, TextField, MenuItem } from "@mui/material";
import api from '../api/api';
import { useTheme } from "@mui/material/styles";
import type { ActivityData, DecisionsData, Moderator, ModeratorStats, Statistic, StatsSummary} from "../types/product";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

export const formatDate = (date: string ) => {
    const formattedDate = new Date(date);
    return formattedDate.toLocaleDateString("ru-RU", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit"
        })};

const Analytics = () => {
  const theme = useTheme();
  const [statisticInfo, setstatisticInfo] = useState<StatsSummary>({} as StatsSummary);
  const [period, setPeriod] = useState<string>("week");
  const [activityData, setActivityData] = useState<ActivityData[]>([]);
  const [decisionsData, setDecisionsData] = useState<DecisionsData>();
  const [categoryData, setCategoryData] = useState<{ name: string; value: number }[]>([]);
  const fetchStat = async (params = {}) => {
        try {
        const res = await api.get(`/stats/summary`, { params: {period} });
        console.log("данные с сервера:", res.data);
        setstatisticInfo(res.data);
        } catch (err) {
        console.error("Ошибка загрузки объявления:", err);
        }
    };    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setPeriod(value);
    };

    const fetchActivity = async (params = {}) => {
        try {
            const res = await api.get("/stats/chart/activity", { params: { period } });
            setActivityData(res.data); 
            console.log("данные с сервера activity:", res.data);
        } catch (err) {
            console.error("Ошибка загрузки активности:", err);
        }
    };

    const fetchDecisions = async (params = {}) => {
        try {
            const res = await api.get("/stats/chart/decisions", { params: { period } });
            setDecisionsData(res.data); 
            console.log("данные с сервера decisions:", res.data);
        } catch (err) {
            console.error("Ошибка загрузки решений:", err);
        }
    };

    const fetchCategory = async () => {
      try {
        const res = await api.get("/stats/chart/categories", {
          params: { period },
        });
        const chartData = Object.entries(res.data).map(([name, value]) => ({ name, value: Number(value) }));
        setCategoryData(chartData);
      } catch (err) {
        console.error("Ошибка загрузки данных по категориям:", err);
      }
    };

    const colors = [
        "#8884d8", "#39bd6cff", "#ff9b58ff", "#d0ed57", "#e7ca38ff", "#d98aeb", "#5d3dbeff"
    ];

    const chartData1 = activityData.map(day => ({
        date: new Date(day.date).toLocaleDateString("ru-RU", { weekday: "short", day: "numeric", month: "numeric" }),
        Одобрено: day.approved,
        Отклонено: day.rejected,
        Доработка: day.requestChanges,
    }));

    const chartData2 = [
        { name: "Одобрено", value: decisionsData?.approved},
        { name: "Отклонено", value: decisionsData?.rejected },
        { name: "На доработку", value: decisionsData?.requestChanges },
    ];
    
    const chartData3 = categoryData.map(elem => ({
        name: elem.name, value: elem.value
    }));

    useEffect(() => {
        fetchStat();
        fetchActivity();
        fetchDecisions();
        fetchCategory();
        }, [period]);


  return(
    <Box sx = {{width : "100%"}}>
        <Grid container >
            <Grid size={{xs : 4}} >
                <Typography sx = {{fontWeight: "bold", color: theme.palette.purple.light, mb : 2}}> Период</Typography>
                <TextField
                name="status"
                select
                value={period}
                onChange={handleChange}
                size="small"
                sx={{ width: "100%" }}
                >
                <MenuItem value="today">Сегодня</MenuItem>
                <MenuItem value="week">За неделю</MenuItem>
                <MenuItem value="month">За месяц</MenuItem>
                </TextField>
            </Grid>
        </Grid>
        {Object.keys(statisticInfo).length !== 0 && (
        <Grid container spacing={3}>
            <Grid size = {{xs : 6, sm : 3}} sx = {{mt : 6,}}>
                <Card sx ={{width: "100%"}}>
                        <CardContent sx = {{padding : theme.spacing(2, 2)}}>
                            <Typography sx = {{fontWeight: "bold", color: theme.palette.purple.light, textAlign: "center"}}> Проверено</Typography>
                                <Typography sx = {{fontWeight: "bold", fontSize : "25px"}}> {statisticInfo.totalReviewed}</Typography>     
                        </CardContent>
                    </Card>
            </Grid>
            <Grid size = {{xs : 6, sm : 3}} sx = {{mt : 6,}}>
                <Card sx ={{width: "100%"}}>
                        <CardContent sx = {{padding : theme.spacing(2, 2)}}>
                            <Typography sx = {{fontWeight: "bold", color: theme.palette.purple.light, textAlign: "center"}}> Одобрено</Typography>
                                <Typography sx = {{fontWeight: "bold", fontSize : "25px"}}> {statisticInfo.approvedPercentage.toFixed(1)}%</Typography>     
                        </CardContent>
                    </Card>
            </Grid>
            <Grid size = {{xs : 6, sm : 3}} sx = {{mt : 6}}>
                <Card sx ={{width: "100%"}}>
                        <CardContent sx = {{padding : theme.spacing(2, 2)}}>
                            <Typography sx = {{fontWeight: "bold", color: theme.palette.purple.light, textAlign: "center"}}> Отклонено</Typography>
                                <Typography sx = {{fontWeight: "bold", fontSize : "25px"}}> {statisticInfo.rejectedPercentage.toFixed(1)}%</Typography>     
                        </CardContent>
                    </Card>
               
            </Grid>
            <Grid size = {{xs : 6, sm : 3}} sx = {{mt : 6,}}>
                <Card sx ={{width: "100%"}}>
                        <CardContent sx = {{padding : theme.spacing(2, 2)}}>
                            <Typography sx = {{fontWeight: "bold", color: theme.palette.purple.light, textAlign: "center"}}> Среднее время</Typography>
                                <Typography sx = {{fontWeight: "bold", fontSize : "25px"}}> {(statisticInfo.averageReviewTime / 60000).toFixed(1) } мин.</Typography>     
                        </CardContent>
                    </Card>
            </Grid>
        </Grid>
        )}

        <Box width="100%" height={350} mt={3} mb = {8}>
            <Typography mb={2} sx={{ textAlign: "center" }}>
                График активности
            </Typography>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData1} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="Одобрено" stackId="a" fill= {theme.palette.background.green} />
                <Bar dataKey="Отклонено" stackId="a" fill={theme.palette.background.red} />
                <Bar dataKey="Доработка" stackId="a" fill={theme.palette.background.yellow} />
                </BarChart>
            </ResponsiveContainer>
        </Box>

        <Box width="100%" height={350} mb = {10}>
            <Typography mb={2} sx={{ textAlign: "center" }}>
                Диаграмма распределения решений
            </Typography>
            <ResponsiveContainer width="100%" height="100%" >
                <PieChart>
                    <Pie
                    data={chartData2}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label
                    >
                    <Cell  fill= {theme.palette.background.green} />
                    <Cell  fill={theme.palette.background.red} />
                    <Cell  fill={theme.palette.background.yellow} />
                    </Pie>
                    <Tooltip />
                    <Legend />
                </PieChart>
                </ResponsiveContainer>
        </Box>

        <Box width="100%" height={350} mb = {8}>
            <Typography mb={2} sx={{ textAlign: "center" }}>
                Диаграмма категорий
            </Typography>
            <ResponsiveContainer width="100%" height="100%" >
                <PieChart>
                    <Pie
                    data={chartData3}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label
                    >
                    {chartData3.map((name, index) => (
                        <Cell fill={colors[index]} />
                    ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                </PieChart>
                </ResponsiveContainer>
        </Box>
    </Box>
  )
}
export default Analytics;

