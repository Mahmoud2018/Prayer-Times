let cities = [
    {
      "name": "Vaxjo",
    },
    {
      "name": "Tingsryd",
    },
    {
      "name": "Almhult",
    },

    ]

  for ( let city of cities ) {

    let content = 
    `<option>${city.name}</option>`
    document.getElementById('cities').innerHTML += content
    
  }

  document.getElementById('cities').addEventListener('change', function() {

    let cityName = this.value
    document.getElementById('cityname').innerHTML = cityName
    GetPrayersTimesOfCity(cityName);
    
  console.log(typeof cityName)
});


function GetPrayersTimesOfCity(cityname) {
  
    let params = {
    country: "SE",
    city: cityname,
    }

  axios.get('http://api.aladhan.com/v1/timingsByCity', {
    params: params
  })
  .then(function (response) {

    const DateData = response.data.data.date.gregorian.date
    const weekday = response.data.data.date.gregorian.weekday.en
      document.getElementById('Date').innerHTML = weekday + ' ' + DateData

    const timings = response.data.data.timings
    FillTimePrayer("Fajr", timings.Fajr)
    FillTimePrayer("Sunrise", timings.Sunrise)
    FillTimePrayer("Dhuhr", timings.Dhuhr)
    FillTimePrayer("Asr", timings.Asr)
    FillTimePrayer("Maghrib", timings.Maghrib)
    FillTimePrayer("Isha", timings.Isha)

    // console.log(response.data.data.timings); 
  })
  .catch(function (error) {
    console.log(error);
  });
}


function FillTimePrayer(id, time) {
  document.getElementById(id).innerHTML = time;
}

GetPrayersTimesOfCity("Vaxjo")


// getPost by Axios 
// function getPostbyAxios(userId) {

//     axios.get("https://jsonplaceholder.typicode.com/posts?userId="+userId)
//     .then(response => {
//       let posts = response.data
//       document.getElementById("content").innerHTML = "";
//           for (post of posts) {
//             document.getElementById("content").innerHTML += 
//             `<h5 class="card-title">${post.title}</h5> <p class="card-text">${post.body}</p> <hr> `
//           };
//       })
//       .catch(error => {
//        alert(error.message)
//       })
  
// }

// function getUsersbyAxios() {
// return new Promise((resolve , reject) => {
// axios.get("https://jsonplaceholder.typicode.com/users")
//   .then(response => {
//     let users = response.data
//     document.getElementById("users").innerHTML = "";
//         for (user of users) {
//           document.getElementById("users").innerHTML += 
//           `<button onclick="getID(${user.id}, this)" id="users" type="button" 
//           class="list-group-item list-group-item-action">
//           ${user.username}<p>${user.email}</p></button> `
//         };
//         resolve();
//     })
//     .catch(error => {
//       alert(error.message)
//       reject()
//     })

//   });
// }

// function getID(id ,el){
//   getPostbyAxios(id);
//     let Active = document.getElementsByClassName("active");
//     for (Active of Active) {Active.classList.remove("active");}
//     el.classList.add("active")
// }


// getUsersbyAxios()
// .then(() => {
//   getPostbyAxios(1)
//   }).catch(error => {
//         alert(error.message)
//   })




  