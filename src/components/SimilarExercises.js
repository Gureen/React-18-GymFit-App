import React from "react";
import { Box, Stack, Typography } from "@mui/material";

import HorizontallScrollbar from "./HorizontalScrollbar";
import Loader from "./Loader";

const SimilarExercises = ({ targetMuscleExercise, equipmentExercise }) => {
  return (
    <Box sx={{ mt: { lg: "100px", xs: "0px" } }}>
      <Typography variant="h3" mb={5}>
        Exercises that target the same muscle group
      </Typography>
      <Stack direction="row" sx={{ p: 2, position: "relative" }}>
        {targetMuscleExercise.length ? (
          <HorizontallScrollbar
            data={targetMuscleExercise}
          ></HorizontallScrollbar>
        ) : (
          <Loader />
        )}
      </Stack>
      <Typography variant="h3" mb={5}>
        Exercises that target the same equipment
      </Typography>
      <Stack direction="row" sx={{ p: 2, position: "relative" }}>
        {equipmentExercise.length ? (
          <HorizontallScrollbar data={equipmentExercise}></HorizontallScrollbar>
        ) : (
          <Loader />
        )}
      </Stack>
    </Box>
  );
};

export default SimilarExercises;
