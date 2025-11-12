import React from "react";
import { useEffect, useState } from "react";
import {Grid, Box } from "@mui/material";
import Card from '../components/card-of-product';
import api from "../api/api";

interface Product {
    id: number;
    images: string[];
    title: string;
    price: number;
    category: string;
    date: string;
    status: string;
    priority: string;
}


const MainPage = () => {
    const [products, setProducts] = useState<Product[]>([]);
    useEffect(() => {
        api
        .get(`/ads`) 
        .then((res) => {
            console.log("Получено с сервера:", res.data);
            setProducts(res.data.ads);
        })
        .catch((err) => console.error("Ошибка загрузки данных:", err));
        }, [])
    
    return(
        <Grid>
            {products.map((card: Product) => (
                <Box
                key={card.id}>
                    <Card
                        img = {card.images[0]}
                        title= {card.title}
                        price={card.price}
                        date={card.date}
                        category={card.category}
                        status={card.status}
                        priority={card.priority}>
                    </Card>
                </Box>
            ))}
        </Grid>
    )
}
export default MainPage;