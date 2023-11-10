
//API: https://fsa-crud-2aa9294fe819.herokuapp.com/api/2109-CPU-RM-WEB-PT/events

//GET => Read data
//PUT => Update data
//POST => Create data
//DELETE => Delete data

//standard restful api routes
// event (Model) => {id:unique name: string location: number, date: Datetime, description: string}

// get    /events   =>   get all tweets multiple [events...]
// With any of these
// when page loads show events
// - fetch data from server (via our api)
// - add this data to state when successful
// - render state
const rootLink = `https://fsa-crud-2aa9294fe819.herokuapp.com/api/2109-CPU-RM-WEB-PT`

const initialState = {
    events: []
}

const state = initialState;

const fetchEvents = async () => { 
    console.log("fetching events")
    let res = await fetch(`${rootLink}/events`)
    
    let data = await res.json();
    let events = data.data
    console.log('data:', data)

    state.events = events
    renderEvents()
}

const handleClicked = async (id)=>{
    try {
        let res = await fetch(`${rootLink}/events/${id}`, {
            method: 'DELETE',
        });
        newEventswithDeletedEventRemoved = state.events.filter (event => event.id !==id)
        this.state.events = newEventswithDeletedEventRemoved;
        renderEvents()

    } catch(error) {
        console.error('Error: ', error)
    }

}

const renderEvents = ()=>{
    console.log("rending events")
let eventHTMLstring = '';

let eventsHTML = document.getElementById('events')

    state.events.forEach(event => { 
        eventHTMLstring += `
       <div class="events">
        <div class="event">
        <h1>${event.name}</h1>
        <p>${event.description}</p>
        <p>${event.date}</p>
        <p>${event.location}</p>
        <p>ID: ${event.id}</p>
        <button onclick="handleClicked(${event.id})">delete</button>
    </div>`;
    });
    eventsHTML.innerHTML = eventHTMLstring
}

const render = () =>[
    renderEvents()
]
const init = ()=> {
    fetchEvents()

}
init();
