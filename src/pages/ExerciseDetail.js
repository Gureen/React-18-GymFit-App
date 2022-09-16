import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box } from "@mui/material";

import {
  exercisesOptions,
  fetchData,
  youtubeOptions,
} from "../utils/fetchData";
import Detail from "../components/Detail";
import ExerciseVideo from "../components/ExerciseVideo";
import SimilarExercises from "../components/SimilarExercises";

const ExcerciseDetail = () => {
  const [exerciseDetail, setExerciseDetail] = useState({});
  const [exerciseVideos, setExerciseVideos] = useState([]);
  const [targetMuscle, setTargetMuscle] = useState([]);
  const [equipment, setEquipment] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchExercisesData = async () => {
      const exercisesDbUrl = "https://exercisedb.p.rapidapi.com";
      const youtubeSearchUrl =
        "https://youtube-search-and-download.p.rapidapi.com/search?query=";

      const exerciseData = await fetchData(
        `${exercisesDbUrl}/exercises/exercise/${id}`,
        exercisesOptions
      );
      setExerciseDetail(exerciseData);
      console.log(exerciseData);
      const exerciseVideosData = await fetchData(
        `${youtubeSearchUrl}${exerciseData?.name}`,
        youtubeOptions
      );
      setExerciseVideos(exerciseVideosData?.contents);

      const targetMuscleExerciseData = await fetchData(
        `${exercisesDbUrl}/exercises/target/${exerciseData.target}`,
        exercisesOptions
      );
      setTargetMuscle(targetMuscleExerciseData);

      const equipmentMuscleExerciseData = await fetchData(
        `${exercisesDbUrl}/exercises/equipment/${exerciseData.equipment}`,
        exercisesOptions
      );
      setEquipment(equipmentMuscleExerciseData);
    };
    fetchExercisesData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <Box>
      <Detail exerciseDetail={exerciseDetail} />
      <ExerciseVideo
        exerciseVideos={exerciseVideos}
        name={exerciseDetail.name}
      />
      <SimilarExercises
        targetMuscleExercise={targetMuscle}
        equipmentExercise={equipment}
      />
    </Box>
  );
};

export default ExcerciseDetail;
