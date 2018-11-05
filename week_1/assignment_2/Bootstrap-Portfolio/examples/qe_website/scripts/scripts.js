/*************************************************************************
 * This script iteratively adds "onclick" action listeners to all
 * expandbtn class objects on a page. This is used on pages with accordian
 * style expandable content.
 ************************************************************************/
 var btn = document.getElementsByClassName("expandbtn");
 //loops once for each button on the DOM
 for (var i = 0; i < btn.length; i++) {
//adds action listener to the button
    btn[i].addEventListener("click", function() {
        this.classList.toggle("active");
          //"content" initialized as the next sibling element under btn
          var content= this.nextElementSibling;
          if (content.style.display === "block") {
              content.style.display = "none";
              //if it's already displayed, hide it
          }
          else {
              //content is currently hidden, display it.
              content.style.display = "block";
          }
    } //end function()
  ); //ends .addEventListener parameters
 }

/***********************************************************************
* Expands a dropdown menu
* Called by navbar button "drop-button" in tablet and mobile navbars
* Referenced W3's 'How To' guides and their API.
***********************************************************************/
/* Set the width of the side navigation to 250px */
function openNav() {
   document.getElementById("side-nav-content").style.width = "10em";
}

/* Set the width of the side navigation to 0 */
function closeNav() {
   document.getElementById("side-nav-content").style.width = "0";
}
