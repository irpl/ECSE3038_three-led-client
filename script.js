var names = [
  "Abe",
  "Abraham",
  "Addison",
  "Adelaide",
  "Adeline",
  "Agatha",
  "Agnes",
  "Albert",
  "Alejandra",
  "Alice",
  "Alma",
  "Amara",
  "Ambrose",
  "Amos",
  "Anita",
  "Ansel",
  "Archie",
  "Aron",
  "Arthur",
  "Artie",
  "Atticus",
  "August",
  "Barron",
  "Bea",
  "Beatrix",
  "Beau",
  "Benedict",
  "Bennett",
  "Bernadette",
  "Bernard",
  "Bertie",
  "Bessie",
  "Birdie",
  "Blaine",
  "Blevins",
  "Blythe",
  "Bonnie",
  "Brady",
  "Calliope",
  "Camille",
  "Carlo",
  "Carole",
  "Cassady",
  "Celia",
  "Clara",
  "Clarence",
  "Clellon",
  "Clifford",
  "Cole",
  "Colette",
  "Connie",
  "Cornelius",
  "Cyrus",
  "Dahlia",
  "Daisy",
  "Damion",
  "Darcy",
  "Dean",
  "Denton",
  "Dessie",
  "Dodie",
  "Dominic",
  "Dora",
  "Doris",
  "Dorothy",
  "Earl",
  "Edison",
  "Edith",
  "Edmund",
  "Edwin",
  "Elaine",
  "Eleanor",
  "Elijah",
  "Ellis",
  "Elmer",
  "Elon",
  "Elrod",
  "Emile",
  "Emily",
  "Emma",
  "Emmett",
  "Enid",
  "Ernest",
  "Erwin",
  "Ethel",
  "Etta",
  "Eugenie",
  "Evangeline",
  "Evelyn",
  "Ezra",
  "Faith",
  "Fanny",
  "Faye",
  "Felix",
  "Fletcher",
  "Flora",
  "Florence",
  "Frances",
  "Francis",
  "Frank",
  "Gabrielle",
  "Gael",
  "Galatea",
  "Genevieve",
  "George",
  "Georgia",
  "Gerald",
  "Gert",
  "Gertrude",
  "Gracy",
  "Greta",
  "Gunther",
  "Gus",
  "Harmon",
  "Harold",
  "Harper",
  "Harriet",
  "Harvey",
  "Hattie",
  "Hayden",
  "Hazel",
  "Hector",
  "Henrietta",
  "Henry",
  "Herbert",
  "Hester",
  "Hilda",
  "Holden",
  "Hope",
  "Howard",
  "Hugh",
  "Ian",
  "Ignatius",
  "Imogen",
  "Inez",
  "Irene",
  "Iris",
  "Isabella",
  "Jane",
  "Jarrett",
  "Jasper",
  "Jedediah",
  "Jerry",
  "Joan",
  "Jocelyn",
  "Joel",
  "Josephine",
  "Joyce",
  "Julien",
  "Katherine",
  "Kenneth",
  "Kingsley",
  "Lacey",
  "Lacy",
  "Langston",
  "Laura",
  "Lee",
  "Lincoln",
  "Liza",
  "Lorraine",
  "Louis",
  "Lucas",
  "Lucille",
  "Lucinda",
  "Luisa",
  "Lydia",
  "Margaret",
  "Marjorie",
  "Marshall",
  "Martha",
  "Mathilde",
  "Maxine",
  "Mickey",
  "Milton",
  "Minnie",
  "Miriam",
  "Mollie",
  "Morgan",
  "Neal",
  "Nell",
  "Nelson",
  "Neville",
  "Nora",
  "Norene",
  "Norman",
  "Octavia",
  "Olive",
  "Opal",
  "Orville",
  "Oscar",
  "Otis",
  "Owen",
  "Patricia",
  "Pearl",
  "Penelope",
  "Peyton",
  "Pierce",
  "Polly",
  "Pollyanna",
  "Posey",
  "Presley",
  "Preston",
  "Ralph",
  "Randall",
  "Rawlins",
  "Raymond",
  "Reed",
  "Reginald",
  "Richard",
  "Rodney",
  "Rolla",
  "Rollo",
  "Rosemary",
  "Roy",
  "Ruby",
  "Ruth",
  "Rutherford",
  "Sadie",
  "Sal",
  "Sandra",
  "Scarlet",
  "Selma",
  "Seraphina",
  "Shadrack",
  "Sherman",
  "Shirley",
  "Shoshana",
  "Sophia",
  "Spencer",
  "Stanley",
  "Sterling",
  "Susannah",
  "Sylvia",
  "Theodore",
  "Tobias",
  "Tobin",
  "Trudy",
  "Una",
  "Valentina",
  "Vera",
  "Viola",
  "Violet",
  "Virginia",
  "Waldo",
  "Whitman",
  "Wilber",
  "Wilbert",
  "Willa",
  "Willie",
  "Windsor",
  "Winston",
  "Wren",
  "Wright",
  "Wyatt",
];
var identifier;

window.onload = function () {
  if (localStorage.getItem("identifier") == null) {
    var name = names[Math.floor(Math.random() * names.length)];
    var number = Date.now() % 10000;

    identifier = name + "#" + number;
    localStorage.setItem("identifier", identifier);
  }
  identifier = localStorage.getItem("identifier");
  document.querySelector(".identifier").innerHTML = identifier;

  let socket = new WebSocket(`ws://ecse-three-led-api.onrender.com/ws`);

  socket.onopen = function (e) {
    console.log("[open] Connection established");
    console.log("[info] Sending to server");
    socket.send(JSON.stringify({ username: identifier }));
  };

  socket.onmessage = function (event) {
    let data = JSON.parse(event.data);
    if (data.username) console.log(`[message] Data received from server: ${data.username}`);
    if (data.user == identifier) {
      console.log(`[state] Data received from server: ${JSON.stringify(data)}`);
      document.getElementById("light-switch-1").checked = data.light_switch_1;
      document.getElementById("light-switch-2").checked = data.light_switch_2;
      document.getElementById("light-switch-3").checked = data.light_switch_3;
    }
  };

  window.addEventListener("unload", function () {
    if (socket.readyState == WebSocket.OPEN) socket.close();
  });

  fetch("https://ecse-three-led-api.onrender.com/api/state", {
    // fetch("http://localhost:8000/api/state", {
    headers: {
      "X-API-Key": identifier,
    },
  })
    .then(async (res) => {
      if (res.status == 404) {
        var state = {
          light_switch_1: false,
          light_switch_2: false,
          light_switch_3: false,
        };

        var put_response = await fetch("https://ecse-three-led-api.onrender.com/api/state", {
          // var put_response = await fetch("http://localhost:8000/api/state", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "X-API-Key": localStorage.getItem("identifier"),
          },
          body: JSON.stringify(state),
        });

        var put_json = await put_response.json();
        return put_json;
      }
      if (res.status == 200) {
        var response_json = await res.json();
        return response_json;
      }
    })
    .then((json) => {
      document.getElementById("light-switch-1").checked = json.light_switch_1;
      document.getElementById("light-switch-2").checked = json.light_switch_2;
      document.getElementById("light-switch-3").checked = json.light_switch_3;
    });
};
