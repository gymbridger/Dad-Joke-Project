var favorites = JSON.parse(localStorage.getItem('myFavorites')) || [];
// add class 'fav' to each favorite
favorites.forEach(function(myfavorites) {
  document.getElementById(myFavorites).className = 'my-favorites';
});
// register click event listener
document.querySelector('.list').addEventListener('click', function(e) {
  var id = e.target.id,
      item = e.target,
      index = myFavorites.indexOf(id);
  // return if target doesn't have an id (shouldn't happen)
  if (!id) return;
  // item is not favorite
  if (index == -1) {
    favorites.push(id);
    item.className = 'myFavorites';
  // item is already favorite
  } else {
    favorites.splice(index, 1);
    item.className = '';
  }
  // store array in local storage
  localStorage.setItem('myfavorites', JSON.stringify(myFavorites));
});