import React from "react";
import { useEffect, useState } from "react";
import {Grid, Box } from "@mui/material";
import Card from '../components/card-of-product';
import api from "../api/api";
import Filters from "../components/filters";
import { Height } from "@mui/icons-material";

interface Product {
    id: number;
    images: string[];
    title: string;
    price: number;
    category: string;
    createdAt: string;
    status: string;
    priority: string;
}


const MainPage = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [filters, setFilters] = useState<Record<string, any>>({});

    const fetchAds = async (params = {}) => {
        try {
        const res = await api.get("/ads", { params });
        setProducts(res.data.ads);
        console.log("Получено с сервера:", res.data);
        } catch (err) {
        console.error("Ошибка загрузки:", err);
        }
    };

    useEffect(() => {
        fetchAds(filters);
    }, [filters]);

    // useEffect(() => {
    //     api
    //     .get(`/ads`) 
    //     .then((res) => {
    //         console.log("Получено с сервера:", res.data);
    //         setProducts(res.data.ads);
    //     })
    //     .catch((err) => console.error("Ошибка загрузки данных:", err));
    //     }, [])
    
    return(
        <Box>
        <Filters onChange={setFilters} />
        <Grid container spacing={6}>
            {products.map((card: Product) => (
                <Grid size={{ xs: 12, sm: 6 }} 
                key={card.id}
                >
                    <Card
                        img = {card.images[0]}
                        title= {card.title}
                        price={card.price}
                        date={card.createdAt}
                        category={card.category}
                        status={card.status}
                        priority={card.priority}
                        >
                    </Card>
                </Grid>
            ))}
        </Grid>
        </Box>
    )
}
export default MainPage;