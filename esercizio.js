/*
PARTE 1: 
Oggi analizzeremo un problema molto comune: realizzare algoritmi di ricerca.
Il tuo compito è creare una funzione che cercherà per posizione lavorativa E posizione geografica. Questi due valori verranno passati come parametri
Ti abbiamo fornito un array chiamato "jobs" in fondo al file, NON modificarlo in alcun modo.
L'algoritmo che devi realizzare cercherà SIA per posizione lavorativa che per posizione geografica.
Prendi queste tre inserzioni ad esempio:

      job1:  location: "NY, US",     title: "java dev"
      job2:  location: "Genoa, IT"   title: "web dev"
      job3:  location: "US"      title: "dev"

Cercando contemporaneamente come posizione lavorativa "dev" e posizione geografica "US", dovresti ottenere come risultato solamente job1 e job3,
in quanto job2 non soddisfa la condizione posta sulla posizione geografica.

REQUISITI:
- il tuo algoritmo deve tornare i risultati nella seguente forma:
{
  result: [], <-- inserisci qui le inserzioni che rispecchiano la posizione lavorativa e la posizione geografica richiesta
  count: 0 <-- inserisci qui il numero totale delle inserzioni trovate
}

- la tua ricerca deve essere "case insensitive" (non deve essere influenzata da lettere maiuscole o minuscole nelle parole cercate). Questo e' possibile trasformando tutto in lettere minuscole con .toLowerCase()


PARTE 2: 
Nella pagina HTML, inserisci 2 input di tipo testo (uno per la location e uno per il titolo lavorativo, ricordati di diversificarli con un id) e un bottone con valore “cerca”

Al click del bottone, il codice deve raccogliere i valori dei due input e darli in pasto alla funzione che hai creato nella parte 1. 

Dopo aver raccolto ed elaborato i dati, e’ il momento di mostrare i risultati sulla pagina: 
    Puoi scegliere tu se utilizzare un semplice ul / li oppure una tabella 
    Vai passo per passo e usa molti console.log per capire eventualmente dove sbagli
    SUGGERIMENTO: ti servira’ un ciclo for!

*/

// NON MODIFICARE QUESTO ARRAY!
const jobs = [
  { title: "Marketing Intern", location: "US, NY, New York" },
  {
    title: "Customer Service - Cloud Video Production",
    location: "NZ, Auckland",
  },
  {
    title: "Commissioning Machinery Assistant (CMA)",
    location: "US, IA, Wever",
  },
  {
    title: "Account Executive - Washington DC",
    location: "US, DC, Washington",
  },
  { title: "Bill Review Manager", location: "US, FL, Fort Worth" },
  { title: "Accounting Clerk", location: "US, MD," },
  { title: "Head of Content (m/f)", location: "DE, BE, Berlin" },
  {
    title: "Lead Guest Service Specialist",
    location: "US, CA, San Francisco",
  },
  { title: "HP BSM SME", location: "US, FL, Pensacola" },
  {
    title: "Customer Service Associate - Part Time",
    location: "US, AZ, Phoenix",
  },
  {
    title: "ASP.net Developer Job opportunity at United States,New Jersey",
    location: "US, NJ, Jersey City",
  },
  {
    title: "Talent Sourcer (6 months fixed-term contract)",
    location: "GB, LND, London",
  },
  {
    title: "Applications Developer, Digital",
    location: "US, CT, Stamford",
  },
  { title: "Installers", location: "US, FL, Orlando" },
  { title: "Account Executive - Sydney", location: "AU, NSW, Sydney" },
  {
    title: "VP of Sales - Vault Dragon",
    location: "SG, 01, Singapore",
  },
  { title: "Hands-On QA Leader", location: "IL, Tel Aviv, Israel" },
  {
    title: "Southend-on-Sea Traineeships Under NAS 16-18 Year Olds Only",
    location: "GB, SOS, Southend-on-Sea",
  },
  { title: "Visual Designer", location: "US, NY, New York" },
  {
    title: "Process Controls Engineer - DCS PLC MS Office - PA",
    location: "US, PA, USA Northeast",
  },
  { title: "Marketing Assistant", location: "US, TX, Austin" },
  { title: "Front End Developer", location: "NZ, N, Auckland" },
  { title: "Engagement Manager", location: "AE," },
  {
    title: "Vice President, Sales and Sponsorship (Businessfriend.com)",
    location: "US, CA, Carlsbad",
  },
  { title: "Customer Service", location: "GB, LND, London" },
  { title: "H1B SPONSOR FOR L1/L2/OPT", location: "US, NY, New York" },
  { title: "Marketing Exec", location: "SG," },
  {
    title: "HAAD/DHA Licensed Doctors Opening in UAE",
    location: "AE, AZ, Abudhabi",
  },
  {
    title: "Talent Management Process Manager",
    location: "US, MO, St. Louis",
  },
  { title: "Customer Service Associate", location: "CA, ON, Toronto" },
  {
    title: "Customer Service Technical Specialist",
    location: "US, MA, Waltham",
  },
  { title: "Software Applications Specialist", location: "US, KS," },
  { title: "Craftsman Associate", location: "US, WA, Everett" },
  { title: "Completion Engineer", location: "US, CA, San Ramon" },
  { title: "I Want To Work At Karmarama", location: "GB, LND," },
  {
    title: "English Teacher Abroad",
    location: "US, NY, Saint Bonaventure",
  },
]



// SVOLGIMENTO - ho aggiunto un popup al click su un annuncio e una sezione news randomizzata

const inputTitle = document.getElementById("title");
const inputLocation = document.getElementById("location");
const searchBtn = document.getElementById("search-btn");
const resultScreen = document.getElementById("results");
const count = document.getElementById("count");

const disclaimer = document.getElementById("disclaimer-container");
const acceptChkbox = document.getElementById("accept");
const applyBtn = document.getElementById("apply");
const closeDisclaimer = document.getElementById("close-disclaimer");
const acceptAlert = document.getElementById("accept-alert");

let result = [];


// reset ricerca
function resetResearch() {
  result.splice(0);
  let jobPost = document.querySelectorAll(".job-post");
  jobPost.forEach(element => resultScreen.removeChild(element))
}

// ricerca
function research() {
  let titleValue = inputTitle.value.toLowerCase();
  let locationValue = inputLocation.value.toLowerCase();

  jobs.forEach(job => {
    if (job.title.toLowerCase().includes(titleValue) 
      && job.location.toLowerCase().includes(locationValue)) {
      result.push(job)
    }
  });
}

// mostra risultati
function showResult() {
  result.forEach(voice => {
    jobPost = document.createElement("div");
    jobPost.classList.add("job-post")
    jobPost.innerText = `${result.indexOf(voice) + 1}. ${voice.title} at ${voice.location}`
    jobPost.addEventListener("click", openPopup)

    resultScreen.appendChild(jobPost);
  })
}

// reset e apertura Disclaimer
function openPopup() {
  acceptChkbox.checked = false;
      acceptAlert.classList.add("hidden");
      disclaimer.classList.remove("hidden")
}

// evento click su Search
searchBtn.addEventListener("click", (event) => {
  event.preventDefault();
  resetResearch();
  research();
  console.log(result, result.length);
  count.innerText = result.length;
  showResult();
})


// eventi Disclaimer
applyBtn.addEventListener("click", () => {
  if (acceptChkbox.checked) {
    alert("You applied successfully.")
  } else {
    acceptAlert.classList.remove("hidden");
    acceptChkbox.addEventListener("change", () => {
      if (acceptChkbox.checked) {
        acceptAlert.classList.add("hidden")
      }
    })
  }
})

closeDisclaimer.addEventListener("click", () => {
  disclaimer.classList.add("hidden");
})



// sezione NEWS
const rightSide = document.getElementById("right-side");

const newsArray = [
  {image: "assets/pexels-olly-925786.jpg", title: "Perfect Employee Discovers that a 2-Hour Coffee Break Doesn't Improve Productivity"},
  {image: "assets/1081623.jpg", title: "Boss Requests Team Building on Zoom: Enthusiasm Through the Roof"},
  {image: "assets/pexels-divinetechygirl-1181396.jpg", title: "3-Hour Meeting Makes Office More Productive: Says No One"},
  {image: "assets/pexels-rdne-7580798.jpg", title: "Surprise Promotion: The Only One Who Didn't Know is the Employee"},
  {image: "assets/pexels-vlada-karpovich-4050388.jpg", title: "Working From Home: The Secret of Multitasking, Netflix and Work Discovered"},
  {image: "assets/pexels-ron-lach-9849304.jpg", title: "Desk Clean-Up: Employee Finds Forgotten Projects from 2018"},
  {image: "assets/pexels-yankrukov-8199606.jpg", title: `Meeting Summary: "This Could Have Been an Email", Says Everyone`},
  {image: "Assets/pexels-armin-rimoldi-5269633.jpg", title: `Optimistic Boss: "Working More Solves All Problems", Says from Bora Bora`},
  {image: "assets/pexels-yankrukov-7793663.jpg", title: "Employee of the Month Awarded for Mastering the Art of Looking Busy"},
  {image: "assets/pexels-han-798356342-20453539.jpg", title: "Company Announces Unlimited Vacation Policy: No One Takes a Day Off"},
  {image: "assets/pexels-fauxels-3183197.jpg", title: "New Office Policy: All Meetings to Start with 10-Minute Icebreakers"},
  {image: "assets/pexels-marcus-aurelius-4064177.jpg", title: "Employee Celebrates 5 Years of Perfect Attendance by Showing Up Sick"},
  {image: "assets/istockphoto-114405566-612x612.jpg", title: "Office Celebrates Increased Productivity: More Emails Sent Than Ever Before"},
  {image: "assets/6113-07243119en_Masterfile.jpg", title: `Boss Declares "Open Door Policy": Employee Still Nervous to Knock`},
  {image: "assets/istockphoto-1348346832-612x612.jpg", title: "Employee Promises to Be More Productive After Lunch: Forgets Immediately"}
];

function randomNews() {
  let newsArrayIstance = newsArray;

  for (i = 0; i <= 2; i++) {
    const article = document.createElement("article");
    const articleImg = document.createElement("img");
    const articleTitle = document.createElement("h4");
   
    // randomizza articolo e rimuove dall'istance dell'array
    let randomElement = newsArray[Math.floor(Math.random() * newsArray.length)];
    newsArrayIstance.splice(newsArrayIstance.indexOf(randomElement), 1);

    //popola articolo
    articleImg.src = randomElement.image;
    articleImg.alt = randomElement.title;
    articleTitle.innerText = randomElement.title;

    // aggiunta articolo alla pagina
    article.appendChild(articleImg);
    article.appendChild(articleTitle);
    rightSide.appendChild(article);
  }
}

randomNews();