const QUESTIONS = [
 {q:"Un ordinateur est :",a:["Une machine.","Un animal.","Un aliment."],correct:0,explanation:"Un ordinateur est une machine qui nous aide à travailler, jouer, regarder des vidéos et apprendre."},
 {q:"Pour fonctionner, l’ordinateur a besoin de :",a:["Instructions.","Un cartable.","Une chaussure."],correct:0,explanation:"L’ordinateur a besoin d’instructions pour savoir quoi faire."},
 {q:"Comment appelle-t-on un ensemble d’instructions données à l’ordinateur ?",a:["Un logiciel.","Une table.","Un cahier."],correct:0,explanation:"Un logiciel est un ensemble d’ordres ou d’instructions donnés à l’ordinateur."},
 {q:"Un logiciel indique à l’ordinateur ce qu’il doit :",a:["Faire.","Manger.","Boire."],correct:0,explanation:"Le logiciel donne à l’ordinateur les instructions pour réaliser une tâche."},
 {q:"Pour faire un gâteau, on a besoin d’une :",a:["Recette.","Souris.","Écran."],correct:0,explanation:"La recette donne les étapes pour faire le gâteau, comme un logiciel donne des instructions à l’ordinateur."},
 {q:"Dans la leçon, le logiciel est comparé à une :",a:["Recette de cuisine.","Chaussure.","Fenêtre."],correct:0,explanation:"Le logiciel est comparé à une recette : les deux donnent des étapes ou des instructions."},
 {q:"Pour écrire une histoire, j’utilise :",a:["Un logiciel d’écriture.","Un logiciel de dessin.","Un logiciel de calcul."],correct:0,explanation:"Le logiciel d’écriture permet d’écrire une histoire ou un texte."},
 {q:"Pour dessiner, j’utilise :",a:["Un logiciel de dessin.","Un logiciel de calcul.","Un logiciel de vidéo."],correct:0,explanation:"Une application ou un logiciel de dessin sert à faire des images et des dessins."},
 {q:"Pour regarder une vidéo, j’utilise :",a:["Un logiciel de calcul.","Un logiciel de vidéo.","Un logiciel d’écriture."],correct:1,explanation:"Un logiciel de vidéo permet de regarder une vidéo sur l’ordinateur."},
 {q:"Un jeu auquel on joue sur ordinateur est :",a:["Un logiciel.","Un écran.","Une imprimante."],correct:0,explanation:"La leçon donne les jeux comme exemple de logiciels."},
 {q:"L’écran est :",a:["Du matériel.","Un logiciel.","Une instruction."],correct:0,explanation:"L’écran est une partie de l’ordinateur que l’on peut voir et toucher : c’est du matériel."},
 {q:"La souris est :",a:["Du matériel.","Un logiciel.","Une application."],correct:0,explanation:"La souris est un élément physique que l’on peut toucher : c’est du matériel."},
 {q:"Un jeu sur ordinateur est :",a:["Du matériel.","Un logiciel.","Une imprimante."],correct:1,explanation:"Un jeu est un programme que l’on utilise sur l’ordinateur : c’est un logiciel."},
 {q:"Le clavier est :",a:["Du matériel.","Un logiciel.","Un programme."],correct:0,explanation:"Le clavier est une partie physique de l’ordinateur que l’on peut toucher : c’est du matériel."},
 {q:"Une application de dessin est :",a:["Du matériel.","Un logiciel.","Un câble."],correct:1,explanation:"Une application de dessin est un programme : c’est un logiciel."},
 {q:"Un logiciel est :",a:["Un ensemble d’ordres ou d’instructions.","Une partie que l’on peut toucher.","Un meuble."],correct:0,explanation:"La définition de la leçon : un logiciel est un ensemble d’ordres (d’instructions) donné à l’ordinateur."},
 {q:"Le matériel correspond aux parties de l’ordinateur que l’on peut :",a:["Voir et toucher.","Manger.","Boire."],correct:0,explanation:"Le matériel regroupe les parties de l’ordinateur que l’on peut voir et toucher."},
 {q:"Un logiciel de calcul sert à :",a:["Faire des calculs.","Dessiner uniquement.","Regarder uniquement des vidéos."],correct:0,explanation:"Le logiciel de calcul est utilisé pour calculer."},
 {q:"Pour jouer à un jeu, j’utilise :",a:["Un logiciel de jeu.","Un logiciel de dessin.","Un logiciel de calcul."],correct:0,explanation:"La leçon associe l’activité jouer à un jeu à un logiciel de jeu."},
 {q:"Les programmes qui indiquent à l’ordinateur ce qu’il doit faire sont :",a:["Les logiciels.","Le matériel.","Les pièces de l’ordinateur."],correct:0,explanation:"Le logiciel est constitué de programmes qui indiquent à l’ordinateur ce qu’il doit faire."}
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
 const report=[`École : ${QUIZ_CONFIG.schoolName}`,`Quiz : Leçon 1 — Le logiciel`,`Candidat : ${r.name}`,`Note : ${r.grade}/${r.total}`,`Bonnes réponses : ${r.correct}/${r.total}`,`Incorrectes ou sans réponse : ${r.total-r.correct}`,`Pourcentage : ${r.percent}%`,`Durée : ${durationText(r.elapsed)}`,`Fin : ${r.timedOut?"Temps écoulé":"Terminé par le candidat"}`,"","CORRECTION DÉTAILLÉE",...r.details.flatMap((q,i)=>[`${i+1}. ${q.q}`,`Réponse du candidat : ${q.selected===null?"Aucune réponse":q.a[q.selected]}`,`Bonne réponse : ${q.a[q.correct]}`,`Résultat : ${q.isCorrect?"Correct":"Incorrect / sans réponse"}`,`Explication : ${q.explanation}`,""])].join("\n");
 try{const response=await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(recipient)}`,{method:"POST",headers:{"Content-Type":"application/json","Accept":"application/json"},body:JSON.stringify({_subject:`Le Cèdre — Leçon 1 : Le logiciel — ${r.name} — ${r.grade}/${r.total}`,name:r.name,score:`${r.grade}/${r.total}`,message:report,_template:"table"})});const data=await response.json();if(!response.ok||data.success===false)throw new Error();notice.classList.add("success");status.textContent="Rapport transmis à l’adresse de l’enseignant. Le premier envoi peut nécessiter la confirmation FormSubmit.";}catch(e){notice.classList.add("error");status.textContent="Le résultat reste affiché, mais l’envoi e-mail a échoué. Vérifiez config.js et la validation FormSubmit.";}
}
window.addEventListener("beforeunload",e=>{if(!finished&&$("quiz").classList.contains("active")){e.preventDefault();e.returnValue="";}});
