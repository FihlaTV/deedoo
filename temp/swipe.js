// Récupération des label class=item
var divList = document.getElementsByClassName('list')[0],
	listItems = document.getElementsByClassName('left'),
	dist, startX;

// Ajout des écouteurs
for(var i=0; i<listItems.length; i++)
{

	listItems[i].addEventListener('touchstart', startSwipe , false);
	listItems[i].addEventListener('touchmove', moveSwipe , false);
	listItems[i].addEventListener('touchend', endSwipe , false);
}


// Quand l'utilisateur commence le swipe
function startSwipe(event)
{

	var touchObject = event.changedTouches[0],
	dist = 0;
	startX = touchObject.pageX;
}

// Quand l'utilisateur swipe
function moveSwipe(event)
{
	var touchObject = event.changedTouches[0];
	dist = touchObject.pageX - startX;
	this.style.left = dist+'px';
	if(dist>0)
		divList.style.backgroundColor = 'green';
	else
		divList.style.backgroundColor = 'red';

}

// Quand l'utilisateur relache le swipe
function endSwipe(event)
{
	console.log('end');
	if(dist>250)
	{
		// Update: lancer la validation dans la BDD
		console.log('valider l\'item');
	}
	else if(dist<-250)
	{
		// Update: lancer la suppression dans la BDD
		console.log('supprimer tache');
	}
	else
		this.style.left = '0px'; // Ne rien faire, reset la position
}
