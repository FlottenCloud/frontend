import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDeleteInstanceOpen } from "hooks/api/instance/useDeleteInstance";

interface DeleteButtonProps {
  id: number;
}

const DeleteButton = ({ id }: DeleteButtonProps) => {
  const deleteOpen = useDeleteInstanceOpen(id);

  return (
    <Button
      variant="contained"
      startIcon={<DeleteIcon />}
      size="small"
      onClick={deleteOpen}
      sx={{ marginRight: "8px" }}
    >
      Delete
    </Button>
  );
};

export default DeleteButton;
