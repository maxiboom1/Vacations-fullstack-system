import "./EditVacation.css";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import notifyService from "../../../Services/NotifyService";
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import VacationModel from "../../../Models/VacationsModel";
import { Avatar, Grid, Link } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import dataService from "../../../Services/DataService";
import BorderColorIcon from '@mui/icons-material/BorderColor';

const theme = createTheme();

function EditVacation(): JSX.Element {
    const navigate = useNavigate();
    const params = useParams();
    const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
    const {register, handleSubmit, setValue, formState: { errors }, watch} = useForm<VacationModel>();

    
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

    // Custom validation function to compare start and end dates
    const validateEndDate = (value: string) => {
        const startDate = new Date(watch("startDate")); // Watch is part of react-hook-form, and can get values from form.
        const endDate = new Date(value);
        if (endDate <= startDate) {
        return "End date must be greater than start date";
        }
        return true;
    };


    return (
        <div className="EditVacation">
				
            <ThemeProvider theme={theme}>
        
                <Container component="main" maxWidth="xs">
        
                    <CssBaseline />
            
                    <Box sx={{marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                        
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}><BorderColorIcon /></Avatar>
                        
                        <Typography component="h1" variant="h5">Update Vacation</Typography>
                        
                        <Box component="form" onSubmit={handleSubmit(send)} noValidate sx={{ mt: 1 }}>
                        <Grid container alignItems="center" spacing={2} >
                            
                            <input type="hidden" {...register("vacationId")} />

                            <Grid item xs={12}>
                                <TextField margin="dense" fullWidth label="Destination"
                                
                                // Destination validation
                                {...register("destination", { 
                                    required: "Destination is required",
                                    minLength: {value: 7, message: "Destination must be at least 7 characters long"},
                                    maxLength: {value: 30, message: "Destination must not exceed 30 characters long"},
                                })}
                                error={Boolean(errors.destination)}
                                helperText={errors.destination?.message} 
                                InputLabelProps={{ shrink: true }}   />
                            </Grid>
                            
                            <Grid item xs={12} sm={6}>
                                <TextField type="date" margin="normal" required fullWidth label="Start date" 
                                
                                // Start date validation
                                {...register("startDate", {required: "Start date is required"})}
                                error={Boolean(errors.startDate)}
                                helperText={errors.startDate?.message} 
                                InputLabelProps={{ shrink: true }}/>
                            </Grid>
                            
                            <Grid item xs={12} sm={6}> 
                                <TextField type="date" margin="normal" required fullWidth label="End date" 
                                 // End date validation
                                 {...register("endDate", {
                                    required: "End date is required",
                                    validate: {
                                        isEndDateAfterStartDate: validateEndDate, // Custom validation function
                                    }
                                })}
                                error={Boolean(errors.endDate)}
                                helperText={errors.endDate?.message}  
                                InputLabelProps={{ shrink: true }}/>
                            </Grid>
                            
                            <Grid item xs={12}>
                            <TextField type="number" margin="dense" required fullWidth label="Price"
                                
                                {...register("price", { 
                                    required: "Price is required",
                                    min: {value: 0, message: "Price cannot be negative"},
                                    max: {value: 10000, message: "Price cannot be greater than 10,000"},
                                })} 

                                error={Boolean(errors.price)}
                                helperText={errors.price?.message} 
                                InputLabelProps={{ shrink: true }} />
                            </Grid>

                            <Grid item xs={12}>
                            <TextField margin="dense" required multiline fullWidth label="Description" 
                                
                                {...register("description", { 
                                    required: "Description is required",
                                    minLength: {value: 20, message: "Description must be at least 20 characters long"},
                                    maxLength: {value: 500, message: "Description must not exceed 500 characters long"},
                                })} 

                                error={Boolean(errors.description)}
                                helperText={errors.description?.message} 
                                InputLabelProps={{ shrink: true }} />
                            </Grid>

                            <Grid item xs={12} sm={8}>
                            <TextField type="file" fullWidth inputProps={{ accept: "image/*" }} 
                                {...register("image") }
                                error={Boolean(errors.image)}
                                helperText={errors.image?.message} 
                                onChange={handleImageChange}/>
                            </Grid>
                            
                            <Grid item xs={12} sm={4}>
                            <img className="imagePreviewOnUpdate" src={imagePreviewUrl} />
                            </Grid>

                            <Grid item xs={12}>   
                            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>Update</Button>
                            </Grid>
                            
                            <Grid item xs={12}>   
                            <Link href="/home" variant="body2"> Take me back? </Link>
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