import { useState, useEffect } from 'react';
import {Grid, Typography, Box, Card, CardContent, Button, TextField, MenuItem } from "@mui/material";
import api from '../api/api';
import { useTheme } from "@mui/material/styles";
import type { ActivityData, ModeratorHistory, Moderator, ModeratorStats, Statistic, StatsSummary} from "../types/product";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

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

    const fetchActivity = async (period = "week") => {
        try {
            const res = await api.get("/stats/chart/activity", { params: { period } });
            setActivityData(res.data); 
        } catch (err) {
            console.error("Ошибка загрузки активности:", err);
        }
    };

    const chartData = activityData.map(day => ({
        date: new Date(day.date).toLocaleDateString("ru-RU", { weekday: "short", day: "numeric", month: "numeric" }),
        Одобрено: day.approved,
        Отклонено: day.rejected,
        Доработка: day.requestChanges,
    }));
    

    useEffect(() => {
        fetchStat();
        }, [period]);

    useEffect(() => {
        fetchActivity();
        }, []);


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
                                <Typography sx = {{fontWeight: "bold", fontSize : "25px"}}> {(statisticInfo.averageReviewTime / 60).toFixed(1) } мин.</Typography>     
                        </CardContent>
                    </Card>
            </Grid>
        </Grid>
        )}
        <Box width="100%" height={350} mt={3}>
            <Typography variant="h6" mb={2} sx={{ textAlign: "center" }}>
                График активности за последнюю неделю
            </Typography>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
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
    </Box>
  )
}
export default Analytics;

