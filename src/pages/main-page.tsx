import React from "react";
import { useEffect, useState } from "react";
import {Grid, Box, Typography, TextField } from "@mui/material";
import Card from '../components/card-of-product';
import api from "../api/api";
import Filters from "../components/filters";
import { useNavigate } from 'react-router-dom';
import type { Product, Info } from "../types/product";

// interface Product {
//     id: number;
//     images: string[];
//     title: string;
//     price: number;
//     category: string;
//     createdAt: string;
//     status: string;
//     priority: string;
// }

// interface Info {
//     totalItems: number;
//     totalPages: number;
//     currentPage: number;
//     itemsPerPage: number;
// }


const MainPage = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [filters, setFilters] = useState<Record<string, any>>({});
    const [info, setInfo] = useState<Info>();
    const [currentPage, setCurrentPage] = useState(1);
    const navigate = useNavigate();

    const fetchAds = async (params = {}) => {
        try {
            const queryParams = {
                ...params,
                page: currentPage,
                limit: info?.itemsPerPage
            };
            const res = await api.get("/ads", { params: queryParams });
            setProducts(res.data.ads);
            setInfo(res.data.pagination)
            console.log("Получено с сервера:", res.data);
            } catch (err) {
            console.error("Ошибка загрузки:", err);
        }
    };

    const handlePageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const page = parseInt(event.target.value);
        if (page > 0 && page <= (info?.totalPages || 1)) {
            setCurrentPage(page);
        }
    };

    const handleAdClick = (adId: string) => {
        console.log("Клик по объявлению:", adId);
        navigate(`/item/${adId}`);
    };

    useEffect(() => {
        fetchAds(filters);
    }, [filters,  currentPage]);
    
    return(
        <Box sx ={{width : "100%"}}>
        <Filters onChange={setFilters} />
        <Typography sx={{mb : 2}}>Всего объявлений: {info?.totalItems}</Typography>
        <Grid container spacing={6}>
            {products.map((card: Product) => (
                <Grid size={{ xs: 12, sm: 6 }} 
                key={card.id}
                onClick={() => handleAdClick(String(card.id))}
                sx={{
                    cursor: "pointer",       
                    transition: "0.3s",
                    "&:hover": {
                        transform: "scale(1.02)",
                    }
                }}
                >
                    <Card
                        img = {card.images[0]}
                        title= {card.title}
                        price={card.price}
                        date={card.createdAt}
                        category={card.category}
                        status={card.status === "pending" ? ("На модерации") : 
                            card.status === "approved" ? ("Одобрено") :
                            card.status === "rejected" ? ("Отклонено") : ("Error")
                        }
                        priority={card.priority === "normal" ? ("Обычный") :
                            card.priority === "urgent" ? ("Срочный") : ("Error")
                        }
                        >
                    </Card>
                </Grid>
            ))}
        </Grid>
        <Grid container direction="row" sx={{justifyContent : "center", mt : 2, alignItems : "center"}}>
            <TextField
                name="numberOfPage"
                type="number"
                value={currentPage}
                onChange={handlePageChange}
                size="small"
                inputProps={{ 
                            min: 1, 
                            max: info?.totalPages,
                        }}
                sx={{ all : "initial" , textAlign : "center"}}
            />
            <Typography component="span" sx={{ ml: 2 }}>
                / {info?.totalPages}
            </Typography>

        </Grid>
        </Box>
    )
}
export default MainPage;