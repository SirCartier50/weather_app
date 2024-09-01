'use client'
import { AppBar, Box, Button, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Stack, TextField, Toolbar, Typography } from "@mui/material";
import Image from "next/image";
import { useEffect, useState } from "react";


export default function Home() {
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const[displayedCity, setDisplayedCity]= useState('')
  const[displayedState, setDisplayedState]= useState('')
  const [forecast, setForecast] = useState({})
  const [icons, setIcons] = useState({})
  const [open, setOpen] = useState(false)
  const [issue, setIssue] = useState(false)

  const grabWeather = async() => {
    setIssue(false)
    try{
      await fetch('api/weather', {
        method:'POST',
        body: city + "," + state,
      })
        .then(response=> response.json())
        .then(data=> {
          setForecast(data)
          setDisplayedCity(city)
          setDisplayedState(state)
        })
    }catch{
      setIssue(true)
    }
  }
  
  const formatDate = (date) => {
    const [year, month, day] = date.split('-')
    return `${month}/${day}`
  }

  const handleOpen=() =>{
    setOpen(true)
  }

  const handleClose=() =>{
    setOpen(false)
  }

  useEffect(()=>{
    if (forecast && forecast.current){
      const list = {}
      list["current"] = `icons.tar/icons/${forecast["current"][2].icon}.png`
      Object.keys(forecast).forEach(entry =>{
        list[entry] = `/icons.tar/icons/${forecast[entry][2].icon}.png`
      })
      setIcons(list)
    }
  },[forecast])
  return (
    <Container maxWidth="100vw">
      <AppBar position="static" >
          <Toolbar>
              <Typography varaint = "h6" style={{flexGrow: 1}}>Weather App</Typography>
              <Typography>Mignot Mesele</Typography>
              <Button variant="contained" color="secondary" onClick={handleOpen} sx={{ml:2}}>Info</Button>
          </Toolbar>
      </AppBar>
      <Container maxWidth="md" sx={{display:'flex',  alignitems:'center', flexDirection: 'column'}}>
        
        <Box 
          sx={{textAlign:'center', my:4, ml:6}}
          bgcolor="white"
          border="1px solid #000"
          borderRadius="20px"
          boxShadow={24}
          p={4}
          display="flex"
          flexDirection="column"
          justifyContent="center"
          gap ={3}
        >
          <Typography>Type the city and state to get your weather forecast</Typography>
          <Stack 
            width="100%" 
            direction="row" 
            spacing={2}
          >
            <TextField 
              fullWidth
              value ={city} 
              label="City" 
              onChange={(e) => setCity(e.target.value)}
            />
            <TextField 
            fullWidth
              value={state} 
              label="State" 
              onChange={(e)=>setState(e.target.value)}
            /> 
            <Button
              variant="contained" 
              onClick={grabWeather}
            >
              Search
            </Button>
          </Stack>
          {issue && (
            <Typography color="error">City Not Found! Make sure it is typed correctly</Typography>
          )}
        </Box>
        {forecast.current && (
          <Container>
            <Box 
              sx={{textAlign: 'center', my: 4, ml:26,}}
              bgcolor="lightblue"
              color="white"
              boxShadow= {24}
              p= {4}
              display= 'flex'
              flexDirection= 'column'
              justifyContent= 'center'
              gap= {3}
              width= '400px'
              height= '500px'
            >
              
              <Box sx={{ display:'flex', justifyContent: 'center', Direction:'column'}}>
                
                <Stack 
                height = "50%"
                  width="50%" 
                  direction="column" 
                  spacing={2}
                >
                  <Typography variant="h5">{displayedCity+","+displayedState}</Typography>
                  <Stack direction="row">
                    <Typography variant="h2">{forecast["current"][1] + "°F"}</Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', marginLeft: 2 }}>
                      <Typography variant="h7">{"High " + forecast["2024-08-31"][0] + "°F"}</Typography>
                      <Typography variant="h7">{"Low " + forecast["2024-08-31"][1] + "°F"}</Typography>
                    </Box>
                  </Stack>
                  <Image src={icons["current"]} 	width={150} height={150} alt="icon"></Image>
                  <Typography variant="h5">{forecast["current"][2].description}</Typography>
                  <Typography variant="h6">{"Wind: " + forecast["current"][3] + " mph"}</Typography>
                </Stack>
              </Box>
            </Box>
            <Grid container justifyContent="center" sx={{ml:1, mb:5}}>
              {Object.keys(forecast).map(date => (
                date !== 'current' && (
                  <Grid item xs={12} sm={6} md={2} key={date}>
                    <Box
                      sx={{
                        textAlign: 'center',
                        bgcolor: 'lightblue',
                        color: 'white',
                        boxShadow: 24,
                        p: 2,
                        borderRadius: 2
                      }}
                    >
                      <Typography variant="h6">{formatDate(date)}</Typography>
                      <Image
                        src={`/icons.tar/icons/${forecast[date][2].icon}.png`}
                        width={100}
                        height={100}
                        alt={forecast[date][2].description}
                      />
                      <Typography variant="body2">High: {forecast[date][0]}°F</Typography>
                      <Typography variant="body2">Low: {forecast[date][1]}°F</Typography>
                    </Box>
                  </Grid>
                )
              ))}
            </Grid>
          </Container>
        )}
      </Container>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Product Manager Accelerator</DialogTitle>
        <DialogContent>
            <DialogContentText>
            The Product Manager Accelerator Program is designed to support PM professionals through every stage of their career. From students looking for entry-level jobs to Directors looking to take on a leadership role, our program has helped over hundreds of students fulfill their career aspirations.

Our Product Manager Accelerator community are ambitious and committed. Through our program they have learned, honed and developed new PM and leadership skills, giving them a strong foundation for their future endeavours.

            </DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button onClick={handleClose}>Back</Button>
        </DialogActions>
      </Dialog>
    </Container>

    
  );
}
