import React, { useState, useEffect } from 'react';
import {Grid, Typography, Box } from "@mui/material";
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import "swiper/css";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import api from '../api/api';
import type { Product, Info } from "../types/product";

const AdDetailsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { adId } = useParams();
  const [adDetails, setAdDetails] = useState<Product>({} as Product);
  const fetchAd = async () => {
        try {
        const res = await api.get(`/ads/10`);
        console.log("данные с сервера:", res.data);
        setAdDetails(res.data);
        } catch (err) {
        console.error("Ошибка загрузки объявления:", err);
        }
    };
  console.log("adData", adId);
  useEffect(() => {
    fetchAd();
    }, [adId]);

  return(
    <Box sx = {{width : "100%"}}>
        <Grid container spacing={3}>
            <Grid size={{xs : 12, sm : 6}}>
            <Swiper
            modules={[Navigation]}
            navigation
            slidesPerView={1}
            >
            {adDetails.images.map((picture: string, index: number) => (
                <SwiperSlide key={index} style={{ paddingBottom: '16px' }}>
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
        </Grid>

    </Box>
  )
}
export default AdDetailsPage;

