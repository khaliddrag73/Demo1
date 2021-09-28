nom = "";
pnom = "";
nas = "";
sexe = "";
lng = "";
liste = "";
texte = "";
polit = "";
prov = "";
imgProv = "";
notes = "";
//Au chargement de la page, chercher tous les ids essentiels au traitement
function Load()
{
   nom = document.getElementById("nom");
   pnom = document.getElementById("pnom");
   nas = document.getElementById("nas");
   polit = document.getElementById("polit");
   sexe = document.getElementsByName("sexe");
   lng = document.getElementsByName("langue");
   prov = document.getElementById("prov");
   imgProv = document.getElementById("imgProv");
   notes = document.getElementById("notes");

   Init();
}
//Réinitialiser éléments
function Init()
{
   notes.value = "";
   Vider(nom);
   Vider(pnom);
   Vider(nas);
   for(var i = 0; i < sexe.length; i++)
      sexe[i].checked = false;
   for(var i = 0; i < lng.length; i++)
      lng[i].checked = false;
   texte.value = ""; 
   polit.style.visibility  = 'hidden'; 
   prov.selectedIndex = "0";  
   imgProv.style.visibility = 'hidden';   
}

function Vider(e)
{
   e.value = "";
}
//Mettre en lettres majuscules le paramètre
function FocusOut(e)
{
   e.value = e.value.toUpperCase();
}
//Traitement du numéro d'assurance social
function Nas(e)
{
   var patt = /\d/g;//Expression régulière qui valide si une chaine contient des chiffres
   
   if(e.value.length != 0)
   {
      //Si la Nas compte exactement 9 chiffres
      if(e.value.length == 9 && e.value.match(patt).length == 9)
      {
         //Rajouter un '-' entre chaque trois chiffres
         e.value = e.value.slice(0,3) + '-' + e.value.slice(3,6) + '-' + e.value.slice(6);
         return true;
      }
      //Si la Nas compte 11 caractères, vérifier si la 4ème lettre et la 8ème lettre sont des '-'
      else if(e.value.length == 11 && e.value.match(patt).length == 9 && e.value.indexOf("-") == 3 && e.value.lastIndexOf("-") == 7)
         return true;
      //Sinon la Nas est invalide
      else
      {
         alert('Nas non valide !!\nSaisir 9 chiffes ou 11 chiffres (000-000-000)');
         e.focus();
         return false;
      }
   }
   else
   {
      alert("Il faut choisir un Nas !!");
      e.focus();
   }
}

function btnRd(e)
{
   polit.style.visibility = 'visible';//Rendre le champ visible
   if(e.value == "homme")
      polit.innerHTML = "Mr. " + nom.value + " " + pnom.value;
   else
      polit.innerHTML = "Mme. " + nom.value + " " + pnom.value;      
}

function Select(e)
{
   //Si aucun élément n'est selectionné dans la liste des provinces
   if(prov.selectedIndex == "0")
      imgProv.style.visibility = 'hidden';//Cacher la zone de l'image
   else
      imgProv.style.visibility = 'visible';//Rendre visible l'image
   imgProv.src = "./images/" + e.value + ".gif";
}

function ValiderIdentif(e)
{
   //Si le paramètre ne contient aucun caractère
   if(e.value == "")
   {
      alert("Il faut saisir un " + e.name[0].toUpperCase() + e.name.slice(1) + " !!");
      e.focus();
      return false;
   }
   return true;
}

function ValiderBtns(e, choix)
{
   for(var i = 0; i < e.length; i++)
      if(e[i].checked)//Vérifier si un bouton radio est coché
         return true;

   alert("Il faut remplir le champs " + choix + " !!");
   return false;
}

function ValiderProv()
{
   //Vérifier si une provine est choisie
   if (prov.selectedIndex == 0)
   {
      alert("Il faut choisir une Province");
      prov.focus();
      return false;
   }
   else
      return true;
}

function Valider()
{
   if(!ValiderIdentif(nom) || !ValiderIdentif(pnom) || !Nas(nas) || !ValiderBtns(sexe, "Sexe") || !ValiderBtns(lng, "Langues") || !ValiderProv() || !ValiderIdentif(notes))
         return false;
}