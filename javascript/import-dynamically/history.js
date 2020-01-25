// Url params
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');
console.log("GET: " + id);

// Url hash
console.log(window.location.hash);

// Change url state
window.onpopstate = function(event) {
    console.log("OnPopState Hash " + document.location.hash, " Location: " + document.location.pathname, "state: " + JSON.stringify(event.state))
}

window.onhashchange = function(event) {
    console.log("OnHashCHange Hash " + document.location.hash, " Location: " + document.location.pathname, "state: " + JSON.stringify(event.state))
}

window.onload = function(){    
    console.log("OnLoad Event");    
};

window.hujnia = function(){    
    console.log("Hujnia Event");    
};

function shouldUseDefault(e) {
    return ((e = (e || window.event)) && (e.type == 'click' || e.type == 'mousedown' || e.type == 'mouseup') && (e.which > 1 || e.button > 1 || e.ctrlKey || e.shiftKey || browser.mac && e.metaKey)) || false;
} 

window.onload = function(){
    console.log("OnLoad history urls");
    // History popstate for a href urls
    var List = document.querySelectorAll("a")
    List.forEach(function(item){                
        var h = item.href.replace(location.protocol+'//'+location.host, ""); // delete protocol//host
        if(h.indexOf("http://") == 0 || h.indexOf("https://") == 0 || h.indexOf("//") == 0){
            console.log("External link ", item.href);
            item.setAttribute('target', '_blank');
        }else{
            item.addEventListener('click', function(e){
                e.preventDefault() 
                window.history.pushState({page: item.href}, "Title "+item.href, item.href)
                var popStateEvent = new PopStateEvent('popstate', { state: history.state })
                dispatchEvent(popStateEvent)
                console.log('Item history ', history.state)
            }, false)
        }
    })
}