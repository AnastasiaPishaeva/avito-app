import React, { useState, useEffect } from 'react';
import {Grid, Typography, Box } from "@mui/material";
import { useLocation, useNavigate } from 'react-router-dom';
import "swiper/css";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import api from '../api/api';

const AdDetailsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const adData = location.state?.adData;
  const [adDetails, setAdDetails] = useState();

  useEffect(() => {

    api
      .get(`/api/${adData}`)
      .then((res) => {
        setAdDetails(res.data);
      })
      .catch((err) => console.error('Ошибка загрузки события:', err));
  }, [adData]);

  <Box sx = {{width : "100%"}}>
    <Grid container spacing={3}>
        <Grid size={{xs : 12, sm : 6}}>

        </Grid>
    </Grid>

  </Box>
}
export default AdDetailsPage;

