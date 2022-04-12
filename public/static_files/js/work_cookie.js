function begin() {
    
    var cval = get_cookie('visitor');
    var p_display = document.getElementById('id_display');
    p_display.innerHTML = cval;
    
}

function get_cookie(cookie_name) {
    
    var decodedCookie = decodeURIComponent(document.cookie);
    return decodedCookie.split('; ').find(row => row.startsWith(`${cookie_name}=`)).split('=')[1];
    
}

console.log(document.cookie)

begin()