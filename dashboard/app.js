// import { name } from "../app1";
// document.getElementById('userName').innerHTML = name 
var profilePhotoImg = document.getElementById("profilePhotoImg");
var profilePhotoInput = document.getElementById("profilePhotoInput");

profilePhotoImg.addEventListener("click", function () {
    profilePhotoInput.click();
}); 

profilePhotoInput.addEventListener("change", function (e) {
    var file = e.target.files[0];
    var reader = new FileReader();
    reader.onload = function () {
        profilePhotoImg.src = reader.result;
    };
    reader.readAsDataURL(file);
});

var backgroundImg;
function post() {
    var title = document.getElementById("title");
    var description = document.getElementById("description");

    var currentTime = new Date().toLocaleTimeString();
    if (title.value.trim() && description.value.trim()) {
        var post = document.getElementById("post");
        post.innerHTML += `
   <div class="card p-3 mb-2">
       <div class="card-header d-flex">
       <img class="profile-photo" src="${profilePhotoImg.src}" />
       <div class="name-time d-flex flex-column">
       ${name}
        <div class="time">${currentTime}</div>
        </div>
        <div class="d-flex editBtnImg">
        <a class="button primary edit">Edit</a>
        <a onclick="editpost(this)" class="button touch edit ms-2"></a>
         <button type="button" onclick="deletePost(this)" class="ms-2 btn btn-danger deleteBtn"> <img src="image/delete_24dp_FFFFFF_FILL0_wght400_GRAD0_opsz24.png" class="imgEdit"/></button>
         </div>
      
    </div>
      <div style="background-image: url(${backgroundImg})" class="card-body">
        <blockquote class="blockquote mb-0">
           <p>${title.value}</p>
           <footer class="blockquote-footer">${description.value}</footer>
         </blockquote>
      </div>
       <div class="card-footer d-flex justify-content-end">
        
       </div>
  </div>`;
        title.value = "";
        description.value = "";
    } else {
        Swal.fire({
            title: "Empty Post",
            text: "Can't publish post without Title or Description",
            icon: "question",
        });
    }

}
function selectImg(src) {
    backgroundImg = src;
    var bgImg = document.getElementsByClassName("bg-img");

    for (var i = 0; i < bgImg.length; i++) {
        bgImg[i].className = "bg-img";
    }
    event.target.className += " selectedImg";
}
function deletePost(button) {
    button.parentNode.parentNode.parentNode.remove();
}
function editpost(button) {
    var card = button.parentNode.parentNode.parentNode;
    var title = card.childNodes[3].childNodes[1].childNodes[1].innerHTML;
    var description = card.childNodes[3].childNodes[1].childNodes[3].innerHTML;
    document.getElementById("title").value = title;
    document.getElementById("description").value = description;
    card.remove();
}
