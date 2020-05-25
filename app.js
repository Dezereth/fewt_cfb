const baseURL = "https://api.collegefootballdata.com/";
const conferencsURL = "https://api.collegefootballdata.com/conferences";
//const imgSize = "&amp;transparent=true&amp;w=150&amp;h=150" // doesn't appear to work for team logos, just conference ones

let conferenceStrings = {
    acc: "acc",
    b12: "b12",
    b1g: "b1g",
    sec: "sec",
    pac: "pac"
}

let teams = []; //For tracking data of teams to display
let teamNameLookup = {}; //For a reverse id to teams index lookup
let teamStats = []; //For populating with objects

async function getData(localurl) {
    return response = await axios.get(localurl)
}

async function populateTeams(conferenceToDisplay){
    teams = [];
    teamNameLookup = {};
    //This function will hide (none) the conferences page and display the teams in a conference
    var URL = baseURL + "teams?conference=" + conferenceToDisplay;
    //Making the API call
    await getData(URL)
        .then(response => {
        for (let i = 0; i < response.data.length; i++) {
            teams.push(response.data[i]);
            teamNameLookup[response.data[i].alt_name2] = i;
        }
    });
    confPage = document.getElementById("conferences-container")
    confPage.style.display = "none"; //Hiding conferences
    var page = document.getElementById("teams-container");
    page.style.display = "block"; //Unhiding teams page
    var row, deck;
    for (let i = 0, j = 1; i < teams.length; i++) {
        //Iterating through the fetched teams to display their logos as buttons
        //Creating card elements just like the fixed elements of conferences
        //console.log(teams[i].school);
        if(i % 3 == 0) {
            //Putting out 3 per row
            row = document.createElement("div");
            row.classList.add("row", "justify-content-center", "m-2");
            row.setAttribute("id", `teams-row${j}`);
            page.appendChild(row);
            deck = document.createElement("div");
            deck.classList.add("card-deck", `col-${(teams.length - i) >= 3? "lg-12" : "sm-" + (teams.length -i)*4}`);
            deck.setAttribute("id", `teams-deck${j}`);
            row.appendChild(deck);
            j++;
        }
        let team = document.createElement("div");
        team.classList.add("card");
        team.setAttribute("id", `${teams[i].alt_name2}-card`);
        //img = teams[i].logos[0] + imgSize;
        team.innerHTML = `<a href="#" class="btn btn-fix text-center" id="${teams[i].alt_name2}">
                            <img class=card-img-top img-responsive" id="${teams[i].alt_name2}-img" src="${teams[i].logos[0]}" >
                            <div class="card-block">
                                <h4 class=card-title">${teams[i].school}</h4>
                            </div>
                        </a>`
        deck.appendChild(team);
    }
    console.log(teams);
    console.log(teams.length);
}

//populateTeams("b1g");

async function showTeamData(teamToShow) {
    //Takes a team object from the teams[] array
    let games = [];
    let year = "2019";
    //let teamURLname = teamToShow.school.replace(/ /g, "%20"); //convert spaces to URL spaces
    let teamURLname = "oregon";
    let oregonID = 2483; //TODO Remove placeholder once an actual team is passed.
    let statsURL = baseURL + "stats/season?year=" + year + "&team=" + teamURLname;
    //let gamesURL = baseURL + "games?year=" + year + "&team=" + teamURLname;
    let gamesURL = baseURL + "games/teams?year=" + year + "&team=" + teamURLname + "&week=";
    for (let i = 0; i < 16; i++){
        //Getting data for all 16 weeks of games, including week 0
        await getData(gamesURL + i)
            .then(response => {
                if(typeof response.data[0] !== "undefined"){
                    //Filtering BYE weeks
                    games.push(response.data[0]);
                }
        });
    }
    console.log(games);

}

showTeamData("string");