function search() {
    let searchbar = document.getElementById("search-item").value.toUpperCase();
    let list = document.querySelectorAll(".list");
    let text = document.getElementsByClassName("fill-div");

    for(var i = 0;i<=text.length;i++){
        let a=list[i].getElementsByTagName("input")[1];
        console.log(a);
        let value=a.getAttribute("value");

        if(value.toUpperCase().indexOf(searchbar) > -1) {
            list[i].style.display="";
        } else {
            list[i].style.display="none";
        }
    }
}
    