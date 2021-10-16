document.getElementById("submit").addEventListener("click", function(event) {
    event.preventDefault();
    const value = document.getElementById("input").value;
    if (value ===""){
        return;
    }

    //HERE IS WHERE I CAN ACCESS GENERAL ARTIST DATA AND SIMILAR ARTISTS

    const info = "http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=" + value + "&api_key=78b9e06b0fa94299f85f740c3683e42c&format=json";
    fetch(info)
        .then(function(response) {
            return response.json()
        })
        .then(function(json){
            let results1 = "";
            let results2 = "";
            results1 += '<div class="col-sm-12 col-md-12 col-lg-4 col-xl-4 image-space summary-col"><p class="summary-text">' + json.artist.bio.summary + '</p></div>';
            results2 += '<div class="similar-title"><h2 class="similar-title">Similar Artists</h2></div>'
            //console.log('b4 loop')
            for(let i = 0; i < json.artist.similar.artist.length; i++) {
                console.log(json.artist.image[1]['#text'])
                results2 += '<div class="similar-row">' + json.artist.similar.artist[i].name + '</div>';
            }
            let setup = '<div class="col-sm-12 col-md-12 col-lg-8 col-xl-8 album-grid" id="album-grid"></div>'
            document.getElementById("artist-info").innerHTML = setup
            document.getElementById("artist-info").innerHTML = results1 + document.getElementById("artist-info").innerHTML;
            document.getElementById("results").innerHTML = results2;
        })

    // HERE IS WHERE I CAN ACCESS ALBUM ART AND DATA

    const albums = "http://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&artist=" + value + "&api_key=78b9e06b0fa94299f85f740c3683e42c&format=json";
    fetch(albums)
        .then(function(response){
            return response.json()
        })
        .then(function(json){


            let album1 = ""
            album1 += '<img class="album-image" src="' + json.topalbums.album[1].image[3]['#text'] + '" width="300px">'
            document.getElementById('image-space').innerHTML = album1

            let albumGrid = "";
            albumGrid = '<div class="row grid-title"><div class="col-8 grid-title"><h2>Top Albums</h2></div></div>'
            for(let i = 0; i < 6; i += 3){
                console.log(json.topalbums.album[i].image[3]['#text'])
                albumGrid += '<div class="row grid-row"><div class="col grid-item"><img src="' + json.topalbums.album[i].image[3]['#text'] + '" width="300px"/></div>' +
                    '<div class="col grid-item"><img src="' + json.topalbums.album[i+1].image[3]['#text'] + '" width="300px"/></div>' +
                    '<div class="col grid-item"><img src="' + json.topalbums.album[i+2].image[3]['#text'] + '" width="300px"/></div></div>'
            }
            document.getElementById("album-grid").innerHTML = albumGrid;

        })


})


//Ignore below

/*
let value = json.artist.similar.artist[i].name
                console.log(value)
                let url2 = "http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=" + value + "&api_key=78b9e06b0fa94299f85f740c3683e42c&format=json";
                fetch(url2)
                    .then(function (response) {
                    return response.json()
                    })
                    .then(function (json){
                        //console.log('in second url call')
                        results2 += '<div class="col similar-description">' + json.artist.bio.summary + '</div>'
                        console.log(results2)
                    })
                results2 += '</div>'
 */