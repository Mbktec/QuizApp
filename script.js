
const category = document.querySelector('.category');
const question = document.getElementById('question');
const choix = document.querySelectorAll('.choix');
const reponseVrai = document.getElementById('reponse-vrai');
const reponseFausse = document.getElementById('reponse-fausse');
let sonChoix;
let valeurFausse = 0;
let valeurVrai = 0;

let valeurVraiStorage = JSON.parse(localStorage.getItem("valeurVrai"));
let valeurFausseStorage = JSON.parse(localStorage.getItem("valeurFausse"));

if (valeurVraiStorage){
  valeurVrai = valeurVraiStorage;
}
if(valeurFausseStorage){
  valeurFausse = valeurFausseStorage
}

async function quizApp(){
    const response = await fetch('https://opentdb.com/api.php?amount=1');
    const data = await response.json()
    let question = data.results[0];
    let fauxReponse;
    let vraiReponse;
    console.log(question);
    afficherQuetion(question);
    reponseFausse.textContent = valeurFausse;
    reponseVrai.textContent =  valeurVrai;
  }

quizApp()

  function afficherQuetion(donne) {
    choix[2].style.display = 'block';
    choix[3].style.display = 'block';
    sonChoix = '';
      category.innerHTML = ` <h3> ${donne.category} </h3>`;
      question.innerText = donne.question;      
      fauxReponse = donne.incorrect_answers;
      vraiReponse = donne.correct_answer;
      console.log(vraiReponse)
      fauxReponse.splice(Math.floor(Math.random() * 4), 0, vraiReponse);  
      for(i = 0; i < fauxReponse.length; i++){
           if( fauxReponse.length == 2){
              choix[2].style.display = 'none';
              choix[3].style.display = 'none';
              choix[i].value = fauxReponse[i];
            }
            else {
                choix[i].value = fauxReponse[i];
            }     
          }
      choix.forEach(Element => {
          Element.addEventListener('click', () => {             
             sonChoix = Element.value;
             console.log(sonChoix)              
      })
    })
  }

  document.querySelector('#valider').addEventListener('click', () => {
    if(sonChoix ===  vraiReponse ) {
      valeurVrai++;
      localStorage.setItem("valeurVrai", JSON.stringify(valeurVrai));
      reponseVrai.textContent =  valeurVrai;
      quizApp()
    }
    else {
      valeurFausse++;
      localStorage.setItem("valeurFausse", JSON.stringify(valeurFausse));
      reponseFausse.textContent = valeurFausse;
      quizApp()
    }
 
  })

  document.querySelector('#effacer').addEventListener('click', () => {
    localStorage.clear()
    valeurVrai = 0;
    valeurFausse = 0;
    quizApp()
  })

