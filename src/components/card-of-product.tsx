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

            <Grid size={{ xs: 12, sm: 6}}>
            <CardContent>
                <Typography> {title}</Typography>
                <Typography> {price}</Typography>
                <Typography> {category}</Typography>
                <Typography> {date}</Typography>
                <Typography> {status}</Typography>
                <Typography> {priority}</Typography>
            </CardContent>
            </Grid>
        </Grid>
        </Card>
    )
}
export default CardOfProduct;