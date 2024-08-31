import React from "react";
import { Card, CardContent, Typography } from "@mui/material";

export default function Review({ review }) {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6">{review.user}</Typography>
        <Typography variant="body2">{review.review}</Typography>
        <Typography variant="body2">Rating: {review.rating} stars</Typography>
      </CardContent>
    </Card>
  );
}
