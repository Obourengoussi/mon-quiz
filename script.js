const QUESTIONS = [
 {q:"Qu’est-ce qu’un objet technique ?",a:["Un objet fabriqué par l’être humain pour répondre à un besoin.","Un objet qui existe sans intervention humaine.","Uniquement un objet électronique."],correct:0,explanation:"Un objet technique (OST) est fabriqué par l’être humain pour répondre à un besoin. Il s’oppose à un objet naturel."},
 {q:"Qu’est-ce qu’un besoin ?",a:["Un manque à combler ou un désir à satisfaire.","La forme d’un objet.","La couleur d’un objet."],correct:0,explanation:"Le besoin est ce qui pousse une personne à utiliser ou à faire fabriquer un objet technique : c’est un manque à combler ou un désir à satisfaire."},
 {q:"La fonction d’usage répond à la question :",a:["À quoi sert l’objet ?","De quelle couleur est l’objet ?","Qui a fabriqué l’objet ?"],correct:0,explanation:"La fonction d’usage décrit ce que fait l’objet pour l’utilisateur et répond à la question « À quoi sert l’objet ? »."},
 {q:"Comment formule-t-on une fonction d’usage ?",a:["Avec un verbe à l’infinitif suivi d’un complément.","Avec un seul nom.","Avec une couleur et une matière."],correct:0,explanation:"Dans la leçon, une fonction d’usage se formule toujours par un verbe à l’infinitif suivi d’un complément."},
 {q:"Quelle est la fonction d’usage d’un parapluie ?",a:["Protéger l’utilisateur de la pluie.","Être de couleur noire.","Être pliable."],correct:0,explanation:"L’exemple du cours donne : « Protéger l’utilisateur de la pluie »."},
 {q:"Quel objet peut répondre au besoin « s’éclairer la nuit » ?",a:["Une lampe de poche.","Un thermomètre.","Une gourde isotherme."],correct:0,explanation:"Le cours cite une lampe de poche et un lampadaire comme objets techniques répondant au besoin de s’éclairer la nuit."},
 {q:"Quel schéma résume la leçon 1 ?",a:["Le besoin donne naissance à un objet technique, qui remplit une fonction d’usage.","La fonction d’usage crée toujours un objet naturel.","Un objet technique n’a pas besoin de répondre à un besoin."],correct:0,explanation:"Le schéma à retenir relie le besoin, l’objet technique et la fonction d’usage."},
 {q:"Qu’est-ce qu’une invention ?",a:["La création d’un objet ou d’un procédé totalement nouveau.","Une petite amélioration d’un objet existant.","Un changement qui remplace toujours une technologie ancienne."],correct:0,explanation:"Une invention est la création d’un objet ou d’un procédé totalement nouveau, qui n’existait pas avant."},
 {q:"Qu’est-ce qu’une innovation ?",a:["Une amélioration apportée à un objet déjà existant.","La création du premier objet de son type.","La disparition de tous les usages d’un objet."],correct:0,explanation:"Une innovation améliore un objet déjà existant pour le rendre plus performant, plus pratique ou moins cher."},
 {q:"Qu’est-ce qu’une rupture technologique ?",a:["Un changement important qui transforme complètement les usages et remplace une technologie ancienne.","Une simple modification de couleur.","Une réparation d’un objet cassé."],correct:0,explanation:"Une rupture technologique transforme complètement les usages et peut remplacer une technologie ancienne."},
 {q:"Dans l’histoire du téléphone, le téléphone fixe à cadran est présenté comme :",a:["Une invention.","Une innovation.","Une rupture technologique."],correct:0,explanation:"Le cours présente le téléphone fixe à cadran comme une invention de la fin du XIXe siècle."},
 {q:"L’ajout d’un flash sur un appareil photo est :",a:["Une innovation.","Une invention.","Une rupture technologique."],correct:0,explanation:"Ajouter un flash est une amélioration d’un objet existant : c’est donc une innovation."},
 {q:"Le passage du CD au streaming musical est :",a:["Une rupture technologique.","Une simple réparation.","Une invention sans changement d’usage."],correct:0,explanation:"Le cours classe le passage du CD au streaming musical comme une rupture technologique car les usages ont totalement changé."},
 {q:"Le développement de la voiture électrique peut être expliqué par :",a:["Une contrainte écologique.","La couleur des voitures.","La forme des roues uniquement."],correct:0,explanation:"Le cours cite notamment la contrainte écologique : réduire la pollution et les émissions de CO2. D’autres facteurs sont possibles : réglementation ou nouveau besoin."},
 {q:"Qu’est-ce qu’une donnée numérique ?",a:["Une information codée sous forme de nombres, notamment 0 et 1.","Une information uniquement écrite sur papier.","Un objet naturel."],correct:0,explanation:"Une donnée numérique est une information codée sous forme de nombres (0 et 1) pour être stockée, traitée ou transmise par un appareil numérique."},
 {q:"Laquelle est un exemple de donnée numérique ?",a:["Une photo prise avec un smartphone.","Une table en bois.","Une feuille non numérisée."],correct:0,explanation:"Le cours donne notamment comme exemples une photo, un message, une position GPS et le nombre de pas comptés par une montre connectée."},
 {q:"Qu’est-ce que la dématérialisation ?",a:["Remplacer un support physique par un fichier ou un service numérique.","Fabriquer un objet avec plus de matière.","Supprimer toute information."],correct:0,explanation:"La dématérialisation consiste à remplacer un support physique (papier, CD, carte…) par un fichier ou un service numérique."},
 {q:"Le billet de train sur smartphone à la place du billet papier est un exemple de :",a:["Dématérialisation.","Rupture naturelle.","Fonction d’usage."],correct:0,explanation:"Le cours donne précisément cet exemple pour expliquer la dématérialisation."},
 {q:"Quel est un impact positif du numérique cité dans le cours ?",a:["Un accès rapide à l’information.","Une consommation d’énergie nulle.","La disparition de toutes les données personnelles."],correct:0,explanation:"Parmi les impacts positifs cités : gain de temps et d’espace de stockage, accès rapide à l’information et moins de papier utilisé au quotidien."},
 {q:"Quel est un impact négatif du numérique cité dans le cours ?",a:["La consommation d’énergie des data centers et des appareils.","L’accès plus rapide à l’information.","Le gain d’espace de stockage."],correct:0,explanation:"Le cours cite comme impacts négatifs la consommation d’énergie, la fracture numérique et les questions de protection des données personnelles."}
];
const DURATION=30*60,$=id=>document.getElementById(id);
let candidate={},answers=Array(QUESTIONS.length).fill(null),current=0,startedAt=0,deadline=0,timer=null,finished=false;
const viewIds=["welcome","quiz","result"];
function showView(id){viewIds.forEach(v=>$(v).classList.toggle("active",v===id));window.scrollTo({top:0,behavior:"smooth"});}
function err(id,msg){$(id).textContent=msg;$(id).hidden=false;}
function clearErr(id){$(id).hidden=true;}
$("year").textContent=new Date().getFullYear();

$("identity-form").addEventListener("submit",e=>{
 e.preventDefault();clearErr("identity-error");
 const first=$("first").value.trim().replace(/\s+/g," "),last=$("last").value.trim().replace(/\s+/g," ");
 if(!first||!last){err("identity-error","Veuillez renseigner votre prénom et votre nom.");return;}
 candidate={first,last};answers=Array(QUESTIONS.length).fill(null);current=0;finished=false;startedAt=Date.now();deadline=startedAt+DURATION*1000;
 $("candidate-label").textContent=`Candidat : ${first} ${last}`;makeGrid();renderQuestion();showView("quiz");updateTimer();timer=setInterval(updateTimer,250);
});
function makeGrid(){const grid=$("question-grid");grid.replaceChildren();QUESTIONS.forEach((q,i)=>{const b=document.createElement("button");b.type="button";b.className="question-number";b.textContent=String(i+1).padStart(2,"0");b.setAttribute("aria-label",`Aller à la question ${i+1}`);b.addEventListener("click",()=>{if(finished)return;saveSelection();current=i;renderQuestion();});grid.append(b);});}
function saveSelection(){const selected=document.querySelector('input[name="answer"]:checked');if(selected)answers[current]=Number(selected.value);}
function renderQuestion(){
 const q=QUESTIONS[current];
 $("progress-label").textContent=`QUESTION ${String(current+1).padStart(2,"0")} / ${QUESTIONS.length}`;
 $("question-number").textContent=String(current+1).padStart(2,"0");
 $("answered-label").textContent=`${answers.filter(a=>a!==null).length} réponse(s) sur ${QUESTIONS.length}`;
 $("progress-bar").style.width=`${(current+1)/QUESTIONS.length*100}%`;
 $("question-text").textContent=q.q;$("answer-list").replaceChildren();clearErr("answer-error");
 q.a.forEach((text,i)=>{const b=document.createElement("button");b.type="button";b.className=`answer-option${answers[current]===i?" selected":""}`;b.setAttribute("aria-pressed",String(answers[current]===i));const letter=document.createElement("span");letter.className="option-letter";letter.textContent=String.fromCharCode(65+i);const label=document.createElement("span");label.textContent=text;b.append(letter,label);b.addEventListener("click",()=>{answers[current]=i;[...$("answer-list").children].forEach((el,j)=>{el.classList.toggle("selected",j===i);el.setAttribute("aria-pressed",String(i===j));});$("answered-label").textContent=`${answers.filter(a=>a!==null).length} réponse(s) sur ${QUESTIONS.length}`;updateGrid();});$("answer-list").append(b);});
 $("previous").disabled=current===0;$("next").innerHTML=current===QUESTIONS.length-1?'Terminer le quiz <span>✓</span>':'Valider et continuer <span>→</span>';updateGrid();
}
function updateGrid(){[...$("question-grid").children].forEach((b,i)=>{b.classList.toggle("current",i===current);b.classList.toggle("done",answers[i]!==null);});}
$("previous").addEventListener("click",()=>{if(current>0&&!finished){saveSelection();current--;renderQuestion();}});
$("answer-form").addEventListener("submit",e=>{e.preventDefault();if(finished)return;saveSelection();if(Date.now()>=deadline){finish(true);return;}if(current<QUESTIONS.length-1){current++;renderQuestion();return;}const missing=answers.filter(a=>a===null).length;if(missing&&!confirm(`Il reste ${missing} question(s) sans réponse. Terminer quand même ?`))return;finish(false);});
function updateTimer(){if(finished)return;const left=Math.max(0,Math.ceil((deadline-Date.now())/1000)),m=Math.floor(left/60),s=left%60;$("timer").textContent=`${String(m).padStart(2,"0")}:${String(s).padStart(2,"0")}`;$("timer-bar").style.width=`${left/DURATION*100}%`;if(left<=60)$("timer-card").classList.add("urgent");if(left===0)finish(true);}
function durationText(sec){return `${Math.floor(sec/60)} min ${String(sec%60).padStart(2,"0")} s`;}
function finish(timedOut){
 if(finished)return;saveSelection();finished=true;if(timer)clearInterval(timer);
 const elapsed=Math.min(DURATION,Math.floor((Date.now()-startedAt)/1000)),correct=answers.reduce((sum,a,i)=>sum+(a===QUESTIONS[i].correct?1:0),0),total=QUESTIONS.length;
 const result={name:`${candidate.first} ${candidate.last}`,first:candidate.first,last:candidate.last,correct,total,grade:correct,percent:Math.round(correct/total*100),elapsed,timedOut,details:QUESTIONS.map((q,i)=>({...q,selected:answers[i],isCorrect:answers[i]===q.correct}))};
 renderResult(result);sendReport(result);
}
function renderResult(r){
 showView("result");$("result-title").innerHTML=r.timedOut?'Temps écoulé.<br><em>Quiz clôturé.</em>':'Quiz terminé.<br><em>Bravo pour votre travail.</em>';
 $("result-subtitle").textContent=r.timedOut?"Les 30 minutes sont écoulées. Votre copie a été clôturée automatiquement.":"Votre quiz est terminé. Consultez votre bilan et la correction.";
 $("result-name").textContent=r.name;$("avatar").textContent=r.first[0].toUpperCase();$("score").innerHTML=`${r.grade}<small>/${r.total}</small>`;$("percent").textContent=`${r.percent}%`;$("ring").style.setProperty("--angle",`${r.percent*3.6}deg`);
 $("score-remark").textContent="Résultat de l’évaluation — consultez la correction pour revoir les notions.";
 $("correct-count").textContent=r.correct;$("wrong-count").textContent=r.total-r.correct;$("elapsed").textContent=durationText(r.elapsed);$("correction-count").textContent=`${r.total} questions`;buildCorrection(r);$("correction-section").hidden=true;
}
function buildCorrection(r){
 const list=$("correction-list");list.replaceChildren();r.details.forEach((q,i)=>{
  const article=document.createElement("article");article.className="correction-item";const head=document.createElement("header"),num=document.createElement("span");num.className="correction-index";num.textContent=String(i+1).padStart(2,"0");
  const title=document.createElement("h3");title.textContent=q.q;const status=document.createElement("span");status.className=`status ${q.isCorrect?"ok":"no"}`;status.textContent=q.isCorrect?"✓ CORRECT":"✕ À REVOIR";head.append(num,title,status);
  const chosen=document.createElement("p");chosen.innerHTML="<strong>Votre réponse :</strong> ";chosen.append(document.createTextNode(q.selected===null?"Aucune réponse":`${String.fromCharCode(65+q.selected)}. ${q.a[q.selected]}`));
  const correct=document.createElement("p");correct.innerHTML="<strong>Réponse attendue :</strong> ";correct.append(document.createTextNode(`${String.fromCharCode(65+q.correct)}. ${q.a[q.correct]}`));
  const explain=document.createElement("p");explain.className="explanation";explain.innerHTML="<strong>À retenir :</strong> ";explain.append(document.createTextNode(q.explanation));article.append(head,chosen,correct,explain);list.append(article);
 });
}
$("show-correction").addEventListener("click",()=>{const section=$("correction-section");section.hidden=!section.hidden;$("show-correction").textContent=section.hidden?"Consulter la correction ↓":"Masquer la correction ↑";if(!section.hidden)section.scrollIntoView({behavior:"smooth"});});
$("print").addEventListener("click",()=>window.print());
$("new-candidate").addEventListener("click",()=>{if(confirm("Commencer une nouvelle évaluation ?")){if(timer)clearInterval(timer);$("identity-form").reset();$("timer-card").classList.remove("urgent");showView("welcome");}});
async function sendReport(r){
 const notice=$("email-notice"),status=$("email-status"),recipient=QUIZ_CONFIG.teacherEmail;
 if(!recipient||recipient.includes("REMPLACEZ_PAR_VOTRE_EMAIL")||recipient.endsWith("@example.com")){status.textContent="L’envoi e-mail n’est pas configuré. Vérifiez config.js avant publication.";return;}
 status.textContent="Envoi du rapport à l’enseignant…";
 const report=[`École : ${QUIZ_CONFIG.schoolName}`,`Quiz : Leçons 1 à 3 — Technologie`,`Candidat : ${r.name}`,`Note : ${r.grade}/${r.total}`,`Bonnes réponses : ${r.correct}/${r.total}`,`Incorrectes ou sans réponse : ${r.total-r.correct}`,`Pourcentage : ${r.percent}%`,`Durée : ${durationText(r.elapsed)}`,`Fin : ${r.timedOut?"Temps écoulé":"Terminé par le candidat"}`,"","CORRECTION DÉTAILLÉE",...r.details.flatMap((q,i)=>[`${i+1}. ${q.q}`,`Réponse du candidat : ${q.selected===null?"Aucune réponse":q.a[q.selected]}`,`Bonne réponse : ${q.a[q.correct]}`,`Résultat : ${q.isCorrect?"Correct":"Incorrect / sans réponse"}`,`Explication : ${q.explanation}`,""])].join("\n");
 try{const response=await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(recipient)}`,{method:"POST",headers:{"Content-Type":"application/json","Accept":"application/json"},body:JSON.stringify({_subject:`Le Cèdre — Leçons 1 à 3 : Technologie — ${r.name} — ${r.grade}/${r.total}`,name:r.name,score:`${r.grade}/${r.total}`,message:report,_template:"table"})});const data=await response.json();if(!response.ok||data.success===false)throw new Error();notice.classList.add("success");status.textContent="Rapport transmis à l’adresse de l’enseignant. Le premier envoi peut nécessiter la confirmation FormSubmit.";}catch(e){notice.classList.add("error");status.textContent="Le résultat reste affiché, mais l’envoi e-mail a échoué. Vérifiez config.js et la validation FormSubmit.";}
}
window.addEventListener("beforeunload",e=>{if(!finished&&$("quiz").classList.contains("active")){e.preventDefault();e.returnValue="";}});
