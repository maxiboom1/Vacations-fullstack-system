import "./EditVacation.css";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import notifyService from "../../../Services/NotifyService";
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import VacationModel from "../../../Models/VacationsModel";
import { Grid } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import dataService from "../../../Services/DataService";

const theme = createTheme();

function EditVacation(): JSX.Element {
    const navigate = useNavigate();
    const params = useParams();
    const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
    const {register, handleSubmit, setValue} = useForm<VacationModel>();
    
    useEffect(()=>{
        const id = +params.vacationId;
        dataService.getOneVacation(id)
        .then((v)=>{
            setValue("vacationId", v.vacationId);
            setValue("destination", v.destination);
            setValue("description", v.description);
            setValue("startDate", format(new Date(v.startDate), "yyyy-MM-dd"));
            setValue("endDate", format(new Date(v.endDate), "yyyy-MM-dd"));
            setValue("price", v.price);
            setImagePreviewUrl(v.imageUrl);
        })
        .catch((err) => notifyService.error(err));

    },[]);
    
    async function send(vacation: VacationModel){ 
        
        try{ 

            vacation.image = (vacation.image as unknown as FileList)[0];
            await dataService.updateVacation(vacation);                     
            notifyService.success('Vacation has been updated');
            navigate("/home");

        }catch(e:any){
            notifyService.error(e);
        }

    }
    
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const reader = new FileReader();
        const file = e.target.files[0];
        reader.onloadend = () => { setImagePreviewUrl(reader.result as string);};
        reader.readAsDataURL(file);
      };

    return (
        <div className="Register">
				
            <ThemeProvider theme={theme}>
        
                <Container component="main" maxWidth="xs">
        
                    <CssBaseline />
            
                    <Box sx={{marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                        
                        {/* <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}><LockOutlinedIcon /></Avatar> */}
                        
                        <Typography component="h1" variant="h5">Edit Vacation</Typography>
                        
                        <Box component="form" onSubmit={handleSubmit(send)} noValidate sx={{ mt: 1 }}>
                        <Grid container alignItems="center" spacing={2} >
                            
                            <input type="hidden" {...register("vacationId")} />

                            <Grid item xs={12}>
                            <TextField margin="dense" required fullWidth label="Destination"{...register("destination")} InputLabelProps={{ shrink: true }}   />
                            </Grid>
                            
                            <Grid item xs={12} sm={4}>
                                <TextField type="date" margin="normal" required fullWidth label="Start date" {...register("startDate")} InputLabelProps={{ shrink: true }}/>
                            </Grid>
                            
                            <Grid item xs={12} sm={4}> 
                                <TextField type="date" margin="normal" required fullWidth label="End date" {...register("endDate")} InputLabelProps={{ shrink: true }}/>
                            </Grid>
                            

                            <Grid item xs={12} sm={4}>
                            <TextField type="number" margin="dense" required fullWidth label="Price"{...register("price")} InputLabelProps={{ shrink: true }} />
                            </Grid>

                            <Grid item xs={12}>
                            <TextField margin="dense" required multiline fullWidth label="Description" {...register("description")} InputLabelProps={{ shrink: true }} />
                            </Grid>

                            <Grid item xs={12}>
                            <TextField type="file" fullWidth inputProps={{ accept: "image/*" }} {...register("image")} onChange={handleImageChange}/>
                            </Grid>
                            
                            <Grid item xs={12}>
                            <img className="imagePreviewOnUpdate" src={imagePreviewUrl} />
                            </Grid>


                            <Grid item xs={12}>   
                            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>Edit</Button>
                            </Grid>
                            
                            <Grid item xs={12}>   
                            <Link href="/login" variant="body2"> What should we place here? </Link>
                            </Grid>


                        </Grid>
                        </Box>

                    </Box>

                    </Container>

            </ThemeProvider>

        </div>
    );
}


export default EditVacation;


