import { Link } from "@mui/material"

type Props = {
  name: string, 
  url?: string
}

export default function Tag({ name, url }: Props) {
  return (
    <Link sx={{ 
      borderRadius: "5px", color: "white",
      marginRight: "5px", padding: "2px 8px", 
      backgroundColor: "#2196f3" }} underline="hover" href={ url ?? "#" }>
        {name}
    </Link>
  )
}