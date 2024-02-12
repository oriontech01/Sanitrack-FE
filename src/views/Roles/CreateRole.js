import { useState } from "react";
import { TextField, Button, Typography, Grid } from "@mui/material";
import useRole from "../../Hooks/useRole";

const CreateRole = () => {
    const [roleName, setRoleName] = useState('');
    const { addRole } = useRole();

    const handleSubmit = async (event) => {
        event.preventDefault();
        await addRole(roleName);
    };

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Typography variant="h2">Add Role</Typography>
            </Grid>
            <Grid item xs={12}>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Role Name"
                        variant="outlined"
                        fullWidth
                        value={roleName}
                        onChange={(event) => setRoleName(event.target.value)}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        disabled={roleName === '' || roleName.length <= 2}
                        style={{ marginTop: "12px" }}
                    >
                        Submit
                    </Button>
                </form>
            </Grid>
        </Grid>
    );
}

export default CreateRole;
