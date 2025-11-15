import React from "react";
import {Grid, Card, CardMedia, CardContent, Typography } from "@mui/material";

interface CardProps {
    img: string;
    title: string;
    price: number;
    category: string;
    date: string;
    status: string;
    priority: string;
}

const CardOfProduct : React.FC<CardProps> = ({
    img,
    title,
    price,
    category,
    date,
    status,
    priority,
}) => {
    const formattedDate = new Date(date).toLocaleDateString("ru-RU", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit"
        });
        
    return (
        <Card>
            <Grid container spacing={2}> 
            <Grid size={{ xs: 8, sm: 4 }}
            sx ={{padding: 4}}
            >
            <CardMedia
                component="img"
                image={img}
                alt={title}
                sx = {{ boxShadow: 3, aspectRatio: "1/1", 
                borderRadius: 8}}
            />
            </Grid>

            <Grid size={{ xs: 8, sm: 8}}>
            <CardContent sx ={{textAlign : "left"}}>
                <Typography> {title}</Typography>
                <Typography> Стоимость: {price} рублей</Typography>
                <Typography> Категория: {category}</Typography>
                <Typography> Дата создания: {formattedDate}</Typography>
                <Typography> Статус: {status}</Typography>
                <Typography> Приоритет: {priority}</Typography>
            </CardContent>
            </Grid>
        </Grid>
        </Card>
    )
}
export default CardOfProduct;