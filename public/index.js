/* global Vue, VueRouter, axios */

var HomePage = {
  template: "#home-page",
  data: function() {
    return {
      // welcome: "Welcome to your Places",
      // places: [
      //   { id: 1, name: "Welcome to place 1", address: false },
      //   { id: 2, name: "Welcome to taks 2", address: false },
      //   { id: 3, name: "Welcome to task 3", address: false }
      // ],
      // place: { id: null, name: "", address: "" },
      // chngePlace: { id: null, name: "", address: "" },
      mapPlaces: [
        {
          title: "Mark's House",
          center: {
            lat: 50.7192,
            lng: -1.8808
          },
          description: "This is where the cheeky claps hangout",
          url: "https://myhoneysplace.com/ugly-houses/"
        },
        {
          title: "Mark's Toilet",
          center: {
            lat: 51.7192,
            lng: -2.8808
          },
          description: "This is what the cheeky claps poop",
          url:
            "http://www.hgtv.com/design/rooms/bathrooms/return-of-the-ugly-bathroom"
        },
        {
          title: "Mark's Car",
          center: {
            lat: 49.7192,
            lng: -0.8808
          },
          description: "This is how the cheeky claps move",
          url: "https://www.autoblog.com/photos/dumbest-cars-all-time/"
        }
      ],
      mapPlace: {
        title: "",
        address: "",
        center: {
          lat: 50.7192,
          lng: -1.8808
        },
        description: "",
        url: ""
      },
      searchPlace: ""
    };
  },
  watch: {
    searchPlace: function() {
      var convertSearchPlace = this.searchPlace.split(" ").join("+");
      axios
        .get(
          `https://maps.googleapis.com/maps/api/geocode/json?address=${convertSearchPlace}`
        )
        .then(
          function(response) {
            this.mapPlace.center = response.data.results[0].geometry.location;
          }.bind(this)
        );

      var map = new google.maps.Map(document.getElementById("map"), {
        center: this.mapPlace.center,
        zoom: 12
      });

      this.mapPlaces.forEach(function(mapPlace) {
        var contentString =
          '<div id="content">' +
          '<div id="siteNotice">' +
          "</div>" +
          `<h1 id="firstHeading" class="firstHeading">${mapPlace.title}</h1>` +
          '<div id="bodyContent">' +
          `<p>${mapPlace.description}</p>` +
          `<p>Attribution: ${mapPlace.title}, <a href="${mapPlace.url}">` +
          `${mapPlace.url}` +
          "</div>" +
          "</div>";

        var infowindow = new google.maps.InfoWindow({
          content: contentString
        });

        var marker = new google.maps.Marker({
          position: mapPlace.center,
          map: map,
          title: mapPlace.title
        });
        marker.addListener("click", function() {
          infowindow.open(map, marker);
        });
      });
    }
  },
  mounted: function() {
    // Not required for google maps
    // axios.get("/places").then(
    //   function(response) {
    //     this.places = response.data;
    //   }.bind(this)
    // );

    var map = new google.maps.Map(document.getElementById("map"), {
      center: this.mapPlace.center,
      zoom: 12
    });

    this.mapPlaces.forEach(function(mapPlace) {
      var contentString =
        '<div id="content">' +
        '<div id="siteNotice">' +
        "</div>" +
        `<h1 id="firstHeading" class="firstHeading">${mapPlace.title}</h1>` +
        '<div id="bodyContent">' +
        `<p>${mapPlace.description}</p>` +
        `<p>Attribution: ${mapPlace.title}, <a href="${mapPlace.url}">` +
        `${mapPlace.url}` +
        "</div>" +
        "</div>";

      var infowindow = new google.maps.InfoWindow({
        content: contentString
      });

      var marker = new google.maps.Marker({
        position: mapPlace.center,
        map: map,
        title: mapPlace.title
      });
      marker.addListener("click", function() {
        infowindow.open(map, marker);
      });
    });
  },
  methods: {
    // addPlace: function() {
    //   var newTask = {
    //     id: this.places.length + 1,
    //     name: this.place.name,
    //     address: this.place.address
    //   };
    //   axios
    //     .post("/places", {
    //       name: newTask.name,
    //       address: false
    //     })
    //     .then(function(response) {
    //       console.log(response);
    //     });
    //   this.places.push(newTask);
    //   this.place.name = "";
    // },
    // changePlace: function() {
    //   var changedPlace = {
    //     id: this.chngePlace.id,
    //     name: this.chngePlace.name
    //   };
    //   axios
    //     .patch(`/places/${changedPlace.id}`, {
    //       name: changedPlace.name
    //     })
    //     .then(function(response) {
    //       console.log(response);
    //     });
    // },
    // deleteAllTasks: function() {
    //   this.places.splice(0, this.places.length);
    // }
  },
  computed: {}
};

var router = new VueRouter({
  routes: [{ path: "/", component: HomePage }]
});

var app = new Vue({
  el: "#app",
  router: router
});
