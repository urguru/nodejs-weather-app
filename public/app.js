console.log("Client side javascript");

const weatherForm = document.getElementById("weatherForm");

weatherForm.addEventListener("submit", (event) => {
  event.preventDefault();
  let message="";
  const temp=document.getElementById('temp')
  const precip=document.getElementById('precip')
  const weather_details=document.getElementById('weather_details')
  const weather_icon=document.getElementById('img')
  const loc=document.getElementById('loc')
  const location = document.getElementById("locationInput").value;
const m = document.getElementById("msg");
  if (location === " ") {
    m.innerHTML="Please provide a valid address"
  } else {
    const url = "/weather?address=" + encodeURIComponent(location);
    fetch(url)
      .then((response) => {
        response.json().then((data) => {
          if (data.error) {
            m.innerHTML=data.error
          } else {
              m.innerHTML="Here are your results"
            console.log(data);
            temp.innerHTML=data.temperature;
            precip.innerHTML=data.precip;
            loc.innerHTML=data.location
            weather_details.innerHTML=data.weather_descriptions
            img.src=data.weather_icons[0]
          }
        });
      })
      .catch((error) => {
        m.innerHTML=error;
      });
  }
  const res=document.getElementById('res')
  res.classList=["container"]
});

