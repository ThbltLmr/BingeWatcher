import { Typography } from "@mui/material";

export default function ExplanationCard({title, content}: {title: string, content: string}) {

  return (
    <div className="w-1/3 p-4 mx-4">
      <div className="border-l-4 border-l-blue-500">
        <Typography variant="h4" component="div" sx={{ flexGrow: 1, paddingLeft: 2, marginBottom: 2 }}>{title}</Typography>
        <Typography variant="h5" component="div" sx={{ flexGrow: 1, paddingLeft: 2 }}>{content}</Typography>
      </div>
    </div>
  )
}
