import React, { useState, useEffect } from 'react';
import {Grid, Typography, Box, Card, Divider, CardContent, Button } from "@mui/material";
import { useLocation, useNavigate, useParams, Link } from 'react-router-dom';
import "swiper/css";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import api from '../api/api';
import { useTheme } from "@mui/material/styles";
import type { Product, Info, Moderator, Seller } from "../types/product";

export const formatDate = (date: string ) => {
    const formattedDate = new Date(date);
    return formattedDate.toLocaleDateString("ru-RU", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit"
        })};
export const Table = ({  rows }: { rows: string[][] }) => {
    return (
    <table style={{ marginTop: "1rem", borderCollapse: "collapse", marginBottom: "1rem" }}>
        <tbody>
        {rows.map((row, rIdx) => (
            <tr key={rIdx}>
            {row.map((cell, cIdx) => (
                <td key={cIdx} style={{ border: "1px solid lightgray", padding: "4px" }}>{cell}</td>
            ))}
            </tr>
        ))}
        </tbody>
    </table>
    )
};

const AdDetailsPage = () => {
  const theme = useTheme();
  const { adId } = useParams();
  const [adDetails, setAdDetails] = useState<Product>({} as Product);
  const fetchAd = async () => {
        try {
        const res = await api.get(`/ads/${adId}`);
        console.log("данные с сервера:", res.data);
        setAdDetails(res.data);
        } catch (err) {
        console.error("Ошибка загрузки объявления:", err);
        }
    };    

    useEffect(() => {
        fetchAd();
        }, []);

  return(
    <Box sx = {{width : "100%"}}>
        <Grid container spacing={3}>
            <Grid size={{xs : 12, sm : 6}}>
            <Swiper
            modules={[Navigation]}
            navigation
            slidesPerView={1}
            >
            {adDetails.images && adDetails.images.map((picture: string, index: number) => (
                <SwiperSlide key={index} >
                <img
                src={picture}
                alt={`Фото объявления номер ${index + 1}`}
                style={{
                    width: "100%",
                    height: "auto",
                    objectFit: "cover",
                    borderRadius: "12px"
                }}/>
                </SwiperSlide>
            ))}
            </Swiper>
            </Grid>
            <Grid size={{xs : 12, sm : 6}} >
                <Card sx ={{height : "100%"}}>
                    <CardContent>
                        <Typography> История модерации</Typography>
                        {adDetails.moderationHistory && adDetails.moderationHistory.map((chel: Moderator, index: number) => (
                            <Grid sx = {{textAlign : "left"}}>
                            <Typography> Имя: {chel.moderatorName} </Typography>
                            <Typography> Дата и время: {formatDate(chel.timestamp)} </Typography>
                            <Typography> Решение: {chel.action === "requestChanges" ? ("Запрос изменений") : 
                            chel.action === "approved" ? ("Одобрен") :
                            chel.action === "rejected" ? ("Отклонен") : ("Error")} </Typography>
                            {chel.comment && <Typography> Комментрий: {chel.comment} </Typography>}
                            <Divider sx ={{borderBottomWidth: "2px"}} />
                            </Grid>
                        ))}
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
        <Grid size = {{xs : 12}} sx = {{mt : 6, width : "100%"}}>
             <Card sx ={{height : "100%"}}>
                    <CardContent>
                        <Typography> Информация об объявлении</Typography>
                            <Grid sx = {{textAlign : "left"}}>
                            <Typography> Описание </Typography>
                            <Typography> {adDetails.description} </Typography>
                            <Typography> Характеристики: </Typography>
                            {adDetails.characteristics && (
                                <Table rows={Object.entries(adDetails.characteristics)} />
                                )}
                            <Typography> Продавец </Typography>
                            {adDetails.seller && 
                            <Grid>
                            <Typography> Имя: {adDetails.seller.name} </Typography>
                            <Typography> Рейтинг: {adDetails.seller.rating} </Typography>
                            <Typography> Количество объявлений: {adDetails.seller.totalAds} </Typography>
                            <Typography> На сайте с: {formatDate(adDetails.seller.registeredAt)} </Typography>
                            </Grid>}
                            
                            </Grid>
                    
                    </CardContent>
                </Card>
        </Grid>
        <Grid container spacing = {8} sx = {{mt : 4}}>
            <Grid size = {{xs: 7, sm : 4}}>
                <Button sx ={{background : theme.palette.background.green, color : "black", width : "100%", boxShadow : 2}}>
                    Одобрить
                </Button>
            </Grid>
            <Grid size = {{xs: 7, sm : 4}}>
                <Button sx ={{background : theme.palette.background.red, color : "black", width : "100%", boxShadow : 2}}>
                    Отклонить
                </Button>
            </Grid>
            <Grid size = {{xs: 7, sm : 4}}>
                <Button sx ={{background : theme.palette.background.yellow, color : "black", width : "100%", boxShadow : 2}}>
                    Доработать
                </Button>
            </Grid>
        </Grid>
        <Grid container spacing={4} sx = {{mt : 6}}>
            <Link to="/" style ={{color : "black", textDecoration: "none", cursor: "pointer",}}>
                ← К списку
            </Link>

        </Grid>

    </Box>
  )
}
export default AdDetailsPage;

