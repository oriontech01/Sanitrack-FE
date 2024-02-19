import { useState } from "react";
import { TextField, Button, Typography, Grid } from "@mui/material";
import usePermission from "Hooks/usePermission";

const CreatePermissions = () => {
  const [permissionName, setPermissionName] = useState('');
  const { addPermission, errorResponse } = usePermission();

  const handleSubmit = async (event) => {
    event.preventDefault();
    await addPermission(permissionName);
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h4">Add Permission</Typography>
      </Grid>
      <Grid item xs={12}>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Permission Name"
            variant="outlined"
            fullWidth
            value={permissionName}
            onChange={(event) => setPermissionName(event.target.value)}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={permissionName === '' || permissionName.length <= 5}
            style={{ marginTop: "12px" }}
          >
            Submit
          </Button>
        </form>
      </Grid>
      {errorResponse && (
        <Grid item xs={12}>
          <Typography variant="body1" style={{ color: 'red' }}>{errorResponse}</Typography>
        </Grid>
      )}
    </Grid>
  );
};

export default CreatePermissions;
