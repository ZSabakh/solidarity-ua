import { CardActionArea, Card, CardContent, Typography, CardMedia } from "@mui/material";

export default function Resource({ title, description, link, image }) {
  let userCulture = localStorage.getItem("user_culture");

  return (
    <CardActionArea
      sx={{ minWidth: 250, maxWidth: 400, minHeight: 110 }}
      onClick={() => {
        window.open(link, "_blank");
      }}
    >
      <Card sx={{ display: "flex", minHeight: 110 }}>
        <CardContent sx={{ flex: 2 }}>
          <Typography gutterBottom variant="h5" component="h2">
            {title ? title[userCulture] : ""}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p" dangerouslySetInnerHTML={{ __html: description[userCulture] }}></Typography>
        </CardContent>
        <CardMedia sx={{ flex: 1 }} image={image} />
      </Card>
    </CardActionArea>
  );
}
